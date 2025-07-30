import { motion } from "framer-motion";

export default function Experiencia({ language }) {
  return (
    <motion.section
      className="secao experiencia"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{language === "pt" ? "Experiência" : "Experience"}</h2>
      <div className="experiencia-item">
        <h3>
          {language === "pt" 
            ? "Estagiário de Desenvolvimento de IA e Robótica" 
            : "AI and Robotics Development Intern"}
          <span className="periodo"> Jul 2024 – Nov 2024</span>
        </h3>
        <p>
          <em>
            {language === "pt" 
              ? "“A Series of Beta Tests” – Robot De Niro (Capstone Project, University of Canberra)" 
              : "“A Series of Beta Tests” – Robot De Niro (Capstone Project, University of Canberra)"}
          </em>
        </p>
        <p>
          {language === "pt" 
            ? "Desenvolvimento de uma plataforma interativa com IA generativa para um robô teatral, integrando tecnologias avançadas e interfaces inovadoras."
            : "Development of an interactive generative AI platform for a theatrical robot, integrating advanced technologies and innovative interfaces."}
        </p>
      </div>
    </motion.section>
  );
}
