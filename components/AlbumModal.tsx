import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Album, Photo } from "../types";

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

export const AlbumModal: React.FC<AlbumModalProps> = ({ album, onClose }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < album.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[110] bg-black overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </button>
        <div className="text-right">
          <h2 className="text-xl font-bold text-white">{album.title}</h2>
          <p className="text-sm text-gray-400">{new Date(album.date + "T12:00:00").toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {album.photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-white/5"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={photo.thumbnail}
                alt={photo.caption || `Photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-black/50 rounded-full transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            {selectedPhotoIndex > 0 && (
              <button
                className="absolute left-4 p-3 text-gray-400 hover:text-white bg-black/50 rounded-full transition-colors z-10"
                onClick={prevPhoto}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <div className="relative max-w-5xl max-h-screen p-4 flex flex-col items-center">
              <motion.img
                key={selectedPhotoIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                src={album.photos[selectedPhotoIndex].url}
                alt={album.photos[selectedPhotoIndex].caption || "Full screen photo"}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              {album.photos[selectedPhotoIndex].caption && (
                <p className="text-white mt-4 text-lg">
                  {album.photos[selectedPhotoIndex].caption}
                </p>
              )}
            </div>

            {selectedPhotoIndex < album.photos.length - 1 && (
              <button
                className="absolute right-4 p-3 text-gray-400 hover:text-white bg-black/50 rounded-full transition-colors z-10"
                onClick={nextPhoto}
              >
                <ChevronRight size={32} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

