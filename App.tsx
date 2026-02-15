import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Team } from "./components/Team";
import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { ParticleBackground } from "./components/ParticleBackground";
import IntroAnimation from "./components/IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);
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
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <ParticleBackground />
      <Navbar onJoinClick={handleJoinClick} />
      <main>
        <Hero />
        <Features />
        <Events />
        <Team />
      </main>
      <Footer highlightJoinLinks={highlightJoinLinks} />
    </div>
  );
}

export default App;
