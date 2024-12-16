import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="bg-white text-black dark:bg-zinc-950 dark:text-white font-sans">
      <Navbar />
      <div className="flex flex-col lg:flex-row pt-16">
        <div className="lg:flex-shrink-0">
          <Header />
        </div>
        <div className="flex-1 flex flex-col">
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default App;
