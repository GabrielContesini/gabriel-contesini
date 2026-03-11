import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const links = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/gabriel-contesini-603588210/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/GabrielContesini',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    ),
    color: '#e8e8e8',
  },
  {
    label: 'Email',
    url: 'mailto:gabrielct.moraes@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    color: '#00FFA3',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const copyEmail = () => {
    navigator.clipboard.writeText('gabrielct.moraes@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contato" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background accent glow */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '50vw',
        height: '50vh',
        background: 'radial-gradient(ellipse at center, rgba(0,255,163,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Contato
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Left — large statement text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '2rem',
            }}>
              VAMOS{' '}
              <span style={{
                WebkitTextStroke: '1px rgba(232,232,232,0.3)',
                color: 'transparent',
              }}>
                CONVERSAR
              </span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h2>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-lg)',
              lineHeight: 1.8,
              maxWidth: '440px',
              marginBottom: '3rem',
            }}>
              Aberto a oportunidades em desenvolvimento fullstack, backend e 
              automação. Resposta garantida em até 24h.
            </p>

            {/* Big email display */}
            <div
              onClick={copyEmail}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.8rem, 1.6vw, 1rem)',
                color: 'var(--accent)',
                border: '1px solid rgba(0,255,163,0.25)',
                borderRadius: '6px',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                transition: 'background 200ms, border-color 200ms, box-shadow 200ms',
                background: 'transparent',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-dim)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 0 30px var(--accent-dim)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(0,255,163,0.25)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              gabrielct.moraes@gmail.com
              <span style={{
                fontSize: '0.75rem',
                color: copied ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 200ms',
              }}>
                {copied ? '✓ copiado' : '⎘ copiar'}
              </span>
            </div>
          </motion.div>

          {/* Right — social links + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {/* Social links */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '1.25rem',
              }}>Redes</div>

              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    transition: 'color 200ms, padding-left 200ms',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.color
                    e.currentTarget.style.paddingLeft = '0.5rem'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {link.icon}
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      letterSpacing: '0.05em',
                    }}>
                      {link.label}
                    </span>
                  </span>
                  <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>↗</span>
                </motion.a>
              ))}
            </div>

            {/* Info cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {[
                { label: 'Localização', value: 'SBC — SP', sub: 'Remoto ✓' },
                { label: 'Resposta', value: '< 24h', sub: 'Dias úteis' },
              ].map((info) => (
                <div
                  key={info.label}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '0.5rem',
                  }}>
                    {info.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--text)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}>
                    {info.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent)',
                  }}>
                    {info.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--border)',
        padding: '2rem clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--muted)',
        }}>
          © {new Date().getFullYear()} Gabriel Contesini
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--muted)',
        }}>
          Feito com React + Three.js
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contato .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
