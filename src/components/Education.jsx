import React from "react";

const Education = () => {
  const educationList = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Arizona State University, Phoenix, Arizona",
      date: "Expected Graduation: May 2026",
      image: "asu.JPG",
    },
    {
      degree: "Associate in Computer Science",
      institution: "Phoenix College, Phoenix, Arizona",
      date: "January 2025",
      image: "pc.png",
    },
  ];

  return (
    <div className="bg-white text-black dark:bg-zinc-950 dark:text-white flex justify-center">
      <section id="education" className="w-full max-w-4xl px-8 py-6 text-left">
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        {educationList.map((edu, index) => (
          <div key={index} className="flex items-center mb-8">
            <div className="h-auto w-1 bg-gray-300 dark:bg-gray-500 mr-0"></div>
            <img
              src={edu.image}
              alt={edu.institution}
              className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-500"
            />
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-1">{edu.degree}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {edu.institution}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {edu.date}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Education;
