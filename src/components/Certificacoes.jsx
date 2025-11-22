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

      <ul className="lista-certificacoes">
        {certificacoes.map((c, i) => (
          <motion.li
            key={i}
            className="item-certificacao"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            {c.nome} – {c.ano}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
