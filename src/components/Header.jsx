import { useState, useEffect } from "react";
import { Sun, Moon, Home, User, Clipboard, Briefcase, Award, Code, Mail } from "lucide-react";

export default function Header({ darkMode, toggleTheme, language, toggleLanguage }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > 425) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { id: "top", label: "Início", icon: <Home size={20} /> },
    { id: "projetos", label: "Projetos", icon: <Briefcase size={20} /> },
    { id: "experiencia", label: "Experiência", icon: <Clipboard size={20} /> },
    { id: "certificacoes", label: "Certificações", icon: <Award size={20} /> },
    { id: "skills", label: "Skills", icon: <Code size={20} /> },
    { id: "contato", label: "Contato", icon: <Mail size={20} /> },
  ];

  if (windowWidth < 1440) {
    items.splice(1, 0, { id: "sobre2", label: "Sobre mim", icon: <User size={20} /> });
  }

  const handleClick = (id) => {
    setMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="MNSP Logo" className="logo-img" />
      </div>

      <div className="header-right">
        {windowWidth <= 425 ? (
          <>
            {menuOpen && (
              <nav className="nav-mobile">
                {items.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    className="nav-btn"
                    aria-label={label}
                    onClick={() => handleClick(id)}
                    title={label}
                    type="button"
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            )}
          </>
        ) : (
          <nav className="nav-icons">
            {items.map(({ id, label, icon }) => (
              <button
                key={id}
                className="nav-btn"
                aria-label={label}
                onClick={() => handleClick(id)}
                title={label}
                type="button"
              >
                {icon}
              </button>
            ))}
          </nav>
        )}

        {/* Botão de alternância de idioma */}
        <button
          onClick={toggleLanguage}
          aria-label="Toggle language"
          className="lang-toggle"
          type="button"
        >
          {language === "en" ? "EN" : "PT"}
        </button>

        {/* Botão de alternância de tema */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="theme-toggle"
          type="button"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}