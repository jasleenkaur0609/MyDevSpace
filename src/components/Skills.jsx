import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { skillsData } from "../data";

const chipVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03 },
  }),
};

const Skills = () => {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Tech I work with">
      <div className="skills-grid">
        {skillsData.categories?.map((cat, idx) => (
          <div key={idx} className="skills-card">
            <h3>{cat.title}</h3>
            <div className="skills-chips">
              {cat.skills?.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-chip"
                  variants={chipVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
