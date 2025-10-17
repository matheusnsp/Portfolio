import { useState } from "react";
import { Mail, Phone, Linkedin, Download, ArrowRight, Github } from "lucide-react"; // Adiciona Github
import { motion } from "framer-motion";

export default function Contato({ language }) {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Enviar por mailto:
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "matheusnevessp@gmail.com";
    const subjectDefault = language === "pt" ? "Contato via site" : "Contact via website";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      assunto || subjectDefault
    )}&body=${encodeURIComponent(`${language === "pt" ? "Nome" : "Name"}: ${nome}\n\n${mensagem}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.section
      className="contato-info-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Formulário de Contato */}
      <div className="contato">
        <h2>{language === "pt" ? "Entre em Contato" : "Get in Touch"}</h2>
        <form onSubmit={handleSubmit} className="contato-form">
          <label>
            {language === "pt" ? "Nome:" : "Name:"}
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={language === "pt" ? "Seu nome" : "Your name"}
              required
            />
          </label>
          <label>
            {language === "pt" ? "Assunto:" : "Subject:"}
            <input
              type="text"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder={language === "pt" ? "Assunto da mensagem" : "Message subject"}
              required
            />
          </label>
          <label className="mensagem-container">
            {language === "pt" ? "Mensagem:" : "Message:"}
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder={language === "pt" ? "Escreva sua mensagem aqui..." : "Write your message here..."}
              rows={6}
              required
            />
            {/* Botão de enviar flutuante dentro da textarea */}
            <button
              type="submit"
              className="btn-send-icon"
              title={language === "pt" ? "Enviar Mensagem" : "Send Message"}
            >
              <ArrowRight size={20} />
            </button>
          </label>
        </form>
      </div>

      {/* InfoSection embutido */}
      <div className="info">
        <div className="info-left">
          <p>
            <Mail size={18} /> matheusnevessp@gmail.com
          </p>
          <a
            href="https://linkedin.com/in/matheusnsp"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} /> linkedin.com/in/matheusnsp
          </a>
          <a
            href="https://github.com/matheusnsp"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} /> github.com/matheusnsp
          </a>
        </div>
        <div className="info-right">
        <a
          href={`${import.meta.env.BASE_URL}${language === "pt" ? "cv-matheus-neves.pdf" : "resume-matheus-neves.pdf"}`}
          download
          className="download-btn"
        >
          <Download size={16} />
          <span>{language === "pt" ? "Baixar Currículo" : "Download Resume"}</span>
        </a>

        </div>
      </div>
    </motion.section>
  );
}
