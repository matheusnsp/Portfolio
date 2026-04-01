import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Inicio({ imgSize, imgX, textOpacity, sobreOpacity, language }) {

  // Função para calcular a idade dinamicamente
  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta se ainda não fez aniversário no ano corrente
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const idade = calcularIdade("2004-02-09");

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
      Sou Matheus Neves, engenheiro de software com foco em infraestrutura e segurança cibernética. 
      Tenho <strong>{idade} anos</strong>, sou formado pela <strong>University of Canberra, na Austrália</strong>, 
      e busco resolver desafios técnicos complexos através de soluções resilientes e escaláveis.
    </p>
    <br />
    <p>
      Minha experiência atual envolve a <strong>gestão de infraestrutura de TI e segurança da informação na Cruz Vermelha Brasileira</strong>, 
      atuando na análise de tráfego de rede, administração de ativos e implementação de protocolos de acesso (IAM). 
      Além disso, desenvolvo aplicações full-stack com foco em proteção de dados e sistemas distribuídos.
    </p>
    <br />
    <p>
      Trabalho bem em equipes ágeis (Scrum), domino versionamento com GitHub e priorizo a eficiência operacional. 
      Comunico-me com fluência em português e inglês, após 4 anos de residência na Austrália.
    </p>
  </>
) : (
  <>
    <p>
      I am Matheus Neves, a Software Engineer focused on infrastructure and cybersecurity. 
      I am <strong>{idade} years old</strong> and a graduate of the <strong>University of Canberra, Australia</strong>, 
      driven by solving complex technical challenges through resilient and scalable solutions.
    </p>
    <br />
    <p>
      My current role involves <strong>managing IT infrastructure and information security at the Brazilian Red Cross</strong>, 
      where I handle network traffic analysis, asset management, and Identity and Access Management (IAM) protocols. 
      I also develop full-stack applications with a strong emphasis on data protection and distributed systems.
    </p>
    <br />
    <p>
      I thrive in agile environments (Scrum), am proficient in version control with GitHub, and prioritize operational efficiency. 
      I am fully bilingual in Portuguese and English, following 4 years of living and studying in Australia.
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