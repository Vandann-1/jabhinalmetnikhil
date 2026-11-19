"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Calendar, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF0F3]/95 backdrop-blur-md border-b border-[#F5D5DC] shadow-sm py-2 px-4"
          : "bg-[#FFF0F3]/85 backdrop-blur-sm border-b border-[#F8E0E5]/60 py-2.5 px-4"
      }`}
    >
      <div className="flex items-center justify-between">
        
        {/* Left: Intertwined HN Monogram Seal Badge */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToDate}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#681423] via-[#8C1D30] to-[#B3394E] p-0.5 border border-[#D4AF37] shadow-sm flex items-center justify-center shrink-0">
            <img
              src="/images/hn-logo-gold.png"
              alt="HN"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="hidden sm:inline font-cinzel text-[11px] font-bold text-stone-700 tracking-wider">
            H & N
          </span>
        </div>

        {/* Center: #JabHinalMetNikhil (The user's requested hashtag in pinkish header) */}
        <div className="flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-gold-600 animate-pulse" />
          <span className="font-cinzel text-xs sm:text-sm font-black text-[#7A1424] tracking-[0.16em] uppercase">
            #JabHinalMetNikhil
          </span>
          <Sparkles className="w-3 h-3 text-gold-600 animate-pulse" />
        </div>

        {/* Right: Quick Share / Calendar Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share Invitation"
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-stone-700 border border-rose-200/80 shadow-xs flex items-center justify-center transition-all"
            title="Share Invitation"
          >
            <Share2 className="w-3.5 h-3.5 text-gold-700" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}
