import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMenu,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import { profileData } from "../data/portfolioData";

const links = [
  { label: "Resumo", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Conhecimentos", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="nav-shell">
      <nav className="container nav-inner">
        <a href="#top" className="brand" onClick={closeMenu}>
          <span className="brand-badge">GC</span>
          <div className="brand-copy">
            <strong>{profileData.name}</strong>
            <span>{profileData.role}</span>
          </div>
        </a>

        <div className="nav-desktop-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href={profileData.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href={profileData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href={profileData.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <FiMessageCircle size={18} />
          </a>
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Baixar curriculo"
            className="resume-chip"
          >
            <FiDownload size={15} />
            CV
          </a>
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
      </nav>

      {open && (
        <motion.div
          className="mobile-panel"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container mobile-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href={profileData.whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              Conversa tecnica no WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navigation;
