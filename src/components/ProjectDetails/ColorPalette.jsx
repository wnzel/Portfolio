import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

export function ColorPalette({ colors, delay = 0, isDark }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentColors =
    typeof colors === "object" && colors.dark && colors.light
      ? isDark
        ? colors.dark
        : colors.light
      : colors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="my-auto"
    >
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 gap-0.5 justify-center">
        {currentColors.map((color, index) => (
          <div
            key={color}
            className={`relative flex ${
              index === currentColors.length - 1 &&
              currentColors.length % 2 !== 0
                ? "sm:col-start-2"
                : ""
            }`}
          >
            <button
              onClick={() => copyToClipboard(color, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-10 h-2.5 sm:w-8 sm:h-8 border border-base-content/20 cursor-pointer transition-opacity hover:opacity-80"
              style={{ backgroundColor: color }}
              aria-label={`Copy color ${color}`}
            />

            <AnimatePresence>
              {(hoveredIndex === index || copiedIndex === index) && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.125, ease: "easeOut" }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-base-100 border border-base-content/20 px-2 py-1 whitespace-nowrap z-10"
                >
                  <span className="text-xs font-light text-base-content">
                    {copiedIndex === index ? "Copied!" : color.toUpperCase()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

ColorPalette.propTypes = {
  colors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      dark: PropTypes.arrayOf(PropTypes.string).isRequired,
      light: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ]).isRequired,
  delay: PropTypes.number,
  isDark: PropTypes.bool.isRequired,
};
