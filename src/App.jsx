import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Preloader from "./components/Preloader.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx"; // ✅ NEW
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Projects from "./components/Projects.jsx";
import GithubStats from "./components/GitHubStats.jsx"; // ✅ NEW
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import ScrollProgress from "./components/ScrollProgress.jsx";
import SectionIndicator from "./components/SectionIndicator.jsx";

// ✅ Case Study Page
import CaseStudy from "./components/CaseStudy.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Detect Case Study Page
  const isCaseStudy = location.pathname.startsWith("/case-study");

  // ✅ Preloader (5 seconds)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-gray-100 min-h-screen">
      
      {/* ❌ HIDE GLOBAL UI ON CASE STUDY */}
      {!isCaseStudy && <ScrollProgress />}
      {!isCaseStudy && <SectionIndicator />}
      {!isCaseStudy && <Navbar />}

      {/* ✅ ROUTES */}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-20">
              
              <section id="home" className="pt-16">
                <Hero />
              </section>

              <section id="about">
                <About />
              </section>

              <section id="skills">
                <Skills />
              </section>

              {/* ✅ CERTIFICATIONS */}
              <section id="certifications">
                <Certifications />
              </section>

              <section id="experience">
                <Experience />
              </section>

              <section id="education">
                <Education />
              </section>

              <section id="projects">
                <Projects />
              </section>

              {/* ✅ GITHUB STATS */}
              <section id="github">
                <GithubStats />
              </section>

              <section id="contact">
                <Contact />
              </section>

            </main>
          }
        />

        {/* CASE STUDY PAGE (FOCUSED VIEW) */}
        <Route
          path="/case-study/:slug"
          element={
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CaseStudy />
            </main>
          }
        />
      </Routes>

      {/* ❌ HIDE FOOTER ON CASE STUDY */}
      {!isCaseStudy && <Footer />}
    </div>
  );
};

export default App;
