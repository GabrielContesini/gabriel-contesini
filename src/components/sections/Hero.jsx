import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleField from '../ui/ParticleField'

const roles = [
  'Fullstack Developer',
  'Python & FastAPI',
  'React & Vue.js',
  'APIs & Integrações',
  'Automation Builder',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    setDisplayText(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Radial gradient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(0,255,163,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px' }}>

          {/* Pre-tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 12px var(--accent-glow)',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Disponível para oportunidades
            </span>
          </motion.div>

          {/* Main Heading — Bebas Neue large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}>
              GABRIEL
            </h1>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              WebkitTextStroke: '1px rgba(232,232,232,0.25)',
              color: 'transparent',
              marginBottom: '1.5rem',
            }}>
              CONTESINI
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
            }}>
              {`> `}
              <span style={{ color: 'var(--accent)' }}>{displayText}</span>
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                background: 'var(--accent)',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'pulse 1s infinite',
              }} />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              lineHeight: 1.7,
              marginBottom: '3rem',
            }}
          >
            4 anos construindo soluções que funcionam. Backend, APIs, automações
            e front quando necessário. São Paulo, SP.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#projetos" className="btn btn-primary">
              Ver projetos
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/gabriel-contesini-603588210/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>scroll</span>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, var(--muted), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>

      {/* Bottom border line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--border), transparent)',
      }} />
    </section>
  )
}
