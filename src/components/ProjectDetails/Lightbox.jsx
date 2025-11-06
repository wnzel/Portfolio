import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PropTypes from "prop-types";

export function Lightbox({
  isOpen,
  onClose,
  images,
  selectedImage,
  setSelectedImage,
  getCurrentImageSrc,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  projectTitle,
}) {
  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 min-h-dvh z-50 bg-base-100/0 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <div className="h-full w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-3">
            <div className="w-full hidden md:flex justify-end">
              <button
                onClick={onClose}
                className="bg-base-100 border border-base-content/20 p-2 hover:bg-base-content/2 transition-all cursor-pointer duration-200"
                aria-label="Close lightbox"
              >
                <X size={20} className="text-base-content" />
              </button>
            </div>

            {/* image container */}
            <div className="relative shrink flex items-center justify-center w-full">
              <div
                className="relative aspect-video touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <img
                    key={`lightbox-${selectedImage}`}
                    src={getCurrentImageSrc(images[selectedImage])}
                    alt={`${projectTitle} screenshot ${selectedImage + 1}`}
                    className="max-h-[75vh] aspect-video object-contain pointer-events-none"
                  />
                </AnimatePresence>
              </div>

              {/* navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full mr-4 bg-base-100 hover:bg-base-content/2 border border-base-content/20 p-3 transition-all cursor-pointer duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-base-content" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full ml-4 bg-base-100 hover:bg-base-content/2 border border-base-content/20 p-3 transition-all cursor-pointer duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-base-content" />
                  </button>
                </>
              )}
            </div>

            {/* counter */}
            <div className="bg-base-100 border border-base-content/20 px-3 py-1.5 text-xs font-light text-base-content">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
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
  getCurrentImageSrc: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  projectTitle: PropTypes.string.isRequired,
};
