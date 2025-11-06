import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import projectsData from "@/json/projects.json";
import FeaturedCard from "./FeaturedCard";
import { motion, useInView, useAnimation } from "framer-motion";

function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const featured = projectsData.slice(0, 3);
    setFeaturedProjects(featured);
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.4 }}
      className="px-4 flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-base-content tracking-tight">
          Featured Projects
        </h2>
        <Link
          to="/projects"
          className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors flex items-center gap-1 border-b border-base-content/20 hover:border-base-content/60"
        >
          View all
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* projects */}
      <div className="flex flex-col gap-6">
        {featuredProjects.map((project, index) => (
          <FeaturedCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default FeaturedProjects;
