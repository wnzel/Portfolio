import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import PropTypes from "prop-types";
import StatusBadge from "@/components/Projects/StatusBadge";

export function ProjectHeader({ project, showTechstack = true }) {
  const meta = [project.industry, project.location].filter(Boolean).join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-medium text-base-content tracking-tight">
            {project.title}
          </h1>
          {meta && (
            <p className="text-sm font-light text-base-content/60">{meta}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {project.status && <StatusBadge status={project.status} />}
          {showTechstack && (
            <span className="text-base-content/40 text-xs font-light">
              {String(project.id).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {/* tech stack */}
      {showTechstack && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.techstack.map((tech, i) => (
            <span key={tech} className="text-xs text-base-content/50 font-light">
              {tech}
              {i < project.techstack.length - 1 && (
                <span className="ml-3 text-base-content/20">/</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* links */}
      <div className="flex gap-4">
        {project.site && (
          <a
            href={project.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20 hover:border-base-content/60"
          >
            View Live
            <ExternalLink size={14} />
          </a>
        )}
        {showTechstack && project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20 hover:border-base-content/60"
          >
            Source Code
            <Github size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

ProjectHeader.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    techstack: PropTypes.arrayOf(PropTypes.string).isRequired,
    industry: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    site: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  showTechstack: PropTypes.bool,
};
