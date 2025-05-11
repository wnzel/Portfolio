import React from "react";

function Skills() {
  const skills = [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "C++"],
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Node.js", "Flask", "FastAPI"],
      color: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      category: "Backend",
      items: ["Node.js", "Docker", "REST APIs"],
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      category: "Databases",
      items: ["Postgres", "SQL", "AWS", "Supabase", "Google Cloud"],
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      category: "Practices",
      items: ["Agile", "Version Control", "Git", "Testing & Debugging"],
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
  ];

  return (
    <div className="bg-white text-black dark:bg-zinc-950 dark:text-white flex justify-center">
      <section id="skills" className="w-full max-w-4xl px-8 py-6 text-left">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.category}>
              <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-4">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className={`relative p-1 rounded-full shadow-md px-3 ${skill.color} bg-opacity-30`}
                  >
                    <span
                      className={`${skill.textColor} text-xs font-semibold`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Skills;
