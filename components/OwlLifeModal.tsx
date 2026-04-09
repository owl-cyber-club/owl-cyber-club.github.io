import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import { Tooltip } from "./Tooltip";

interface OwlLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwlLifeModal: React.FC<OwlLifeModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-black border border-cyber-yellow/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.15)] pointer-events-auto"
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -inset-[80%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(234,179,8,0.2)_316deg,rgba(234,179,8,0.95)_334deg,rgba(234,179,8,0.35)_350deg,transparent_360deg)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5.5, ease: "linear", repeat: Infinity }}
                />
                <div className="absolute inset-[1.5px] rounded-2xl bg-black" />
              </div>

              {/* Header */}
              <div className="relative z-[1] bg-cyber-yellow/10 px-6 py-4 flex items-center justify-between border-b border-cyber-yellow/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyber-yellow/20 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-cyber-yellow" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white tracking-wide">
                    OFFICIAL{" "}
                    <span className="text-cyber-yellow">MEMBERSHIP</span>
                  </h3>
                </div>
                <Tooltip content="Close" position="bottom">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </Tooltip>
              </div>

              {/* Content */}
              <div className="relative z-[1] p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    To become an official member of the{" "}
                    <strong className="text-white">OWL Cyber Club</strong>, you
                    must register on our organization page on{" "}
                    <strong className="text-cyber-yellow">OwlLife</strong>.
                  </p>

                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Start Instructions
                    </h4>
                    <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                      <li className="pl-1">
                        <span className="text-white">Click</span> the link below
                        to open OwlLife.
                      </li>
                      <li className="pl-1">
                        <span className="text-white">Sign in</span> with your
                        KSU credentials.
                      </li>
                      <li className="pl-1">
                        Locate and click the{" "}
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs mx-1 font-bold">
                          JOIN
                        </span>{" "}
                        button (usually at the{" "}
                        <span className="text-cyber-yellow">top right</span> of
                        the page).
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href="https://owllife.kennesaw.edu/organization/owlcyberclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-cyber-yellow hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyber-yellow/20"
                  >
                    <span>Go to OwlLife Registration</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium py-2 transition-colors"
                  >
                    I'll do this later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
