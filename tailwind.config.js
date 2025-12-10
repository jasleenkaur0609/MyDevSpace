/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111827",
        accent: "#00E5FF",
        accentPurple: "#7C3AED"
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 229, 255, 0.4)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
