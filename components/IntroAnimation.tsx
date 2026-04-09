import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "./Tooltip";

const sequences = [
  { text: "INITIALIZING OWL_SYSTEM_PROTOCOL...", success: "[OK]" },
  { text: "ENCRYPTING CONNECTION...", success: "[SECURE]" },
  { text: "BYPASSING FIREWALL...", success: "[ACCESS GRANTED]" },
  { text: "SYSTEM CHECKING...", success: "[STANDBY]" },
  { text: "CONFIRMING AUTH STATUS...", success: "[ACCESS GRANTED]" },
];

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<
    "boot" | "glitch" | "logo" | "shrink" | "fade"
  >("boot");
  const [bootText, setBootText] = useState("");
  const [glitchText, setGlitchText] = useState("OWL CYBER");
  const [progress, setProgress] = useState(0);
  const [glitchSeed, setGlitchSeed] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [themeColor, setThemeColor] = useState<"red" | "green">("red");

  const progressBlocks = 48;
  const filledBlocks = Math.round((progress / 100) * progressBlocks);
  const showLogoGlitchStreaks = step === "glitch";
  const glitchStreakCount = 6;

  // Boot sequence logic with proper state management and progress tracking
  useEffect(() => {
    if (step !== "boot") return;

    setBootText("");
    setProgress(0);

    let currentSequenceIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    // Calculate total characters for progress bar
    const totalChars = sequences.reduce(
      (sum, seq) => sum + seq.text.length + seq.success.length + 1,
      0,
    );
    let charsTyped = 0;

    const typeNextChar = () => {
      const currentSequence = sequences[currentSequenceIndex];

      if (currentCharIndex < currentSequence.text.length) {
        // Type next character from main text
        const char = currentSequence.text[currentCharIndex];
        setBootText((prev) => prev + char);
        currentCharIndex++;
        charsTyped++;
        setProgress((charsTyped / totalChars) * 100);
        timeoutId = setTimeout(typeNextChar, 33 + Math.random() * 20); // Faster: 33-53ms averge per char (avg 43ms)
      } else {
        // Line complete, add success message
        if (currentSequenceIndex === sequences.length - 1) {
          setThemeColor("green"); // Turn green the millisecond ACCESS GRANTED is printed
        }
        
        const successMsg = " " + currentSequence.success + "\n";
        setBootText((prev) => prev + successMsg);
        charsTyped += successMsg.length;
        setProgress((charsTyped / totalChars) * 100);
        
        currentSequenceIndex++;
        currentCharIndex = 0;
        
        if (currentSequenceIndex >= sequences.length) {
          // Finished the last line!
          setProgress(100);
          timeoutId = setTimeout(() => {
            setStep("glitch");
          }, 1500); // 1.5s delay before moving on
        } else {
          timeoutId = setTimeout(typeNextChar, 100); // Quicker line break
        }
      }
    };

    typeNextChar();

    return () => clearTimeout(timeoutId);
  }, [step]);

  useEffect(() => {
    if (!(["boot", "glitch", "logo", "shrink", "fade"] as const).includes(step)) {
      return;
    }

    const interval = setInterval(() => {
      setGlitchSeed((prev) => prev + 1);
    }, 90);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }

    mediaQuery.addListener(handleMediaChange);
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  // Glitch effect logic for logo reveal
  useEffect(() => {
    if (step === "glitch") {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";
      let interval: NodeJS.Timeout;
      let count = 0;

      interval = setInterval(() => {
        setGlitchText(
          "OWL CYBER"
            .split("")
            .map((char, index) => {
              if (index < count / 3) return char; // Slower reveal for smoother effect
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        count++;
        if (count > 30) {
          // Increased from 20 to 30 to give more time before logo
          clearInterval(interval);
          setGlitchText("OWL CYBER"); // Ensure final text is correct
          setTimeout(() => setStep("logo"), 300); // Brief pause before logo appears
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Logo step logic
  useEffect(() => {
    if (step === "logo") {
      const timer = setTimeout(() => {
        setStep("shrink");
      }, 2000); // Reduced from 2500ms to 2000ms
      return () => clearTimeout(timer);
    }
    if (step === "shrink") {
      const timer = setTimeout(() => {
        setStep("fade");
      }, 1000); // Reduced from 1500ms to match faster shrink animation
      return () => clearTimeout(timer);
    }
    if (step === "fade") {
      const timer = setTimeout(() => {
        onComplete(); // Remove from DOM after fade
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  // Determine Logo Position
  // Since we want to animate to top-left (navbar logo position), we can approximate or just animate to corner.
  // Navbar logo is roughly 24px from left (px-6) and centered vertically in h-20 (80px).
  // Logo is w-10 h-10 (40px). So top is (80-40)/2 = 20px.
  // But wait, "max-w-7xl mx-auto". On large screens, left margin is (100vw - 1280px) / 2 + 24px.
  // We can use a CSS variable or simpler approach: mimic the layout constraints.

  // Actually, animating layoutId with Framer Motion might be easiest if we render a target dummy in Navbar.
  // But for now, let's use fixed positioning animation.

  const logoVariants = {
    initial: {
      scale: 0.5,
      opacity: 0,
      y: 20,
    },
    enter: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    glow: {
      boxShadow: [
        "0 0 0px rgba(255, 215, 0, 0)",
        "0 0 20px rgba(255, 215, 0, 0.5)",
        "0 0 50px rgba(255, 215, 0, 0.8)",
        "0 0 20px rgba(255, 215, 0, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    shrink: {
      // Trying to match navbar position roughly.
      // Top: 20px (approx center of 80px navbar)
      // Left: 24px (approx padding) - this is tricky for responsive.
      // Let's assume on desktop standard.
      top: "1.25rem", // 20px
      left: "1.5rem", // 24px
      width: "2.5rem", // w-10 = 40px
      height: "2.5rem",
      translateX: 0,
      translateY: 0,
      scale: 1, // Don't scale, just change dimensions to match w-10
      position: "fixed" as const, // Ensure it moves relative to viewport
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const introLogoSize = isMobileView ? "12rem" : "16rem";
  const navbarLogoLeft = isMobileView
    ? "1.5rem"
    : "max(1.5rem, calc(50vw - 40rem + 1.5rem))";

  const skipIntro = () => {
    setStep((prev) => (prev === "fade" ? prev : "fade"));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (step !== "logo") return;

    const timer = setTimeout(() => {
      setShowSkipButton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: step === "fade" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {showSkipButton &&
          (step === "boot" || step === "glitch" || step === "logo") && (
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[120]">
              <Tooltip content="Skip intro (Esc)" position="right">
                <motion.button
                  type="button"
                  onClick={skipIntro}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="px-3 py-1.5 rounded border border-cyber-yellow/60 bg-black/70 text-cyber-yellow font-mono text-xs sm:text-sm tracking-wide hover:bg-cyber-yellow hover:text-black transition-colors"
                  aria-label="Skip intro animation"
                >
                  ESC • SKIP
                </motion.button>
              </Tooltip>
            </div>
          )}
        {/* Matrix/Glitch Background Effect - Optional subtle grid */}
        <div
          className="absolute inset-0 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(${themeColor === "red" ? "rgba(255,50,50,0.04)" : "rgba(50,255,50,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${themeColor === "red" ? "rgba(255,50,50,0.04)" : "rgba(50,255,50,0.04)"} 1px, transparent 1px)`
          }}
        ></div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.08, 0.2, 0.1, 0.16, 0.08] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 3px)",
          }}
        />
        {/* Background glitch streaks removed for performance */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4">
          {/* BOOT SEQUENCE */}
          {step === "boot" && (
            <div className="font-mono text-sm md:text-base w-full max-w-lg space-y-4">
              <pre
                className={`whitespace-pre-wrap font-mono leading-relaxed transition-colors duration-500 delay-100 ${themeColor === "red" ? "text-red-500 shadow-red-500/50" : "text-green-500 shadow-green-500/50"}`}
                style={{
                  transform: `translate(${((glitchSeed % 5) - 2) * 0.4}px, ${((glitchSeed % 7) - 3) * 0.25}px) skewX(${(glitchSeed % 3) - 1}deg)`,
                  textShadow:
                    glitchSeed % 2 === 0
                      ? "1px 0 rgba(255,0,90,0.35), -1px 0 rgba(0,255,255,0.35)"
                      : "-1px 0 rgba(255,0,90,0.3), 1px 0 rgba(0,255,255,0.3)",
                }}
              >
                {bootText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className={`inline-block w-2 h-4 ml-1 align-middle transition-colors duration-500 ${themeColor === "red" ? "bg-red-500" : "bg-green-500"}`}
                />
              </pre>

              {/* Progress Bar */}
              <div className="w-full">
                <div className="h-7 bg-[#121212] border-2 border-cyber-yellow/70 rounded-md px-1 py-1 overflow-hidden shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]">
                  <div className="h-full w-full flex items-center gap-[2px]">
                    {Array.from({ length: progressBlocks }).map((_, index) => {
                      const isFilled = index < filledBlocks;
                      return (
                        <motion.span
                          key={index}
                          className={`h-full flex-1 rounded-[2px] transition-colors duration-500 ${
                            isFilled 
                              ? themeColor === "red" ? "bg-red-500" : "bg-green-500"
                              : "bg-[#2f2f2f]"
                          }`}
                          animate={
                            isFilled
                              ? {
                                  opacity: [0.72, 1, 0.8],
                                  boxShadow: [
                                    "0 0 0px rgba(0,0,0,0)",
                                    `0 0 8px ${themeColor === "red" ? "rgba(239,68,68,0.55)" : "rgba(34,197,94,0.55)"}`,
                                    `0 0 2px ${themeColor === "red" ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)"}`,
                                  ],
                                }
                              : { opacity: 0.35, boxShadow: "none" }
                          }
                          transition={{ duration: 0.45, ease: "linear" }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500 text-right font-mono">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          )}

          {/* GLITCH / LOGO REVEAL */}
          {(step === "glitch" ||
            step === "logo" ||
            step === "shrink" ||
            step === "fade") && (
            <>
              {/* Logo Wrapper with Absolute Positioning for smooth transition */}
              <motion.div
                initial={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  scale: 0.8,
                  opacity: 0,
                  position: "fixed",
                }}
                animate={
                  step === "shrink" || step === "fade"
                    ? {
                        top: "1.25rem", // 20px (centered in 80px navbar)
                        left: navbarLogoLeft, // Handles mobile padding and centered container logic
                        x: "0%",
                        y: "0%",
                        scale: 1,
                        opacity: step === "fade" ? 0 : 1, // Fade out logo in sync with bg if desired, or keep it 1?
                        // The user said: "As that last step is happening, then the black/dark gray background fades out to reveal the page content."
                        // And "shrink it down to the top left to the logo in the navbar".
                        // If we fade out this logo, we rely on the navbar logo being underneath.
                        // Let's keep opacity 1 until the very end, or fade it out as the bg fades to reveal the static navbar?
                        // Let's fade it out so the real navbar takes over.
                      }
                    : {
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.8, // Faster: reduced from 1.5s to 0.8s
                  ease: "easeInOut",
                }}
                className="z-50"
                style={{ position: "fixed" }}
              >
                {/* The Logo Container */}
                <motion.div
                  className="relative group"
                  animate={step === "logo" ? "glow" : "initial"}
                  variants={{
                    initial: {
                      filter: "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                    },
                    glow: {
                      filter: [
                        "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                        "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))",
                        "drop-shadow(0 0 50px rgba(255, 215, 0, 0.8))",
                        "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))",
                      ],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    },
                  }}
                >
                  {/* Glow Effect Element (Background) */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl bg-cyber-yellow/40"
                    animate={
                      step === "logo"
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.img
                    src="/logo.png"
                    alt="Owl Cyber Club"
                    className="block object-contain rounded-full relative z-20"
                    animate={{
                      width:
                        step === "shrink" || step === "fade"
                          ? "2.5rem"
                          : introLogoSize,
                      height:
                        step === "shrink" || step === "fade"
                          ? "2.5rem"
                          : introLogoSize,
                      filter:
                        step === "logo" || step === "glitch"
                          ? [
                              "contrast(1) brightness(1)",
                              "contrast(1.35) brightness(1.18)",
                              "contrast(1.05) brightness(1.03)",
                            ]
                          : "contrast(1) brightness(1)",
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>

              {/* Text Glitch Effect appearing below logo during glitch step */}
              {step === "glitch" && (
                <motion.div
                  className="fixed z-40"
                  initial={{
                    top: "calc(50% + 10rem)",
                    left: "50%",
                    x: "-50%", // Center using Framer Motion's x property
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: "-50%", // Keep centered during animation
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-wider text-white relative whitespace-nowrap">
                    <span className="text-cyber-yellow">{glitchText}</span>
                  </h1>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
