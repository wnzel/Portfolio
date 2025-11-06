import { Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/json/projects.json";
import { ProjectHeader } from "@/components/ProjectDetails/ProjectHeader";
import { Carousel } from "@/components/ProjectDetails/Carousel";
import { Lightbox } from "@/components/ProjectDetails/Lightbox";
import { Section } from "@/components/ProjectDetails/Section";
import { ColorPalette } from "@/components/ProjectDetails/ColorPalette";
import PropTypes from "prop-types";

export function ProjectDetails({ projectSlug }) {
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // theme change
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.slug === projectSlug);
    setProject(foundProject);
  }, [projectSlug]);

  const getCurrentImageSrc = useCallback(
    (imageData) => {
      if (!imageData) return null;
      if (typeof imageData === "object" && imageData !== null) {
        return isDark ? imageData.dark : imageData.light;
      }
      return imageData;
    },
    [isDark]
  );

  const hasThemedImages = useCallback(() => {
    if (!project?.detailed?.images || project.detailed.images.length === 0)
      return false;
    return (
      typeof project.detailed.images[0] === "object" &&
      project.detailed.images[0] !== null
    );
  }, [project]);

  const goToPrevious = useCallback(() => {
    setSelectedImage((prev) =>
      prev === 0 ? project.detailed.images.length - 1 : prev - 1
    );
  }, [project]);

  const goToNext = useCallback(() => {
    setSelectedImage((prev) =>
      prev === project.detailed.images.length - 1 ? 0 : prev + 1
    );
  }, [project]);

  // kyeboard support
  useEffect(() => {
    if (!project?.detailed?.images || project.detailed.images.length <= 1)
      return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
        return;
      }
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, isLightboxOpen, goToPrevious, goToNext]);

  // no scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  }, [touchStart, touchEnd, goToNext, goToPrevious]);

  if (!project) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-base-content font-light">Project not found</p>
          <Link
            to="/projects"
            className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors inline-flex items-center gap-2 border-b border-base-content/20"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project.detailed) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-base-content font-light">
            Detailed information coming soon
          </p>
          <Link
            to="/projects"
            className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors inline-flex items-center gap-2 border-b border-base-content/20"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/projects"
          className="text-sm font-light text-base-content hover:text-base-content/60 transition-colors inline-flex items-center gap-2 border-b border-base-content/20"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        {/* Header */}
        <ProjectHeader project={project} />

        {/* Images Carousel */}
        {project.detailed.images && project.detailed.images.length > 0 && (
          <Carousel
            images={project.detailed.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isDark={isDark}
            hasThemedImages={hasThemedImages()}
            getCurrentImageSrc={getCurrentImageSrc}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onImageClick={() => setIsLightboxOpen(true)}
            projectTitle={project.title}
          />
        )}

        {/* Lightbox */}
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={project.detailed.images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          getCurrentImageSrc={getCurrentImageSrc}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          projectTitle={project.title}
        />

        <div className="grid md:grid-cols-[1fr_auto] gap-2 md:gap-4">
          <Section
            title="Overview"
            content={project.detailed.overview}
            delay={0.2}
            withBorder
          />

          {project.detailed.colors && (
            <ColorPalette
              colors={project.detailed.colors}
              delay={0.2}
              isDark={isDark}
            />
          )}
        </div>

        <Section
          title="Motivation"
          content={project.detailed.motivation}
          delay={0.25}
        />

        <Section
          title="Key Features"
          content={project.detailed.features}
          delay={0.3}
        />
      </div>
    </div>
  );
}

export default ProjectDetails;

ProjectDetails.propTypes = {
  projectSlug: PropTypes.string.isRequired,
};
