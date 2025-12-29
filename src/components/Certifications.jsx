import { motion } from "framer-motion";

const certifications = [
  {
    title: "Microsoft Power Platform Fundamentals",
    issuer: "Microsoft",
    year: "2024",
    skills: ["Power Apps", "Power Automate", "Dataverse"],
  },
  {
    title: "Full Stack Web Development",
    issuer: "Self / Online Platform",
    year: "2023",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Git & GitHub Essentials",
    issuer: "GitHub",
    year: "2023",
    skills: ["Git", "Version Control"],
  },
];

const Certifications = () => {
  return (
    <section className="py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold text-white mb-12"
      >
        Certifications
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition"
          >
            <h3 className="text-lg font-medium text-white mb-1">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-400">
              {cert.issuer} • {cert.year}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {cert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
