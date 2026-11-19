"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Sparkles } from "lucide-react";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wedding of Hinal & Nikhil`,
        text: `You are cordially invited to celebrate the royal wedding of Hinal & Nikhil! #JabHinalMetNikhil`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(
        `Join us in celebrating the royal wedding of Hinal & Nikhil! 💍✨\n\nView the invitation: ${window.location.href}\n\n#JabHinalMetNikhil`
      )}`;
      window.open(waUrl, "_blank");
    }
  };

  const scrollToDate = () => {
    const el = document.getElementById("date-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF0F3]/95 backdrop-blur-md border-b border-[#F5D5DC] shadow-sm py-2"
          : "bg-[#FFF0F3]/90 backdrop-blur-sm border-b border-[#F8E0E5]/70 py-2.5"
      }`}
    >
      {/* 100% Mathematically Centered Mobile Header Bar */}
      <div className="relative w-full flex items-center justify-center min-h-[32px] px-3">
        
        {/* Absolute Left: Intertwined HN Monogram Seal */}
        <div 
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center cursor-pointer" 
          onClick={scrollToDate}
          title="Save the Date"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#681423] via-[#8C1D30] to-[#B3394E] p-0.5 border border-[#D4AF37] shadow-sm flex items-center justify-center shrink-0">
            <img
              src="/images/hn-logo-gold.png"
              alt="HN"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Exactly Centered on Mobile Screen: #JabHinalMetNikhil */}
        <div 
          onClick={scrollToDate}
          className="flex items-center justify-center gap-1.5 cursor-pointer max-w-[calc(100%-80px)] mx-auto text-center select-none"
        >
          <Sparkles className="w-3 h-3 text-gold-600 animate-pulse shrink-0" />
          <span className="font-cinzel text-xs sm:text-sm font-black text-[#7A1424] tracking-[0.16em] uppercase truncate">
            #JabHinalMetNikhil
          </span>
          <Sparkles className="w-3 h-3 text-gold-600 animate-pulse shrink-0" />
        </div>

        {/* Absolute Right: 1-Click Share Button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          <button
            onClick={handleShare}
            aria-label="Share Invitation"
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-stone-700 border border-rose-200/90 shadow-xs flex items-center justify-center transition-all active:scale-95"
            title="Share Invitation Link"
          >
            <Share2 className="w-3.5 h-3.5 text-gold-700" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}
