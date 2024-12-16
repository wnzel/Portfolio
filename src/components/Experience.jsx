import React from "react";

const Experience = () => {
  const experienceList = [
    {
      title: "Freelance Developer",
      date: "December 2024 - Present",
      image: "w.png",
      description: [
        "Developed custom, user-centric web applications for fclients, ensuring optimal performance and easy user experience.",
        "Implemented responsive and accessible design principles, ensuring compatibility across devices and adherence to industry practices.",
        "Maintained clear documentation and provided ongoing support, resulting in long-term client relationships and repeat business.",
      ],
      technologies: ["React", "Tailwind CSS", "JavaScript", "Node.js"],
    },
  ];

  return (
    <div className="bg-white text-black dark:bg-zinc-950 dark:text-white flex justify-center">
      <section id="experience" className="w-full max-w-4xl px-8 py-6 text-left">
        <h2 className="text-3xl font-bold mb-6">Experience</h2>
        {experienceList.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex items-center mb-5">
              <div className="h-auto w-1 bg-gray-300 dark:bg-gray-500 mr-0"></div>
              <img
                src={exp.image}
                alt={exp.title}
                className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-500"
              />
              <div className="ml-4">
                <h3 className="text-2xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-1">
                  {exp.date}
                </p>
              </div>
            </div>
            <ul className="text-gray-700 dark:text-gray-300 text-lg mb-6 space-y-2 list-inside list-disc">
              {exp.description.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap mb-6">
              {exp.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Experience;
