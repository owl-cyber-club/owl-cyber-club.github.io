import React from 'react';
import { MessageCircle, Instagram, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="join" className="py-12 border-t border-white/10 bg-black relative">
       {/* Bottom glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-cyber-yellow/5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
           <div className="text-2xl font-bold font-mono tracking-tighter text-white">OWL<span className="text-cyber-yellow">CYBER</span></div>
           <p className="text-gray-500 text-sm mt-2">© 2024 Owl Cyber Club. All systems operational.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
              <Disc size={20} />
            </span>
            <span className="hidden md:inline">Discord</span>
          </a>
           <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
              <MessageCircle size={20} />
            </span>
            <span className="hidden md:inline">Teams</span>
          </a>
           <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="p-2 rounded-full bg-white/5 group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-colors">
              <Instagram size={20} />
            </span>
            <span className="hidden md:inline">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};