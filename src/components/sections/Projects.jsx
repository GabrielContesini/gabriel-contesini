import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FEATURED = [
  {
    id: 'codetrail-root',
    title: 'CodeTrail',
    subtitle: 'Produto principal',
    description:
      'Aplicação principal do ecossistema CodeTrail para organizar estudos, evolução prática e acompanhamento da jornada de aprendizado em programação.',
    tags: ['Dart', 'Flutter', 'Produto', 'Gamificação'],
    links: [
      { href: 'https://github.com/GabrielContesini/CodeTrail', label: 'Ver no GitHub ↗' },
      { href: 'https://www.codetrail.site/', label: 'Ver landing page ↗' },
    ],
    type: 'Product',
    color: '#00ffa3',
    icon: '🧭',
    year: '2024',
  },
  {
    id: 'codetrail-windows',
    title: 'CodeTrail Windows',
    subtitle: 'Desktop experience',
    description:
      'Versão desktop do CodeTrail voltada ao ambiente Windows, mantendo a proposta do produto com foco em uso contínuo e experiência dedicada para desktop.',
    tags: ['Dart', 'Flutter', 'Windows', 'Desktop'],
    links: [
      { href: 'https://github.com/GabrielContesini/CodeTrailWindows', label: 'Ver no GitHub ↗' },
      { href: 'https://www.codetrail.site/', label: 'Ver landing page ↗' },
    ],
    type: 'Desktop App',
    color: '#79b8ff',
    icon: '🪟',
    year: '2024',
  },
  {
    id: 'codetrail-command-center',
    title: 'CodeTrail Command Center',
    subtitle: 'Painel operacional',
    description:
      'Camada de gestão do ecossistema CodeTrail com foco em acompanhamento do produto, visão centralizada e operação da plataforma.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    links: [
      { href: 'https://github.com/GabrielContesini/CodeTrail-CommandCenter', label: 'Ver no GitHub ↗' },
      { href: 'https://www.codetrail.site/', label: 'Ver landing page ↗' },
    ],
    type: 'Web Platform',
    color: '#f4b860',
    icon: '⌨️',
    year: '2024',
  },
  {
    id: 'weather-lakehouse',
    title: 'Weather Lakehouse',
    subtitle: 'Dados e analytics',
    description:
      'Estrutura de lakehouse para dados meteorológicos, organizada para ingestão, modelagem analítica e consumo em cenários de engenharia de dados.',
    tags: ['Python', 'Lakehouse', 'Analytics', 'Data Engineering'],
    links: [
      { href: 'https://github.com/GabrielContesini/weather-lakehouse', label: 'Ver no GitHub ↗' },
    ],
    type: 'Data Project',
    color: '#4fd1c5',
    icon: '🌦️',
    year: '2025',
  },
  {
    id: 'openweather-pipeline',
    title: 'OpenWeather Pipeline',
    subtitle: 'Ingestão automatizada',
    description:
      'Pipeline de coleta e estruturação de dados climáticos pensado para automatizar ingestão, tratamento e preparação de dados para análises posteriores.',
    tags: ['Python', 'Pipelines', 'ETL', 'Automation'],
    links: [
      { href: 'https://github.com/GabrielContesini/openweather_pipeline', label: 'Ver no GitHub ↗' },
    ],
    type: 'Pipeline',
    color: '#c084fc',
    icon: '📡',
    year: '2025',
  },
]

/* ─── Static fallback repos (shown if GitHub API fails) ─── */
const STATIC_REPOS = [
  { id: 's1', name: 'Pokedex_v2', description: 'Pokédex moderna com API dinâmica e design responsivo', language: 'JavaScript', stargazers_count: 0, html_url: 'https://github.com/GabrielContesini/Pokedex_v2', topics: ['react', 'api'] },
  { id: 's2', name: 'busca-cep', description: 'Consulta e validação de CEPs brasileiros via API ViaCEP', language: 'JavaScript', stargazers_count: 0, html_url: 'https://github.com/GabrielContesini/busca-cep', topics: ['javascript'] },
  { id: 's3', name: 'Formatador-de-JSON', description: 'Formatador e validador de JSON online com syntax highlighting', language: 'PHP', stargazers_count: 0, html_url: 'https://github.com/GabrielContesini/Formatador-de-JSON', topics: ['php', 'json'] },
  { id: 's4', name: 'password-generator', description: 'Gerador de senhas seguras com configurações personalizáveis', language: 'JavaScript', stargazers_count: 0, html_url: 'https://github.com/GabrielContesini/password-generator', topics: ['javascript'] },
]

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  PHP: '#777bb4',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#42b883',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
}

