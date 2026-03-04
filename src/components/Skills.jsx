import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certifications, primaryCompetencies, skillClusters } from "../data/portfolioData";

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="skills" className="section-pad section-surface">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65 }}
          className="section-heading"
        >
          <p className="eyebrow">Knowledge Matrix</p>
          <h2>Conhecimentos destacados para recrutadores</h2>
          <p>
            Base tecnica combinando desenvolvimento de sistemas, cloud e
            engenharia de dados orientada a producao.
          </p>
        </motion.div>

        <div className="primary-competencies">
          {primaryCompetencies.map((competency) => (
            <span key={competency}>{competency}</span>
          ))}
        </div>

        <div className="skills-grid">
          {skillClusters.map((cluster, index) => (
            <motion.article
              key={cluster.title}
              className="skill-cluster"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: index * 0.1, duration: 0.48 }}
            >
              <h3>{cluster.title}</h3>
              <div className="cluster-tags">
                {cluster.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <article className="competency-strip">
          <div>
            <h3>Certificacoes e aprendizado continuo</h3>
            <p>
              Stack de certificacoes com maior peso para recrutamento tecnico
              em dados e cloud.
            </p>
          </div>
          <div className="certification-grid">
            {certifications.map((certificate) => (
              <article key={certificate.title} className="cert-card">
                <h4>{certificate.title}</h4>
                <p>{certificate.provider}</p>
                <span>{certificate.status}</span>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Skills;
