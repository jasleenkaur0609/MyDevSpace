import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Preloader from "./components/Preloader.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Projects from "./components/Projects.jsx";
import GithubStats from "./components/GitHubStats.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import ScrollProgress from "./components/ScrollProgress.jsx";

// Case Study Page
import CaseStudy from "./components/CaseStudy.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Detect Case Study Page
  const isCaseStudy = location.pathname.startsWith("/case-study");

  // Preloader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-gray-100 min-h-screen">
      {/* GLOBAL UI */}
      {!isCaseStudy && <ScrollProgress />}
      {!isCaseStudy && <Navbar />}

      {/* ROUTES */}
      <Routes>
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

              <section id="github">
                <GithubStats />
              </section>

              <section id="contact">
                <Contact />
              </section>
            </main>
          }
        />

        <Route
          path="/case-study/:slug"
          element={
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CaseStudy />
            </main>
          }
        />
      </Routes>

      {!isCaseStudy && <Footer />}
    </div>
  );
};

export default App;
