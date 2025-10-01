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
            : "AI & Robotics Development Intern"}
          <span className="periodo"> Jul 2024 – Nov 2024</span>
        </h3>

        <p>
          <em>
            {language === "pt"
              ? "Projeto “A Series of Beta Tests” – Robot De Niro (University of Canberra)"
              : "Project “A Series of Beta Tests” – Robot De Niro (University of Canberra)"}
          </em>
        </p>
        
        {/* NOVO: Tecnologias utilizadas */}
        <p className="tecnologias">
          {language === "pt"
            ? "Tecnologias: Python 3.12, GPT-4 (OpenAI API), Whisper (ASR), Eleven Labs (TTS), React Native, VTube Studio."
            : "Technologies: Python 3.12, GPT-4 (OpenAI API), Whisper (ASR), Eleven Labs (TTS), React Native, VTube Studio."}
        </p>

        <ul className="experiencia-lista">
          <li>
            {language === "pt"
              ? "Desenvolvimento de uma plataforma interativa com IA generativa para um robô teatral, focada em improvisação."
              : "Developed an interactive generative AI platform for a theatrical robot, focusing on improvisation capabilities."}
          </li>
          <li>
            {language === "pt"
              ? "Implementação de pipeline de improvisação em tempo real, reduzindo a latência de 7,5s para 4,2s (percebida em 1,3s)."
              : "Implemented a real-time improvisation pipeline, optimizing latency from 7.5s to 4.2s (perceived at 1.3s)."}
          </li>
          <li>
            {language === "pt"
              ? "Integração das APIs de reconhecimento de fala (Whisper) e síntese de voz (Eleven Labs) para respostas dinâmicas."
              : "Integrated Speech Recognition (Whisper) and Text-to-Speech (Eleven Labs) APIs for dynamic, improvised responses."}
          </li>
          <li>
            {language === "pt"
              ? "Criação de avatar digital (VTuber) e desenvolvimento de módulos para UI/UX e integração com aplicativo Android."
              : "Developed a digital avatar (VTuber) and created UI/UX modules, integrating with an Android application."}
          </li>
        </ul>
        
        {/* NOVO: Resultado/Destaque */}
        <p className="destaque">
          {language === "pt"
            ? "Resultado: Preparação e demonstração do robô no Questacon Science Museum (Austrália), destacando a inovação na interação humano-robô."
            : "Outcome: Prepared and demonstrated the robot at the Questacon Science Museum (Australia), showcasing innovation in human-robot interaction."}
        </p>

      </div>
    </motion.section>
  );
}