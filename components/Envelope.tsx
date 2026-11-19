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

    // Fire golden celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#B8860B"],
        disableForReducedMotion: true,
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  if (isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#1C1613]/95 via-[#2E201B]/95 to-[#150F0D]/95 backdrop-blur-md overflow-hidden"
      >
        {/* Ambient floating golden dust */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Outer Phone/Screen Frame Preview Container */}
        <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
          {/* Header text outside envelope */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6 px-4"
          >
            <p className="text-gold-300 text-xs sm:text-sm tracking-widest uppercase font-serif mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: "8s" }} />
              A Royal Wedding Invitation
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: "8s" }} />
            </p>
            <h1 className="text-white text-2xl sm:text-3xl font-serif font-light tracking-wide">
              {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
            </h1>
          </motion.div>

          {/* The Luxury Embossed Envelope Container */}
          <div
            onClick={handleOpenClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-[4/5] max-h-[520px] cursor-pointer group select-none perspective-1000"
          >
            {/* Envelope Body */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#ECE3D5] shadow-2xl p-6 border border-[#E2D2BC] overflow-hidden flex flex-col justify-between">
              
              {/* Embossed Floral Corner Ornaments */}
              <div className="absolute top-3 left-3 w-16 h-16 pointer-events-none opacity-40">
                <svg viewBox="0 0 100 100" fill="none" className="text-gold-600 w-full h-full stroke-current stroke-1">
                  <path d="M10,10 C40,10 50,20 50,50 C20,50 10,40 10,10 Z" />
                  <circle cx="25" cy="25" r="4" fill="currentColor" />
                  <path d="M10,10 L90,10" strokeDasharray="3,3" />
                  <path d="M10,10 L10,90" strokeDasharray="3,3" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 w-16 h-16 pointer-events-none opacity-40 rotate-90">
                <svg viewBox="0 0 100 100" fill="none" className="text-gold-600 w-full h-full stroke-current stroke-1">
                  <path d="M10,10 C40,10 50,20 50,50 C20,50 10,40 10,10 Z" />
                  <circle cx="25" cy="25" r="4" fill="currentColor" />
                  <path d="M10,10 L90,10" strokeDasharray="3,3" />
                  <path d="M10,10 L10,90" strokeDasharray="3,3" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 w-16 h-16 pointer-events-none opacity-40 -rotate-90">
                <svg viewBox="0 0 100 100" fill="none" className="text-gold-600 w-full h-full stroke-current stroke-1">
                  <path d="M10,10 C40,10 50,20 50,50 C20,50 10,40 10,10 Z" />
                  <circle cx="25" cy="25" r="4" fill="currentColor" />
                  <path d="M10,10 L90,10" strokeDasharray="3,3" />
                  <path d="M10,10 L10,90" strokeDasharray="3,3" />
                </svg>
              </div>
              <div className="absolute bottom-3 right-3 w-16 h-16 pointer-events-none opacity-40 rotate-180">
                <svg viewBox="0 0 100 100" fill="none" className="text-gold-600 w-full h-full stroke-current stroke-1">
                  <path d="M10,10 C40,10 50,20 50,50 C20,50 10,40 10,10 Z" />
                  <circle cx="25" cy="25" r="4" fill="currentColor" />
                  <path d="M10,10 L90,10" strokeDasharray="3,3" />
                  <path d="M10,10 L10,90" strokeDasharray="3,3" />
                </svg>
              </div>

              {/* Envelope Flap Lines (Triangular Emboss Creases) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Diagonal subtle gold metallic foil crease lines */}
                <div className="absolute top-0 left-0 right-0 h-1/2 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-[#F2ECE0] to-[#E5DAC8] border-b border-[#D8C7B0] shadow-sm transition-transform duration-1000 origin-top"
                  style={{
                    transform: opening ? "rotateX(-140deg)" : "rotateX(0deg)",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                
                {/* Left & Right Flap Emboss Folds */}
                <div className="absolute top-0 left-0 bottom-0 w-1/2 [clip-path:polygon(0_0,100%_50%,0_100%)] bg-gradient-to-r from-[#EFE8DC]/80 to-[#E4D8C4]/60 border-r border-[#DECDB7]/50" />
                <div className="absolute top-0 right-0 bottom-0 w-1/2 [clip-path:polygon(100%_0,0_50%,100%_100%)] bg-gradient-to-l from-[#EFE8DC]/80 to-[#E4D8C4]/60 border-l border-[#DECDB7]/50" />
                
                {/* Bottom Flap */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 [clip-path:polygon(0_100%,100%_100%,50%_0)] bg-gradient-to-t from-[#EFE7DA] to-[#DFD2BF]/70 border-t border-[#D9C8B2]/60" />
              </div>

              {/* Golden Embossed Seal in Center */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                  animate={{
                    scale: opening ? [1, 1.25, 0] : isHovered ? 1.08 : [1, 1.03, 1],
                    boxShadow: opening
                      ? "0 0 50px rgba(212, 175, 55, 0.9)"
                      : isHovered
                      ? "0 10px 30px rgba(184, 134, 11, 0.45)"
                      : "0 6px 18px rgba(139, 101, 20, 0.35)",
                  }}
                  transition={{
                    duration: opening ? 0.7 : isHovered ? 0.3 : 3,
                    repeat: opening || isHovered ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-1 flex items-center justify-center shadow-seal border border-[#FEEBA4]"
                >
                  {/* Wax Seal Outer Scalloped Rims */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FDF2C7]/60 animate-spin" style={{ animationDuration: "25s" }} />

                  {/* Wax Inner Core */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                    
                    {/* Monogram */}
                    <span className="font-script text-3xl sm:text-4xl text-[#3A2504] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] tracking-wider">
                      {weddingData.couple.monogram}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#4A320A] font-serif font-bold -mt-1 opacity-80">
                      Forever
                    </span>
                  </div>

                  {/* Pulsing golden rings around seal */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute -inset-3 rounded-full border border-gold-400/50 pointer-events-none"
                  />
                </motion.div>
              </div>

              {/* Peek of the Wedding Invitation Card inside (slides up on opening) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: opening ? -160 : 20,
                  opacity: opening ? 1 : 0,
                  scale: opening ? 1.02 : 0.95,
                }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="absolute inset-x-8 top-12 bottom-12 rounded-xl bg-white shadow-2xl border border-gold-300 p-6 flex flex-col items-center justify-center text-center pointer-events-none z-20"
              >
                <div className="text-gold-700 text-xs tracking-widest uppercase font-serif mb-2">
                  {weddingData.couple.auspiciousSymbol}
                </div>
                <h3 className="font-script text-3xl text-stone-900 mb-1">
                  {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
                </h3>
                <p className="text-[11px] text-stone-500 font-serif">
                  {weddingData.theDate.formattedDisplayDate}
                </p>
              </motion.div>

              {/* Bottom Subtle Guidance Hint */}
              <div className="z-10 mt-auto text-center pb-2">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-gold-300/60 shadow-sm text-stone-700 text-xs font-serif"
                >
                  <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                  <span>Tap the seal to open invitation</span>
                </motion.div>
              </div>

            </div>
          </div>

          {/* Bottom couple names & hashtag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center text-gold-300/80 text-xs tracking-wider"
          >
            {weddingData.couple.hashtag} • {weddingData.venue.city}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
