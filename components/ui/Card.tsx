import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`relative group p-[1px] rounded-xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
      
      <div className={`relative h-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-transform duration-300 ${hoverEffect ? 'group-hover:-translate-y-1' : ''}`}>
        {children}
      </div>
    </div>
  );
};