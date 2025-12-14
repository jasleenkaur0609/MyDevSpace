import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Loading your portfolio",
  "Preparing experience",
  "Fetching projects",
  "Almost ready"
];

const Preloader = () => {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Animated dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  // Progress + message (5 seconds)
  useEffect(() => {
    const totalDuration = 4000; // ✅ 5 seconds
    const intervalTime = 100;
    const increment = 100 / (totalDuration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Spinner – SAME UI but breathing speed */}
      <motion.div
        className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full mb-4"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2 + Math.sin(progress / 15) * 0.4,
          ease: "linear"
        }}
      />

      {/* Dynamic Loading Message */}
      <motion.p
        key={messageIndex}
        className="text-gray-300 text-sm"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {messages[messageIndex]}
        {dots}
      </motion.p>

      {/* Progress (TEXT ONLY – still same UI) */}
      <p className="mt-2 text-xs text-gray-500 tracking-widest">
        {Math.floor(progress)}%
      </p>
    </motion.div>
  );
};

export default Preloader;
