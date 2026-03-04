import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGitBranch,
  FiGithub,
  FiStar,
  FiClock,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { profileData, projectCatalog } from "../data/portfolioData";
import { formatCompactNumber, formatDate } from "../utils/formatters";

const toLanguageSummary = (languages = {}) => {
  const entries = Object.entries(languages);
  if (!entries.length) {
    return "Python";
  }

  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  return entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([name, value]) => `${name} ${Math.round((value / total) * 100)}%`)
    .join(" | ");
};

const Projects = ({ repoMap, repositories, loading, apiError }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section id="projects" className="section-pad">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65 }}
          className="section-heading"
        >
          <p className="eyebrow">Repository Showcase</p>
          <h2>Projetos em destaque e repositorio completo</h2>
          <p>
            Os projetos de dados ficam em destaque e todos os repositorios
            publicos sao carregados dinamicamente na mesma pagina.
          </p>
        </motion.div>

        <div className="project-grid">
          {projectCatalog.map((project, index) => {
            const metrics = repoMap?.[project.name] ?? {};

            return (
              <motion.article
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.52 }}
                whileHover={{ y: -6 }}
              >
                <div className="project-head">
                  <p>{project.architecture}</p>
                  <h3>{project.displayName}</h3>
                </div>

                <p className="project-focus">{project.focus}</p>

                <ul className="project-outcomes">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>

                <div className="project-stack">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-metrics">
                  <span>
                    <FiStar size={14} /> {metrics.stars ?? 0}
                  </span>
                  <span>
                    <FiGitBranch size={14} /> {metrics.forks ?? 0}
                  </span>
                  <span>
                    Atualizado: {formatDate(metrics.pushedAt)}
                  </span>
                </div>

                <p className="project-language">
                  Stack detectada: {toLanguageSummary(metrics.languages)}
                </p>

                <div className="project-actions">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <FiGithub size={16} /> Abrir repositorio
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <article className="repository-radar">
          <div className="repository-radar-head">
            <h3>Todos os repositorios publicos ({repositories.length})</h3>
            <p>
              Lista atualizada via GitHub API com links diretos para cada codigo
              publicado.
            </p>
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="github-fallback-link"
            >
              Abrir perfil completo no GitHub <FiExternalLink size={14} />
            </a>
          </div>

          {loading ? (
            <p className="repo-loading">Carregando repositorios...</p>
          ) : apiError ? (
            <p className="repo-loading">
              Nao foi possivel sincronizar a API agora. Links diretos para o seu GitHub continuam ativos.
            </p>
          ) : (
            <div className="repo-list">
              {repositories.map((repo) => (
                <article key={repo.id} className="repo-item">
                  <div className="repo-main">
                    <a href={repo.htmlUrl} target="_blank" rel="noreferrer" className="repo-name">
                      {repo.name} <FiExternalLink size={14} />
                    </a>
                    <p>{repo.description || "Repositorio sem descricao publicada."}</p>
                  </div>

                  <div className="repo-meta">
                    <span>{repo.language || "Sem linguagem"}</span>
                    <span>
                      <FiStar size={12} /> {formatCompactNumber(repo.stars)}
                    </span>
                    <span>
                      <FiGitBranch size={12} /> {formatCompactNumber(repo.forks)}
                    </span>
                    <span>
                      <FiClock size={12} /> {formatDate(repo.pushedAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Projects;
