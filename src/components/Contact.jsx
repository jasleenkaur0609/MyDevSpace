import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="glass-panel p-10"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Let’s Work Together
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="space-y-6 text-gray-300">
          <p>
            I’m open to full-time roles, freelance projects, and automation
            consulting opportunities. Feel free to reach out anytime.
          </p>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-accent" />
            <span>jasleensejal2003@gmail.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-accent" />
            <span>+91 8437589148</span>
          </div>

          <div className="flex gap-6 pt-3">
            <a
              href="https://github.com/jasleenkaur0609"
              target="_blank"
              className="hover:text-accent transition"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com/in/jasleen-kaur-0892b9204"
              target="_blank"
              className="hover:text-accent transition"
            >
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          action="https://formspree.io/f/your_form_id"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 rounded bg-surface border border-white/10"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 rounded bg-surface border border-white/10"
          />

          <textarea
            name="message"
            required
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded bg-surface border border-white/10"
          />

          <button
            type="submit"
            className="w-full py-3 bg-accent text-black rounded-full font-semibold hover:scale-105 transition shadow-glow"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
