import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const automationInternship = {
  title: "Forward Deployed Engineer Intern",
  organization: "The Automation Interns",
  location: "Tempe, Arizona",
  dates: "May 2026 - Present",
  logo: "/experience/automation-interns.png",
  logoAlt: "The Automation Interns",
  description:
    "Built internal tools and AI-powered automation for a corporate client, working across recruiting, finance, accounting, and operations.",
  bullets: [
    "Built an LLM-powered recruiting assistant and resume workflow to help streamline candidate screening and internal recruiting tasks.",
    "Developed agentic tools and automated workflows for teams across finance, accounting, and operations, supporting roughly 28 employees.",
    "Set up and maintained internal infrastructure using Mac minis, Docker, and self-hosted services for running tools and databases.",
    "Led AI automation sessions for employees and executives, teaching practical ways to use Claude, LLM tools, and agentic workflows in their day-to-day work.",
  ],
  skills: ["Python", "React", "Docker", "PostgreSQL", "Claude API", "LLMs"],
};

const freelanceExperience = {
  title: "Software Engineer",
  organization: "Freelance",
  location: "Remote",
  dates: "December 2024 - Present",
  description:
    "Built and maintained websites for small businesses and independent clients, handling development, deployment, and ongoing updates.",
  bullets: [
    "Built business and portfolio websites using modern frontend and backend technologies.",
    "Deployed and maintained client websites, including hosting, updates, and CI/CD workflows.",
    "Worked on authentication, security, databases, and backend features depending on each project’s needs.",
  ],
  skills: ["React", "Tailwind", "JavaScript", "Python", "PostgreSQL", "CI/CD"],
};

const builderClubActivity = {
  title: "Vice President",
  organization: "Claude Builder Club by Anthropic",
  location: "Tempe, Arizona",
  dates: "March 2026 - Present",
  logo: "/experience/claude-builder-club.png",
  logoAlt: "Claude Builder Club by Anthropic",
  description:
    "Help lead the Claude Builder Club at ASU, working with a student team to organize events, build club infrastructure, and teach students about AI development.",
  bullets: [
    "Help organize hackathons, workshops, and Claude-focused events for students.",
    "Work with a 10+ person team to build and maintain the club website, hackathon portal, and other internal systems.",
    "Teach students how to use Claude, LLM tools, and agentic workflows through workshops and hands-on sessions.",
    "Help coordinate the club’s relationship with Anthropic and support the broader student community around AI development.",
  ],
  skills: ["Claude", "LLMs", "React", "Hackathons", "Leadership"],
};

function renderExperienceCard(entry, logoSrc) {
  return (
    <article className="border border-base-content/20 bg-base-100 px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
      <div className="flex items-center gap-4 sm:gap-6">
        {entry.logo ? (
          <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <img
              src={entry.logo}
              alt={entry.logoAlt}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
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

      {entry.description && (
        <p className="mt-4 text-sm font-light leading-relaxed text-base-content/70">
          {entry.description}
        </p>
      )}

      {entry.bullets?.length > 0 && (
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm font-light leading-relaxed text-base-content/70 marker:text-base-content/40">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {entry.skills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Tools and technologies">
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

      <div>
        <h2 className="text-lg font-medium tracking-tight text-base-content mb-3">
          Extracurriculars
        </h2>

        {renderExperienceCard(builderClubActivity)}
      </div>
    </motion.section>
  );
}

Experience.propTypes = {
  showHeading: PropTypes.bool,
};

export default Experience;
