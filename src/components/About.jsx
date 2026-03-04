import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { commandFlow, educationData, timelineData } from "../data/portfolioData";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="section-pad section-surface">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65 }}
          className="section-heading"
        >
          <p className="eyebrow">Professional Snapshot</p>
          <h2>Experiencia profissional e atuacao tecnica</h2>
          <p>
            Portfolio estruturado para recrutadores com trilha real de carreira,
            escopo tecnico e entregas aplicadas em desenvolvimento e dados.
          </p>
        </motion.div>

        <div className="flow-grid">
          {commandFlow.map((step, index) => (
            <motion.article
              key={step.id}
              className="flow-card"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <span className="flow-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <strong>{step.subtitle}</strong>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="timeline-shell">
          <h3>Timeline de empregos</h3>
          <div className="timeline-list">
            {timelineData.map((item) => (
              <article key={`${item.period}-${item.company}`} className="timeline-item job-item">
                <div className="timeline-marker" />
                <div className="timeline-copy">
                  <div className="timeline-header">
                    <span>{item.period}</span>
                    {item.emphasis && <em>{item.emphasis}</em>}
                  </div>
                  <h4>{item.title}</h4>
                  <p className="job-meta">{item.company} | {item.location}</p>
                  <p>{item.description}</p>
                  <ul className="job-points">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="education-strip">
            <h4>Formacao academica</h4>
            <div className="education-list">
              {educationData.map((education) => (
                <article key={education.period + education.institution}>
                  <span>{education.period}</span>
                  <strong>{education.institution}</strong>
                  <p>{education.degree}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
