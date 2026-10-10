import projects from "@/json/projects.json";

// Filter bubbles on /projects. "All" is the default when no filter is set.
export const projectFilters = [
  { id: "music", label: "Music" },
  { id: "client", label: "Client Work" },
  { id: "data-ai", label: "Data & AI" },
];

export const isClientProject = (project) =>
  project.categories?.includes("client") ?? false;

export const clientProjects = projects.filter(isClientProject);
