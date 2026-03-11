import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    id: 1,
    company: 'Tecnocomp Tecnologia e Serviços',
    role: 'Desenvolvedor de Sistemas Pleno',
    period: '2023 - 2026',
    current: true,
    highlights: [
      'Desenvolvi aplicações internas com Bubble.io e apps com FlutterFlow, acelerando entregas e validações com áreas de negócio.',
      'Criei APIs em Python (FastAPI) para suportar integrações e consumo por sistemas internos.',
      'Desenvolvi relatórios e rotinas em PHP, apoiando operação e necessidade de visibilidade de dados.',
      'Integrei sistemas legados e novos, garantindo padronização de comunicação e redução de falhas por inconsistência de dados.',
      'Implementei automações e rotinas (n8n / Linux), melhorando previsibilidade e agilidade operacional.',
      'Colaborei com melhorias de experiência e consistência visual (UI/UX / design system) em produtos internos.',
      'Atuei na implementação de comunicação assíncrona e processamento desacoplado por meio de filas e mensageria, contribuindo para maior resiliência e confiabilidade dos processos.',
    ],
  },
  {
    id: 2,
    company: 'Velours International',
    role: 'Desenvolvedor de Sistemas Junior',
    period: '2022-2023',
    current: false,
    highlights: [
      'Automatizei processos com Python + Selenium, eliminando etapas manuais repetitivas.',
      'Apoiei desenvolvimento e evolução de APIs/microsserviços (Node.js/Next.js) e integrações.',
      'Contribuí com melhorias de front-end com Vue.js/React/jQuery em sistemas web.',
      'Trabalhei com MongoDB/PostgreSQL, dando suporte a funcionalidades, consultas e manutenção.',
      'Implementei funções AWS Lambda para necessidades específicas.',
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experiencia" className="section" ref={ref}
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Experiência
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: 0.95,
            color: 'var(--text)',
            marginBottom: '4rem',
          }}
        >
          ONDE JÁ{' '}
          <span style={{ color: 'var(--accent)' }}>TRABALHEI</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem', marginBottom: '3rem' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '7px',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--accent), var(--border), transparent)',
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              style={{ marginBottom: '2.5rem', position: 'relative' }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '0.4rem',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: exp.current ? 'var(--accent)' : 'var(--surface)',
                border: `2px solid ${exp.current ? 'var(--accent)' : 'var(--border-bright)'}`,
                boxShadow: exp.current ? '0 0 12px var(--accent-glow)' : 'none',
              }} />

              {/* Card */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${exp.current ? 'rgba(0,255,163,0.2)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  padding: '2rem',
                  transition: 'border-color 200ms, box-shadow 200ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = exp.current ? 'rgba(0,255,163,0.2)' : 'var(--border)' }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem 1.5rem',
                  marginBottom: '0.35rem',
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: 'var(--text)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}>
                    {exp.company}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.period}
                  </span>
                </div>

                <div style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.15rem',
                  lineHeight: 1.4,
                  marginBottom: '1.25rem',
                }}>
                  {exp.role}
                </div>

                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  color: 'var(--text-secondary)',
                }}>
                  {exp.highlights.map((highlight, index) => (
                    <li key={index} style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.8,
                      marginBottom: index === exp.highlights.length - 1 ? 0 : '0.35rem',
                    }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
