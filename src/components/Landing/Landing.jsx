import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion, useInView, useAnimation } from "framer-motion";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import CareerTabs from "./CareerTabs";

function Landing() {
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
      className="flex flex-col gap-6 px-4 md:w-[736px] md:self-center"
    >
      {/* About */}
      <section className="grid grid-cols-[minmax(0,1fr)_108px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_152px] sm:gap-8">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-medium tracking-tight text-base-content sm:text-3xl">
              Wenzel Escudero{" "}
              <motion.span
                style={{ display: "inline-block" }}
                animate={{
                  rotate: [0, -12, 12, -12, 12, 0],
                }}
                transition={{ duration: 1, repeat: 6, ease: "easeInOut" }}
                className="cursor-default"
              >
                👋
              </motion.span>
            </h1>
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="inline-flex items-center text-base text-base-content/70 transition-colors hover:text-base-content sm:text-lg"
              >
                Phoenix, AZ 📍
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-1 p-2 shadow bg-base-100 rounded-box mt-2 outline outline-base-content/20"
              >
                <WeatherWidget />
              </div>
            </div>
            <p className="text-sm font-medium text-base-content sm:text-base">
              Software Engineer
            </p>
          </div>

          <p className="max-w-xl text-sm font-light leading-relaxed text-base-content/70 sm:text-base">
            Computer Science student at Arizona State University. I’m interested
            in AI tooling and distributed systems, especially building automation
            workflows, developer tools, and reliable backend services.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1b30UP0fvbi4hjR3H6blLVGd36NZN5F1N/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-base-content/30 px-3 py-1.5 text-sm font-medium text-base-content transition-colors hover:border-base-content/60 hover:bg-base-content hover:text-base-100"
            >
              Resume
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/wenzelescudero/"
              className="text-base-content hover:text-base-content/60 transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon className="text-xl" icon={faLinkedin} />
            </a>
            <a
              href="mailto:wenzelescudero@gmail.com"
              className="text-base-content hover:text-base-content/60 transition-colors"
              aria-label="Email"
            >
              <FontAwesomeIcon className="text-xl" icon={faEnvelope} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.github.com/wnzel"
              className="text-base-content hover:text-base-content/60 transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon className="text-xl" icon={faGithub} />
            </a>
          </div>
        </div>

        <div className="justify-self-end overflow-hidden border border-base-content/20 bg-base-100 shadow-sm">
          <img
            src="/wenzel.jpg"
            className="aspect-[4/5] w-[108px] object-cover object-top sm:w-[152px]"
            alt="Wenzel Escudero headshot"
          />
        </div>
      </section>

      {/* Work and Education */}
      <CareerTabs />
    </motion.div>
  );
}

export default Landing;
