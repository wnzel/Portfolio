import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-950 shadow-md z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button
          onClick={() => scrollToSection("about")}
          className="text-xl sm:text-2xl font-bold text-black dark:text-white ml-0 sm:ml-[-90px]"
        >
          Wenzel
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("projects")}
            className="text-base sm:text-lg font-medium text-black dark:text-white hover:underline"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-base sm:text-lg font-medium text-black dark:text-white hover:underline"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="text-base sm:text-lg font-medium text-black dark:text-white hover:underline"
          >
            Skills
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-lg flex items-center justify-center"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-lg flex items-center justify-center"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>

      <div className="h-1 w-full bg-gray-300 dark:bg-zinc-800 opacity-10 dark:opacity-80 transition-opacity duration-1000 ease-in-out"></div>
    </nav>
  );
};

export default Navbar;
