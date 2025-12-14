import { useEffect, useState } from "react";

const sections = [
  "home",
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "contact"
];

const SectionIndicator = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            active === id
              ? "bg-accent scale-125"
              : "bg-white/20 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;
