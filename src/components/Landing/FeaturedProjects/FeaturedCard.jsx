import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

function FeaturedCard({ project }) {
  const [isColored, setIsColored] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const timeoutRef = useRef(null);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    // Initial check
    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleImageClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // color state
    const newColoredState = !isColored;
    setIsColored(newColoredState);

    // monochrome after 10 seconds
    if (newColoredState) {
      timeoutRef.current = setTimeout(() => {
        setIsColored(false);
      }, 10000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // color when hovered/clicked
  const showColor = true; // Always color

  return (
    <article className="border border-base-content/20 bg-base-100 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-base-content tracking-tight mb-2">
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
        <div
          className="w-full cursor-pointer relative border border-base-content/20 overflow-hidden h-48"
          onClick={handleImageClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {typeof project.img === "object" && project.img !== null ? (
            <>
              {/* dark */}
              <img
                src={project.img.dark}
                alt={project.title}
                className={`absolute inset-0 border border-base-content/20 w-full h-full object-cover transition-[filter] duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}
                style={{ transition: "filter 500ms, opacity 0ms" }}
              />
              {/* light */}
              <img
                src={project.img.light}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}
                style={{ transition: "filter 500ms, opacity 0ms" }}
              />
            </>
          ) : (
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-48 object-cover transition-all duration-500"
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
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
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
            {project.source && (
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

          {project.detailed && (
            <Link
              to={`/projects/${project.slug}`}
              className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20  hover:border-base-content/60"
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
  index: PropTypes.number.isRequired,
};

export default FeaturedCard;
