import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Stat({ s, language }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [n, setN] = useState(0);
  const alvo = Number(s.alvo) || 0; // garante número, nunca undefined/NaN

  useEffect(() => {
    if (!inView) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz || alvo === 0) { setN(alvo); return; }
    let raf;
    const dur = 1100;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * alvo));
      if (p < 1) raf = requestAnimationFrame(step);
      else setN(alvo); // garante o valor final exato
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, alvo]);

  return (
    <motion.div className="nv-stat" ref={ref}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="nv-num">{n}{s.plus && <span className="nv-plus">+</span>}</div>
      <div className="nv-lbl">{s.lbl[language]}</div>
    </motion.div>
  );
}

export default function SkillsNovo({ skills, stats, language }) {
  return (
    <section className="nv-section" id="nv-skills">
      <div className="nv-head"><div>
        <p className="nv-eyebrow">{language === "pt" ? "o que eu domino" : "what i know"}</p>
        <h2 className="nv-h2">{language === "pt" ? "Minhas " : "My "}<span className="nv-accent">skills</span>.</h2>
      </div></div>
      <div className="nv-stats">{stats.map((s, i) => <Stat key={i} s={s} language={language} />)}</div>
      {skills.map((cat, ci) => (
        <div className="nv-cat" key={ci}>
          <div className="nv-cattitle">{cat.titulo[language]}</div>
          <div className="nv-chips">
            {cat.itens.map((it, i) => (
              <motion.div className="nv-chip" key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <img src={it.img} alt={it.name} /><span>{it.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
