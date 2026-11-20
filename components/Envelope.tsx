"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";
import TypewriterText from "@/components/TypewriterText";

interface EnvelopeProps {
  onOpen: () => void;
  onStartOpen?: () => void;
  isOpen: boolean;
}

export default function Envelope({ onOpen, onStartOpen, isOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);

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

    // Show the #JabHinalMetNikhil cinematic background animation immediately
    setShowHashtag(true);

    // After animation finishes, transition to the main page
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  if (isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between envelope-paper-bg overflow-hidden select-none"
      >
        {/* Soft Ambient Radiance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gold-200/25 blur-3xl" />
        </div>

        {/* --- Top Envelope Flap (Subtle shape of envelope reaching center) --- */}
        <motion.div
          animate={{
            y: opening ? "-105%" : "0%",
            opacity: opening ? 0.3 : 1,
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 h-[50vh] pointer-events-none z-10 overflow-hidden"
        >
          {/* Triangular / Scalloped Envelope Flap Canvas */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          >
            {/* Flap Body */}
            <path
              d="M 0 0 L 100 0 L 100 20 Q 75 40 50 100 Q 25 40 0 20 Z"
              fill="#FFFFFF"
              stroke="rgba(212, 175, 55, 0.35)"
              strokeWidth="0.5"
            />
            {/* Embossed Flourish Lines on Flap */}
            <path
              d="M 10 0 Q 30 25 50 92 Q 70 25 90 0"
              fill="none"
              stroke="rgba(212, 175, 55, 0.25)"
              strokeWidth="0.4"
              strokeDasharray="1, 1"
            />
            <path
              d="M 20 0 Q 35 20 50 82 Q 65 20 80 0"
              fill="none"
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="0.3"
            />
          </svg>

          {/* Ornate Scalloped Lace Border at the Flap Edge */}
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-center -mb-2">
            <div className="w-20 h-6 bg-gradient-to-b from-white to-stone-50 rounded-b-full border-b border-gold-300/60 shadow-sm" />
          </div>
        </motion.div>

        {/* --- Top Header Details on Screen --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: opening ? 0 : 1, y: opening ? -30 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 pt-8 sm:pt-12 text-center px-4"
        >
          <div className="inline-flex items-center justify-center mb-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 shadow-sm">
            <span className="text-gold-900 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-cinzel font-bold">
              The Wedding Celebration
            </span>
          </div>
          <h1 className="text-stone-900 text-3xl sm:text-4xl md:text-5xl font-cinzel font-black tracking-wide drop-shadow-sm">
            <TypewriterText
              text={`${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName}`}
              speed={0.05}
              delay={0.2}
            />
          </h1>
        </motion.div>

        {/* --- Center: The Intertwined HN Monogram Seal --- */}
        <div className="relative z-30 flex flex-col items-center justify-center my-auto">
          
          <div
            onClick={handleOpenClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer group relative"
          >
            {/* The Majestic Wax Seal Container */}
            <motion.div
              animate={{
                scale: opening ? [1, 1.4, 0] : isHovered ? 1.12 : [1, 1.05, 1],
                boxShadow: opening
                  ? "0 0 70px rgba(212, 175, 55, 1)"
                  : isHovered
                  ? "0 15px 35px rgba(184, 134, 11, 0.6), 0 0 25px rgba(212, 175, 55, 0.5)"
                  : "0 10px 25px rgba(120, 80, 20, 0.35)",
              }}
              transition={{
                duration: opening ? 0.7 : isHovered ? 0.3 : 3,
                repeat: opening || isHovered ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#681423] via-[#8C1D30] to-[#B3394E] p-1.5 flex items-center justify-center border-2 border-[#D4AF37] shadow-2xl"
            >
              {/* Outer Dashed Gold Ring */}
              <div
                className="absolute -inset-1.5 rounded-full border border-dashed border-[#FFE28A]/80 animate-spin"
                style={{ animationDuration: "25s" }}
              />

              {/* Seal Inner Core: Features the user's exact intertwined HN Monogram */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7A1424] via-[#5C0D1A] to-[#3B0710] flex items-center justify-center p-2 shadow-inner relative overflow-hidden">
                <img
                  src="/images/hn-logo-gold.png"
                  alt="H & N Monogram"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Gentle Pulsing Golden Aura */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute -inset-4 rounded-full border border-gold-400/60 pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Tap Prompt Under Seal */}
          <motion.div
            animate={{
              opacity: opening ? 0 : 1,
              y: opening ? 15 : [0, 4, 0],
            }}
            transition={{
              y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.3 },
            }}
            onClick={handleOpenClick}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-gold-50 border-2 border-gold-400 text-stone-800 text-xs sm:text-sm font-serif font-bold shadow-md cursor-pointer transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-[#7A1424] fill-[#7A1424] animate-pulse" />
            <span>Tap the HN Monogram to Open</span>
          </motion.div>

        </div>

        {/* --- Bottom Footer on Envelope Screen --- */}
        <motion.div
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 pb-8 sm:pb-10 text-center"
        >
          <p className="text-xs font-cinzel font-bold text-gold-900 tracking-[0.2em] uppercase">
            Tuesday, 26th January 2027
          </p>
          <p className="text-[11px] text-stone-500 font-serif tracking-widest mt-0.5">
            New Metral, Gujarat
          </p>
        </motion.div>

        {/* --- Grand Cinematic Animation of #JabHinalMetNikhil (Appears on click in background/center) --- */}
        <AnimatePresence>
          {showHashtag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white p-6 text-center"
            >
              {/* Auspicious Emblem */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-[#681423] via-[#8C1D30] to-[#B3394E] p-1 border-2 border-gold-400 shadow-xl"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7A1424] via-[#5C0D1A] to-[#3B0710] flex items-center justify-center p-2">
                  <img
                    src="/images/hn-logo-gold.png"
                    alt="HN"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>

              {/* Glowing Grand Hashtag: #JabHinalMetNikhil */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="relative"
              >
                <TypewriterText
                  text="#JabHinalMetNikhil"
                  speed={0.045}
                  delay={0.15}
                  showCursor={true}
                  className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7A1424] via-[#B8860B] to-[#7A1424] tracking-tight drop-shadow-md"
                />
                
                {/* Golden Shimmer Underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.45, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-serif italic text-sm sm:text-base text-stone-700 mt-4 max-w-xs"
              >
                A love story blessed by divine grace & sacred traditions
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold-800 font-bold mt-2"
              >
                26th January 2027 • New Metral
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
