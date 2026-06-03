import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderNovo({ language, darkMode, onToggleTheme, onToggleLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const links = [
    { id: "nv-sobre", pt: "Sobre", en: "About" },
    { id: "nv-projetos", pt: "Projetos", en: "Projects" },
    { id: "nv-skills", pt: "Skills", en: "Skills" },
    { id: "nv-experiencia", pt: "Experiência", en: "Experience" },
    { id: "nv-certificacoes", pt: "Certificações", en: "Certs" },
    { id: "nv-contato", pt: "Contato", en: "Contact" },
  ];

  const irPara = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const alvo = document.getElementById(id);
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="nv-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        ref={menuRef}
      >
        <a href="#nv-hero" className="nv-header-logo" onClick={(e) => irPara(e, "nv-hero")}>
          <img src="./logo.png" alt="MN" className="nv-logo-img" />
        </a>
        <nav className="nv-header-nav">
          {links.map((l) => (
            <a key={l.id} href={"#" + l.id} onClick={(e) => irPara(e, l.id)}>
              {language === "pt" ? l.pt : l.en}
            </a>
          ))}
        </nav>

        <div className="nv-header-actions">
        <button className="nv-ctrl" onClick={onToggleTheme}>
          {darkMode ? (language === "pt" ? "Modo Escuro" : "Dark Mode") : (language === "pt" ? "Modo Claro" : "Light Mode")}
        </button>

          <button className="nv-ctrl" onClick={onToggleLang}>EN ↔ PT</button>
          <button
            className="nv-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`nv-ham-line ${menuOpen ? "nv-ham-open" : ""}`} />
            <span className={`nv-ham-line ${menuOpen ? "nv-ham-open" : ""}`} />
            <span className={`nv-ham-line ${menuOpen ? "nv-ham-open" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nv-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="nv-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="nv-drawer-header">
              <span className="nv-header-logo">
                <img src="./logo.png" alt="MN" className="nv-logo-img" />
              </span>              
                  <button className="nv-hamburger nv-hamburger-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
                  <span className="nv-ham-line nv-ham-open" />
                  <span className="nv-ham-line nv-ham-open" />
                  <span className="nv-ham-line nv-ham-open" />
                </button>
              </div>

              <ul className="nv-drawer-links">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.28 }}
                  >
                    <a href={"#" + l.id} onClick={(e) => irPara(e, l.id)}>
                      <span className="nv-drawer-num">0{i + 1}</span>
                      {language === "pt" ? l.pt : l.en}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="nv-drawer-actions">
                <button className="nv-ctrl" onClick={onToggleTheme}>
                  {darkMode ? (language === "pt" ? "Modo Escuro" : "Dark Mode") : (language === "pt" ? "Modo Claro" : "Light Mode")}
                </button>
                <button className="nv-ctrl" onClick={onToggleLang}>EN ↔ PT</button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}