import { useState, useRef } from "react";
import { motion } from "framer-motion";

const photos = [
  {
    id: "photo-wenzel",
    src: "/wenzel.jpg",
    alt: "Wenzel Escudero headshot",
  },
  {
    id: "photo-az",
    src: "/gcaz.jpg",
    alt: "Wenzel in Arizona",
  },
];

function PhotoCardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);

  const topIndex = currentIndex;
  const backIndex = (currentIndex + 1) % photos.length;

  const topPhoto = photos[topIndex];
  const backPhoto = photos[backIndex];

  const togglePhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 15;
    const velocityThreshold = 100;

    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > velocityThreshold
    ) {
      togglePhoto();
    }

    setTimeout(() => {
      isDragging.current = false;
    }, 80);
  };

  const handleCardClick = () => {
    if (!isDragging.current) {
      togglePhoto();
    }
  };

  return (
    <div className="flex justify-center w-full pr-2 pt-2">
      <div className="relative aspect-[4/5] w-[108px] sm:w-[152px] select-none">
        {/* Background Card - Peeks out from corner */}
        <motion.div
          key={`back-${backPhoto.id}`}
          onClick={togglePhoto}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && togglePhoto()}
          className="group absolute inset-0 z-0 cursor-pointer overflow-hidden border border-base-content/25 bg-base-200 shadow-sm"
          initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{ x: 7, y: -5, rotate: 4, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          title="Click to switch photo"
          aria-label="Next photo peeking out from behind"
        >
          <img
            src={backPhoto.src}
            alt={backPhoto.alt}
            className="h-full w-full object-cover object-top opacity-85 filter brightness-95 transition-transform duration-200 group-hover:scale-105 pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Foreground / Active Card - Subtly draggable and click-to-flip */}
        <motion.div
          key={`top-${topPhoto.id}`}
          onClick={handleCardClick}
          drag="x"
          dragConstraints={{ left: -25, right: 25 }}
          dragElastic={0.12}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          initial={{ x: 7, y: -5, rotate: 4, scale: 0.98 }}
          animate={{ x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          whileTap={{ cursor: "grabbing" }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing overflow-hidden border border-base-content/20 bg-base-100 shadow-md"
          title="Drag or click to switch photo"
          aria-label="Active photo"
        >
          <img
            src={topPhoto.src}
            alt={topPhoto.alt}
            className="pointer-events-none h-full w-full object-cover object-top"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default PhotoCardStack;
