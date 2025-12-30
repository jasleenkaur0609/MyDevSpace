import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========= ISSUER → LOGO MAP ========= */
const issuerLogos = {
  "IBM": "/logos/ibm.svg",
  "IBM (Coursera)": "/logos/ibm.svg",
  "Google": "/logos/google.svg",
  "Google (Coursera)": "/logos/google.svg",
  "Microsoft": "/logos/microsoft.svg",
  "Cisco": "/logos/cisco.svg",
  "Cisco Networking Academy": "/logos/cisco.svg",
  "UC San Diego / Infosys": "/logos/ucsd.svg",
  "UC San Diego": "/logos/ucsd.svg",
  "Infosys": "/logos/infosys.svg",
  "Infosys Springboard": "/logos/infosys.svg",
  "Coding Ninjas": "/logos/codingninja.svg",
  "Coursera": "/logos/coursera.svg",
};

/* ========= FEATURED CERTIFICATIONS (ROLE-RELEVANT) ========= */
const certifications = [
  {
    title: "PL-200: Power Platform Functional Consultant (Course)",
    issuer: "Microsoft",
    year: "2024–2025",
    category: "Automation",
    description:
      "Designing and implementing low-code business solutions using Power Apps, Power Automate, and Dataverse.",
    skills: ["Power Apps", "Power Automate", "Dataverse"],
    featured: true,
  },
  {
    title: "IBM Data Science Professional Program",
    issuer: "IBM (Coursera)",
    year: "2024",
    category: "Data & AI",
    description:
      "Comprehensive program covering Python, SQL, machine learning, and real-world analytics projects.",
    skills: ["Python", "SQL", "Machine Learning"],
    featured: true,
  },
  {
    title: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM",
    year: "2024",
    category: "AI",
    description:
      "Building effective prompts to generate accurate and reliable outputs from AI models.",
    skills: ["Generative AI", "Prompt Engineering"],
    featured: true,
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "UC San Diego / Infosys",
    year: "2024",
    category: "Algorithms",
    description:
      "Strong foundation in algorithms, data structures, and efficient problem-solving techniques.",
    skills: ["Algorithms", "Data Structures"],
    featured: true,
  },
  {
    title: "Web Development with HTML, CSS & JavaScript",
    issuer: "IBM",
    year: "2024",
    category: "Web",
    description:
      "Frontend development fundamentals including responsive layouts and interactive UI.",
    skills: ["HTML", "CSS", "JavaScript"],
    featured: true,
  },
  {
    title: "Google Analytics for Beginners",
    issuer: "Google",
    year: "2023",
    category: "Analytics",
    description:
      "Analyzing website traffic, user behavior, and performance metrics.",
    skills: ["Analytics", "User Behavior"],
    featured: false,
  },
  {
    title: "Agile Project Management",
    issuer: "Google (Coursera)",
    year: "2025",
    category: "Management",
    description:
      "Applying Agile and Scrum practices for efficient project planning and delivery.",
    skills: ["Agile", "Scrum"],
    featured: false,
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2022",
    category: "Security",
    description:
      "Understanding cybersecurity fundamentals, common threats, and network security best practices.",
    skills: ["Cybersecurity", "Network Security"],
    featured: false,
  },
  {
    title: "Introduction to Python – Certificate of Excellence",
    issuer: "Coding Ninjas",
    year: "2022",
    category: "Programming",
    description:
      "Strong Python foundation with excellence in problem-solving recognition.",
    skills: ["Python", "Problem Solving"],
    featured: false,
  },
];

/* ========= CONFIG ========= */
const TOTAL_CERT_COUNT = 37;

const categories = [
  "All",
  "Automation",
  "Data & AI",
  "AI",
  "Web",
  "Algorithms",
  "Analytics",
  "Management",
  "Security",
  "Programming",
];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <section className="py-24">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-white"
        >
          Certifications & Learning
        </motion.h2>

        <p className="text-sm text-gray-400 mt-2 sm:mt-0">
          {TOTAL_CERT_COUNT}+ certifications completed
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? "bg-cyan-500 text-black"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((cert, i) => {
            const logo =
              issuerLogos[cert.issuer] || "/logos/default.svg";

            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
              >
                {/* LEFT ACCENT */}
                <span className="absolute left-0 top-0 h-full w-[3px] bg-cyan-400/70" />

                {/* FEATURED BADGE */}
                {cert.featured && (
                  <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-cyan-500 text-black font-medium">
                    Featured
                  </span>
                )}

                {/* LOGO */}
                <img
                  src={logo}
                  alt={cert.issuer}
                  className="h-6 mb-4 opacity-90"
                />

                <h3 className="text-lg font-semibold text-white">
                  {cert.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {cert.issuer} • {cert.year}
                </p>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  {cert.description}
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
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
