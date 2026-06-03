import { motion } from "framer-motion";

export default function IdiomasNovo({ idiomas, language }) {
  return (
    <section className="nv-section" id="nv-idiomas">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "comunicação" : "communication"}</p>
        <h2 className="nv-h2"><span className="nv-accent">{language === "pt" ? "Idiomas" : "Languages"}</span>.</h2>
      </div></div>
      <div className="nv-idiomas">
        {idiomas.map((l, i) => (
          <motion.div className="nv-idioma" key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <img src={l.bandeira} alt={language === "pt" ? l.nomePt : l.nomeEn} />
            <div className="nv-idioma-meta">
              <span className="nv-idioma-nome">{language === "pt" ? l.nomePt : l.nomeEn}</span>
              <span className="nv-idioma-nivel">{language === "pt" ? l.nivelPt : l.nivelEn}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}