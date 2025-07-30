import { motion } from "framer-motion";

export default function Projetos({ projetos, language }) {
  return (
    <motion.section
      className="secao"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      <h2>{language === "pt" ? "Projetos" : "Projects"}</h2>
      <div className="projetos">
        {projetos.map((proj, i) => (
          <motion.div
            key={i}
            className="card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <img src={proj.imagem} alt={proj.titulo} />
            <div className="card-body">
              <h3>{proj.titulo}</h3>
              <p>{proj.descricao}</p>

              {/* Mostra as linguagens */}
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
