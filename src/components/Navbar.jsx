import { Link as ScrollLink } from "react-scroll";
import ThemeToggle from "./ThemeToggle.jsx";

const nav = ["home", "about", "skills", "projects", "contact"];

const Navbar = () => (
  <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur border-b border-white/5">
    <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="font-bold text-accent">Jasleen Kaur</h1>

      <div className="flex items-center gap-6 text-sm">
        {nav.map((item) => (
          <ScrollLink
            key={item}
            to={item}
            smooth
            offset={-80}
            className="cursor-pointer text-gray-300 hover:text-accent"
          >
            {item.toUpperCase()}
          </ScrollLink>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  </header>
);

export default Navbar;
