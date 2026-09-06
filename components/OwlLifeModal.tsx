import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
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
                <Tooltip content="Close" position="bottom-right">
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
                  {/* Notice Banner */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-cyber-yellow/10 border border-cyber-yellow/20">
                    <AlertCircle className="w-5 h-5 text-cyber-yellow flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-mono text-sm font-bold text-cyber-yellow uppercase tracking-wider">
                        Notice: Registration Suspended
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Official Club Registration is currently <strong>suspended</strong> until further notice.
                      </p>
                    </div>
                  </div>

                  {/* Transition Info Card */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3 text-sm text-gray-300 leading-relaxed">
                    <p>
                      KSU is transitioning from the old{" "}
                      <span className="text-white font-medium">OwlLife</span>{" "}
                      platform to the new{" "}
                      <span className="text-cyber-yellow font-semibold">
                        Suitable
                      </span>{" "}
                      platform, which is still being set up.
                    </p>
                    <p>
                      Once registration opens, the appropriate link will be
                      available here for KSU students to officially register on
                      the club roster!
                    </p>
                    <p className="text-gray-400">
                      In the meantime, join our Discord for the latest updates,
                      announcements, and meeting details.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href="https://discord.gg/EEEcfHQbKC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#5865F2]/25"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                    <span>Join Our Discord</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium py-2 transition-colors"
                  >
                    Close
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
