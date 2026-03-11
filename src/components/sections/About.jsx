import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: '4+', label: 'Anos em Dev' },
  { value: '7+', label: 'Anos em TI' },
  { value: '2', label: 'Empresas' },
  { value: '10+', label: 'Projetos' },
]

const tags = ['Fullstack', 'APIs REST', 'Automação', 'Python', 'Cloud', 'Low-code']

function StatCard({ value, label, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        padding: '1.5rem',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.015)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '3px', height: '100%',
        background: 'var(--accent)',
      }} />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '3rem',
        lineHeight: 1,
        color: 'var(--accent)',
        marginBottom: '0.25rem',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
      }}>{label}</div>
    </motion.div>
  )
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="sobre" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Sobre mim
        </motion.div>

        {/* Asymmetric grid — text heavy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Left — text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                lineHeight: 0.95,
                color: 'var(--text)',
                marginBottom: '2rem',
              }}
            >
              CONSTRUO COISAS{' '}
              <span style={{ color: 'var(--accent)' }}>QUE</span>{' '}
              FUNCIONAM
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontSize: 'var(--text-lg)',
              }}>
                Desenvolvedor com experiência em webapps e serviços, atuando em
                backend + integrações + front quando necessário. Trabalho com
                <span style={{ color: 'var(--text)' }}> Python, PHP e JavaScript</span>,
                criação de APIs REST, integração entre sistemas e automações para
                acelerar processos.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>
                Com experiência completa no ciclo de desenvolvimento — do banco de
                dados ao front-end — e familiaridade com ambientes Linux e cloud
                (Azure/AWS), consigo entregar soluções sólidas com agilidade real.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Localizado em <span style={{ color: 'var(--text)' }}>São Bernardo do Campo — SP</span>,
                disponível para trabalho remoto ou híbrido.
              </p>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '2rem',
              }}
            >
              {tags.map((tag) => (
                <span key={tag} className="tech-badge" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a
                href="https://github.com/GabrielContesini"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/gabriel-contesini-603588210/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* Right — stats + visual */}
          <div>
            {/* Decorative code block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 2,
              }}
            >
              <div style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>// gabriel.config.ts</div>
              <div><span style={{ color: 'var(--accent)' }}>const</span> <span style={{ color: '#79b8ff' }}>dev</span> = {'{'}</div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>name:</span>{' '}
                <span style={{ color: '#f0c674' }}>"Gabriel Contesini"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>focus:</span>{' '}
                <span style={{ color: '#f0c674' }}>"Fullstack + Integrações"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>location:</span>{' '}
                <span style={{ color: '#f0c674' }}>"São Paulo, BR"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>available:</span>{' '}
                <span style={{ color: 'var(--accent)' }}>true</span>,
              </div>
              <div>{'}'}</div>
            </motion.div>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.3 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Style — responsive */}
      <style>{`
        @media (max-width: 768px) {
          #sobre .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
