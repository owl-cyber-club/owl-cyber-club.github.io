import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

import { InteractiveStars } from "./InteractiveStars";
import { CLUB_EVENTS } from "../data/events";

const currentYear = new Date().getFullYear();
const sessionsThisYear = CLUB_EVENTS.filter((e) => {
  if (e.date === "TBD") return false;
  const date = new Date(e.date + "T12:00:00");
  return date.getFullYear() === currentYear;
}).length;

const HERO_STATS = [
  { label: "Active Members", value: "90+" },
  { label: "Hands-on Workshops", value: "20+" },
  { label: `Sessions this year`, value: sessionsThisYear.toString() },
];

export const Hero: React.FC = () => {
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
          Empowering the next generation of cyber defenders at Kennesaw State
          University through hands-on learning, community support, and
          innovative security solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button>
            Start Hacking
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            About Us
          </Button>
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
