import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        style={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />
    </div>
  );
};

export default ScrollProgress;
