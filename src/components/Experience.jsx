import React from "react";
import SectionWrapper from "./SectionWrapper";
import { experienceData } from "../data";

const Experience = () => {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Where I've worked"
    >
      <div className="timeline">
        {experienceData?.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-badge" />
            <div className="timeline-body">
              <div className="timeline-header">
                <h3>{exp.role}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <p className="timeline-company">{exp.company}</p>
              <ul className="timeline-points">
                {exp.points?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
