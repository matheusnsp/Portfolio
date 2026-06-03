import { motion } from "framer-motion";

const SVG = {
  mail: <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" />,
  linkedin: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 17V10.2H6.1V17zM7.22 9.06a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zM18 17v-3.73c0-2-1.07-2.93-2.5-2.93a2.16 2.16 0 0 0-1.95 1.07V10.2h-2.24V17h2.24v-3.6c0-.95.18-1.87 1.35-1.87s1.16 1.09 1.16 1.93V17z" />,
  github: <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10 10 0 0 0 12 2z" />,
};

export default function ContatoNovo({ contatos, language }) {
  return (
    <section className="nv-section" id="nv-contato">
      <motion.div className="nv-contato-cta"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="nv-eyebrow" style={{ textAlign: "center" }}>{language === "pt" ? "vamos conversar" : "let's talk"}</p>
        <h2 className="nv-h2">{language === "pt" ? "Bora construir algo " : "Let's build something "}<span className="nv-accent">{language === "pt" ? "juntos" : "together"}</span>?</h2>
        <p>{language === "pt" ? "Estou aberto a oportunidades em desenvolvimento, cibersegurança e IA." : "I'm open to opportunities in development, cybersecurity and AI."}</p>
      </motion.div>
      <div className="nv-contatos">
        {contatos.map((c, i) => (
          <motion.a className="nv-contact" key={i} href={c.href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
            <div className="nv-ic"><svg viewBox="0 0 24 24">{SVG[c.ic]}</svg></div>
            <div className="nv-meta">
              <span className="nv-k">{typeof c.k === "object" ? c.k[language] : c.k}</span>
              <span className="nv-v">{c.v}</span>
            </div>
            <span className="nv-arrow">↗</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
