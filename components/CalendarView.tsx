import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { Event } from "../types";
import { EventModal } from "./EventModal";
import { Tooltip } from "./Tooltip";

interface CalendarViewProps {
  onClose: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onClose }) => {
  const { events: CLUB_EVENTS, loading } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return CLUB_EVENTS.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selectedDate
    ? CLUB_EVENTS.filter((e) => e.date === selectedDate)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto pt-20 pb-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Club Calendar
            </h1>
            <p className="text-gray-400">
              Stay updated with all our scheduled events and workshops.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-xl border border-cyber-yellow/20 shadow-[0_0_15px_rgba(234,179,8,0.05)]">
              <Tooltip content="Previous Month" position="top">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  <ChevronLeft size={20} />
                </button>
              </Tooltip>
              <div className="text-lg font-bold text-white min-w-[150px] text-center">
                {months[month]} {year}
              </div>
              <Tooltip content="Next Month" position="top">
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </Tooltip>
            </div>
            {CLUB_EVENTS.some((e) => e.date === "TBD") && (
              <button
                onClick={() => setSelectedDate("TBD")}
                className="text-xs font-bold text-cyber-yellow hover:underline"
              >
                View Pending Events (TBD)
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-2 border-cyber-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-cyber-yellow font-mono text-sm">
                  LOADING...
                </p>
              </div>
            </div>
          )}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="bg-zinc-900/80 p-4 text-center text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5"
            >
              {d}
            </div>
          ))}

          {days.map((day, i) => {
            if (day === null)
              return <div key={`empty-${i}`} className="bg-zinc-900/30 h-32" />;

            const events = getEventsForDate(day);
            const hasEvents = events.length > 0;
            const isToday =
              new Date().toDateString() ===
              new Date(year, month, day).toDateString();
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            return (
              <div
                key={day}
                onClick={() => hasEvents && setSelectedDate(dateStr)}
                className={`h-32 p-3 bg-zinc-900/50 transition-all duration-300 relative group ${hasEvents ? "cursor-pointer hover:bg-zinc-800" : ""}`}
              >
                <span
                  className={`text-sm font-mono ${isToday ? "text-cyber-yellow font-bold underline decoration-2 underline-offset-4" : "text-gray-500 group-hover:text-gray-300"}`}
                >
                  {String(day).padStart(2, "0")}
                </span>

                <div className="mt-2 space-y-1">
                  {events.map((e, idx) => (
                    <div
                      key={idx}
                      className="text-[10px] truncate px-1.5 py-0.5 rounded bg-cyber-yellow/10 border border-cyber-yellow/20 text-cyber-yellow font-medium"
                    >
                      {e.title}
                    </div>
                  ))}
                </div>

                {hasEvents && (
                  <div className="absolute bottom-2 right-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-yellow shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      <EventModal
        isOpen={!!selectedDate}
        events={selectedEvents}
        onClose={() => setSelectedDate(null)}
        title={selectedDate === "TBD"
          ? "To Be Determined"
          : selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }) : ""}
        hideDateInBody={true}
      />
    </motion.div>
  );
};
