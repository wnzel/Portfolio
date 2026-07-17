import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience/Experience";

const tabs = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
];

function CareerTabs() {
  const [activeTab, setActiveTab] = useState("work");

  const selectAdjacentTab = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const nextTab = activeTab === "work" ? "education" : "work";
    setActiveTab(nextTab);
    document.getElementById(`${nextTab}-tab`)?.focus();
  };

  return (
    <section
      className="flex flex-col gap-3 md:w-[704px] md:self-center"
      aria-label="Career history"
    >
      <div
        className="grid grid-cols-2 border border-base-content/20 bg-base-200 p-1"
        role="tablist"
        aria-label="Work and education"
        onKeyDown={selectAdjacentTab}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content/70 ${
                isActive
                  ? "border border-base-content/20 bg-transparent font-medium text-base-content"
                  : "border border-transparent font-light text-base-content/60 hover:text-base-content"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          tabIndex={0}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base-content/70"
        >
          {activeTab === "work" ? (
            <Experience showHeading={false} />
          ) : (
            <Education showHeading={false} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default CareerTabs;
