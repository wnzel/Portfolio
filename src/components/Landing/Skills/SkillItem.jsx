import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function SkillItem({ skill, index, isInitiallyVisible = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);

  const iconFile = (skillName) => {
    const fileNameMap = {
      "shadcn/ui": "shadcnui",
      AWS: "aws",
      "Google Cloud": "googlecloud",
    };
    return fileNameMap[skillName] || skillName;
  };

  const darkInvert = (skillName) => {
    const invertList = ["shadcn/ui", "Bash", "Motion"];
    return invertList.includes(skillName);
  };

  const lightInvert = (skillName) => {
    const invertList = ["Express", "Vercel", "GitHub", "Railway"];
    return invertList.includes(skillName);
  };

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // reveal icon
    setIsClicked(true);

    // hide icon
    timeoutRef.current = setTimeout(() => {
      setIsClicked(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showIcon = isHovered || isClicked;

  return (
    <motion.div
      initial={isInitiallyVisible ? { opacity: 0, y: 10 } : false}
      animate={isInitiallyVisible ? { opacity: 1, y: 0 } : {}}
      transition={
        isInitiallyVisible ? { duration: 0.3, delay: index * 0.02 } : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative"
    >
      <div className="border border-base-content/20 bg-base-100 transition-colors hover:bg-base-content/2 cursor-pointer w-full overflow-hidden">
        <div className="relative px-3 py-2 min-h-11 flex items-center justify-center">
          {/* name */}
          <motion.div
            animate={{ opacity: showIcon ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-sm font-light text-base-content">
              {skill}
            </span>
          </motion.div>

          {/* icon */}
          <motion.div
            animate={{ opacity: showIcon ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src={`/skills/${iconFile(skill)}.svg`}
                className={`max-w-full max-h-full object-contain ${
                  darkInvert(skill) ? "[html[data-theme='dark']_&]:invert" : ""
                } ${lightInvert(skill) ? "invert [html[data-theme='dark']_&]:invert-0" : ""}`}
                alt={skill}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isInitiallyVisible: PropTypes.bool,
};

export default SkillItem;
