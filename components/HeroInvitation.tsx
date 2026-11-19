"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function HeroInvitation() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("scratch-date-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-2 pb-6 px-3 text-center">
      
      {/* Top Auspicious Symbol */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2"
      >
        <span className="text-gold-700 text-xs tracking-[0.25em] font-serif uppercase font-bold block">
          {weddingData.couple.auspiciousSymbol}
        </span>
      </motion.div>

      {/* Main Animated Video Card (Exact Artwork from Video: Couple under Mandap Arch) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[9/16] max-h-[82vh] rounded-[28px] overflow-hidden shadow-2xl border-2 border-gold-300/80 bg-stone-900 group"
      >
        {/* Animated Video */}
        <video
          ref={videoRef}
          src="/videos/hero-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover select-none"
        />

        {/* Soft Gold Vignette Gradient at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Floating Ambient Sparkles overlay */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <Sparkles className="w-5 h-5 text-gold-300 animate-pulse" />
        </div>
        <div className="absolute top-8 left-4 pointer-events-none">
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Hashtag & Location Badge inside video bottom */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none text-white/90 font-serif text-[11px] px-2">
          <span className="tracking-widest uppercase text-gold-300 font-semibold drop-shadow">
            {weddingData.couple.hashtag}
          </span>
          <span className="text-white/80 drop-shadow">
            {weddingData.venue.city}, Gujarat
          </span>
        </div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={scrollToNext}
        className="mt-4 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-stone-500 font-serif text-[11px] uppercase tracking-widest group-hover:text-gold-700 transition-colors flex items-center gap-1.5 mb-0.5">
          <span>Scroll down to reveal dates</span>
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold-600" />
        </motion.div>
      </motion.div>

    </section>
  );
}
