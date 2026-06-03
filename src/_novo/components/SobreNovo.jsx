import { motion } from "framer-motion";

export default function SobreNovo({ language }) {
  const idade = (() => {
    const hoje = new Date(), nasc = new Date("2004-02-09");
    let i = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) i--;
    return i;
  })();

  const paras = language === "pt" ? [
    <>Sou Matheus Neves, engenheiro de software com foco em infraestrutura e segurança cibernética. Tenho <strong>{idade} anos</strong>, sou formado pela <strong>University of Canberra, na Austrália</strong>, e busco resolver desafios técnicos complexos com soluções resilientes e escaláveis.</>,
    <>Atualmente faço a <strong>gestão de infraestrutura de TI e segurança da informação na Cruz Vermelha Brasileira</strong>, atuando em análise de tráfego de rede, administração de ativos e protocolos de acesso (IAM). Também desenvolvo aplicações full-stack com foco em proteção de dados.</>,
    <>Trabalho bem em equipes ágeis (Scrum), domino versionamento com GitHub e priorizo eficiência operacional. Comunico-me com fluência em português e inglês, após 4 anos de residência na Austrália.</>
  ] : [
    <>I'm Matheus Neves, a software engineer focused on infrastructure and cybersecurity. I'm <strong>{idade} years old</strong>, a graduate of the <strong>University of Canberra, Australia</strong>, driven by solving complex technical challenges through resilient, scalable solutions.</>,
    <>I currently <strong>manage IT infrastructure and information security at the Brazilian Red Cross</strong>, handling network traffic analysis, asset management and Identity & Access Management (IAM). I also build full-stack applications focused on data protection.</>,
    <>I thrive in agile teams (Scrum), am proficient with GitHub version control, and prioritize operational efficiency. I'm fully bilingual in Portuguese and English, after 4 years living in Australia.</>
  ];

  return (
    <section className="nv-section" id="nv-sobre">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "quem eu sou" : "who i am"}</p>
        <h2 className="nv-h2"><span className="nv-accent">{language === "pt" ? "Sobre" : "About"}</span> {language === "pt" ? "mim" : "me"}.</h2>
      </div></div>
      <div className="nv-sobre-grid">
        {paras.map((p, i) => (
          <motion.p className="nv-sobre-p" key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.12 }}>
            {p}
          </motion.p>
        ))}
      </div>
    </section>
  );
}