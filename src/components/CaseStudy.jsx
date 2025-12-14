import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { caseStudies } from "../data/caseStudies";
import { useEffect, useRef } from "react";

/* ===============================
   ARCHITECTURE FLOW (NO LINES)
================================ */
const ArchitectureFlow = ({ items }) => (
  <div className="relative flex flex-wrap justify-center gap-6 py-6">
    {/* SOFT AMBIENT GLOW */}
    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-cyan-400/10 blur-3xl opacity-40" />

    {items.map((item, i) => (
      <motion.div
        key={item}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.12, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300
                   hover:border-accent hover:shadow-glow hover:-translate-y-1 transition"
      >
        {item}
      </motion.div>
    ))}
  </div>
);

/* ===============================
   SECTION BLOCK
================================ */
const Section = ({ title, items }) => (
  <motion.section
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <h2 className="text-lg font-semibold text-accent">{title}</h2>

    <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-accent">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.section>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  const studies = Object.keys(caseStudies);
  const index = studies.indexOf(slug);
  const prev = studies[index - 1];
  const next = studies[index + 1];

  const study = caseStudies[slug];

  /* SCROLL TO TOP ON ROUTE CHANGE */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  /* KEYBOARD NAVIGATION */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && prev) navigate(`/case-study/${prev}`);
      if (e.key === "ArrowRight" && next) navigate(`/case-study/${next}`);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, navigate]);

  /* SCROLL PROGRESS */
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  });

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Case study not found
      </div>
    );
  }

  /* ✅ REUSABLE NAV FUNCTION */
  const goToProjects = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <main
      ref={containerRef}
      className="max-w-6xl mx-auto px-4 py-20 space-y-20"
    >
      {/* TOP PROGRESS BAR */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
      />

      {/* BACK */}
      <button
        onClick={goToProjects}
        className="text-sm text-accent hover:underline"
      >
        ← Back to Projects
      </button>

      {/* HERO */}
      <header className="space-y-5">
        <h1 className="text-3xl md:text-4xl font-bold">{study.title}</h1>

        <p className="text-base text-gray-400 max-w-4xl">
          {study.overview}
        </p>

        {/* METADATA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex gap-3 text-xs text-gray-400"
        >
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            Production-Ready
          </span>
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            Scalable Design
          </span>
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            System-Focused
          </span>
        </motion.div>
      </header>

      {/* ARCHITECTURE */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-200">
          System Architecture
        </h3>
        <ArchitectureFlow items={study.architecture} />
      </section>

      {/* SCREENSHOTS */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">
          Screenshots & UI Flow
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="h-40 rounded-xl bg-white/5 border border-white/10
                         flex items-center justify-center text-gray-500 text-xs
                         hover:shadow-glow transition"
            >
              Screenshot Placeholder
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <Section title="Problem Statement" items={study.problem} />
      <Section title="Solution Strategy" items={study.solution} />
      <Section title="Outcome & Learnings" items={study.outcome} />

      {/* PREV / NEXT */}
      <div className="flex justify-between items-center border-t border-white/10 pt-10">
        {prev ? (
          <button
            onClick={() => navigate(`/case-study/${prev}`)}
            className="text-sm text-gray-300 hover:text-accent"
          >
            ← Previous
          </button>
        ) : <span />}

        {next && (
          <button
            onClick={() => navigate(`/case-study/${next}`)}
            className="text-sm text-gray-300 hover:text-accent"
          >
            Next →
          </button>
        )}
      </div>

      {/* CTA */}
      <div className="pt-10 border-t border-white/10 flex justify-between items-center">
        <p className="text-sm text-gray-400">
          Explore more real-world engineering work
        </p>

        <button
          onClick={goToProjects}
          className="px-6 py-3 rounded-full bg-accent text-black font-semibold shadow-glow hover:scale-105 transition"
        >
          View All Projects
        </button>
      </div>
    </main>
  );
};

export default CaseStudy;
