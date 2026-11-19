"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function HeroInvitation() {
  const { couple, venue, theDate } = weddingData;

  const scrollToNext = () => {
    const el = document.getElementById("scratch-date-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between py-12 px-4 sm:px-8 md:px-12 text-center overflow-hidden">
      {/* Background Soft Royal Radial Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] md:w-[750px] h-[340px] sm:h-[550px] md:h-[750px] rounded-full bg-gradient-to-b from-[#F9EBD0]/50 via-[#F3DEB8]/20 to-transparent blur-3xl" />
      </div>

      {/* Top Auspicious Symbol */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-2 sm:pt-4"
      >
        <span className="text-gold-700 text-sm sm:text-base font-serif tracking-[0.2em] block mb-2 font-bold">
          {couple.auspiciousSymbol}
        </span>
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
          <p className="text-stone-600 text-xs sm:text-sm font-serif tracking-[0.28em] uppercase font-medium">
            Welcome to the Wedding of
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
      </motion.div>

      {/* Main Showcase - Full Desktop Multi-Column or Centered Royal Layout */}
      <div className="my-auto py-6 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
        
        {/* Left Side (Desktop): Couple Names & Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 flex flex-col items-center lg:items-center text-center"
        >
          {/* Custom HN Monogram Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-1 shadow-seal border border-[#FEEBA4]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center p-2 shadow-inner">
              <img
                src="/images/hn-logo-gold.png"
                alt="HN Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          {/* Grand Couple Names */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-900 tracking-wide leading-tight">
            <span className="bg-gradient-to-r from-[#8E6410] via-[#C99C29] to-[#835B0B] bg-clip-text text-transparent italic">
              {couple.bride.firstName}
            </span>
            <span className="text-gold-500 font-script text-4xl sm:text-5xl lg:text-6xl mx-2 sm:mx-3 inline-block">
              &
            </span>
            <span className="bg-gradient-to-r from-[#835B0B] via-[#C99C29] to-[#8E6410] bg-clip-text text-transparent italic">
              {couple.groom.firstName}
            </span>
          </h1>

          {/* Divider with Sparkles */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            <Sparkles className="w-4 h-4 text-gold-500 animate-spin" style={{ animationDuration: "12s" }} />
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          </div>

          <p className="text-stone-700 font-serif text-sm sm:text-base tracking-widest uppercase font-semibold">
            {couple.hashtag}
          </p>

          <p className="mt-2 text-stone-500 font-serif text-xs sm:text-sm tracking-wider">
            {theDate.formattedDisplayDate} • {venue.city}, {venue.state}
          </p>
        </motion.div>

        {/* Right Side (Desktop) / Center: Royal Arch Portrait Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md shrink-0"
        >
          {/* Royal Arched Frame with Palace Artwork */}
          <div className="relative rounded-t-full p-3 sm:p-4 bg-gradient-to-b from-[#E7CD8A] via-[#F8EED4] to-[#E2C780] shadow-luxury">
            <div className="relative rounded-t-full overflow-hidden aspect-[4/5] bg-stone-900 border border-gold-300">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                alt="Hinal & Nikhil"
                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/10 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-center">
                <span className="text-gold-200 text-xs sm:text-sm font-serif tracking-widest uppercase block font-medium">
                  Two Souls • Seven Vows • Forever
                </span>
                <span className="text-white/80 text-xs font-sans mt-0.5 block">
                  {venue.name}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-2 cursor-pointer flex flex-col items-center"
        onClick={scrollToNext}
      >
        <span className="text-stone-500 font-serif text-xs tracking-widest uppercase mb-1">
          Scroll Down to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
