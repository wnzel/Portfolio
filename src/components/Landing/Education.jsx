import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

function Education() {
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
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <h2 className="text-lg font-medium text-base-content tracking-tight">
        Education
      </h2>

      {/* Arizona State University card */}
      <div className="border border-base-content/20 bg-base-100 p-6">
        <div className="flex gap-6 items-center">
          <img
            src="asu.svg"
            alt="Arizona State University"
            className="w-16 sm:w-20 shrink-0"
          />

          {/* details */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-base font-medium text-base-content tracking-tight">
                Arizona State University
              </h3>
              <span className="text-xs text-base-content/50 font-light">
                2024 &#45; 2026
              </span>
            </div>
            <p className="text-sm text-base-content/70 font-light">
              B.S. in Computer Science
            </p>
          </div>
        </div>
      </div>

      {/* Phoenix College */}
      <div className="border border-base-content/20 bg-base-100 p-6">
        <div className="flex gap-6 items-center">
          <img
            src="pcn.png"
            alt="Phoenix College"
            className="w-16 sm:w-20 shrink-0"
          />

          {/* details */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-base font-medium text-base-content tracking-tight">
                Phoenix College
              </h3>
              <span className="text-xs text-base-content/50 font-light">
                2022 &#45; 2024
              </span>
            </div>
            <p className="text-sm text-base-content/70 font-light">
              A.A. in Computer Science
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Education;
