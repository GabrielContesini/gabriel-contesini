import React, { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 1.25rem clamp(1.5rem, 5vw, 4rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 400ms ease, border-color 400ms ease;
        }
        .navbar.scrolled {
          background: rgba(8, 8, 8, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--text);
          letter-spacing: 0.05em;
        }
        .nav-logo span {
          color: var(--accent);
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        .nav-links a {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width var(--transition-base);
        }
        .nav-links a:hover {
          color: var(--accent);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .nav-cta {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(0,255,163,0.3);
          padding: 0.5rem 1.25rem;
          border-radius: 3px;
          transition: var(--transition-base);
        }
        .nav-cta:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-dim);
        }
        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        .nav-burger span {
          display: block;
          height: 1px;
          background: var(--text);
          transition: all 300ms ease;
        }
        .nav-burger span:first-child { width: 24px; }
        .nav-burger span:nth-child(2) { width: 16px; }
        .nav-burger span:last-child { width: 20px; }
        .nav-burger.open span:first-child {
          transform: translateY(6px) rotate(45deg); width: 24px;
        }
        .nav-burger.open span:nth-child(2) {
          opacity: 0; width: 0;
        }
        .nav-burger.open span:last-child {
          transform: translateY(-6px) rotate(-45deg); width: 24px;
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(8,8,8,0.97);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 400ms var(--ease-smooth);
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu a {
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--text);
          letter-spacing: 0.05em;
          transition: color 200ms;
        }
        .mobile-menu a:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>

      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          GC<span>.</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <button
          className={`nav-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
