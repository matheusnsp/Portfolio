import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contato({ language }) {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Quando enviar, abrir mailto com os dados
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
      className="secao contato"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
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
        <label>
          {language === "pt" ? "Mensagem:" : "Message:"}
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder={language === "pt" ? "Escreva sua mensagem aqui..." : "Write your message here..."}
            rows={6}
            required
          />
        </label>
        <button type="submit" className="btn-enviar">
          <Mail size={18} /> {language === "pt" ? "Enviar Mensagem" : "Send Message"}
        </button>
      </form>
    </motion.section>
  );
}