import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Team } from "./components/Team";
import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { Contact } from "./components/Contact";
import { ParticleBackground } from "./components/ParticleBackground";
import IntroAnimation from "./components/IntroAnimation";
import { CalendarView } from "./components/CalendarView";
import { GlobalEventDeepLink } from "./components/GlobalEventDeepLink";

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro if there's no hash (or just '#') AND no event deep link
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const search = window.location.search;
      const isRoot = !hash || hash === "#";
      const hasEventLink = new URLSearchParams(search).has("event");
      return isRoot && !hasEventLink;
    }
    return true; // Fallback for SSR if any
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [highlightJoinLinks, setHighlightJoinLinks] = useState(false);

  const handleJoinClick = () => {
    setHighlightJoinLinks(true);
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setHighlightJoinLinks(false);
    }, 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-cyber-yellow selection:text-black">
      <GlobalEventDeepLink />
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <ParticleBackground />
      <Navbar onJoinClick={handleJoinClick} />
      <main>
        <Hero />
        <Features />
        <Events onViewCalendar={() => setShowCalendar(true)} />
        <Team />
        <Contact onViewCalendar={() => setShowCalendar(true)} />
      </main>
      <Footer highlightJoinLinks={highlightJoinLinks} />
      
      <AnimatePresence>
        {showCalendar && (
          <CalendarView onClose={() => setShowCalendar(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
