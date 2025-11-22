import { motion } from "framer-motion";

export default function Skills({ skills }) {
  return (
    <motion.section
      className="secao"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Skills</h2>

      {skills.map((bloco, blocoIdx) => (
        <div className="skills-bloco" key={bloco.titulo}>
          <h3>{bloco.titulo}</h3>
          <div className="skills-grid">
            {bloco.itens.map((skill, idx) => (
              <motion.div
                className="skill-item"
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1}}
              >
                <img src={skill.img} alt={skill.name} title={skill.name} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.section>
  );
}
