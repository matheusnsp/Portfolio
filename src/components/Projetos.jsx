import { motion } from "framer-motion";

export default function Projetos({ projetos, language }) {
  return (
    <motion.section
      className="secao"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{language === "pt" ? "Projetos" : "Projects"}</h2>

      <div className="projetos">
        {projetos.map((proj, i) => (
          <motion.div
            key={i}
            className="card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={proj.imagem} alt={proj.titulo} />

            <div className="card-body">
              <h3>{proj.titulo}</h3>
              <p>{proj.descricao}</p>

              {proj.linguagens && (
                <div className="linguagens">
                  {proj.linguagens.map((lang, index) => (
                    <span key={index} className="linguagem-tag">
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              <a href={proj.link} target="_blank" rel="noreferrer">
                {language === "pt" ? "Ver mais" : "See more"}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
