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

import ScrollProgress from "./components/ScrollProgress.jsx";
import SectionIndicator from "./components/SectionIndicator.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  // ✅ Preloader duration: 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-gray-100 min-h-screen">
      {/* ✅ GLOBAL UI ELEMENTS */}
      <ScrollProgress />
      <SectionIndicator />
      <Navbar />

      {/* ✅ MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-20">
        
        {/* HERO */}
        <section id="home" className="pt-16">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about">
          <About />
        </section>

        {/* SKILLS */}
        <section id="skills">
          <Skills />
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <Experience />
        </section>

        {/* EDUCATION */}
        <section id="education">
          <Education />
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <Projects />
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Contact />
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
