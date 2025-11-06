import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ServerStatus from "./ServerStatus";

function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isColored, setIsColored] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const newColoredState = !isColored;
    setIsColored(newColoredState);
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

  const showColor = true; // Always color
  const isRamenGames = project.title.toLowerCase().includes("ramen");
  const hasDetails = project.slug && project.detailed;

  // Check if project has themed images
  const hasThemedImages =
    project.img && typeof project.img === "object" && project.img !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative border border-base-content/20 rounded-none overflow-hidden bg-base-100">
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div
            onClick={toggleExpand}
            className="p-6 cursor-pointer hover:bg-base-content/2 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-medium text-base-content tracking-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-base-content/40 text-xs">
                  {String(project.id).padStart(2, "0")}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-base-content/40"
                >
                  <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                </motion.div>
              </div>
            </div>
            {/* Tech Stack */}
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

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-base-100"
              >
                <div className="px-6 pb-6">
                  {/* Image */}
                  {project.img && (
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="mb-4"
                    >
                      {hasThemedImages ? (
                        <div
                          className="cursor-pointer border border-base-content/20 relative overflow-hidden h-48"
                          onClick={handleImageClick}
                        >
                          {/* Dark image */}
                          <img
                            src={project.img.dark}
                            alt={project.title}
                            className={`absolute inset-0  w-full h-full object-cover transition-[filter] duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}
                            style={{
                              transition: "filter 500ms, opacity 0ms",
                            }}
                          />
                          {/* Light image */}
                          <img
                            src={project.img.light}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}
                            style={{
                              transition: "filter 500ms, opacity 0ms",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer border border-base-content/20"
                          onClick={handleImageClick}
                        >
                          <img
                            src={project.img}
                            alt={project.title}
                            className="w-full h-48 object-cover transition-all duration-500"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                  {/* Description */}
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="mb-4"
                  >
                    {project.description.map((text, i) => (
                      <p
                        key={i}
                        className="text-sm text-base-content/70 leading-relaxed font-light"
                      >
                        {text}
                      </p>
                    ))}
                  </motion.div>
                  {/* Server Status */}
                  {isRamenGames && (
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, delay: 0.17 }}
                      className="mb-4"
                    >
                      <ServerStatus />
                    </motion.div>
                  )}
                  {/* Links */}
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-between gap-4 pt-2"
                  >
                    {/* Left side - External links */}
                    <div className="flex flex-wrap gap-4">
                      {project.site && (
                        <a
                          href={project.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20  hover:border-base-content/60"
                          onClick={(e) => e.stopPropagation()}
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
                          className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20  hover:border-base-content/60"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Source Code
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                    {/* Right side - View Details */}
                    {hasDetails && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1.5 border-b border-base-content/20  hover:border-base-content/60"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Details
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
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
    source: PropTypes.string,
    site: PropTypes.string,
    detailed: PropTypes.object,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectCard;
