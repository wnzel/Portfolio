import { motion } from "framer-motion";
import ProjectCard from "@/components/Projects/ProjectCard";
import { clientProjects } from "@/lib/projects";

// Unlisted page for sharing with business owners: wnzel.dev/projects/businesses
const contactHref = `mailto:wenzelescudero@gmail.com?subject=${encodeURIComponent(
  "Website for my business"
)}`;

function Businesses() {
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8 md:w-[736px] mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-2xl font-medium tracking-tight text-base-content sm:text-3xl">
          Websites for businesses
        </h1>
        <div className="flex max-w-xl flex-col gap-2 text-sm font-light leading-relaxed text-base-content/70 sm:text-base">
          <p>
            I&apos;m Wenzel, a software engineer based in Phoenix. I build
            websites for small businesses that help customers find you, see
            your work, and get in touch.
          </p>
          <p>
            Here are a few I&apos;ve worked on. Open any project to see what
            the business needed and what I built, or visit the live site.
          </p>
        </div>
        <div>
          <a
            href={contactHref}
            className="inline-flex border border-base-content/30 px-3 py-1.5 text-sm font-medium text-base-content transition-colors hover:border-base-content/60 hover:bg-base-content hover:text-base-100"
          >
            Get in touch
          </a>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {clientProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
          >
            <ProjectCard project={project} variant="business" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Businesses;
