import { motion } from "framer-motion";

const skills = {
  "Programming & Web": [
    "Java",
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Express",
    "Redux",
    "REST APIs"
  ],
  Databases: [
    "MySQL",
    "MongoDB",
    "SQL Server",
    "Firebase",
    "NoSQL"
  ],
  "Automation & Power Platform": [
    "Power Automate",
    "Power Apps",
    "Power BI",
    "Copilot Studio",
    "RPA"
  ],
  "Tools & DevOps": [
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Eclipse",
    "IntelliJ"
  ]
};

const Skills = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-10 text-center">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel p-6 hover:shadow-glow hover:-translate-y-2 transition"
          >
            <h3 className="text-accent font-semibold mb-4 text-center">
              {category}
            </h3>

            <div className="space-y-2 text-sm">
              {items.map((skill) => (
                <p
                  key={skill}
                  className="text-gray-300 text-center hover:text-accent transition"
                >
                  {skill}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
