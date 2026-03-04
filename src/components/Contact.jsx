import { motion } from "framer-motion";
import {
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { profileData } from "../data/portfolioData";

const channels = [
  {
    label: "Email",
    value: profileData.email,
    href: `mailto:${profileData.email}`,
    icon: FiMail,
  },
  {
    label: "LinkedIn",
    value: "Perfil profissional",
    href: profileData.linkedin,
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "Repositorios e codigos",
    href: profileData.github,
    icon: FiGithub,
  },
  {
    label: "Telefone",
    value: profileData.phone,
    href: `tel:${profileData.whatsappNumber}`,
    icon: FiPhone,
  },
  {
    label: "CV - Gabriel Contesini",
    value: "Curriculo atualizado",
    href: profileData.resumeUrl,
    icon: FiDownload,
  },
];

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="contact" className="section-pad">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65 }}
          className="section-heading"
        >
          <p className="eyebrow">Technical Contact</p>
          <h2>Conversa tecnica e oportunidades</h2>
          <p>
            Para vagas e projetos, o canal principal e WhatsApp. Tambem deixei
            email, LinkedIn, GitHub e profile em PDF para avaliacao completa.
          </p>
        </motion.div>

        <div className="contact-grid">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const isExternal = channel.href.startsWith("http");

            return (
              <motion.a
                key={channel.label}
                className="contact-card"
                href={channel.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: index * 0.08, duration: 0.48 }}
              >
                <div>
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{channel.label}</h3>
                  <p>{channel.value}</p>
                </div>
                <FiExternalLink size={15} />
              </motion.a>
            );
          })}
        </div>

        <motion.article
          className="contact-cta"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.45, duration: 0.55 }}
        >
          <div>
            <h3>Conversa tecnica no WhatsApp</h3>
            <p>
              Clique para abrir o WhatsApp com mensagem pronta e seguir para
              alinhamento tecnico da vaga ou projeto.
            </p>
          </div>
          <a href={profileData.whatsappUrl} target="_blank" rel="noreferrer">
            Falar agora no WhatsApp
          </a>
        </motion.article>
      </div>
    </section>
  );
};

export default Contact;
