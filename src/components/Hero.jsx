import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const centerTexts = [
  { title: "Digital Systems", subtitle: "Automation • Web • AI" },
  { title: "Genpact Projects", subtitle: "Low-Code & RPA Solutions" },
  { title: "MyDevSpace", subtitle: "Personal Tech Platform" },
  { title: "Exploring Future Tech", subtitle: "MERN • AI • Cloud" }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % centerTexts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center justify-between">
      <motion.div
        className="grid md:grid-cols-2 gap-12 w-full items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">
          <motion.p
            variants={item}
            className="uppercase tracking-[0.35em] text-accent text-sm"
          >
            Full Stack • RPA • Power Platform
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Hi, I’m <span className="text-accent">Jasleen Kaur</span>
          </motion.h1>

          <motion.p variants={item} className="text-gray-400 max-w-xl">
            RPA & Power Platform Technical Consultant at Genpact and MERN Stack
            Developer specializing in building scalable web applications and
            intelligent automation solutions using Microsoft Power Platform and
            Copilot Studio.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-black rounded-full font-semibold shadow-glow hover:scale-110 transition"
            >
              View Projects
            </a>

            <a
              href="/Resume.pdf"
              download
              className="px-6 py-3 border border-accent text-accent rounded-full hover:scale-110 transition"
            >
            Download Resume
            </a>


            <a
              href="#contact"
              className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/10 transition"
            >
              Hire Me
            </a>
          </motion.div>
        </div>

        {/* ================= RIGHT SIDE (SMOOTH PREMIUM ORB) ================= */}
        <motion.div
          variants={item}
          className="relative flex justify-center items-center"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            e.currentTarget.style.setProperty("--x", `${x / 12}px`);
            e.currentTarget.style.setProperty("--y", `${y / 12}px`);
          }}
        >
          {/* MOUSE PARALLAX GLOW */}
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-accentPurple via-accent to-cyan-400 blur-3xl opacity-40"
            style={{
              transform: "translate(var(--x, 0px), var(--y, 0px))",
              transition:
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          />

          {/* SOFT PULSING OUTER GLOW */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.55, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-accentPurple via-accent to-cyan-400 blur-3xl"
          />

          {/* SLOW LUXURY ROTATING RING */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 32,
              ease: "linear"
            }}
            className="absolute w-72 h-72 rounded-full border border-white/10"
          />

          {/* ✅ INNER CORE – ULTRA SMOOTH AUTO-CHANGING TEXT */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
            className="relative w-44 h-44 rounded-full bg-background border border-white/10 shadow-glow flex items-center justify-center text-center overflow-hidden"
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -16,
                filter: "blur(4px)"
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute flex flex-col items-center justify-center px-4"
            >
              <p className="text-accent text-xs tracking-widest mb-1">
                {centerTexts[activeIndex].title}
              </p>
              <h3 className="text-sm font-bold">
                {centerTexts[activeIndex].subtitle}
              </h3>
            </motion.div>
          </motion.div>

          {/* ✨ SOFT SPARK PARTICLES */}
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 220 - 110],
                y: [0, Math.random() * 220 - 110]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* ✅ AMBIENT TECH BADGES (SMOOTH & ELEGANT) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-32 sm:-bottom-36 flex flex-wrap justify-center gap-3 max-w-sm px-4"
          >
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Power Automate",
              "Power Apps",
              "Power BI",
              "Firebase",
              "Express",
              "Framer Motion"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [10, 0, 0, -10]
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  delay: index * 1.2,
                  ease: "easeInOut"
                }}
                className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-200 backdrop-blur hover:bg-accent hover:text-black transition"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
