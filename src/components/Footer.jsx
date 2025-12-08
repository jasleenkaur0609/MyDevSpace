import React from "react";
import { socialLinks } from "../data";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Jasleen Kaur</p>
      <div className="footer-links">
        <a href={socialLinks.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
