import React from 'react';
import { Card } from './ui/Card';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Team: React.FC = () => {
  const team = [
    { name: "Alex Chen", role: "President", image: "https://picsum.photos/400/400?random=1" },
    { name: "Sarah Jones", role: "Vice President", image: "https://picsum.photos/400/400?random=2" },
    { name: "Mike Ross", role: "Red Team Lead", image: "https://picsum.photos/400/400?random=3" },
    { name: "Emily Blunt", role: "Blue Team Lead", image: "https://picsum.photos/400/400?random=4" },
    { name: "David Kim", role: "Event Coordinator", image: "https://picsum.photos/400/400?random=5" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
       {/* Abstract parallel shapes background */}
      <div className="absolute right-0 top-1/4 w-1/2 h-full opacity-10 pointer-events-none">
         <div className="w-full h-8 bg-cyber-yellow transform -skew-x-12 mb-8 blur-3xl"></div>
         <div className="w-2/3 h-8 bg-white transform -skew-x-12 mb-8 blur-3xl ml-auto"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-12">Meet the Core</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, idx) => (
            <Card key={idx} className="w-full sm:w-64 text-center group" hoverEffect={false}>
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyber-yellow transition-colors duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-cyber-yellow text-sm font-mono mb-4">{member.role}</p>
              
              <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href="#" className="text-gray-400 hover:text-white"><Github size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitter size={18} /></a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};