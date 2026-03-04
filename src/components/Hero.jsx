import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDownload,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRefreshCcw,
} from "react-icons/fi";
import { profileData, recruiterHighlights } from "../data/portfolioData";
import { formatCompactNumber, formatDate } from "../utils/formatters";

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.12,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = ({ profileStats, totals, lastSync }) => {
  const metrics = [
    {
      label: "Repositorios publicos",
      value: formatCompactNumber(profileStats?.publicRepos ?? totals?.trackedRepositories ?? 0),
    },
    {
      label: "Stars totais",
      value: formatCompactNumber(totals?.totalStars ?? 0),
    },
    {
      label: "Followers",
      value: formatCompactNumber(profileStats?.followers ?? 0),
    },
  ];
  const avatar = profileStats?.avatarUrl || profileData.avatarUrl;

  return (
    <section id="top" className="hero-section section-pad">
      <div className="container">
        <motion.div className="hero-layout" variants={container} initial="hidden" animate="visible">
          <motion.div className="hero-copy" variants={child}>
            <p className="eyebrow">{profileData.spotlightTag}</p>
            <h1>
              {profileData.name}
              <span>{profileData.role}</span>
            </h1>
            <p className="hero-headline">{profileData.headline}</p>
            <p className="lead">{profileData.summary}</p>

            <div className="hero-meta">
              <span>
                <FiMapPin size={14} /> {profileData.location}
              </span>
              <span>
                <FiMail size={14} /> {profileData.email}
              </span>
              <span>
                <FiPhone size={14} /> {profileData.phone}
              </span>
            </div>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                Ver repositorios <FiArrowRight size={15} />
              </a>
              <a href={profileData.resumeUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
                Baixar CV <FiDownload size={15} />
              </a>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>

            <p className="sync-note">
              <FiRefreshCcw size={13} />
              Ultima sincronizacao GitHub: {lastSync ? formatDate(lastSync) : "--"}
            </p>
          </motion.div>

          <motion.aside className="hero-visual" variants={child}>
            <div className="visual-card recruiter-card">
              <div className="profile-header compact-profile">
                <div>
                  <h3>{profileData.fullName}</h3>
                  <p>{profileData.company}</p>
                  <span>{profileData.address}</span>
                </div>
              </div>

              <div className="image-overlay-stage">
                <motion.div
                  className="photo-border"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="photo-inner">
                  <img src={avatar} alt={profileData.fullName} className="profile-image" />
                </div>
              </div>

              <p className="profile-mission">{profileData.mission}</p>

              <ul className="highlight-list">
                {recruiterHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
