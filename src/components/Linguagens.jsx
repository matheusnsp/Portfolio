import { motion } from "framer-motion";

export default function Linguagens({ idioma, linguas }) {
  return (
    <motion.section
      className="secao"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{idioma === "pt" ? "Línguas" : "Languages"}</h2>

      <ul className="lista-linguas">
        {linguas.map((l, i) => (
          <motion.li
            key={i}
            className="item-lingua"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={l.bandeira}
              alt={idioma === "pt" ? l.nomePt : l.nomeEn}
            />
            <span>
              {idioma === "pt" ? l.nomePt : l.nomeEn} –{" "}
              {idioma === "pt" ? l.nivelPt : l.nivelEn}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
