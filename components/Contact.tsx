import React from "react";
import { Mail, MessageSquare, Calendar } from "lucide-react";
import { Button } from "./ui/Button";

interface ContactProps {
  onViewCalendar?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onViewCalendar }) => {
  return (
    <section id="contact" className="scroll-mt-20 py-24 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Get Involved */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get Involved</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Ready to dive in? Explore our upcoming events, join our discussion
              forums, and find out how you can get more involved with the Student
              Club. We're here to help you succeed and look forward to seeing you
              at our next meeting!
            </p>
            <div className="space-y-4">
              <button 
                onClick={onViewCalendar}
                className="w-full text-left flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-yellow/50 transition-all hover:bg-white/10 group block"
              >
                <div className="p-2 rounded-lg bg-cyber-yellow/10">
                  <Calendar className="w-5 h-5 text-cyber-yellow" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-cyber-yellow transition-colors">Upcoming Events</h3>
                  <p className="text-sm text-gray-500">Stay updated with our latest workshops</p>
                </div>
              </button>
              <a 
                href="https://discord.com/channels/1414712346336690256/1418237588115947540"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-yellow/50 transition-all hover:bg-white/10 group block"
              >
                <div className="p-2 rounded-lg bg-cyber-yellow/10">
                  <MessageSquare className="w-5 h-5 text-cyber-yellow" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-cyber-yellow transition-colors">Discussion Forums</h3>
                  <p className="text-sm text-gray-500">Collaborate and share ideas with peers</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyber-yellow/5 blur-[100px] rounded-full -z-10" />
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have questions or need more information? Feel free to reach out
                to Amrut Ramasamy (Club President). We're here to help you on
                your cybersecurity journey.
              </p>
              
              <a 
                href="mailto:aramasam@students.kennesaw.edu"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-full bg-cyber-yellow/10 group-hover:bg-cyber-yellow/20 transition-colors">
                  <Mail className="w-6 h-6 text-cyber-yellow" />
                </div>
                <div>
                  <p className="text-sm text-cyber-yellow font-mono uppercase tracking-wider">Email Us</p>
                  <p className="text-white font-semibold group-hover:text-cyber-yellow transition-colors">
                    aramasam@students.kennesaw.edu
                  </p>
                </div>
              </a>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-lg text-white font-semibold italic">
                  "Welcome aboard, and let's secure the future together!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
