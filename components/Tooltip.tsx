import React, { ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string; // Container classes (e.g. w-full, flex, inline-flex)
  tooltipClassName?: string; // Override tooltip style (e.g. green instead of yellow)
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className = "inline-flex",
  tooltipClassName = "",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
    right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
    "top-left": "bottom-full left-0 mb-2 origin-bottom-left",
    "top-right": "bottom-full right-0 mb-2 origin-bottom-right",
    "bottom-left": "top-full left-0 mt-2 origin-top-left",
    "bottom-right": "top-full right-0 mt-2 origin-top-right",
  };

  const transformHoverClasses = {
    top: "-translate-y-1 group-hover/tooltip:translate-y-0",
    bottom: "translate-y-1 group-hover/tooltip:translate-y-0",
    left: "-translate-x-1 group-hover/tooltip:translate-x-0",
    right: "translate-x-1 group-hover/tooltip:translate-x-0",
    "top-left": "-translate-y-1 group-hover/tooltip:translate-y-0",
    "top-right": "-translate-y-1 group-hover/tooltip:translate-y-0",
    "bottom-left": "translate-y-1 group-hover/tooltip:translate-y-0",
    "bottom-right": "translate-y-1 group-hover/tooltip:translate-y-0",
  };

  return (
    <div className={`relative group/tooltip ${className}`}>
      {children}
      {content && (
        <div
          className={`pointer-events-none absolute z-[999] w-max opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 ${positionClasses[position]} ${transformHoverClasses[position]}`}
        >
          <div
            className={`text-[10px] tracking-wider font-mono font-bold uppercase bg-zinc-950/95 backdrop-blur-md border border-cyber-yellow/40 text-cyber-yellow px-2 md:px-3 py-1.5 rounded flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.15)] ${tooltipClassName}`}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
