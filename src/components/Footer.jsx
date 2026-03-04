import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";
import { profileData } from "../data/portfolioData";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="container footer-inner">
        <div>
          <h3>{profileData.fullName}</h3>
          <p>
            Systems Developer (Mid) com foco em Engenharia de Dados, pipelines,
            integracoes e observabilidade.
          </p>
        </div>

        <div className="footer-links">
          <a href="#top">Inicio</a>
          <a href="#about">Resumo profissional</a>
          <a href="#projects">Repositorios</a>
          <a href="#skills">Conhecimentos</a>
          <a href="#contact">Contato</a>
        </div>

        <div className="footer-social">
          <a href={profileData.github} target="_blank" rel="noreferrer">
            <FiGithub size={18} />
          </a>
          <a href={profileData.linkedin} target="_blank" rel="noreferrer">
            <FiLinkedin size={18} />
          </a>
          <a href={profileData.whatsappUrl} target="_blank" rel="noreferrer">
            <FiMessageCircle size={18} />
          </a>
          <a href={`mailto:${profileData.email}`}>
            <FiMail size={18} />
          </a>
          <a href={profileData.resumeUrl} target="_blank" rel="noreferrer">
            <FiDownload size={18} />
          </a>
        </div>
      </div>
      <p className="footer-note">{year} | Portfolio React + Framer Motion | Dados atualizados via GitHub API</p>
    </footer>
  );
};

export default Footer;
