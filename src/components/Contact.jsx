import React from "react";
import SectionWrapper from "./SectionWrapper";
import { contactData, socialLinks } from "../data";

const Contact = () => {
  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Let’s connect">
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Let’s talk about your next idea</h3>
          <p>{contactData.message}</p>

          <p className="contact-email">
            Email:{" "}
            <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
          </p>

          <div className="contact-socials">
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/xwpgnnkv"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New message from portfolio"
          />
          <input
            type="hidden"
            name="_next"
            value="http://localhost:5173/"
          />

          <div className="form-row">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Tell me about your project or question..."
                required
              />
            </label>
          </div>
          <button className="btn btn-primary contact-btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
