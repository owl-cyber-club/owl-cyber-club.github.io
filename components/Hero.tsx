import React from "react";

import { InteractiveStars } from "./InteractiveStars";
import { useEvents } from "../hooks/useEvents";

export const Hero: React.FC = () => {
  const { events } = useEvents();

  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;
  const currentYearStr = todayDate.getFullYear().toString();

  const sessionsThisYear = events.filter((e) => {
    if (!e.date || e.date === "TBD") return false;
    return e.date.startsWith(currentYearStr) && e.date <= todayString;
  }).length;

  const HERO_STATS = [
    { label: "Active Members", value: "50+" },
    { label: "Sessions this year", value: sessionsThisYear.toString() },
    { label: "Semesters Active", value: "3" },
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg z-0" />
      <InteractiveStars />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <a
          href="#events"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-yellow"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 uppercase tracking-wider group-hover:text-cyber-yellow transition-colors">
            Upcoming Events
          </span>
        </a>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-yellow to-yellow-600">
            OWL Cyber Club
          </span>
        </h1>

        <p className="text-xl md:text-2l text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Empowering the next generation of cyber defenders at KSU through
          hands-on learning, community support, and lasting professional
          relationships.
        </p>

        <div className="flex items-center justify-center p-2 text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          The OWL Cyber Club is an official RSO (Registered Student
          Organization) at Kennesaw State University, approved and overseen by
          the Department of Student Activities.
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 border-t border-white/10 pt-8">
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
