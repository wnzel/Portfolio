import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ProjectCard from "@/components/Projects/ProjectCard";
import projects from "@/json/projects.json";
import { projectFilters } from "@/lib/projects";

const filterOptions = [
  { id: undefined, label: "All", count: projects.length },
  ...projectFilters.map((filter) => ({
    ...filter,
    count: projects.filter((project) => project.categories.includes(filter.id))
      .length,
  })),
];

function Projects({ filter, onFilterChange }) {
  const visibleProjects = filter
    ? projects.filter((project) => project.categories.includes(filter))
    : projects;

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 md:w-[736px] mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-medium text-base-content tracking-tight">
          Projects
        </h1>

        {/* filter bubbles */}
        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap gap-2"
        >
          {filterOptions.map((option) => {
            const isActive = option.id === filter;

            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(option.id)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content/70 ${
                  isActive
                    ? "bg-base-content font-medium text-base-100"
                    : "bg-base-content/5 font-light text-base-content/70 hover:bg-base-content/10 hover:text-base-content"
                }`}
              >
                {option.label}
                <span
                  className={`ml-1.5 ${
                    isActive ? "text-base-100/60" : "text-base-content/40"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={`${filter ?? "all"}-${project.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

Projects.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default Projects;
