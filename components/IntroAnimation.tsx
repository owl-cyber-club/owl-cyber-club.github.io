import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sequences = [
  { text: "INITIALIZING OWL_SYSTEM_PROTOCOL...", success: "[OK]" },
  { text: "LOADING CYBER_NEURAL_NET...", success: "[NEURAL NET ONLINE]" },
  { text: "ENCRYPTING CONNECTION...", success: "[SECURE]" },
  { text: "BYPASSING FIREWALL...", success: "[ACCESS GRANTED]" },
  { text: "SYSTEM READY", success: "[STANDBY]" },
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

  const progressBlocks = 48;
  const filledBlocks = Math.round((progress / 100) * progressBlocks);
  const showLogoGlitchStreaks = step === "glitch" || step === "logo";
  const glitchStreakCount = 10;

  // Boot sequence logic with proper state management and progress tracking
  useEffect(() => {
    if (step !== "boot") return;

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
      if (currentSequenceIndex >= sequences.length) {
        // Boot sequence complete, move to glitch
        setProgress(100);
        timeoutId = setTimeout(() => setStep("glitch"), 400);
        return;
      }

      const currentSequence = sequences[currentSequenceIndex];

      if (currentCharIndex < currentSequence.text.length) {
        // Type next character from main text
        const char = currentSequence.text[currentCharIndex];
        setBootText((prev) => prev + char);
        currentCharIndex++;
        charsTyped++;
        setProgress((charsTyped / totalChars) * 100);
        timeoutId = setTimeout(typeNextChar, 40 + Math.random() * 30); // Slower: 40-70ms per char
      } else {
        // Line complete, add success message
        const successMsg = " " + currentSequence.success + "\n";
        setBootText((prev) => prev + successMsg);
        charsTyped += successMsg.length;
        setProgress((charsTyped / totalChars) * 100);
        currentSequenceIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextChar, 250); // Pause between lines
      }
    };

    typeNextChar();

    return () => clearTimeout(timeoutId);
  }, [step]);

  useEffect(() => {
    if (!(["boot", "glitch", "logo"] as const).includes(step)) {
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

  return (
    <AnimatePresence>
      {step !== "fade" && ( // Keep rendering until fade is done? No, step 'fade' just fades bg.
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: step === "fade" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Matrix/Glitch Background Effect - Optional subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.08, 0.2, 0.1, 0.16, 0.08] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 3px)",
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.02, 0.08, 0.03, 0.1, 0.02] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
            style={{
              mixBlendMode: "screen",
              background:
                "radial-gradient(circle at 20% 20%, rgba(255, 0, 80, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.08) 0%, transparent 45%)",
            }}
          />

          {showLogoGlitchStreaks && (
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {Array.from({ length: glitchStreakCount }).map((_, index) => {
                const offset = (glitchSeed * (index + 2)) % 100;
                return (
                  <motion.div
                    key={`glitch-streak-${index}`}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${(index * 100) / glitchStreakCount + (offset % 9) - 4}%`,
                      height: `${2 + (index % 3) * 2}px`,
                      background:
                        index % 3 === 0
                          ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.58) 45%, transparent 100%)"
                          : index % 2 === 0
                            ? "linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.45) 50%, transparent 100%)"
                            : "linear-gradient(90deg, transparent 0%, rgba(255,0,90,0.42) 50%, transparent 100%)",
                      mixBlendMode: "screen",
                    }}
                    animate={{
                      x: ["-110%", "130%"],
                      skewX: [0, -14, 8, -2, 0],
                      opacity: [0, 0.85, 0.3, 0],
                    }}
                    transition={{
                      duration: 0.35 + (index % 4) * 0.12,
                      repeat: Infinity,
                      repeatDelay: 0.08 + (index % 3) * 0.07,
                      ease: "linear",
                      delay: (index % 5) * 0.03,
                    }}
                  />
                );
              })}

              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                  mixBlendMode: "screen",
                }}
                animate={{
                  y: ["-100%", "100%"],
                  opacity: [0, 0.4, 0],
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4">
            {/* BOOT SEQUENCE */}
            {step === "boot" && (
              <div className="font-mono text-sm md:text-base w-full max-w-lg space-y-4">
                <pre
                  className="whitespace-pre-wrap text-cyber-yellow font-mono leading-relaxed"
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
                    className="inline-block w-2 h-4 bg-cyber-yellow ml-1 align-middle"
                  />
                </pre>

                {/* Progress Bar */}
                <div className="w-full">
                  <div className="h-7 bg-[#121212] border-2 border-gray-500/70 rounded-md px-1 py-1 overflow-hidden shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]">
                    <div className="h-full w-full flex items-center gap-[2px]">
                      {Array.from({ length: progressBlocks }).map((_, index) => {
                        const isFilled = index < filledBlocks;
                        return (
                          <motion.span
                            key={index}
                            className={`h-full flex-1 rounded-[2px] ${
                              isFilled
                                ? "bg-cyber-yellow"
                                : "bg-[#2f2f2f]"
                            }`}
                            animate={
                              isFilled
                                ? {
                                    opacity: [0.72, 1, 0.8],
                                    boxShadow: [
                                      "0 0 0px rgba(234,179,8,0)",
                                      "0 0 8px rgba(234,179,8,0.55)",
                                      "0 0 2px rgba(234,179,8,0.25)",
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
                    {(step === "glitch" || step === "logo") && !isMobileView && (
                      <>
                        <motion.img
                          src="/logo.png"
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 z-10 w-full h-full object-contain rounded-full opacity-20"
                          animate={{
                            x: [-2, 2, -1],
                            y: [1, -1, 0],
                            filter: [
                              "hue-rotate(0deg)",
                              "hue-rotate(28deg)",
                              "hue-rotate(-16deg)",
                            ],
                          }}
                          transition={{ duration: 0.22, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.img
                          src="/logo.png"
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 z-10 w-full h-full object-contain rounded-full opacity-15 mix-blend-screen"
                          animate={{
                            x: [2, -2, 1],
                            y: [-1, 1, 0],
                            opacity: [0.12, 0.22, 0.14],
                          }}
                          transition={{ duration: 0.18, repeat: Infinity, ease: "linear" }}
                        />
                      </>
                    )}
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
                    <h1
                      className="text-4xl md:text-6xl font-bold font-mono tracking-wider text-white relative whitespace-nowrap"
                      style={{
                        filter:
                          "drop-shadow(2px 0 0 rgba(255,0,80,0.45)) drop-shadow(-2px 0 0 rgba(0,255,255,0.45))",
                      }}
                    >
                      <span className="text-cyber-yellow">{glitchText}</span>
                    </h1>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
