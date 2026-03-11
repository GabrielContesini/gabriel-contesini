import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillCategories = [
  {
    label: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'Vue.js',      level: 85, accent: '#41b883' },
      { name: 'React.js',    level: 80, accent: '#61dafb' },
      { name: 'JavaScript',  level: 88, accent: '#f7df1e' },
      { name: 'jQuery',      level: 70, accent: '#0769ad' },
      { name: 'HTML/CSS',    level: 90, accent: '#e44d26' },
    ],
  },
  {
    label: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Python',      level: 88, accent: '#3776ab' },
      { name: 'FastAPI',     level: 85, accent: '#009688' },
      { name: 'PHP',         level: 80, accent: '#777bb4' },
      { name: 'Node.js',     level: 78, accent: '#339933' },
      { name: 'Next.js',     level: 72, accent: '#ffffff' },
    ],
  },
  {
    label: 'Banco de Dados',
    icon: '▣',
    skills: [
      { name: 'PostgreSQL',  level: 85, accent: '#336791' },
      { name: 'MongoDB',     level: 75, accent: '#47a248' },
      { name: 'SQL',         level: 85, accent: '#f29111' },
    ],
  },
  {
    label: 'Cloud & Infra',
    icon: '◎',
    skills: [
      { name: 'Linux',       level: 82, accent: '#fcc624' },
      { name: 'AWS',         level: 70, accent: '#ff9900' },
      { name: 'Azure',       level: 65, accent: '#0089d6' },
      { name: 'Docker',      level: 68, accent: '#2496ed' },
    ],
  },
  {
    label: 'Ferramentas',
    icon: '◇',
    skills: [
      { name: 'n8n',         level: 80, accent: '#ef6821' },
      { name: 'Selenium',    level: 75, accent: '#43b02a' },
      { name: 'Bubble.io',   level: 85, accent: '#5e4ead' },
      { name: 'Git',         level: 88, accent: '#f05033' },
      { name: 'FlutterFlow', level: 78, accent: '#02569b' },
    ],
  },
]

function SkillBar({ name, level, accent, inView, delay }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.375rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text)',
        }}>{name}</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--muted)',
        }}>{level}%</span>
      </div>
      <div style={{
        height: '2px',
        background: 'var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: accent || 'var(--accent)',
            borderRadius: '2px',
            boxShadow: inView ? `0 0 8px ${accent}66` : 'none',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const active = skillCategories[activeTab]

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Tecnologias
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
            marginBottom: '3rem',
          }}
        >
          MEU{' '}
          <span style={{ color: 'var(--accent)' }}>ARSENAL</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0, 2fr)',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: activeTab === i ? 'var(--accent-dim)' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${activeTab === i ? 'var(--accent)' : 'var(--border)'}`,
                  color: activeTab === i ? 'var(--text)' : 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  marginBottom: '0.25rem',
                }}
                onMouseEnter={(e) => { if (activeTab !== i) e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={(e) => { if (activeTab !== i) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{cat.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                }}>{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Skills display */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>{active.icon}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--text)',
                letterSpacing: '0.05em',
              }}>{active.label}</h3>
            </div>

            {active.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                inView={inView}
                delay={0.1 + i * 0.08}
              />
            ))}
          </motion.div>
        </div>

        {/* All-tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginTop: '4rem' }}
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.625rem',
          }}>
            {skillCategories.flatMap(c => c.skills).map((skill) => (
              <span key={skill.name} className="tech-badge" style={{ fontSize: '0.75rem', padding: '0.4rem 0.875rem' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
