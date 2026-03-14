import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Event } from "../types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && event && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-zinc-950 border border-cyber-yellow/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)] pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -inset-[80%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(234,179,8,0.2)_316deg,rgba(234,179,8,0.95)_334deg,rgba(234,179,8,0.35)_350deg,transparent_360deg)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8.5, ease: "linear", repeat: Infinity }}
                />
                <div className="absolute inset-[1.5px] rounded-2xl bg-zinc-950" />
              </div>

              {/* Header */}
              <div className="relative z-[1] px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyber-yellow/10 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-cyber-yellow" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Event Details
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="relative z-[1] p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white pr-8">{event.title}</h4>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-cyber-yellow" />
                      <span className="text-white">{event.date && event.date !== "TBD" ? new Date(event.date + "T12:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "TBD"}</span>
                      <span>•</span>
                      <span className="text-white">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={16} className="text-cyber-yellow shrink-0" />
                      <span className="text-white">{event.location}</span>
                  </div>

                  {event.description && (
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 mt-4 leading-relaxed text-gray-300">
                      {event.description}
                    </div>
                  )}

                  {event.flyer && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                      <img src={event.flyer} alt={`${event.title} flyer`} className="w-full h-auto object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-cyber-yellow hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyber-yellow/20"
                    >
                      <span>Join Meeting / Open Link</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-white/5 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed border border-white/5">
                      <span>No Link Available</span>
                    </div>
                  )}
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium py-2 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
