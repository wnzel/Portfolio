import projects from "@/json/projects.json";

// Filter bubbles on /projects. "All" is the default when no filter is set.
export const projectFilters = [
  { id: "professional", label: "Professional" },
  { id: "personal", label: "Personal" },
];

export const isProfessionalProject = (project) =>
  project.categories?.includes("professional") ?? false;

export const professionalProjects = projects.filter(isProfessionalProject);
