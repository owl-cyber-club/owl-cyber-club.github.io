import React, { useEffect, useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventModal } from "./EventModal";
import { generateEventSlug } from "../utils/slugify";
import { Event } from "../types";

export const GlobalEventDeepLink: React.FC = () => {
  const { events, loading } = useEvents();
  const [selectedEvents, setSelectedEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    if (loading || !events.length) return;
    const params = new URLSearchParams(window.location.search);
    const eventSlug = params.get("event");
    
    if (eventSlug) {
      // Find the best match, prioritize exact slug matches
      const foundEvents = events.filter((e) => generateEventSlug(e.title) === eventSlug);
      
      if (foundEvents.length > 0) {
        // If it's a series, try to find an upcoming instance
        const todayDate = new Date();
        const todayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;
        
        let bestMatch = foundEvents[0];
        const upcomingMatch = foundEvents.find(e => {
            const eDate = e.date || "TBD";
            return eDate === "TBD" || eDate >= todayString;
        });

        if (upcomingMatch) {
            bestMatch = upcomingMatch;
        }

        setSelectedEvents([bestMatch]);
      }
    }
  }, [events, loading]);

  const handleClose = () => {
    setSelectedEvents(null);
    // Remove query params but preserve hash
    const newUrl = window.location.pathname + window.location.hash;
    window.history.pushState({}, "", newUrl);
  };

  if (!selectedEvents) return null;

  return (
    <EventModal
      isOpen={true}
      events={selectedEvents}
      onClose={handleClose}
      title="Event Details"
    />
  );
};
