import { motion } from "framer-motion";

export default function Sobre({ language }) {
  return (
    <motion.section
      className="secao sobre-b2"
      id="sobre2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{language === "pt" ? "Sobre mim" : "About Me"}</h2>
      <p>
        {language === "pt" ? (
          <>
            Sou Matheus Neves, desenvolvedor de software com foco em aplicações modernas e seguras.
            Tenho 21 anos, sou formado em Engenharia de Software com ênfase em Cibersegurança,
            e sou apaixonado por tecnologia, aprendizado contínuo e desafios criativos.
          </>
        ) : (
          <>
            I'm Matheus Neves, a software developer focused on modern and secure applications. 
            I'm 21 years old, graduated in Software Engineering with a focus on Cybersecurity, 
            and passionate about technology, continuous learning, and creative challenges.
          </>
        )}
      </p>
      <br />
      <p>
        {language === "pt" ? (
          <>
            Gosto de transformar ideias em soluções funcionais, com atenção à experiência do usuário, performance e código limpo.
            Meu foco atual é o desenvolvimento full stack e a integração de IA com aplicações humanas.
          </>
        ) : (
          <>
            I enjoy turning ideas into functional solutions, with attention to user experience, performance, and clean code.
            My current focus is full stack development and integrating AI into human-centered applications.
          </>
        )}
      </p>
    </motion.section>
  );
}
