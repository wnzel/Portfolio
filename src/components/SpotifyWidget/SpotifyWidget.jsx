import { useRef, useState } from "react";
import { Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSpotifyNowPlaying } from "@/api/spotify";

const SpotifyWidget = () => {
  const { data, isLoading, error } = useSpotifyNowPlaying();
  const [isExpanded, setIsExpanded] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  // hide if error or loading
  if (isLoading || error) return null;

  const isPlaying = data && data.is_playing && data.item;

  // hide if nothing is playing
  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Desktop */}
      <div className="hidden sm:block border border-base-content/20 bg-base-100 p-3 shadow-lg w-72">
        <div className="flex items-center gap-3">
          {/* Album Art */}
          <img
            src={
              data.item.album.images[2]?.url || data.item.album.images[0]?.url
            }
            className="w-12 h-12 object-cover shrink-0"
            alt="Album Art"
          />

          {/* Song Info */}
          <div
            ref={containerRef}
            className="flex-1 flex flex-col gap-0.5 min-w-0"
          >
            <div className="overflow-hidden">
              <p
                ref={titleRef}
                className="text-sm font-light text-base-content truncate"
              >
                {data.item.name}
              </p>
            </div>
            <p className="text-xs font-light text-base-content/70 truncate">
              {data.item.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>

          {/* Spotify indicator */}
          <div className="shrink-0">
            <Music className="w-4 h-4 text-base-content/40" />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 border border-base-content/20 bg-base-100 flex items-center justify-center shadow-lg hover:bg-base-content/5 transition-colors"
        >
          {isExpanded ? (
            <X className="w-4 h-4 text-base-content" />
          ) : (
            <Music className="w-4 h-4 text-base-content" />
          )}
        </button>

        {/* Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-12 right-0 border border-base-content/20  bg-base-100 p-3 shadow-lg w-64"
            >
              <div className="flex items-center gap-3">
                {/* Album Art */}
                <img
                  src={
                    data.item.album.images[2]?.url ||
                    data.item.album.images[0]?.url
                  }
                  className="w-12 h-12 object-cover shrink-0"
                  alt="Album Art"
                />

                {/* Song Info */}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-light text-base-content truncate">
                    {data.item.name}
                  </p>
                  <p className="text-xs font-light text-base-content/70 truncate">
                    {data.item.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpotifyWidget;
