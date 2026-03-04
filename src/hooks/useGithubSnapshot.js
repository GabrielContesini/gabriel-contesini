import { useEffect, useMemo, useState } from "react";
import { coreRepositoryNames, profileData, projectCatalog } from "../data/portfolioData";

const API_BASE = "https://api.github.com";
const USERNAME = "GabrielContesini";

const fetchJson = async (url, init = {}) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json();
};

const fetchInternalSnapshot = async () => {
  const response = await fetch("/api/github");

  if (!response.ok) {
    throw new Error(`Internal sync failed: ${response.status}`);
  }

  return response.json();
};

const normalizeRepositories = (repositories) =>
  repositories
    .filter((repo) => !repo.private)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      isFork: repo.fork,
      defaultBranch: repo.default_branch,
      archived: repo.archived,
    }));

const fetchAllRepositoriesDirect = async () => {
  const perPage = 100;
  let page = 1;
  let all = [];

  while (true) {
    const batch = await fetchJson(
      `${API_BASE}/users/${USERNAME}/repos?sort=updated&direction=desc&per_page=${perPage}&page=${page}`,
    );

    all = [...all, ...batch];

    if (batch.length < perPage) {
      break;
    }

    page += 1;
  }

  return all;
};

const buildFeaturedRepositoryMapDirect = async (normalizedRepositories) => {
  const featuredRepositoryMap = normalizedRepositories.reduce((acc, repo) => {
    if (coreRepositoryNames.includes(repo.name)) {
      acc[repo.name] = {
        stars: repo.stars,
        forks: repo.forks,
        watchers: repo.watchers,
        openIssues: repo.openIssues,
        defaultBranch: repo.defaultBranch,
        updatedAt: repo.updatedAt,
        pushedAt: repo.pushedAt,
        language: repo.language,
        htmlUrl: repo.htmlUrl,
      };
    }

    return acc;
  }, {});

  const languageResponses = await Promise.all(
    coreRepositoryNames.map((repoName) =>
      fetchJson(`${API_BASE}/repos/${USERNAME}/${repoName}/languages`).catch(
        () => ({}),
      ),
    ),
  );

  coreRepositoryNames.forEach((repoName, index) => {
    if (featuredRepositoryMap[repoName]) {
      featuredRepositoryMap[repoName].languages = languageResponses[index];
    }
  });

  return featuredRepositoryMap;
};

const buildFallbackSnapshot = () => {
  const fallbackRepositories = projectCatalog.map((project, index) => ({
    id: index + 1,
    name: project.name,
    fullName: `GabrielContesini/${project.name}`,
    description: project.focus,
    htmlUrl: project.repoUrl,
    homepage: null,
    language: project.stack[0] || "Python",
    stars: 0,
    forks: 0,
    watchers: 0,
    openIssues: 0,
    updatedAt: null,
    pushedAt: null,
    isFork: false,
    defaultBranch: "main",
    archived: false,
  }));

  const fallbackRepoMap = projectCatalog.reduce((acc, project) => {
    acc[project.name] = {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
      defaultBranch: "main",
      updatedAt: null,
      pushedAt: null,
      language: project.stack[0] || "Python",
      htmlUrl: project.repoUrl,
      languages: {},
    };
    return acc;
  }, {});

  return {
    profile: {
      publicRepos: fallbackRepositories.length,
      followers: 0,
      following: 0,
      location: profileData.location,
      company: profileData.company,
      updatedAt: null,
      avatarUrl: profileData.avatarUrl,
    },
    repositories: fallbackRepositories,
    repoMap: fallbackRepoMap,
    lastSync: null,
  };
};

export const useGithubSnapshot = () => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [repoMap, setRepoMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const snapshot = await fetchInternalSnapshot();

        if (!active) {
          return;
        }

        setProfile(snapshot.profile);
        setRepositories(snapshot.repositories);
        setRepoMap(snapshot.repoMap);
        setApiError(false);
        setLastSync(snapshot.lastSync || new Date().toISOString());
      } catch {
        if (!active) {
          return;
        }

        try {
          const [profileResponse, repositoriesResponse] = await Promise.all([
            fetchJson(`${API_BASE}/users/${USERNAME}`),
            fetchAllRepositoriesDirect(),
          ]);

          if (!active) {
            return;
          }

          const normalizedRepositories = normalizeRepositories(repositoriesResponse);
          const featuredRepositoryMap = await buildFeaturedRepositoryMapDirect(
            normalizedRepositories,
          );

          setProfile({
            publicRepos: profileResponse.public_repos,
            followers: profileResponse.followers,
            following: profileResponse.following,
            location: profileResponse.location,
            company: profileResponse.company,
            updatedAt: profileResponse.updated_at,
            avatarUrl: profileResponse.avatar_url,
          });
          setRepositories(normalizedRepositories);
          setRepoMap(featuredRepositoryMap);
          setApiError(false);
          setLastSync(new Date().toISOString());
        } catch {
          if (!active) {
            return;
          }

          const fallback = buildFallbackSnapshot();
          setProfile(fallback.profile);
          setRepositories(fallback.repositories);
          setRepoMap(fallback.repoMap);
          setApiError(true);
          setLastSync(fallback.lastSync);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const totals = useMemo(() => {
    const totalStars = repositories.reduce((acc, repo) => acc + (repo.stars || 0), 0);
    const totalForks = repositories.reduce((acc, repo) => acc + (repo.forks || 0), 0);

    return {
      totalStars,
      totalForks,
      trackedRepositories: repositories.length,
    };
  }, [repositories]);

  return {
    profile,
    repositories,
    repoMap,
    loading,
    apiError,
    lastSync,
    totals,
  };
};
