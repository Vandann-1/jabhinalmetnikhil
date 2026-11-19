"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function Envelope({ onOpen, isOpen }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleOpenClick = () => {
    if (opening || isOpen) return;
    setOpening(true);

    try {
      confetti({
        particleCount: 90,
        spread: 95,
        origin: { y: 0.55 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#7A1424", "#FFFFFF"],
        disableForReducedMotion: true,
      });
    } catch {}

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  if (isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-gradient-to-b from-[#FAF6EE] via-[#F4EDE0] to-[#EFE5D2] backdrop-blur-md overflow-hidden select-none"
      >
        {/* Soft Warm Ambient Lighting & Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-200/40 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-100/50 blur-3xl" />
        </div>

        {/* Full-Screen Stage Container */}
        <div className="relative w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center">
          
          {/* Header Title Above White Envelope */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3 sm:mb-5 px-4"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin" style={{ animationDuration: "12s" }} />
              <p className="text-gold-800 text-xs sm:text-sm tracking-[0.25em] uppercase font-cinzel font-bold">
                Royal Wedding Invitation
              </p>
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <h1 className="text-stone-900 text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide">
              {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
            </h1>
          </motion.div>

          {/* Proper Full-Size Pure White Embossed Envelope */}
          <div
            onClick={handleOpenClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-[492/368] cursor-pointer group perspective-1000 max-h-[75vh]"
          >
            <motion.div
              animate={{
                scale: isHovered && !opening ? 1.02 : 1,
                rotateX: isHovered && !opening ? 2 : 0,
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(180, 140, 60, 0.35), 0 0 30px rgba(255, 255, 255, 0.8)"
                  : "0 20px 40px -10px rgba(160, 120, 50, 0.25), 0 0 15px rgba(0, 0, 0, 0.05)",
              }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-white/90 shadow-2xl"
            >
              {/* Pure White Embossed Envelope Texture */}
              <img
                src="/images/envelope-white.png"
                alt="Pure White Luxury Embossed Envelope"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-105"
              />

              {/* Shimmer Light Reflection Sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Centered Wax Seal with Custom Intertwined HN Monogram Directly in the Center */}
              <div
                className="absolute top-[61%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ width: "20%", aspectRatio: "1/1" }}
              >
                <motion.div
                  animate={{
                    scale: opening ? [1, 1.4, 0] : isHovered ? 1.12 : [1, 1.04, 1],
                    boxShadow: opening
                      ? "0 0 50px rgba(212, 175, 55, 0.95)"
                      : isHovered
                      ? "0 10px 25px rgba(184, 134, 11, 0.5), 0 0 15px rgba(212, 175, 55, 0.4)"
                      : "0 6px 16px rgba(120, 80, 20, 0.35)",
                  }}
                  transition={{
                    duration: opening ? 0.6 : isHovered ? 0.3 : 3,
                    repeat: opening || isHovered ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#681423] via-[#8C1D30] to-[#B3394E] p-1 flex items-center justify-center shadow-seal border-2 border-[#D4AF37]"
                >
                  {/* Wax Seal Outer Scallop Rim */}
                  <div
                    className="absolute -inset-1 rounded-full border border-dashed border-[#FFE28A]/80 animate-spin"
                    style={{ animationDuration: "25s" }}
                  />

                  {/* Wax Seal Core with Centered HN Monogram */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7A1424] via-[#5C0D1A] to-[#400811] flex items-center justify-center shadow-inner relative overflow-hidden p-2">
                    <img
                      src="/images/hn-logo-gold.png"
                      alt="H & N Monogram"
                      className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  {/* Pulsing Aura */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute -inset-3 rounded-full border border-gold-400/50 pointer-events-none"
                  />
                </motion.div>
              </div>

              {/* Inner Card Gliding Upwards upon Opening */}
              <motion.div
                initial={{ y: "45%", opacity: 0 }}
                animate={{
                  y: opening ? "-35%" : "45%",
                  opacity: opening ? 1 : 0,
                  scale: opening ? 1.02 : 0.95,
                }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="absolute inset-x-6 sm:inset-x-10 top-6 bottom-6 rounded-2xl bg-white shadow-2xl border-2 border-gold-300 p-6 flex flex-col items-center justify-center text-center pointer-events-none z-30"
              >
                <div className="text-gold-700 text-xs tracking-widest font-serif font-bold mb-1">
                  {weddingData.couple.auspiciousSymbol}
                </div>
                <div className="w-12 h-12 mb-2">
                  <img
                    src="/images/hn-logo-transparent.png"
                    alt="HN"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 mb-0.5">
                  {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
                </h3>
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#7A1424] mt-1">
                  {weddingData.theDate.formattedDisplayDate}
                </p>
                <p className="text-[11px] text-stone-500 font-serif uppercase tracking-widest mt-1">
                  New Metral, Gujarat
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Tap Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-center flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 hover:bg-white border-2 border-gold-400 text-stone-800 text-xs sm:text-sm font-serif font-semibold shadow-md cursor-pointer transition-all"
              onClick={handleOpenClick}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 animate-pulse" />
              <span>Tap the wax seal to open invitation</span>
            </motion.div>
            <span className="text-stone-500 text-[11px] font-serif tracking-widest">
              {weddingData.couple.hashtag}
            </span>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
