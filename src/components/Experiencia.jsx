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

      {/* --- CRUZ VERMELHA (ATUAL) --- */}
      <div className="experiencia-item">
        <h3>
          {language === "pt"
            ? "Analista de Infraestrutura e Segurança (Voluntário)"
            : "IT Infrastructure & Security Analyst (Volunteer)"}
          <span className="periodo"> Mar 2026 – {language === "pt" ? "Presente" : "Present"}</span>
        </h3>

        <p>
          <em>
            {language === "pt"
              ? "Cruz Vermelha Brasileira - Rio de Janeiro"
              : "Brazilian Red Cross - Rio de Janeiro"}
          </em>
        </p>

        <p className="tecnologias">
          {language === "pt"
            ? "Tecnologias: Redes (L2/L3), Segurança de Ativos, IAM (Gestão de Acessos), CFTV IP, Hardware Troubleshooting."
            : "Technologies: Networking (L2/L3), Asset Security, IAM (Identity & Access Management), IP CCTV, Hardware Troubleshooting."}
        </p>

        <ul className="experiencia-lista">
          <li>
            {language === "pt"
              ? "Auditoria técnica e diagnóstico completo do parque tecnológico, otimizando o inventário e o ciclo de vida dos equipamentos."
              : "Conducted technical auditing and complete diagnostics of the hardware park, optimizing inventory and equipment lifecycle."}
          </li>
          <li>
            {language === "pt"
              ? "Implementação de protocolos de descarte seguro de dados e controle rigoroso de ativos de armazenamento (HDDs)."
              : "Implemented secure data decommissioning protocols and rigorous control of storage assets (HDDs)."}
          </li>
          <li>
            {language === "pt"
              ? "Manutenção de conectividade crítica e expansão da infraestrutura de rede para novos setores administrativos."
              : "Managed critical connectivity maintenance and expanded network infrastructure for new administrative departments."}
          </li>
          <li>
            {language === "pt"
              ? "Reestruturação do sistema de monitoramento remoto e segurança eletrônica, com foco em gestão de identidades (IAM)."
              : "Restructured remote monitoring and electronic security systems, focusing on Identity and Access Management (IAM)."}
          </li>
        </ul>

        <p className="destaque">
          {language === "pt"
            ? "Resultado: Modernização da infraestrutura de TI e mitigação de riscos de vazamento de dados na instituição."
            : "Outcome: Modernized IT infrastructure and mitigated data breach risks across the institution."}
        </p>
      </div>
      <br></br>

      <hr className="divider" /> {/* Opcional: uma linha para separar as experiências */}

      <br></br>

      {/* --- ESTÁGIO AUSTRÁLIA --- */}
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
        
        <p className="destaque">
          {language === "pt"
            ? "Resultado: Preparação e demonstração do robô no Questacon Science Museum (Austrália), destacando a inovação na interação humano-robô."
            : "Outcome: Prepared and demonstrated the robot at the Questacon Science Museum (Australia), showcasing innovation in human-robot interaction."}
        </p>
      </div>
    </motion.section>
  );
}