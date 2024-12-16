import React from "react";

function About() {
  return (
    <div className="bg-white dark:bg-zinc-950 text-black dark:text-white flex justify-center">
      <section id="about" className="w-full max-w-4xl px-8 py-6 text-left">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          I'm a 22-year-old student at Arizona State University, developing my
          skills in Full Stack Development. I specialize in JavaScript, Python,
          C#, and C++.
        </p>
      </section>
    </div>
  );
}

export default About;
