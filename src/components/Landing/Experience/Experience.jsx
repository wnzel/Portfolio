import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const automationInternship = {
  title: "Software Engineer Intern",
  organization: "The Automation Interns",
  location: "Tempe, Arizona",
  dates: "May 2026 - Present",
  logo: "/experience/automation-interns.png",
  logoAlt: "The Automation Interns",
  bullets: [
    "Reduced administrative burden by 40%+ across client operations by deploying Claude (Anthropic API) and Python automation workflows to eliminate repetitive tasks and enable teams to focus on higher-value work within Cowork environments.",
    "Cut candidate screening time by 3x by building an LLM-powered recruiting chatbot and resume parser integrated with Gmail OAuth, Google Workspace, Microsoft 365, and PostgreSQL for structured, repeatable task execution with precision and consistency.",
    "Drove AI tool adoption among 5+ executives by delivering weekly Claude education sessions, drafting summaries, reports, and emails to operationalize AI-assisted productivity and digital productivity workflows across enterprise applications.",
  ],
  skills: ["React", "Python", "Docker", "JavaScript", "PostgreSQL", "Claude API"],
};

const freelanceExperience = {
  title: "Software Engineer",
  organization: "Freelance",
  location: "Remote",
  dates: "December 2024 - Present",
  bullets: [
    "Deploy and update client websites using cloud hosting and CI/CD workflows.",
    "Built business websites that allowed small companies to manage their online presence, showcasing store locations, hours, and service details with easy-to-use layouts.",
    "Built authentication and security systems that protect user privacy and ensure secure access.",
  ],
  skills: ["React", "Tailwind", "JavaScript", "Python", "PostgreSQL"],
};

const builderClubActivity = {
  title: "Vice President",
  organization: "Claude Builder Club by Anthropic",
  location: "Tempe, Arizona",
  dates: "March 2026 - Present",
  logo: "/experience/claude-builder-club.png",
  logoAlt: "Claude Builder Club by Anthropic",
  bullets: [
    "Automated Claude API access for 60+ student members by architecting a provisioning platform with multi-layer fraud detection, institutional email validation, and geolocation verification, eliminating manual onboarding overhead.",
    "Grew the club site to 20,000+ organic sessions with 100% Core Web Vitals by leading the technical direction of a 60+ member AI organization and mentoring engineers on LLM tooling and agentic workflows.",
  ],
};

function renderExperienceCard(entry, logoSrc) {
  return (
    <article className="border border-base-content/20 bg-base-100 px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
      <div className="flex items-center gap-4 sm:gap-6">
        {entry.logo ? (
          <div className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
            <img
              src={entry.logo}
              alt={entry.logoAlt}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
            <img
              src={logoSrc}
              alt="Freelance"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex min-w-0 items-baseline justify-between gap-3 sm:gap-5">
            <h3 className="min-w-0 text-base font-medium leading-5 tracking-tight text-base-content">
              {entry.title}
            </h3>
            <span className="shrink-0 whitespace-nowrap text-right text-xs font-light leading-5 text-base-content/50">
              {entry.dates}
            </span>
          </div>
          <div className="flex min-w-0 items-baseline justify-between gap-3 sm:gap-5">
            <p className="min-w-0 text-sm font-light leading-5 text-base-content/70">
              {entry.organization}
            </p>
            <span className="shrink-0 whitespace-nowrap text-right text-sm font-light leading-5 text-base-content/70">
              {entry.location}
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-6 flex list-disc flex-col gap-2 pl-5 text-sm font-light leading-relaxed text-base-content/70 marker:text-base-content/40">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {entry.skills?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Tools and technologies">
          {entry.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-base-content/5 px-3 py-1 text-xs font-light text-base-content/70"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function Experience({ showHeading = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    updateTheme();
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8"
    >
      {showHeading && (
        <h2 className="text-lg font-medium tracking-tight text-base-content">
          Experience
        </h2>
      )}

      <div className="flex flex-col gap-6">
        {renderExperienceCard(automationInternship)}
        {renderExperienceCard(
          freelanceExperience,
          isDark ? "/experience/w-black.png" : "/experience/w.png",
        )}
      </div>

      <h2 className="mt-2 text-lg font-medium tracking-tight text-base-content">
        Activities
      </h2>

      {renderExperienceCard(builderClubActivity)}
    </motion.section>
  );
}

Experience.propTypes = {
  showHeading: PropTypes.bool,
};

export default Experience;
