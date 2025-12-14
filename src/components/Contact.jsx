import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORM_ENDPOINT = "https://formspree.io/f/xwpgnnkv"; // replace

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [messageLength, setMessageLength] = useState(0);
  const [intentHint, setIntentHint] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const formRef = useRef(null);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showActionMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(""), 2000);
  };

  const handleIntentChange = (value) => {
    if (value === "Recruiter Opportunity") {
      setIntentHint(
        "Currently working at Genpact. Open to conversations, not immediate switches."
      );
    } else if (value === "Freelance Project") {
      setIntentHint("Please include scope, timeline, and tech stack if possible.");
    } else if (value === "Collaboration") {
      setIntentHint("Share your idea or problem statement briefly.");
    } else {
      setIntentHint("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const intent = form.intent.value;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!intent || !name || !email || !message || !isValidEmail(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const data = new FormData(form);
    data.append("submitted_at", new Date().toISOString());
    data.append("source", "Portfolio Website");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setMessageLength(0);
        setIntentHint("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

        {/* LEFT – ENHANCED CTA */}
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold">
            Let’s connect & collaborate
          </h2>

          <p className="text-gray-400 max-w-lg leading-relaxed">
            Currently working as an RPA & Power Platform Technical Consultant at{" "}
            <span className="text-accent">Genpact</span>.  
            Not actively looking for a job change, but open to meaningful
            conversations, selective freelance work, and tech collaborations.
          </p>

          {/* Availability */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            Limited availability • Side projects & discussions
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4 flex-wrap pt-2">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                navigator.clipboard.writeText("jasleensejal2003@gmail.com");
                showActionMessage("Email copied ✓");
              }}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition"
            >
              Copy Email
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              href="https://www.linkedin.com/in/jasleen-kaur-0892b9204"
              target="_blank"
              onClick={() => showActionMessage("Opening LinkedIn…")}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition"
            >
              LinkedIn
            </motion.a>
          </div>

          {/* ACTION FEEDBACK */}
          <AnimatePresence>
            {actionMsg && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-xs text-accent"
              >
                {actionMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Time info */}
          <p className="text-xs text-gray-500 pt-2">
            ⏱️ Usually responds within 24 hours • IST (UTC +5:30)
          </p>
        </div>

        {/* RIGHT – FORM (UNCHANGED LOGIC) */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-5"
        >
          <input type="text" name="_gotcha" className="hidden" />

          <select
            name="intent"
            required
            onChange={(e) => handleIntentChange(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-md px-3 py-3 text-sm outline-none focus:border-accent transition"
          >
            <option value="">Select reason for contact</option>
            <option value="Recruiter Opportunity">Recruiter Opportunity</option>
            <option value="Freelance Project">Freelance Project</option>
            <option value="Collaboration">Collaboration</option>
          </select>

          {intentHint && (
            <p className="text-xs text-gray-400">{intentHint}</p>
          )}

          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-sm outline-none focus:border-accent transition"
          />

          <input
            type="text"
            name="company"
            placeholder="Company / Organization (optional)"
            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-sm outline-none focus:border-accent transition"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-sm outline-none focus:border-accent transition"
          />

          <textarea
            name="message"
            rows="4"
            required
            maxLength={500}
            onChange={(e) => setMessageLength(e.target.value.length)}
            placeholder="Your message"
            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-sm outline-none resize-none focus:border-accent transition"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>🔒 Your information is never shared</span>
            <span>{messageLength}/500</span>
          </div>

          {status === "error" && (
            <>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-[2px] w-full bg-red-500/60 rounded-full origin-left"
              />
              <p className="text-xs text-gray-400">
                Please review the form and try again.
              </p>
            </>
          )}

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm"
              >
                <span className="w-4 h-4 rounded-full border border-green-400 flex items-center justify-center">
                  ✓
                </span>
                Message sent successfully
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={status === "loading"}
            className="w-full mt-4 py-3 rounded-xl bg-accent text-black font-semibold shadow-glow disabled:opacity-40"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
