import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const Events: React.FC = () => {
  const events = [
    { title: "Intro to Kali Linux", date: "Oct 15", time: "6:00 PM", location: "Discord", type: "Workshop" },
    { title: "Midnight CTF Qualifiers", date: "Oct 22", time: "8:00 PM", location: "Online", type: "Competition" },
    { title: "Industry Night: Red Hat", date: "Nov 01", time: "5:30 PM", location: "Student Union", type: "Social" },
  ];

  return (
    <section id="events" className="py-24 border-t border-white/5 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          <a href="#" className="text-sm text-cyber-yellow hover:underline">View Calendar &rarr;</a>
        </div>

        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="group relative bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 rounded-xl p-6 transition-all duration-300 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-center min-w-[60px]">
                    <span className="block text-2xl font-bold text-white">{event.date.split(' ')[1]}</span>
                    <span className="block text-xs text-gray-500 uppercase">{event.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyber-yellow transition-colors">{event.title}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wide">
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};