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
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#8E1D30", "#B8860B"],
        disableForReducedMotion: true,
      });
    } catch {}

    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  if (isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-gradient-to-br from-[#120E0D]/95 via-[#231713]/95 to-[#0E0A09]/98 backdrop-blur-md overflow-hidden select-none"
      >
        {/* Ambient atmospheric lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-gold-400/10 blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.8s" }}
          />
        </div>

        {/* Outer Stage Container - Full Desktop & Mobile Responsive */}
        <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col items-center">
          
          {/* Header Title Above Envelope */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4 sm:mb-6 px-4"
          >
            <p className="text-gold-300 text-xs sm:text-sm tracking-[0.25em] uppercase font-serif mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: "10s" }} />
              A Royal Wedding Invitation
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: "10s" }} />
            </p>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-wide">
              {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
            </h1>
          </motion.div>

          {/* The Luxury Physical Envelope Container */}
          <div
            onClick={handleOpenClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full aspect-[492/368] cursor-pointer group perspective-1000 max-h-[75vh]"
          >
            {/* 3D Envelope Wrapper */}
            <motion.div
              animate={{
                scale: isHovered && !opening ? 1.02 : 1,
                rotateX: isHovered && !opening ? 2 : 0,
                boxShadow: isHovered
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.25)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4)",
              }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#DECDB6]/70"
            >
              {/* Authentic Embossed Luxury Envelope Texture (From User's Image) */}
              <img
                src="/images/envelope-real.png"
                alt="Luxury Embossed Envelope"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-700"
              />

              {/* Gold Shimmer Sheen Sweep Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* 3D Wax Seal with User's Exact Custom HN Monogram Logo */}
              {/* Positioned exactly at center X=50%, Y=61% where the flap tip and seal rest */}
              <div
                className="absolute top-[61%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ width: "18%", aspectRatio: "1/1" }}
              >
                <motion.div
                  animate={{
                    scale: opening ? [1, 1.35, 0] : isHovered ? 1.12 : [1, 1.04, 1],
                    boxShadow: opening
                      ? "0 0 60px rgba(212, 175, 55, 0.95)"
                      : isHovered
                      ? "0 10px 30px rgba(184, 134, 11, 0.55), 0 0 20px rgba(212, 175, 55, 0.4)"
                      : "0 6px 18px rgba(90, 60, 20, 0.45)",
                  }}
                  transition={{
                    duration: opening ? 0.6 : isHovered ? 0.3 : 3,
                    repeat: opening || isHovered ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#6C4A11] via-[#D1A741] to-[#FFF3C2] p-[3px] sm:p-1 flex items-center justify-center shadow-seal border border-[#FFEBAA]"
                >
                  {/* Wax Seal Outer Rims with Subtle Rotation */}
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-[#FDF2C7]/70 animate-spin"
                    style={{ animationDuration: "30s" }}
                  />

                  {/* Wax Seal Inner Core */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#B8861B] to-[#6E4E0D] flex items-center justify-center shadow-inner relative overflow-hidden p-2">
                    {/* User's Exact Intertwined HN Monogram Logo */}
                    <img
                      src="/images/hn-logo-gold.png"
                      alt="H & N Monogram"
                      className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Pulsing Golden Aura Ring */}
                  <motion.div
                    animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute -inset-3 rounded-full border border-gold-400/60 pointer-events-none"
                  />
                </motion.div>
              </div>

              {/* The Inner Card Sliding Up on Opening */}
              <motion.div
                initial={{ y: "40%", opacity: 0 }}
                animate={{
                  y: opening ? "-35%" : "40%",
                  opacity: opening ? 1 : 0,
                  scale: opening ? 1.03 : 0.95,
                }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="absolute inset-x-6 sm:inset-x-12 top-6 bottom-6 rounded-2xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F5ECE0] shadow-2xl border-2 border-gold-300 p-6 flex flex-col items-center justify-center text-center pointer-events-none z-30"
              >
                <div className="text-gold-700 text-xs sm:text-sm tracking-widest font-serif font-bold mb-2">
                  {weddingData.couple.auspiciousSymbol}
                </div>
                <div className="w-12 h-12 mb-2">
                  <img
                    src="/images/hn-logo-transparent.png"
                    alt="HN"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 mb-1">
                  {weddingData.couple.bride.firstName} & {weddingData.couple.groom.firstName}
                </h3>
                <p className="text-xs sm:text-sm text-gold-800 font-serif font-medium mt-1">
                  {weddingData.theDate.formattedDisplayDate}
                </p>
                <p className="text-[11px] text-stone-500 font-serif uppercase tracking-widest mt-1">
                  {weddingData.venue.city}, Gujarat
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Tap Instruction Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-center flex flex-col items-center gap-1.5"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-gold-400/40 text-gold-200 text-xs sm:text-sm font-serif cursor-pointer shadow-md"
              onClick={handleOpenClick}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Tap the golden wax seal to unseal invitation</span>
            </motion.div>
            <span className="text-gold-400/70 text-[11px] font-serif tracking-widest">
              {weddingData.couple.hashtag} • Sound will play
            </span>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
