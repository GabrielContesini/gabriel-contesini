const API_BASE = "https://api.github.com";
const USERNAME = "GabrielContesini";
const CORE_REPOSITORIES = [
  "openweather_pipeline",
  "weather-lakehouse",
  "weather-lakehouse-databricks",
];

const buildHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-torres-data-engineer",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`GitHub request failed (${response.status}): ${payload}`);
  }

  return response.json();
};

const fetchAllRepositories = async () => {
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

const buildFeaturedRepositoryMap = async (normalizedRepositories) => {
  const map = normalizedRepositories.reduce((acc, repo) => {
    if (CORE_REPOSITORIES.includes(repo.name)) {
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
    CORE_REPOSITORIES.map((repoName) =>
      fetchJson(`${API_BASE}/repos/${USERNAME}/${repoName}/languages`).catch(
        () => ({}),
      ),
    ),
  );

  CORE_REPOSITORIES.forEach((repoName, index) => {
    if (map[repoName]) {
      map[repoName].languages = languageResponses[index];
    }
  });

  return map;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetchJson(`${API_BASE}/users/${USERNAME}`),
      fetchAllRepositories(),
    ]);

    const normalizedRepositories = normalizeRepositories(repositoriesResponse);
    const repoMap = await buildFeaturedRepositoryMap(normalizedRepositories);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      profile: {
        publicRepos: profileResponse.public_repos,
        followers: profileResponse.followers,
        following: profileResponse.following,
        location: profileResponse.location,
        company: profileResponse.company,
        updatedAt: profileResponse.updated_at,
        avatarUrl: profileResponse.avatar_url,
      },
      repositories: normalizedRepositories,
      repoMap,
      lastSync: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: "github_sync_failed",
      message: error.message,
    });
  }
}
