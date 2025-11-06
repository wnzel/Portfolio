import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

export function Carousel({
  images,
  selectedImage,
  setSelectedImage,
  isDark,
  hasThemedImages,
  getCurrentImageSrc,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onImageClick,
  projectTitle,
}) {
  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="relative group">
        <div
          className="border border-base-content/20 overflow-hidden relative aspect-video bg-base-content/5 cursor-zoom-in touch-pan-y"
          onClick={onImageClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {hasThemedImages ? (
            <>
              {/* dark */}
              <img
                key={`${selectedImage}-dark`}
                src={images[selectedImage].dark}
                alt={`${projectTitle} screenshot ${selectedImage + 1}`}
                className={`absolute inset-0 w-full h-full object-contain select-none pointer-events-none ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
                style={{ transition: "opacity 0ms" }}
                draggable={false}
              />
              {/* light */}
              <img
                key={`${selectedImage}-light`}
                src={images[selectedImage].light}
                alt={`${projectTitle} screenshot ${selectedImage + 1}`}
                className={`absolute inset-0 w-full h-full object-contain select-none pointer-events-none ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
                style={{ transition: "opacity 0ms" }}
                draggable={false}
              />
            </>
          ) : (
            <img
              key={selectedImage}
              src={getCurrentImageSrc(images[selectedImage])}
              alt={`${projectTitle} screenshot ${selectedImage + 1}`}
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-base-100 hover:bg-base-content/2 border border-base-content/20 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-base-content" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-base-100 hover:bg-base-content/2 border border-base-content/20 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-base-content" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`h-1 transition-all cursor-pointer ${
                selectedImage === i
                  ? "w-8 bg-base-content"
                  : "w-6 bg-base-content/20 hover:bg-base-content/40"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string.isRequired,
        light: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  selectedImage: PropTypes.number.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  hasThemedImages: PropTypes.bool.isRequired,
  getCurrentImageSrc: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
  projectTitle: PropTypes.string.isRequired,
};
