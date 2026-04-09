import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar as CalendarIcon, MapPin, Clock, Repeat, Ticket, ZoomIn, Share2, Check } from "lucide-react";
import { Event } from "../types";
import { generateEventSlug } from "../utils/slugify";
import { Tooltip } from "./Tooltip";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  title?: string;
  hideDateInBody?: boolean;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  events,
  title = "Event Details",
  hideDateInBody = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [zoomedFlyer, setZoomedFlyer] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = (event: Event) => {
    const slug = generateEventSlug(event.title);
    const url = `${window.location.origin}${window.location.pathname}?event=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(slug);
    setTimeout(() => {
      setCopiedLink(null);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
      {isOpen && events && events.length > 0 && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[120]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[121] flex items-center justify-center p-4 pointer-events-none">
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
              <div className="relative z-[1] px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-zinc-950/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyber-yellow/10 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-cyber-yellow" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {title}
                  </h3>
                </div>
                <Tooltip content="Close" position="bottom" className="shrink-0">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </Tooltip>
              </div>

              {/* Content */}
              <div className="relative z-[1] p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-6">
                  {events.map((event, idx) => (
                    <div key={idx} className="space-y-4 pb-6 last:pb-0 border-b last:border-0 border-white/5">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Tooltip content={event.series ? "Recurring Series" : "One-Time Event"} className="cursor-help translate-y-[1px]" position="bottom">
                            <span className="inline-block text-gray-500 hover:text-cyber-yellow/80 transition-colors">
                              {event.series ? <Repeat size={16} className="transform-gpu" /> : <Ticket size={16} className="-rotate-[18deg] transform-gpu backface-hidden" />}
                            </span>
                          </Tooltip>
                          {event.type && (
                            <span className="text-[10px] uppercase font-bold text-cyber-yellow tracking-widest bg-cyber-yellow/10 px-2 py-0.5 rounded border border-cyber-yellow/20 inline-block">
                              {event.type}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-2xl font-bold text-white leading-tight pr-8">{event.title}</h4>
                          <Tooltip content={copiedLink === generateEventSlug(event.title) ? "" : "Copy link to this event"}>
                            <button
                              onClick={() => handleShare(event)}
                              className="text-gray-400 hover:text-cyber-yellow transition-colors group/share shrink-0 mt-1 relative flex items-center justify-center"
                            >
                              {copiedLink === generateEventSlug(event.title) ? (
                                <>
                                  <motion.span 
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="absolute right-full mr-3 w-max text-[10px] tracking-wider font-mono font-bold uppercase bg-zinc-950/95 backdrop-blur-md border border-green-500/40 text-green-400 px-2.5 py-1.5 rounded flex items-center justify-center z-[130] shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                                  >
                                    Link Copied
                                  </motion.span>
                                  <Check size={20} className="text-green-500" />
                                </>
                              ) : (
                                <Share2 size={20} className="group-hover/share:scale-110 transition-transform" />
                              )}
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-cyber-yellow shrink-0" />
                          {!hideDateInBody && event.date && event.date !== "TBD" ? (
                            <>
                              <span className="text-white">
                                {new Date(event.date + "T12:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span>•</span>
                            </>
                          ) : null}
                          {!hideDateInBody && (!event.date || event.date === "TBD") ? (
                            <>
                              <span className="text-white">TBD</span>
                              <span>•</span>
                            </>
                          ) : null}
                          <span className="text-white">{event.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                          <MapPin size={16} className="text-cyber-yellow shrink-0" />
                          <span className="text-white">{event.location}</span>
                          {event.campus && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-yellow/10 text-cyber-yellow uppercase tracking-wider border border-cyber-yellow/20 shrink-0 mt-[1px]">
                              {event.campus}
                            </span>
                          )}
                      </div>

                      {event.description && (
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10 mt-4 leading-relaxed text-gray-300 text-sm">
                          {event.description}
                        </div>
                      )}

                      {event.flyer && (
                        <button
                          onClick={() => setZoomedFlyer(`/event-flyers/${event.flyer}`)}
                          className="mt-4 relative group cursor-pointer w-full rounded-lg overflow-hidden border border-white/10 max-h-96 flex justify-center bg-black/50 transition-colors hover:border-cyber-yellow/50"
                        >
                          <img
                            src={`/event-flyers/${event.flyer}`}
                            alt={`${event.title} flyer`}
                            className="max-w-full h-auto max-h-96 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-black/80 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/50 border border-white/10">
                              <ZoomIn className="w-4 h-4 text-cyber-yellow" /> Click to Expand
                            </span>
                          </div>
                        </button>
                      )}

                      {event.link && (
                        <div className="flex flex-col gap-3 pt-4">
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-cyber-yellow hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyber-yellow/20 text-sm"
                          >
                            <span>{event.linkText || "Join Meeting / Open Link"}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium py-2 transition-colors w-full"
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

      <AnimatePresence>
        {zoomedFlyer && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedFlyer(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-[95vw] max-h-[95vh] flex items-center justify-center pointer-events-none"
            >
              <img
                src={zoomedFlyer}
                alt="Zoomed Event Flyer"
                className="max-w-full max-h-[95vh] object-contain rounded-xl shadow-[0_0_100px_rgba(234,179,8,0.15)] pointer-events-auto cursor-default"
              />
              
              <Tooltip content="Close Flyer" position="bottom" className="absolute top-4 right-4 md:-right-16 md:top-0 z-[160]">
                <button
                  onClick={() => setZoomedFlyer(null)}
                  className="p-2 rounded-full bg-black/50 text-white hover:text-cyber-yellow hover:bg-white/10 transition-all backdrop-blur-md border border-white/10 pointer-events-auto cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </Tooltip>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
