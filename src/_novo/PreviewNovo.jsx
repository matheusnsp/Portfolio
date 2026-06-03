import { useState, useEffect } from "react";
import "./novo.css";
import { projetos, skills, stats, experiencias, certs, contatos, idiomas } from "./dados";
import HeroNovo from "./components/HeroNovo";
import SobreNovo from "./components/SobreNovo";
import ProjetosNovo from "./components/ProjetosNovo";
import SkillsNovo from "./components/SkillsNovo";
import ExperienciaNovo from "./components/ExperienciaNovo";
import CertificacoesNovo from "./components/CertificacoesNovo";
import IdiomasNovo from "./components/IdiomasNovo";
import ContatoNovo from "./components/ContatoNovo";
import CursorCustom from "./components/CursorCustom";
import HeaderNovo from "./components/HeaderNovo";
import SnakeGame from "./components/SnakeGame";


export default function PreviewNovo() {
  const [language, setLanguage] = useState("pt");
  const [darkMode, setDarkMode] = useState(true);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const sel = ".nv-card, .nv-cert, .nv-expcard, .nv-chip, .nv-contact, .nv-idioma, .nv-stat";    const onMove = (e) => {
      const card = e.target.closest(sel);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={"nv-root" + (darkMode ? "" : " nv-light")}>
          <SnakeGame />
          <CursorCustom />
          <HeaderNovo
      language={language}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((v) => !v)}
      onToggleLang={() => setLanguage((v) => (v === "pt" ? "en" : "pt"))}
    />
      {/* <div className="nv-controls">
        <button className="nv-ctrl" onClick={() => setDarkMode((v) => !v)}>{darkMode ? "escuro" : "claro"}</button>
        <button className="nv-ctrl" onClick={() => setLanguage((v) => (v === "pt" ? "en" : "pt"))}>EN ↔ PT</button>
      </div> */}
      <HeroNovo language={language} darkMode={darkMode} />
      <SobreNovo language={language} />
      <ProjetosNovo projetos={projetos} language={language} darkMode={darkMode} base={base} />
      <SkillsNovo skills={skills} stats={stats} language={language} />
      <ExperienciaNovo experiencias={experiencias} language={language} />
      <CertificacoesNovo certs={certs} language={language} />
      <IdiomasNovo idiomas={idiomas} language={language} />
      <ContatoNovo contatos={contatos} language={language} />
    </div>
  );
}