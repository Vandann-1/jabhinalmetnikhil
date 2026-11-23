"use client";

import React, { useState, useEffect } from "react";
import { Share2 } from "lucide-react";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
        `Join us in celebrating the royal wedding of Hinal & Nikhil! 💍\n\nView the invitation: ${window.location.href}\n\n#JabHinalMetNikhil`
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
    <header
      className={`sticky top-0 inset-x-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF0F3] border-b border-[#F5D5DC] shadow-sm py-2"
          : "bg-[#FFF0F3] border-b border-[#F8E0E5] py-2.5"
      }`}
    >
      {/* 100% Balanced and Centered Container */}
      <div className="relative w-full flex items-center justify-between px-3.5 min-h-[34px]">
        
        {/* Left: Intertwined HN Royal Crest (Width: 32px) */}
        <div 
          className="w-8 h-8 rounded-full bg-white p-0.5 border border-[#D4AF37] shadow-xs flex items-center justify-center shrink-0 cursor-pointer z-10 overflow-hidden" 
          onClick={scrollToDate}
          title="Save the Date"
        >
          <img
            src="/images/hn-royal-crest.png"
            alt="HN Royal Crest"
            className="w-full h-full object-contain"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        </div>

        {/* Absolute Dead-Center: #JabHinalMetNikhil */}
        <div 
          onClick={scrollToDate}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center justify-center cursor-pointer select-none">
            <span className="font-cinzel text-xs sm:text-sm font-black text-[#7A1424] tracking-[0.16em] uppercase whitespace-nowrap">
              #JabHinalMetNikhil
            </span>
          </div>
        </div>

        {/* Right: 1-Click Share Button (Width: 32px - Exactly Matches Left Width) */}
        <div className="flex items-center z-10">
          <button
            onClick={handleShare}
            aria-label="Share Invitation"
            className="w-8 h-8 rounded-full bg-white hover:bg-rose-50 text-stone-700 border border-rose-300 shadow-xs flex items-center justify-center transition-all active:scale-95 shrink-0"
            title="Share Invitation Link"
          >
            <Share2 className="w-3.5 h-3.5 text-[#7A1424]" />
          </button>
        </div>

      </div>
    </header>
  );
}
