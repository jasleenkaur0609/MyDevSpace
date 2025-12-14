import { motion } from "framer-motion";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
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
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-200 hover:bg-accent hover:text-black transition"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* LINKS */}
            <div className="flex gap-4 text-sm">
              <a
                href={project.github}
                target="_blank"
                className="text-accent hover:underline"
              >
                GitHub →
              </a>
              {/* <a
                href={project.live}
                target="_blank"
                className="text-accent hover:underline"
              >
                Live Demo →
              </a> */}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
