import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 250);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FiArrowUp />
    </button>
  );
};

export default ScrollToTop;
