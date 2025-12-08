import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { projectsData } from "../data";

const Projects = () => {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Some things I've built"
    >
      <div className="project-grid">
        {projectsData?.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="project-card-main">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tech?.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
            </div>
            <div className="project-actions">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline project-btn"
                >
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary project-btn"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
