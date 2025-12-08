import React from "react";
import { motion } from "framer-motion";

const SectionWrapper = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <h2 className="section-title">{title}</h2>
      </motion.div>
      <motion.div
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
