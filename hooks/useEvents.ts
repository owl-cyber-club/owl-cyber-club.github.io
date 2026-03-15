import { useState, useEffect } from "react";
import { Event } from "../types";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/events.json");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const rawData: Event[] = await response.json();
        
        // Expand series events
        const expandedEvents: Event[] = [];
        for (const e of rawData) {
          if (e.series && e.startDate && e.endDate) {
            let current = new Date(e.startDate + 'T12:00:00');
            const end = new Date(e.endDate + 'T12:00:00');
            
            while (current <= end) {
              const year = current.getFullYear();
              const month = String(current.getMonth() + 1).padStart(2, '0');
              const day = String(current.getDate()).padStart(2, '0');
              
              expandedEvents.push({
                ...e,
                date: `${year}-${month}-${day}`
              });
              
              if (e.series === 'weekly') {
                current.setDate(current.getDate() + 7);
              } else if (e.series === 'bi-weekly') {
                current.setDate(current.getDate() + 14);
              } else if (e.series === 'monthly') {
                current.setMonth(current.getMonth() + 1);
              } else {
                break;
              }
            }
          } else {
            expandedEvents.push(e);
          }
        }
        
        setEvents(expandedEvents);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
