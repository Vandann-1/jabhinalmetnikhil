"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";

interface EnvelopeProps {
  onOpen: () => void;
  onStartOpen?: () => void;
  isOpen: boolean;
}

export default function Envelope({ onOpen, onStartOpen, isOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);

  // Reset state when envelope is re-sealed from the footer
  useEffect(() => {
    if (!isOpen) {
      setOpening(false);
    }
  }, [isOpen]);

  const handleOpenClick = () => {
    if (opening || isOpen) return;
    setOpening(true);

    // Trigger instant audio playback synchronously within user tap/click gesture
    if (onStartOpen) {
      onStartOpen();
    }

    try {
      // Confetti burst of gold, rose, and white particles
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#7A1424", "#FFFFFF"],
        disableForReducedMotion: true,
      });
    } catch {}

    // Transition to the main page after the royal HN logo zoom and reveal
    setTimeout(() => {
      onOpen();
    }, 2900);
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpen && (
        <motion.div
          key="envelope-modal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B080B]/90 backdrop-blur-md overflow-hidden select-none p-0 sm:p-4"
        >
          {/* Main Mobile Frame Container */}
          <div className="relative w-full max-w-[450px] h-full sm:h-[92vh] sm:max-h-[880px] sm:rounded-3xl overflow-hidden shadow-2xl bg-[#3B1218]">
            
            {/* 1. The Royal Burgundy Lace Envelope Screen */}
            <motion.div
              onClick={handleOpenClick}
              animate={{
                scale: opening ? 1.12 : 1,
                opacity: opening ? 0 : 1,
              }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className={`absolute inset-0 z-10 cursor-pointer ${
                opening ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              {/* High-res authentic lace-embossed burgundy envelope */}
              <img
                src="/images/royal-envelope.png"
                alt="Royal Wedding Envelope"
                className="w-full h-full object-cover block"
                draggable={false}
              />

              {/* Pulsing Golden Halo over the Center Wax Seal (Seal is at Y: 43.2%, X: 50%) */}
              <div className="absolute top-[43.2%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                {/* Outer Ripple Aura */}
                <motion.div
                  animate={{ scale: [1, 1.45, 1], opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-gold-300"
                />

                {/* Inner Ambient Glow */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gold-400/25 blur-md"
                />
              </div>

              {/* Bottom Tap Prompt Floating Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-7 sm:bottom-9 inset-x-0 flex flex-col items-center justify-center pointer-events-none px-4"
              >
                <div className="px-5 py-2.5 rounded-full bg-black/55 backdrop-blur-md border border-gold-400/70 shadow-2xl flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400 animate-pulse" />
                  <span className="text-white text-xs sm:text-sm font-serif font-bold tracking-wider">
                    Tap to Open Royal Invitation
                  </span>
                </div>
                <span className="text-gold-200/90 font-cinzel text-[10px] tracking-[0.25em] uppercase mt-2 drop-shadow-sm font-semibold">
                  Hinal &amp; Nikhil • 26.01.2027
                </span>
              </motion.div>
            </motion.div>

            {/* 2. White Background Screen with Zooming HN Logo & Hashtag Reveal */}
            <AnimatePresence>
              {opening && (
                <motion.div
                  key="white-zoom-reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
                >
                  {/* Subtle warm golden ambient glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gold-100/60 blur-3xl pointer-events-none" />

                  {/* Top Auspicious Inscription */}
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mb-2"
                  >
                    <span className="text-gold-800 text-[11px] font-serif font-bold tracking-[0.3em] uppercase">
                      || શ્રી ગણેશાય નમઃ ||
                    </span>
                  </motion.div>

                  {/* Majestic HN Logo with Zoom Animation */}
                  <motion.div
                    initial={{ scale: 0.15, opacity: 0, rotate: -4 }}
                    animate={{ scale: [0.15, 1.15, 1], opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center my-2"
                  >
                    <img
                      src="/images/hn-royal-crest.png"
                      alt="Hinal & Nikhil Royal Crest"
                      className="w-full h-full object-contain filter drop-shadow-xl"
                    />
                    {/* Golden halo glow behind the crest */}
                    <div className="absolute inset-0 rounded-full bg-gold-300/30 blur-2xl -z-10" />
                  </motion.div>

                  {/* Glowing Grand Hashtag: #JabHinalMetNikhil */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative mt-2"
                  >
                    <TypewriterText
                      text="#JabHinalMetNikhil"
                      speed={0.04}
                      delay={0.25}
                      showCursor={true}
                      className="font-cinzel text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7A1424] via-[#B8860B] to-[#7A1424] tracking-tight drop-shadow-sm"
                    />

                    {/* Golden Shimmer Underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "140px" }}
                      transition={{ delay: 0.5, duration: 0.7 }}
                      className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2.5 mb-3"
                    />
                  </motion.div>

                  {/* Couple Names & Blessings */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="space-y-1"
                  >
                    <h2 className="font-cinzel text-xl sm:text-2xl font-black text-stone-900 tracking-wide">
                      Hinal &amp; Nikhil
                    </h2>
                    <p className="font-serif italic text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
                      A love story blessed by divine grace &amp; sacred traditions
                    </p>
                    <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-900 font-bold pt-1.5">
                      Tuesday, 26th January 2027 • New Metral
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
