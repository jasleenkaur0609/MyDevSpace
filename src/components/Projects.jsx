import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const categories = ["All", "Full Stack", "Web App", "AI / Web"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* SECTION TITLE */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Featured Projects
      </h2>

      {/* FILTERS */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              activeCategory === category
                ? "bg-accent text-black border-accent"
                : "border-white/10 text-gray-300 hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 gap-10">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 hover:shadow-glow hover:-translate-y-2 transition"
          >
            {/* TITLE */}
            <h3 className="text-xl font-semibold text-accent mb-3">
              {project.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm mb-5">
              {project.description}
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-200 hover:bg-accent hover:text-black transition"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* IMPACT */}
            <p className="text-xs text-accent mb-5">
              📈 {project.impact}
            </p>

            {/* LINKS */}
            <div className="flex gap-4 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                GitHub →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
