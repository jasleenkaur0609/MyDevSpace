import React from "react";
import SectionWrapper from "./SectionWrapper";
import { aboutData } from "../data";

const About = () => {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Who I am">
      <div className="about-layout">
        <div className="about-text">
          {aboutData.paragraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="about-card">
          <h3>Highlights</h3>
          <ul>
            <li>MERN Stack Developer</li>
            <li>RPA & Power Platform Technical Consultant at Genpact</li>
            <li>Started professional journey in Sept 2025</li>
            <li>Enjoy building automation-first solutions</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
