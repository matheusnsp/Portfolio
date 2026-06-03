import { motion } from "framer-motion";

export default function CertificacoesNovo({ certs, language }) {
  const nome = (c) => typeof c.nome === "object" ? c.nome[language] : c.nome;
  return (
    <section className="nv-section" id="nv-certificacoes">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "aprendizado contínuo" : "continuous learning"}</p>
        <h2 className="nv-h2"><span className="nv-accent">{language === "pt" ? "Certificações" : "Certifications"}</span>.</h2>
      </div></div>
      <div className="nv-certgrid">
        {certs.map((c, i) => (
          <motion.div className="nv-cert" key={i}
            initial={{ opacity: 0, y: 40, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <div className="nv-certtop">
              <div className="nv-issuer-ic" style={{ background: c.cor }}>{c.sigla}</div>
              <span className="nv-ano">{c.ano}</span>
            </div>
            <h3>{nome(c)}</h3>
            <div className="nv-iss">{c.issuer} · {c.area[language]}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
