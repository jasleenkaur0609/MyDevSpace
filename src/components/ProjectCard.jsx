import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 backdrop-blur"
    >
      <h3 className="text-lg font-semibold">{project.title}</h3>

      <p className="text-sm text-gray-400">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Impact */}
      <p className="text-xs text-accent">
        📈 {project.impact}
      </p>

      <a
        href={project.link}
        target="_blank"
        className="inline-block text-sm text-accent hover:underline"
      >
        View Project →
      </a>
    </motion.div>
  );
};

export default ProjectCard;
