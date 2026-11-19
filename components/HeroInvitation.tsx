"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <section className="relative w-full flex flex-col items-center justify-start p-0 m-0 overflow-hidden bg-white">
      
      {/* Full-bleed Seamless Video - No Borders, No Edges, Flush Full-Width Presentation */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-white">
        <video
          ref={videoRef}
          src="/videos/hero-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover block border-0 rounded-none shadow-none"
        />

        {/* Soft bottom edge blend into pure white paper */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
      </div>

      {/* Floating Scroll Indicator Below Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToNext}
        className="w-full py-3.5 flex flex-col items-center justify-center cursor-pointer bg-white select-none group"
      >
        <span className="text-stone-500 font-serif text-[11px] uppercase tracking-[0.25em] group-hover:text-gold-700 transition-colors">
          Scroll Down to Reveal Date
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold-600 mt-0.5" />
        </motion.div>
      </motion.div>

    </section>
  );
}
