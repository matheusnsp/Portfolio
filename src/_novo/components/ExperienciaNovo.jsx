import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExperienciaNovo({ experiencias, language }) {
  const tlRef = useRef(null);

  // mede o progresso do scroll dentro da timeline
  const { scrollYProgress } = useScroll({
    target: tlRef,
    offset: ["start 80%", "end 60%"],
  });
  const altura = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="nv-section" id="nv-experiencia">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "trajetória" : "journey"}</p>
        <h2 className="nv-h2"><span className="nv-accent">{language === "pt" ? "Experiência" : "Experience"}</span>.</h2>
      </div></div>

      <div className="nv-timeline" ref={tlRef}>
        {/* trilho cinza de fundo + linha verde que cresce */}
        <div className="nv-tl-track" />
        <motion.div className="nv-tl-fill" style={{ height: altura }} />

        {experiencias.map((e, i) => (
          <motion.div className="nv-exp" key={i}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <div className={"nv-dot" + (e.atual ? " nv-atual" : "")} />
            <div className="nv-expcard">
              <div className="nv-role">
                <h3>{e.cargo[language]}{e.atual && <span className="nv-badge">{language === "pt" ? "ATUAL" : "CURRENT"}</span>}</h3>
                <span className="nv-periodo">{e.periodo[language]}</span>
              </div>
              <div className="nv-org">{e.org[language]}</div>
              <div className="nv-techs">{e.techs.map((t, j) => <span key={j} className="nv-tech">{t}</span>)}</div>
              <ul className="nv-feitos">{e.feitos[language].map((f, j) => <li key={j}>{f}</li>)}</ul>
              <div className="nv-resultado"><strong>{language === "pt" ? "Resultado:" : "Outcome:"}</strong> {e.resultado[language]}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}