import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Divisions', href: '#divisions' },
  { name: 'AI Lab', href: '#ai-lab' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Join', href: '#join' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-cyber-yellow/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
            <img src="/logo.png" alt="Owl Cyber Club" className="h-10 w-10 relative z-10" />
          </div>
          <div className="text-xl font-bold tracking-tighter text-white">
            OWL<span className="text-cyber-yellow">CYBER</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.filter(l => l.name !== 'Join').map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-yellow group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a 
            href="#join"
            className="px-5 py-2 bg-cyber-yellow text-black font-bold rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-cyber-yellow/20"
          >
            Join the Club
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-6 py-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-cyber-yellow block py-2"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};