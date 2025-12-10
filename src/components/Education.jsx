import React from "react";
import SectionWrapper from "./SectionWrapper";
import { educationData } from "../data";

const Education = () => {
  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="Academic background"
    >
      <div className="timeline">
        {educationData?.map((ed, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-badge" />
            <div className="timeline-body">
              <div className="timeline-header">
                <h3>{ed.degree}</h3>
                <span className="timeline-period">{ed.period}</span>
              </div>
              <p className="timeline-company">{ed.institution}</p>
              <ul className="timeline-points">
                {ed.details?.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Education;
