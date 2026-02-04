import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

const HERO_STATS = [
  { label: 'Active Members', value: '150+' },
  { label: 'CTFs Won', value: '12' },
  { label: 'Weekly Sessions', value: '2' },
  { label: 'Industry Partners', value: '5+' },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-yellow"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">Recruiting Now</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Secure the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-yellow to-yellow-600">Future.</span> <br />
          Defend the <span className="text-gray-500">Network.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join the elite community of ethical hackers, security researchers, and cyber enthusiasts. 
          Master the art of defense through offense.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button>
            Start Hacking
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="secondary" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}>
            Explore Divisions
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};