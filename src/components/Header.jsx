import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="flex flex-col items-center py-6 bg-white dark:bg-zinc-950 text-black dark:text-white mx-4 sm:mx-8 lg:mx-40 lg:sticky lg:top-16 lg:z-10">
      <img
        src="wenzel.jpg"
        alt="Profile"
        className="rounded-full w-40 h-40 sm:w-60 sm:h-60 border-4 border-black dark:border-gray-400"
      />
      <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-center">
        Wenzel Escudero
      </h1>
      <p className="text-lg sm:text-xl mt-2 font-medium text-center">
        Full Stack Developer
      </p>
      <p className="text-base sm:text-lg mt-2 text-center text-black dark:text-gray-400">
        📍 Phoenix, Arizona
      </p>
      <div className="flex items-center mt-4">
        <a
          href="/Resume - Wenzel Escudero.pdf"
          className="px-3 py-1 border-2 border-black dark:border-white rounded-lg text-base font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          download
        >
          Resume
        </a>
        <a
          href="https://github.com/wnzel"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faGithub} className="text-2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/wenzelescudero"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
        </a>
        <a
          href="mailto:wenzelescudero@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
        </a>
      </div>
    </header>
  );
}

export default Header;
