import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import StatusBadge from "./StatusBadge";

const linkClassName =
  "flex items-center gap-1.5 whitespace-nowrap border-b border-base-content/20 text-sm font-light text-base-content transition-colors hover:border-base-content/60 hover:text-base-content/60";

// variant="business" is the plain-language card used on /projects/businesses:
// no tech stack or source code, and details open the business version of the page.
function ProjectCard({ project, variant = "default" }) {
  const isBusiness = variant === "business";
  const detailsPath =
    project.detailed && project.slug
      ? `${isBusiness ? "/projects/businesses" : "/projects"}/${project.slug}`
      : null;
  const imgSrc =
    typeof project.img === "object" && project.img !== null
      ? project.img.dark
      : project.img;
  const meta = [project.industry, project.location].filter(Boolean).join(" · ");
  const source = isBusiness ? null : project.source;

  const image = imgSrc && (
    <div className="relative aspect-video w-full overflow-hidden border border-base-content/20">
      <img
        src={imgSrc}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );

  return (
    <article className="flex h-full flex-col gap-4 border border-base-content/20 bg-base-100 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-2 text-base font-medium tracking-tight text-base-content">
            {project.title}
          </h3>
          {isBusiness ? (
            meta && (
              <p className="text-xs font-light text-base-content/50">{meta}</p>
            )
          ) : (
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
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {project.status && <StatusBadge status={project.status} />}
          {!isBusiness && (
            <span className="text-base-content/40 text-xs font-light">
              {String(project.id).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {image &&
        (detailsPath ? (
          <Link
            to={detailsPath}
            className="group block"
            aria-label={`${project.title} details`}
          >
            {image}
          </Link>
        ) : (
          image
        ))}

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
      {(project.site || source || detailsPath) && (
        <div className="mt-auto grid w-full grid-cols-3 items-center pt-2">
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className={`col-start-1 justify-self-start ${linkClassName}`}
            >
              View Live
              <ExternalLink size={14} />
            </a>
          )}
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className={`col-start-2 justify-self-center ${linkClassName}`}
            >
              Source Code
              <Github size={14} />
            </a>
          )}
          {detailsPath && (
            <Link
              to={detailsPath}
              className={`col-start-3 justify-self-end ${linkClassName}`}
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

ProjectCard.propTypes = {
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
    industry: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    source: PropTypes.string,
    site: PropTypes.string,
    detailed: PropTypes.object,
  }).isRequired,
  variant: PropTypes.oneOf(["default", "business"]),
};

export default ProjectCard;
