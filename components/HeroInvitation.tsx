"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function HeroInvitation() {
  const { couple } = weddingData;

  const scrollToNext = () => {
    const el = document.getElementById("scratch-date-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between py-10 px-4 text-center overflow-hidden">
      {/* Royal Arch Frame & Ambient Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Soft radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gradient-to-b from-[#F9EBD0]/60 via-[#F3DEB8]/30 to-transparent blur-3xl" />
      </div>

      {/* Top Auspicious Symbol & Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-4"
      >
        <span className="text-gold-700 text-sm font-serif tracking-widest block mb-2 font-semibold">
          {couple.auspiciousSymbol}
        </span>
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="h-[1px] w-8 bg-gold-400" />
          <p className="text-stone-600 text-xs sm:text-sm font-serif tracking-[0.25em] uppercase">
            Welcome to the Wedding of
          </p>
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
      </motion.div>

      {/* Couple Names - The Grand Focus */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="my-auto py-6"
      >
        <div className="relative inline-block">
          {/* Couple Names */}
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-stone-900 tracking-wide leading-tight drop-shadow-sm">
            <span className="bg-gradient-to-r from-[#976C12] via-[#C99C29] to-[#8C620E] bg-clip-text text-transparent font-serif italic">
              {couple.bride.firstName}
            </span>
            <span className="text-gold-500 font-script text-4xl sm:text-5xl mx-2 sm:mx-3 inline-block">
              &
            </span>
            <span className="bg-gradient-to-r from-[#8C620E] via-[#C99C29] to-[#976C12] bg-clip-text text-transparent font-serif italic">
              {couple.groom.firstName}
            </span>
          </h1>

          {/* Golden underline divider */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin" style={{ animationDuration: "12s" }} />
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          </div>

          <p className="mt-2 text-stone-600 font-serif text-xs sm:text-sm tracking-widest uppercase">
            {couple.hashtag}
          </p>
        </div>

        {/* Romantic Couple Archway Artwork Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 relative max-w-xs sm:max-w-sm mx-auto"
        >
          {/* Ornate Arch Frame SVG Border */}
          <div className="relative rounded-t-full p-2.5 bg-gradient-to-b from-[#E7CD8A] via-[#F8EED4] to-[#E2C780] shadow-luxury">
            <div className="relative rounded-t-full overflow-hidden aspect-[4/5] bg-stone-900 border border-gold-300">
              {/* Couple Portrait Image with Palace Background */}
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Hinal & Nikhil"
                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient Vignette over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-900/30" />

              {/* Golden lanterns / Palace overlay */}
              <div className="absolute bottom-4 inset-x-4 text-center">
                <span className="text-gold-200 text-xs font-serif tracking-widest uppercase block">
                  Two Souls • Seven Vows • One Love
                </span>
                <span className="text-white/80 text-[11px] font-sans">
                  {weddingData.venue.city}, Gujarat
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-2 cursor-pointer flex flex-col items-center"
        onClick={scrollToNext}
      >
        <span className="text-stone-500 font-serif text-[11px] tracking-widest uppercase mb-1">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
