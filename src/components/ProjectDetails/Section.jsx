import { motion } from "framer-motion";
import PropTypes from "prop-types";

export function Section({ title, content, delay, withBorder = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`space-y-2 ${withBorder ? "border-l-2 border-base-content/10 pl-4" : ""}`}
    >
      <h2 className="text-lg font-medium text-base-content tracking-tight">
        {title}
      </h2>
      {typeof content === "string" ? (
        // for overview/motivatiopn
        <>
          <p className="text-sm font-light text-base-content/70 leading-relaxed">
            {content}
          </p>
        </>
      ) : (
        // for key features
        <div className="space-y-2">
          {content.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm font-light text-base-content/70"
            >
              <span className="text-base-content/40 text-xs mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  delay: PropTypes.number.isRequired,
  withBorder: PropTypes.bool,
};
