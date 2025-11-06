import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SkillItem from "./SkillItem";

function SkillCategory({ category, skills, categoryIndex }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getFirstRowSkills = (skills) => {
    return skills.slice(0, 4);
  };

  const getAdditionalSkills = (skills) => {
    return skills.slice(4);
  };

  const shouldShowMoreButton = (skills) => {
    return skills.length > 4;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
      className="flex flex-col gap-3"
    >
      {/* label */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-base-content/50 font-light uppercase tracking-wider">
          {category}
        </span>
        <div className="flex-1 h-px bg-base-content/10" />

        {/* Show more button */}
        {shouldShowMoreButton(skills) && (
          <button
            onClick={toggleExpand}
            className="text-xs text-base-content/50 hover:text-base-content transition-colors flex items-center gap-1 font-light cursor-pointer"
          >
            <span>
              {isExpanded
                ? "Show less"
                : `Show ${getAdditionalSkills(skills).length} more`}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={14} />
            </motion.div>
          </button>
        )}
      </div>

      {/* grid */}
      <div>
        {/* First row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {getFirstRowSkills(skills).map((skill, index) => (
            <SkillItem
              key={skill}
              skill={skill}
              index={index}
              isInitiallyVisible={true}
            />
          ))}
        </div>

        {/* other rows */}
        <AnimatePresence>
          {isExpanded && getAdditionalSkills(skills).length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                {getAdditionalSkills(skills).map((skill, index) => (
                  <div key={skill}>
                    <SkillItem
                      skill={skill}
                      index={index + 4}
                      isInitiallyVisible={false}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

SkillCategory.propTypes = {
  category: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryIndex: PropTypes.number.isRequired,
};

export default SkillCategory;
