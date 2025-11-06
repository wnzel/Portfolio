import { motion, useInView, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SkillCategory from "@/components/Landing/Skills/SkillCategory";
import skills from "@/json/skills.json";

function Skills() {
  const [skillCategories, setSkillCategories] = useState({});

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    setSkillCategories(skills);
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
      className="px-4 flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex items-center justify-start">
        <h2 className="text-lg font-medium text-base-content tracking-tight">
          Skills
        </h2>
      </div>

      {/* category */}
      {Object.entries(skillCategories).map(
        ([category, skills], categoryIndex) => (
          <SkillCategory
            key={category}
            category={category}
            skills={skills}
            categoryIndex={categoryIndex}
          />
        )
      )}
    </motion.div>
  );
}

export default Skills;
