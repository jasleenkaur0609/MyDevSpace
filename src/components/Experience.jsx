import { motion } from "framer-motion";

const experienceData = [
  {
    role: "RPA & Power Platform Technical Consultant",
    company: "Genpact",
    duration: "Sep 2025 – Present",
    location: "Hyderabad, Telangana",
    points: [
      "Designing and developing automated workflows using Power Automate to reduce manual effort and processing time.",
      "Building business applications using Power Apps to digitize Excel-based and email-driven workflows.",
      "Creating interactive dashboards using Power BI for business insights and reporting.",
      "Working closely with business analysts to gather requirements and optimize enterprise workflows.",
      "Ensuring data accuracy, security, and performance across integrated systems."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        Professional Experience
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10" />

        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative mb-16 flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full shadow-glow" />

            <div className="glass-panel w-full md:w-[45%] p-6 hover:-translate-y-1 hover:shadow-glow transition">
              <h3 className="text-lg font-semibold text-accent">
                {exp.role}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {exp.company} • {exp.location}
              </p>
              <p className="text-gray-400 text-xs mt-1 mb-4">
                {exp.duration}
              </p>

              <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
