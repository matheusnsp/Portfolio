import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Inicio({ imgSize, imgX, textOpacity, sobreOpacity, language }) {
  return (
    <motion.section
      className="inicio-section"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      <motion.div className="inicio-left">
        <motion.div
          className="texto-inicial"
          style={{ opacity: textOpacity }}
        >
          <h1>
            {language === "pt"
              ? "Olá, eu sou Matheus Neves"
              : "Hello, I'm Matheus Neves"}
          </h1>
          <p>
            <Typewriter
              words={
                language === "pt"
                  ? ["Desenvolvedor de Software", "Entusiasta de Cibersegurança"]
                  : ["Software Developer", "Cybersecurity Enthusiast"]
              }
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </p>
        </motion.div>

        <motion.div
  className="secao sobre sobre-b1"
  id="sobre"
  style={{ opacity: sobreOpacity }}
>
  <h2>{language === "pt" ? "Sobre mim" : "About Me"}</h2>
  {language === "pt" ? (
    <>
      <p>
        Sou Matheus Neves, desenvolvedor de software com foco em aplicações modernas e seguras. 
        Tenho 21 anos, sou formado em Engenharia de Software com ênfase em Cibersegurança, 
        e sou apaixonado por tecnologia, aprendizado contínuo e desafios criativos.
      </p>
      <br />
      <p>
        Minha experiência envolve análise de tráfego de rede, segurança da informação e desenvolvimento de sistemas, 
        além de projetos que integram IA generativa, sistemas distribuídos e aplicações web responsivas. 
        Trabalho bem em equipe ágil (Scrum), versionamento com GitHub e priorizo soluções escaláveis.
      </p>
      <br />
      <p>
        Busco contribuir com soluções inovadoras que unam tecnologia, segurança e criatividade, 
        comunicando-me com eficácia em português e inglês, após 4 anos de residência na Austrália.
      </p>
    </>
  ) : (
    <>
      <p>
        I'm Matheus Neves, a software developer focused on modern and secure applications. 
        I'm 21 years old, graduated in Software Engineering with a major in Cybersecurity, 
        and passionate about technology, continuous learning, and creative challenges.
      </p>
      <br />
      <p>
        My experience includes network traffic analysis, information security, and system development, 
        as well as projects involving generative AI, distributed systems, and responsive web applications. 
        I thrive in agile teamwork (Scrum), code versioning with GitHub, and building scalable solutions.
      </p>
      <br />
      <p>
        My goal is to contribute to innovative solutions that combine technology, security, and creativity, 
        with strong communication in both Portuguese and English after 4 years of living in Australia.
      </p>
    </>
  )}
</motion.div>

      </motion.div>

      <motion.div className="inicio-right" style={{ x: imgX }}>
      <motion.img
        src={`${import.meta.env.BASE_URL}foto.jpg`}
        alt="Matheus Neves"
        className="inicio-img"
        style={{ width: imgSize, height: imgSize }}
      />
    </motion.div>
    </motion.section>
  );
}