/* ─── Featured Carousel ─── */
function FeaturedCarousel({ visible }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const timerRef = useRef(null)

  const goTo = useCallback((idx, direction = 1) => {
    setDir(direction)
    setActive(idx)
  }, [])

  useEffect(() => {
    if (!visible) return
    timerRef.current = setInterval(() => {
      setDir(1)
      setActive(prev => (prev + 1) % FEATURED.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [visible])

  const prev = () => {
    clearInterval(timerRef.current)
    const idx = (active - 1 + FEATURED.length) % FEATURED.length
    goTo(idx, -1)
  }
  const next = () => {
    clearInterval(timerRef.current)
    const idx = (active + 1) % FEATURED.length
    goTo(idx, 1)
  }

  const project = FEATURED[active]

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div style={{ position: 'relative', marginBottom: '5rem' }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'var(--accent)',
          animation: 'pulse 2s infinite',
        }} />
        Projetos em Destaque
      </div>

      {/* Carousel card */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        border: `1px solid ${project.color}33`,
        background: 'var(--surface)',
        minHeight: '340px',
      }}>
        {/* Glow BG */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 80% 20%, ${project.color}08 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'background 400ms ease',
        }} />

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={project.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ padding: 'clamp(2rem, 4vw, 3.5rem)', position: 'relative' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '2.5rem',
              alignItems: 'flex-start',
            }}>
              {/* Icon */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '16px',
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                flexShrink: 0,
              }}>
                {project.icon}
              </div>

              {/* Content */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: project.color,
                    border: `1px solid ${project.color}33`,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                  }}>
                    {project.type}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                    {project.year}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  color: 'var(--text)',
                  marginBottom: '0.25rem',
                }}>
                  {project.title}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: project.color,
                  marginBottom: '1.25rem',
                  opacity: 0.8,
                }}>
                  {project.subtitle}
                </div>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.8,
                  maxWidth: '560px',
                  marginBottom: '1.5rem',
                }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
                  {project.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '3px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: project.color,
                        border: `1px solid ${project.color}40`,
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        transition: 'background 200ms, border-color 200ms',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${project.color}15` }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5C2 13.216 2.784 14 3.75 14h8.5A1.75 1.75 0 0014 12.25v-3a.75.75 0 00-1.5 0v3a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3a.75.75 0 000-1.5h-3z" />
                        <path d="M9 2.75A.75.75 0 019.75 2h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V4.56l-5.97 5.97a.75.75 0 11-1.06-1.06l5.97-5.97H9.75A.75.75 0 019 2.75z" />
                      </svg>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {['←', '→'].map((arrow, i) => (
          <button
            key={arrow}
            onClick={i === 0 ? prev : next}
            aria-label={i === 0 ? 'Anterior' : 'Próximo'}
            style={{
              position: 'absolute',
              top: '50%',
              [i === 0 ? 'left' : 'right']: '1rem',
              transform: 'translateY(-50%)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              transition: 'border-color 200ms, color 200ms',
              zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            {arrow}
          </button>
        ))}
      </div>

      {/* Dots indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
      }}>
        {FEATURED.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === active ? 'var(--accent)' : 'var(--border)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 300ms ease, background 300ms ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Single repo card ─── */
function RepoCard({ repo, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    setTilt({ x, y })
  }

  const langColor = LANG_COLORS[repo.language] || '#666'

  return (
    <motion.div
      ref={el => { cardRef.current = el; ref(el) }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={onMouseMove}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 200ms ease',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      as="a"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; setTilt({ x: 0, y: 0 }) }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <svg width="18" height="18" viewBox="0 0 16 16" fill="var(--muted)" style={{ flexShrink: 0, marginTop: '2px' }}>
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--muted)">
          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.836 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
        </svg>
      </div>

      <h4 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        color: 'var(--text)',
        fontWeight: 500,
        lineHeight: 1.3,
      }}>
        {repo.name.replace(/-/g, '-')}
      </h4>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.78rem',
        lineHeight: 1.6,
        flex: 1,
      }}>
        {repo.description || 'Repositório no GitHub'}
      </p>

      {repo.language && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '10px', height: '10px',
            borderRadius: '50%',
            background: langColor,
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
          }}>
            {repo.language}
          </span>
          {repo.stargazers_count > 0 && (
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
            }}>
              ★ {repo.stargazers_count}
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}

/* ─── GitHub API integration ─── */
const GITHUB_USER = 'GabrielContesini'
const SKIP = new Set(['CodeTrail-CommandCenter', 'PDFks', 'portifolio-torres', 'portifolio-torres-engenheiro-de-dados'])

async function fetchRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    )
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data
      .filter(r => !r.fork && !SKIP.has(r.name) && r.name !== 'fluxoforte')
      .slice(0, 12)
  } catch {
    return STATIC_REPOS
  }
}

/* ─── Main Section ─── */
export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data)
      setLoading(false)
    })
  }, [])

  return (
    <section id="projetos" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Projetos
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
            marginBottom: '3.5rem',
          }}
        >
          O QUE JÁ{' '}
          <span style={{ color: 'var(--accent)' }}>CONSTRUÍ</span>
        </motion.h2>

        {/* Featured carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FeaturedCarousel visible={inView} />
        </motion.div>

        {/* GitHub repos grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              Outros Repositórios GitHub
              <span style={{ color: 'var(--accent)', marginLeft: '0.5rem' }}>
                {loading ? '⟳' : `(${repos.length})`}
              </span>
            </span>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2px',
                transition: 'color 200ms, border-color 200ms',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              Ver todos no GitHub ↗
            </a>
          </div>

          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  height: '140px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  opacity: 0.5,
                }} />
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
            }}>
              {repos.map((repo, i) => (
                <RepoCard key={repo.id || repo.name} repo={repo} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
