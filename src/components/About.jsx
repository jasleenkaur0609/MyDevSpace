import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="glass-panel p-10 grid md:grid-cols-2 gap-10"
    >
      {/* LEFT */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-accent">
          About Me
        </h2>

        <p className="text-gray-300 mb-4">
          I am a Computer Science Engineering graduate and currently working as
          an RPA & Power Platform Technical Consultant at Genpact. I specialize
          in transforming manual business processes into fully automated
          digital systems using Microsoft Power Automate, Power Apps, Power BI,
          and Copilot Studio.
        </p>

        <p className="text-gray-400">
          Along with automation, I have a strong background in full-stack web
          development using React, Node.js, Express, MongoDB, and REST APIs. I
          love building scalable platforms that combine clean UI with powerful
          backend logic.
        </p>
      </div>

      {/* RIGHT */}
      <div className="grid grid-cols-2 gap-5 text-sm">
        <div className="glass-panel p-4 text-center hover:shadow-glow transition">
          <p className="text-accent font-bold text-lg">Genpact</p>
          <p className="text-gray-400">Current Company</p>
        </div>

        <div className="glass-panel p-4 text-center hover:shadow-glow transition">
          <p className="text-accent font-bold text-lg">MERN</p>
          <p className="text-gray-400">Tech Stack</p>
        </div>

        <div className="glass-panel p-4 text-center hover:shadow-glow transition">
          <p className="text-accent font-bold text-lg">Power Platform</p>
          <p className="text-gray-400">Automation Tools</p>
        </div>

        <div className="glass-panel p-4 text-center hover:shadow-glow transition">
          <p className="text-accent font-bold text-lg">India</p>
          <p className="text-gray-400">Location</p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
