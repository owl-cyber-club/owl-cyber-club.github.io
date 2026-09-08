import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpDown, Image as ImageIcon } from "lucide-react";
import { useGallery } from "../hooks/useGallery";
import { Album } from "../types";
import { AlbumModal } from "./AlbumModal";

interface GalleryViewProps {
  onClose: () => void;
}

type SortOrder = "newest" | "oldest";

export const GalleryView: React.FC<GalleryViewProps> = ({ onClose }) => {
  const { albums, loading } = useGallery();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const sortedAlbums = useMemo(() => {
    return [...albums].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [albums, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto pt-20 pb-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <ImageIcon className="text-cyber-yellow" />
              Photo Gallery
            </h1>
            <p className="text-gray-400">
              Memories and moments from our club events.
            </p>
          </div>

          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowUpDown size={16} className="text-cyber-yellow" />
            Sort by: {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="inline-block w-8 h-8 border-2 border-cyber-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAlbums.map((album) => (
              <motion.div
                key={album.id}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={album.coverPhoto}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-cyber-yellow text-sm font-mono mb-1">
                      {new Date(album.date + "T12:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-white border border-white/10">
                    {album.photos.length} Photos
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyber-yellow transition-colors line-clamp-2">
                    {album.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <AlbumModal
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

