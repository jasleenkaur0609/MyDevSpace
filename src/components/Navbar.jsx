import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { socialLinks } from "../data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      className="navbar"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-left" onClick={() => scrollTo("#home")}>
        <span className="nav-logo-initial">J</span>
        <span className="nav-logo-text">Jasleen.dev</span>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.href}
            className="nav-link"
            onClick={() => scrollTo(item.href)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="nav-right">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="nav-icon"
        >
          <FiGithub />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noreferrer"
          className="nav-icon"
        >
          <FiLinkedin />
        </a>
      </div>

      <button className="nav-menu-btn" onClick={() => setOpen((o) => !o)}>
        {open ? <FiX /> : <FiMenu />}
      </button>

      {open && (
        <div className="nav-mobile">
          {navItems.map((item) => (
            <button
              key={item.href}
              className="nav-mobile-link"
              onClick={() => scrollTo(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
