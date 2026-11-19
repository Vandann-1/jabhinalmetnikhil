"use client";

import React from "react";
import { Heart, Share2, Sparkles, RotateCcw } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface FooterSectionProps {
  onReopenEnvelope: () => void;
}

export default function FooterSection({ onReopenEnvelope }: FooterSectionProps) {
  const { couple } = weddingData;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Wedding of ${couple.bride.firstName} & ${couple.groom.firstName}`,
          text: `You're cordially invited to celebrate the wedding of ${couple.bride.firstName} & ${couple.groom.firstName}! ${couple.hashtag}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(
        `Join us in celebrating the wedding of ${couple.bride.firstName} & ${couple.groom.firstName}! 💍✨\n\nView the digital invitation: ${window.location.href}\n\n${couple.hashtag}`
      )}`;
      window.open(waUrl, "_blank");
    }
  };

  return (
    <footer className="relative mt-24 pt-16 pb-28 px-4 sm:px-8 text-center border-t border-gold-200/80 bg-gradient-to-b from-transparent via-[#FBF7F0] to-[#F5ECE0]">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Monogram Seal with User's Exact Custom Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-1 flex items-center justify-center shadow-seal border border-[#FEEBA4] mb-5">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center p-2.5 shadow-inner">
            <img
              src="/images/hn-logo-gold.png"
              alt="HN Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
          {couple.bride.firstName} & {couple.groom.firstName}
        </h3>
        <p className="text-gold-700 font-serif text-xs sm:text-sm uppercase tracking-widest mt-1 mb-5 font-semibold">
          {couple.hashtag}
        </p>

        <p className="text-sm sm:text-base text-stone-600 font-serif italic max-w-md leading-relaxed mb-8">
          &ldquo;With profound gratitude in our hearts, we eagerly await your gracious presence to bless our new beginning.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-white font-serif text-xs sm:text-sm font-semibold shadow-md transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invitation</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-gold-50 text-stone-700 border border-gold-300 font-serif text-xs sm:text-sm font-medium transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-gold-600" />
            <span>Re-seal Envelope</span>
          </button>
        </div>

        {/* Signature */}
        <div className="text-xs text-stone-500 font-serif flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>for {couple.bride.firstName} & {couple.groom.firstName}</span>
        </div>
      </div>
    </footer>
  );
}
