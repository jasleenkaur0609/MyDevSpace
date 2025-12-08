import React from "react";
import { motion } from "framer-motion";
import { heroData, socialLinks } from "../data";

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        {/* LEFT – text */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="hero-greeting">Hi, I’m</p>
          <h1 className="hero-name">{heroData.name}</h1>
          <h2 className="hero-role">{heroData.title}</h2>
          <p className="hero-desc">{heroData.subtitle}</p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={scrollToProjects}>
              {heroData.ctaPrimary || "View Projects"}
            </button>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          </div>

          <div className="hero-social">
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>•</span>
            <a href={socialLinks.email}>Email</a>
          </div>
        </motion.div>

        {/* RIGHT – animated avatar + orbit */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="hero-orbit-shell">
            <div className="hero-avatar-circle">
              <span className="hero-avatar-initial">J</span>
            </div>

            <motion.div
              className="hero-orbit hero-orbit-outer"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              <span className="hero-chip">React</span>
              <span className="hero-chip">Node</span>
              <span className="hero-chip">Java</span>
              <span className="hero-chip">Firebase</span>
              <span className="hero-chip">RPA</span>
              <span className="hero-chip">Power Platform</span>
            </motion.div>

            <motion.div
              className="hero-orbit hero-orbit-inner"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <span className="hero-dot" />
              <span className="hero-dot" />
              <span className="hero-dot" />
            </motion.div>
          </div>

          <motion.div
            className="hero-highlight-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="hero-highlight-title">RPA & Power Platform</p>
            <p className="hero-highlight-text">
              Building full-stack apps & automation solutions that improve
              efficiency using MERN, RPA, and Microsoft Power Platform.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
