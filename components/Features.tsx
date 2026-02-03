import React from 'react';
import { Card } from './ui/Card';
import { Shield, Cpu, Users, Globe, Trophy, Code } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Trophy className="w-6 h-6 text-cyber-yellow" />,
      title: "Competitive CTFs",
      description: "Participate in global Capture The Flag competitions. Pwn boxes, crack codes, and climb the leaderboard."
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyber-yellow" />,
      title: "Virtual Labs",
      description: "Hands-on experience with Kali Linux, Metasploit, and Wireshark in our safe, isolated virtual environments."
    },
    {
      icon: <Users className="w-6 h-6 text-cyber-yellow" />,
      title: "Networking",
      description: "Connect with industry professionals, alumni, and like-minded peers to fast-track your cybersecurity career."
    },
    {
      icon: <Globe className="w-6 h-6 text-cyber-yellow" />,
      title: "Global Community",
      description: "Access our Discord and Teams channels 24/7. Collaborate on projects and share threat intel."
    },
    {
      icon: <Shield className="w-6 h-6 text-cyber-yellow" />,
      title: "Blue Team Defense",
      description: "Learn how to harden systems, analyze logs, and respond to incidents in real-time simulations."
    },
    {
      icon: <Code className="w-6 h-6 text-cyber-yellow" />,
      title: "Secure Coding",
      description: "Workshops on writing secure code, understanding OWASP Top 10, and preventing vulnerabilities."
    }
  ];

  return (
    <section id="divisions" className="py-24 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Divisions</h2>
          <p className="text-gray-400 max-w-2xl">
            Whether you're into Red Teaming, Blue Teaming, or GRC, we have a specialized track for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="h-full">
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};