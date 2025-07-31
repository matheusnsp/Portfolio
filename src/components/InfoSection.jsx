import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react";

export default function InfoSection({ language }) {
  return (
    <motion.section
      className="info"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="info-left">
        <p>
          <Phone size={18} /> (21) 97058-3081
        </p>
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
      </div>
      <div className="info-right">
        <a href="/cv-matheus-neves.pdf" download className="download-btn">
          <Download size={16} />
          <span>{language === "pt" ? "Baixar Currículo" : "Download Resume"}</span>
        </a>
      </div>
    </motion.section>
  );
}
