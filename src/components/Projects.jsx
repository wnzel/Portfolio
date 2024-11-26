import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const projects = [
    {
      title: "Sports Analytics",
      description: [
        "Developed an analytics platform for sports data, using Python for data analysis and React for the frontend.",
        "Enabled in-depth performance tracking, visualization, and insights for athletes and teams.",
        "Tracker refreshes every 15 minutes to fetch updated data.",
        "Integrated third-party APIs for real-time data updates and predictive analytics.",
      ],
      technologies: ["Python", "React", "JavaScript"],
      imageSrc: "placement.JPG",
      imageAlt: "Sports Analytics Project Thumbnail",
      codeLink: "https://github.com/wnzel",
      demoLink: "https://github.com/wnzel",
    },
  ];

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white flex justify-center">
      <section id="projects" className="w-full max-w-4xl px-8 py-6 text-left">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className={`mb-12 ${
              project.title === "Sports Analytics" ? "sm:order-first" : ""
            }`}
          >
            <div
              className={`flex flex-col sm:flex-row gap-6 ${
                project.title === "Sports Analytics" ? "sm:flex-col" : ""
              }`}
            >
              <div
                className={`w-full ${
                  project.title === "Sports Analytics"
                    ? "sm:max-w-[30rem] lg:max-w-[30rem]"
                    : "sm:w-96 lg:w-96"
                }`}
              >
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className={`w-full h-auto rounded-md ${
                    project.title === "Sports Analytics"
                      ? "sm:max-w-full"
                      : "max-w-[600px]"
                  }`}
                />
              </div>
              <div className="w-full sm:w-2/3 lg:w-3/4">
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <ul className="text-gray-700 dark:text-gray-300 text-lg mb-6 space-y-2">
                  {project.description.map((line, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-xl">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 flex-wrap mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white text-lg font-medium flex items-center"
                  >
                    <FontAwesomeIcon icon={faGithub} className="mr-2" /> View
                    Code
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white text-lg font-medium flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="mr-2"
                    />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;