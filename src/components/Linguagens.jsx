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
          <li key={i} className="item-lingua">
            <img src={l.bandeira} alt={idioma === "pt" ? l.nomePt : l.nomeEn} />
            <span>
              {idioma === "pt" ? l.nomePt : l.nomeEn} –{" "}
              {idioma === "pt" ? l.nivelPt : l.nivelEn}
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}