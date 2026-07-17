import PropTypes from "prop-types";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

function FeaturedCard({ project }) {
  return (
    <article className="flex h-full flex-col gap-4 border border-base-content/20 bg-base-100 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-2 text-base font-medium tracking-tight text-base-content">
            {project.title}
          </h3>
          {/* techstack */}
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.techstack.map((tech, i) => (
              <span
                key={tech}
                className="text-xs text-base-content/50 font-light"
              >
                {tech}
                {i < project.techstack.length - 1 && (
                  <span className="ml-3 text-base-content/20">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <span className="text-base-content/40 text-xs font-light">
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      {project.img && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-base-content/20">
          {typeof project.img === "object" && project.img !== null ? (
            <img
              src={project.img.dark}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={project.img}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* description */}
      {project.description.map((text, i) => (
        <p
          key={i}
          className="text-sm text-base-content/70 leading-relaxed font-light"
        >
          {text}
        </p>
      ))}

      {/* links */}
      {(project.site || project.source || project.detailed) && (
        <div className="mt-auto grid w-full grid-cols-3 items-center pt-2">
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="col-start-1 flex items-center justify-self-start gap-1.5 whitespace-nowrap border-b border-base-content/20 text-sm font-light text-base-content transition-colors hover:border-base-content/60 hover:text-base-content/60"
            >
              View Live
              <ExternalLink size={14} />
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="col-start-2 flex items-center justify-self-center gap-1.5 whitespace-nowrap border-b border-base-content/20 text-sm font-light text-base-content transition-colors hover:border-base-content/60 hover:text-base-content/60"
            >
              Source Code
              <Github size={14} />
            </a>
          )}

          {project.detailed && (
            <Link
              to={`/projects/${project.slug}`}
              className="col-start-3 flex items-center justify-self-end gap-1.5 whitespace-nowrap border-b border-base-content/20 text-sm font-light text-base-content transition-colors hover:border-base-content/60 hover:text-base-content/60"
              onClick={(e) => e.stopPropagation()}
            >
              Details
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

FeaturedCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string.isRequired,
        light: PropTypes.string.isRequired,
      }),
    ]),
    techstack: PropTypes.arrayOf(PropTypes.string).isRequired,
    source: PropTypes.string,
    site: PropTypes.string,
    detailed: PropTypes.object,
  }).isRequired,
};

export default FeaturedCard;
