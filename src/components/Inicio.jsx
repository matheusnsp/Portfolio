import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Inicio({ imgSize, imgX, textOpacity, sobreOpacity, language }) {
  return (
    <motion.section
      className="hero-section"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      <motion.div className="hero-left">
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

        {/* Texto sobre - permanece ao lado em >=1440px, desce em telas menores */}
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
                Gosto de transformar ideias em soluções funcionais, com atenção à experiência do usuário, performance e código limpo.
                Meu foco atual é o desenvolvimento full stack e a integração de IA com aplicações humanas.
              </p>
            </>
          ) : (
            <>
              <p>
                I'm Matheus Neves, a software developer focused on modern and secure applications. 
                I'm 21 years old, graduated in Software Engineering with a focus on Cybersecurity, 
                and passionate about technology, continuous learning, and creative challenges.
              </p>
              <br />
              <p>
                I enjoy turning ideas into functional solutions, with attention to user experience, performance, and clean code.
                My current focus is full stack development and integrating AI into human-centered applications.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

      <motion.div className="hero-right" style={{ x: imgX }}>
      <motion.img
        src="/foto.jpg"
        alt="Matheus Neves"
        className="hero-img"
        style={{ width: imgSize, height: imgSize }}
      />
    </motion.div>
    </motion.section>
  );
}