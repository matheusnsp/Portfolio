import { useRef } from "react";
import { motion } from "framer-motion";

function Card({ proj, language, darkMode, index, base }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = "perspective(900px) rotateX(" + ((py-0.5)*-16) + "deg) rotateY(" + ((px-0.5)*16) + "deg)";
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const src = base + proj.img[darkMode ? "dark" : "light"];

  return (
    <motion.div className="nv-cardwrap"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: (index % 2) * 0.12 }}>
      <div className="nv-card" ref={ref} onMouseMove={move} onMouseLeave={leave}>
        <div className="nv-thumb">
          <img src={src} alt={proj.titulo[language]} />
          <div className="nv-overlay"><div className="nv-stack">
            {proj.stack.map((s, i) => <span key={i} className="nv-tag">{s}</span>)}
          </div></div>
        </div>
        <div className="nv-body">
          <h3>{proj.titulo[language]}</h3>
          <p>{proj.descricao[language]}</p>
          <a className="nv-link" href={proj.link} target="_blank" rel="noreferrer">
            ↗ {proj.linkLabel[language]}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjetosNovo({ projetos, language, darkMode, base = "" }) {
  return (
    <section className="nv-section" id="nv-projetos">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "projetos selecionados" : "selected projects"}</p>
        <h2 className="nv-h2">{language === "pt" ? "Projetos que eu " : "Projects I "}<span className="nv-accent">{language === "pt" ? "construí" : "built"}</span>.</h2>
      </div></div>
      <div className="nv-grid">
        {projetos.map((p, i) => <Card key={i} proj={p} language={language} darkMode={darkMode} index={i} base={base} />)}
      </div>
    </section>
  );
}
