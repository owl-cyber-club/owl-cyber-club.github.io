import React from 'react';
import { Card } from './ui/Card';
import { Github, Twitter, Linkedin } from 'lucide-react';

const TEAM_MEMBERS = [
  { 
    name: 'Manohar Raavi', 
    role: 'Advisor', 
    image: '/ManoharRaavi.png',
    linkedin: 'https://www.linkedin.com/in/manohar-raavi-8569a789/'
  },
  { 
    name: 'Amrut Ramasamy', 
    role: 'President', 
    image: 'https://ui-avatars.com/api/?name=Amrut+Ramasamy&background=random',
    github: 'https://github.com/NectarCoder',
    linkedin: 'https://www.linkedin.com/in/amrutvyasa/'
  },
  { 
    name: 'Lisa Thiongo', 
    role: 'Vice President', 
    image: 'https://ui-avatars.com/api/?name=Lisa+Thiongo&background=random',
    github: 'https://github.com/LisaThiongo',
    linkedin: 'https://www.linkedin.com/in/lisa-thiongo-b0b173240/'
  },
  { 
    name: 'Sanketh Chapaneri', 
    role: 'Secretary', 
    image: '/sanketh.jpg',
    github: 'https://github.com/DoNotDisturbs',
    linkedin: 'https://www.linkedin.com/in/sanketh-chapaneri-a285761b8/'
  },
  { 
    name: 'Christopher Forrester-Jack', 
    role: 'Reservation Delegate', 
    image: 'https://ui-avatars.com/api/?name=Christopher+Forrester-Jack&background=random',
    github: 'https://github.com/CFJ200',
    linkedin: 'https://www.linkedin.com/in/christopherforrester-jack/'
  },
  { 
    name: 'Cassidie Grogan', 
    role: 'Treasurer', 
    image: '/Cassidie.png',
    github: 'https://github.com/CGrogan4',
    linkedin: 'https://www.linkedin.com/in/cassidie-grogan-62134127a/'
  },
];

export const Team: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-1/2 h-full opacity-10 pointer-events-none">
         <div className="w-full h-8 bg-cyber-yellow transform -skew-x-12 mb-8 blur-3xl"></div>
         <div className="w-2/3 h-8 bg-white transform -skew-x-12 mb-8 blur-3xl ml-auto"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-12">Meet the Core</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <Card key={idx} className="w-full sm:w-64 text-center group" hoverEffect={false}>
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyber-yellow transition-colors duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-cyber-yellow text-sm font-mono mb-4">{member.role}</p>
              
              <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Github size={18} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};