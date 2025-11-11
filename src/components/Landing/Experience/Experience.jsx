import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Experience() {
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
      const theme = document.documentElement.getAttribute("data-theme");
      return theme === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () => {
      const theme = root.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };
    const obs = new MutationObserver(updateTheme);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    updateTheme();
    return () => obs.disconnect();
  }, []);

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
      className="flex flex-col gap-8"
    >
      <h2 className="text-lg font-medium text-base-content tracking-tight">
        Experience
      </h2>

      <div className="border border-base-content/20 bg-base-100 px-6 py-10">
        <div className="flex gap-6 items-start">
          {/* logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden bg-base-200 flex items-center justify-center sm:-mt-4">
            <img
              src={isDark ? "/experience/w-black.png" : "/experience/w.png"}
              alt="Freelance"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* details */}
          <div className="flex-1 flex flex-col gap-7">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                <h3 className="text-base font-medium text-base-content tracking-tight">
                  Software Developer
                </h3>
                <span className="text-xs text-base-content/50 font-light">
                  December 2024 &#45; Present
                </span>
              </div>
              <p className="text-sm text-base-content/70 font-light">
                Freelance, Remote
              </p>
            </div>

            {/* description */}
            <div className="flex flex-col gap-1 -ml-[85px] lg:-ml-25">
              <div className="flex items-baseline">
                <span className="text-base-content/50 mr-1">•</span>
                <p className="text-sm text-base-content/70 font-light">
                  Deploy and update client websites using cloud hosting and
                  CI/CD workflows.
                </p>
              </div>
              <div className="flex items-baseline">
                <span className="text-base-content/50 mr-1">•</span>
                <p className="text-sm text-base-content/70 font-light">
                  Built business websites that allowed small companies to manage
                  their online presence, showcasing store locations, hours, and
                  service details with easy to use layouts.
                </p>
              </div>
              <div className="flex items-baseline">
                <span className="text-base-content/50 mr-1">•</span>
                <p className="text-sm text-base-content/70 font-light">
                  Authentication and security systems protecting user privacy
                  and ensuring secure access.
                </p>
              </div>
            </div>

            {/* skills */}
            <div className="flex flex-wrap gap-2 -ml-[85px] lg:-ml-25">
              <span className="px-3 py-1 text-xs font-light rounded-full bg-base-content/5 text-base-content/70">
                React
              </span>
              <span className="px-3 py-1 text-xs font-light rounded-full bg-base-content/5 text-base-content/70">
                Tailwind
              </span>
              <span className="px-3 py-1 text-xs font-light rounded-full bg-base-content/5 text-base-content/70">
                JavaScript
              </span>
              <span className="px-3 py-1 text-xs font-light rounded-full bg-base-content/5 text-base-content/70">
                Python
              </span>
              <span className="px-3 py-1 text-xs font-light rounded-full bg-base-content/5 text-base-content/70">
                PostgreSQL
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
