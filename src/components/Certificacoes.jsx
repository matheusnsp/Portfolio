import { motion } from "framer-motion";

export default function Certificacoes({ certificacoes, language }) {
  return (
    <motion.section
      className="secao certificacoes"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{language === "pt" ? "Certificações" : "Certifications"}</h2>
      <ul>
        {certificacoes.map((c, i) => (
          <li key={i}>
            {c.nome} – {c.ano}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
