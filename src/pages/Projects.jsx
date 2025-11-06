import ProjectCard from "@/components/Projects/ProjectCard";
import projects from "@/json/projects.json";

function Projects() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
