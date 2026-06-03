import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function HeroNovo({ language, darkMode = true }) {
  const canvasRef = useRef(null);
  const innerRef = useRef(null);
  const darkRef = useRef(darkMode);
  darkRef.current = darkMode;

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, pts, raf, rect;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const R = 160;
    const FORCE = 4;

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const qtd = Math.min(180, Math.floor((w * h) / 7000));
      pts = Array.from({ length: qtd }, () => {
        const x = Math.random() * w, y = Math.random() * h;
        return { x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 };
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = darkRef.current;
      const dotBase = dark ? [74, 222, 128] : [22, 163, 74];
      const lineRGB = dark ? "56,189,248" : "2,132,199";

      for (const p of pts) {
        p.ox += p.vx; p.oy += p.vy;
        if (p.ox < 0 || p.ox > w) p.vx *= -1;
        if (p.oy < 0 || p.oy > h) p.vy *= -1;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        let glow = 0;
        if (d < R) {
          const f = 1 - d / R;
          p.x += (dx / d) * f * FORCE;
          p.y += (dy / d) * f * FORCE;
          glow = f;
        }

        p.x += (p.ox - p.x) * 0.06;
        p.y += (p.oy - p.y) * 0.06;

        const radius = 1.7 + glow * 2;
        const alpha = 0.6 + glow * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + dotBase[0] + "," + dotBase[1] + "," + dotBase[2] + "," + alpha + ")";
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(" + lineRGB + "," + 0.14 * (1 - d / 110) + ")";
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!rect) rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      if (innerRef.current)
        innerRef.current.style.transform = "translate(" + dx * 18 + "px," + dy * 18 + "px)";
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => { rect = canvas.getBoundingClientRect(); };

    requestAnimationFrame(() => { resize(); tick(); });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const palavras = language === "pt"
    ? ["Aplicações modernas, rápidas e seguras.", "React · Node · Python · Cloud", "Transformando ideias em produto."]
    : ["Modern, fast and secure apps.", "React · Node · Python · Cloud", "Turning ideas into products."];

  return (
    <section className="nv-hero" id="nv-hero">
      <canvas ref={canvasRef} className="nv-hero-canvas" />
      <div className="nv-hero-grid" />

      <div className="nv-hero-inner" ref={innerRef}>
        <motion.p className="nv-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {language === "pt" ? "desenvolvedor full stack · cibersegurança · IA" : "full stack developer · cybersecurity · AI"}
        </motion.p>
        <h1>
          {["Matheus", "Neves"].map((p, i) => (
            <motion.span key={i} style={{ display: "inline-block", marginRight: "0.3em" }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 120 }}>
              {p}
            </motion.span>
          ))}
          <br />
          {[{ t: "construindo", a: true }, { t: "o", a: false }, { t: "futuro.", a: false }].map((p, i) => (
            <motion.span key={i} className={p.a ? "nv-accent" : ""}
              style={{ display: "inline-block", marginRight: "0.3em" }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 120 }}>
              {language === "pt" ? p.t : ({ construindo: "building", "o": "the", "futuro.": "future." }[p.t])}
            </motion.span>
          ))}
        </h1>
        <motion.p className="nv-typed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Typewriter words={palavras} loop cursor cursorStyle="_" typeSpeed={55} deleteSpeed={28} delaySpeed={1800} />
        </motion.p>
      </div>

      <motion.div className="nv-hero-foto"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
        <img src={`${import.meta.env.BASE_URL}foto.png`} alt="Matheus Neves" />
      </motion.div>

      <motion.div className="nv-cta"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}>
        <a href="#nv-projetos" className="nv-btn nv-primary"
          onClick={(e) => { e.preventDefault(); document.getElementById("nv-projetos")?.scrollIntoView({ behavior: "smooth" }); }}>
          {language === "pt" ? "Ver projetos" : "View projects"}
        </a>
        <a href="#nv-contato" className="nv-btn"
          onClick={(e) => { e.preventDefault(); document.getElementById("nv-contato")?.scrollIntoView({ behavior: "smooth" }); }}>
          {language === "pt" ? "Falar comigo" : "Get in touch"}
        </a>
      </motion.div>
    </section>
  );
}