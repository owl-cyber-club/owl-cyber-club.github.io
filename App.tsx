import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';

import { Team } from './components/Team';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-cyber-yellow selection:text-black">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Team />
        <Events />
      </main>
      <Footer />
    </div>
  );
}

export default App;