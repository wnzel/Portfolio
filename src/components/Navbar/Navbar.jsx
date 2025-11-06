import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Links from "./Links";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update theme-color meta tag
    const themeColorMetaTag = document.querySelector(
      'meta[name="theme-color"]'
    );
    if (themeColorMetaTag) {
      themeColorMetaTag.setAttribute(
        "content",
        theme === "dark" ? "#0a0a0a" : "#ffffff"
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 px-4">
        <Link
          to="/"
          className="text-xl font-medium tracking-tight text-base-content hover:text-base-content/60 transition-colors"
        >
          Wenzel
        </Link>
        <div className="flex items-center gap-4">
          <Links navItems={navItems} />
          <button
            onClick={toggleTheme}
            className="relative w-5 h-5 cursor-pointer"
            aria-label="Toggle theme"
          >
            <motion.div
              animate={{
                opacity: theme === "dark" ? 1 : 0,
                rotate: theme === "dark" ? 0 : 90,
                scale: theme === "dark" ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-base-content" />
            </motion.div>
            <motion.div
              animate={{
                opacity: theme === "dark" ? 0 : 1,
                rotate: theme === "dark" ? -90 : 0,
                scale: theme === "dark" ? 0.8 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-base-content" />
            </motion.div>
          </button>
        </div>
      </div>
      {/* Border line with padding */}
      <div className="px-4">
        <div className="w-full h-px bg-base-content/10" />
      </div>
    </div>
  );
};

export default Navbar;
