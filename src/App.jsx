import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Preloader from "./components/Preloader.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-gray-100 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-20">
        {/* ✅ HERO */}
        <section id="home" className="pt-16">
          <Hero />
        </section>

        {/* ✅ ABOUT */}
        <section id="about">
          <About />
        </section>

        {/* ✅ SKILLS */}
        <section id="skills">
          <Skills />
        </section>

        {/* ✅ EXPERIENCE (NEW) */}
        <section id="experience">
          <Experience />
        </section>

        {/* ✅ EDUCATION (NEW – B.E + 12th + 10th) */}
        <section id="education">
          <Education />
        </section>

        {/* ✅ PROJECTS */}
        <section id="projects">
          <Projects />
        </section>

        {/* ✅ CONTACT */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
