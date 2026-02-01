import { motion } from "motion/react";
import { Terminal, Shield, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center p-4 w-full max-w-6xl mx-auto text-center mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="absolute -inset-4 bg-neon-blue rounded-full opacity-20 blur-xl animate-pulse"></div>
        <Shield className="w-24 h-24 text-neon-blue relative z-10" />
      </motion.div>

      <motion.h1 
        className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-[length:200%_auto] animate-gradient"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        OWL CYBER CLUB
      </motion.h1>

      <motion.div 
        className="flex items-center gap-2 text-neon-green mb-12 bg-cyber-dark/80 border border-neon-green/30 px-4 py-2 rounded-md font-mono text-sm md:text-base shadow-[0_0_10px_rgba(10,255,10,0.2)]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Terminal size={18} />
        <span>SYSTEM.INIT_SEQUENCE_COMPLETE</span>
        <span className="w-2 h-4 bg-neon-green animate-pulse ml-1"/>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 w-full text-left max-w-4xl">
        {[
            { title: "DEFENSE", icon: Shield, color: "text-neon-blue", desc: "Network fortification and threat analysis protocols." },
            { title: "OFFENSE", icon: Cpu, color: "text-neon-purple", desc: "Ethical hacking and penetration testing methodologies." },
            { title: "RESEARCH", icon: Terminal, color: "text-neon-green", desc: "Vulnerability assessment and cryptographic studies." }
        ].map((item, i) => (
            <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.2) }}
                className="group relative p-6 bg-cyber-dark border border-white/10 hover:border-neon-blue/50 transition-colors overflow-hidden rounded-xl backdrop-blur-sm"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                <h3 className={`text-xl font-bold mb-2 ${item.color}`}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                <motion.div 
                    className={`absolute bottom-0 left-0 h-0.5 ${item.color.replace('text-', 'bg-')}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
                />
            </motion.div>
        ))}
      </div>
      
      <motion.button
         whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)" }}
         whileTap={{ scale: 0.95 }}
         className="mt-16 px-10 py-4 bg-transparent border border-neon-blue text-neon-blue font-bold text-lg uppercase tracking-widest hover:bg-neon-blue hover:text-black transition-colors relative overflow-hidden group"
      >
        <span className="relative z-10">Join the Network</span>
        <div className="absolute inset-0 bg-neon-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-left" />
      </motion.button>
    </div>
  );
}
