import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./index.css";
import Inicio from "./components/Inicio";
import Header from "./components/Header";
import Projetos from "./components/Projetos";
import Experiencia from "./components/Experiencia";
import Certificacoes from "./components/Certificacoes";
import Skills from "./components/Skills";
import Contato from "./components/Contato";
import Sobre from "./components/Sobre";
import Linguagens from "./components/Linguagens";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : true;
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const [language, setLanguage] = useState("pt");
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 1440);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transitionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end start"],
  });

  const imgSizeMotion = useTransform(scrollYProgress, [0, 1], [500, 350]);
  const imgXMotion = useTransform(scrollYProgress, [0, 0.5], [550, 750]);
  const textOpacityMotion = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const sobreOpacityMotion = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  const imgSize = isWideScreen ? imgSizeMotion : 300;
  const imgX = isWideScreen ? imgXMotion : 0;
  const textOpacity = isWideScreen ? textOpacityMotion : 1;
  const sobreOpacity = isWideScreen ? sobreOpacityMotion : 1;

  const projetosComTema = [
    {
      titulo:
        language === "pt"
          ? "Infraestrutura Segura com Windows & Linux"
          : "Secure Infrastructure with Windows & Linux",
      descricao:
        language === "pt"
          ? "Projeto acadêmico que envolveu a criação de uma rede segura com VLANs, ACLs, NAT, testes entre sistemas Windows e Linux, e firewall configurado em roteador Cisco. Documentado em relatório técnico."
          : "Academic project involving the creation of a secure network with VLANs, ACLs, NAT, testing between Windows and Linux systems, and firewall configured on Cisco router. Documented in a technical report.",
          imagem: `${import.meta.env.BASE_URL}UC_logo.png`,
          link: `${import.meta.env.BASE_URL}A3_Report.pdf`,
      linguagens: ["Windows Server", "Ubuntu Linux", "Cisco CLI", "Firewall ACL", "NAT", "VLAN"],
    },
    {
      titulo:
        language === "pt"
          ? "INV Botafogo - Página da Igreja"
          : "INV Botafogo - Church Website",
      descricao:
        language === "pt"
          ? "Desenvolvi o site oficial da Igreja INV Botafogo com o objetivo de centralizar informações institucionais e facilitar o acesso de novos visitantes à igreja. A página foi construída com HTML, CSS e JavaScript puro, com design responsivo e integração com redes sociais e ferramentas de localização."
          : "Developed the official website of INV Botafogo Church to centralize institutional information and facilitate new visitors' access. The page was built with pure HTML, CSS, and JavaScript, featuring responsive design and integration with social media and location tools.",
      imagem: darkMode
      ?`${import.meta.env.BASE_URL}logo_invbB.png`
      :`${import.meta.env.BASE_URL}logo_invbL.png`,
      link: "https://invbotafogo.com.br",
      linguagens: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    },
    {
      titulo:
        language === "pt"
          ? "Portfólio Pessoal"
          : "Personal Portfolio",
      descricao:
        language === "pt"
          ? "Este site foi criado para apresentar minha trajetória profissional, projetos, certificações e habilidades de forma interativa e moderna. Utilizei React, Framer Motion para animações suaves, e adaptei todo o layout para funcionar em modo claro/escuro. O site também é responsivo e otimizado para diferentes dispositivos."
          : "This website was created to showcase my professional journey, projects, certifications, and skills in an interactive and modern way. I used React, Framer Motion for smooth animations, and adapted the entire layout for light/dark mode. The site is also responsive and optimized for various devices.",
          imagem: darkMode 
          ? `${import.meta.env.BASE_URL}portfolioB.png` 
          : `${import.meta.env.BASE_URL}portfolioL.png`,
        
      link: "https://github.com/matheusnsp/Portfolio",
      linguagens: ["React", "Framer Motion", "CSS", "HTML", "JavaScript"],
    },
  ];

  const certificacoes = [
    {
      nome: language === "pt" 
        ? "Curso de Oratória e Comunicação (Clube da Fala)"
        : "Public Speaking and Communication Course (Clube da Fala)",
      ano: 2025,
    },
    {
      nome: language === "pt" 
        ? "SC-900 (Microsoft)" 
        : "SC-900 (Microsoft)",
      ano: 2025,
    },
    {
      nome:
        language === "pt"
          ? "SAP BTP + S/4HANA (Lab2Learn)"
          : "SAP BTP + S/4HANA (Lab2Learn)",
      ano: 2025,
    },
    {
      nome:
        language === "pt"
          ? "Introduction to Mobile Development (Meta)"
          : "Introduction to Mobile Development (Meta)",
      ano: 2023,
    },
    
  ];

  const linguasFaladas = [
    {
      nomePt: "Português",
      nomeEn: "Portuguese",
      nivelPt: "Nativo",
      nivelEn: "Native",
      bandeira: "https://flagcdn.com/w40/br.png",
    },
    {
      nomePt: "Inglês",
      nomeEn: "English",
      nivelPt: "Fluente",
      nivelEn: "Fluent",
      bandeira: "https://flagcdn.com/w40/gb.png",
    },
    
  ];

  const skills = [
    {
      titulo:
        language === "pt"
          ? "Linguagens de Programação"
          : "Programming Languages",
      itens: [
        {
          name: "Python",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "Java",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "JavaScript",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "HTML",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
      ],
    },
    {
      titulo:
        language === "pt" ? "Frameworks e Bibliotecas" : "Frameworks and Libraries",
      itens: [
        {
          name: "React",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Node.js",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "ASP.NET",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
        },
      ],
    },
    {
      titulo: language === "pt" ? "DevOps e Ferramentas" : "DevOps and Tools",
      itens: [
        {
          name: "Git",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "Linux",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        },
        {
          name: "VS Code",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Docker",
          img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
      ],
    },
  ];

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
      />


      {isWideScreen ? (
        <div ref={transitionRef} style={{ height: "220vh", position: "relative" }}>
          <Inicio
            imgSize={imgSize}
            imgX={imgX}
            textOpacity={textOpacity}
            sobreOpacity={sobreOpacity}
            language={language}
          />
        </div>
      ) : (
        <div ref={transitionRef}>
          <Inicio
            imgSize={imgSize}
            imgX={imgX}
            textOpacity={textOpacity}
            sobreOpacity={sobreOpacity}
            language={language}
          />
        </div>
      )}

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Sobre language={language} />

        <section id="projetos">
          <Projetos projetos={projetosComTema} language={language} />
        </section>

        <section id="experiencia">
          <Experiencia language={language} />
        </section>

        <section id="certificacoes">
          <Certificacoes certificacoes={certificacoes} language={language} />
        </section>

        <section id="skills">
          <Skills skills={skills} language={language} />
        </section>

        <Linguagens idioma={language} linguas={linguasFaladas} />

        <section id="contato">
          <Contato language={language} />
        </section>
      </motion.div>
    </div>
  );
}
