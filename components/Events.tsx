import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { EventModal } from "./EventModal";
import { Event } from "../types";

interface EventsProps {
  onViewCalendar?: () => void;
}

export const Events: React.FC<EventsProps> = ({ onViewCalendar }) => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (error) {
    console.error("Failed to load events:", error);
  }

  // Get latest 3 events from current date. Treat TBD as future/upcoming.
  // Filter out any past events based on the current date string (YYYY-MM-DD).
  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
  
  let seenClubMeet = false;

  const upcomingEvents = [...events]
    .filter((e) => {
      const eDate = e.date || "TBD";
      if (eDate === "TBD") return true;
      return eDate >= todayString;
    })
    .sort((a, b) => {
      const aDate = a.date || "TBD";
      const bDate = b.date || "TBD";
      if (aDate === "TBD") return 1;
      if (bDate === "TBD") return -1;
      return aDate.localeCompare(bDate);
    })
    .filter((e) => {
      if (e.type === "Club Meet" && e.series) {
        if (seenClubMeet) return false;
        seenClubMeet = true;
      }
      return true;
    })
    .slice(0, 3);

  const formatDate = (dateStr: string = "TBD") => {
    if (dateStr === "TBD") return { day: "TBD", month: "TBD" };
    const date = new Date(dateStr + "T12:00:00");
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
    };
  };

  return (
    <section
      id="events"
      className="scroll-mt-20 py-24 border-t border-white/5 bg-black"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          <button
            onClick={onViewCalendar}
            className="text-sm text-cyber-yellow hover:underline"
          >
            View Calendar &rarr;
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-cyber-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-mono text-sm">LOADING EVENTS...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => {
              const { day, month } = formatDate(event.date);
              const CardContent = (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <span className="block text-2xl font-bold text-white">
                          {day}
                        </span>
                        <span className="block text-xs text-gray-500 uppercase">
                          {month}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyber-yellow transition-colors flex items-center gap-2">
                          {event.title}
                          {event.flyer && (
                            <ImageIcon
                              size={16}
                              className="text-cyber-yellow/50 group-hover:text-cyber-yellow transition-colors"
                              aria-label="Has Flyer"
                            />
                          )}
                        </h3>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wide">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </>
              );

              const containerClass =
                "cursor-pointer group relative bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 rounded-xl p-6 transition-all duration-300 overflow-hidden block w-full text-left focus:outline-none focus:ring-2 focus:ring-cyber-yellow/50";

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedEvent(event)}
                  className={containerClass}
                >
                  {CardContent}
                </button>
              );
            })}
          </div>
        )}

        <EventModal 
          isOpen={!!selectedEvent} 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      </div>
    </section>
  );
};
