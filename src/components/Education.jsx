import { motion } from "framer-motion";

const educationData = [
  {
    title: "B.E. – Computer Science Engineering",
    institute: "Chitkara University, Punjab",
    duration: "2021 – 2025",
    score: "CGPA: 8.89",
    highlights: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Web Development",
      "Operating Systems",
      "Software Engineering"
    ]
  },

  {
    title: "Class XII (Senior Secondary)",
    institute: "Kaintal School, Punjab",
    duration: "2020 – 2021",
    score: "Board: ISC• Percentage: 81%",
    highlights: [
      "Physics",
      "Chemistry",
      "Mathematics"
    ]
  },

  {
    title: "Class X (Secondary School)",
    institute: "Kaintal School",
    duration: "2018 – 2019",
    score: "Board: ICSE • Percentage: 84%",
    highlights: [
      "Science",
      "Mathematics",
      "English",
      "Economics",
      "Social Studies"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        Education
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="glass-panel p-6 hover:-translate-y-1 hover:shadow-glow transition"
          >
            <h3 className="text-lg font-semibold text-accent">
              {edu.title}
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              {edu.institute}
            </p>
            <p className="text-gray-400 text-xs mt-1 mb-2">
              {edu.duration} • {edu.score}
            </p>

            <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
              {edu.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
