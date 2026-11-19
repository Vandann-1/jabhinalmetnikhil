"use client";

import React from "react";
import { Heart, Share2, RotateCcw } from "lucide-react";
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
    <footer className="relative mt-12 pt-10 pb-24 px-4 text-center border-t border-gold-300/60 bg-[#FAF1E2]">
      <div className="max-w-xs mx-auto flex flex-col items-center">
        
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-0.5 flex items-center justify-center shadow-seal border border-[#FEEBA4] mb-3">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center p-2 shadow-inner">
            <img
              src="/images/hn-logo-gold.png"
              alt="HN Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <h3 className="font-serif text-2xl text-stone-900 font-normal">
          {couple.bride.firstName} & {couple.groom.firstName}
        </h3>
        <p className="text-gold-700 font-serif text-xs uppercase tracking-widest mt-0.5 mb-3 font-semibold">
          {couple.hashtag}
        </p>

        <p className="text-xs text-stone-600 font-serif italic max-w-xs leading-relaxed mb-6">
          &ldquo;With gratitude in our hearts, we eagerly await your gracious presence to bless our new beginning.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-2.5 mb-6">
          <button
            onClick={handleShare}
            className="w-full py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-white font-serif text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Invitation Link</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="w-full py-2.5 rounded-full bg-white hover:bg-gold-50 text-stone-700 border border-gold-300 font-serif text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
            <span>Re-seal Envelope</span>
          </button>
        </div>

        {/* Signature */}
        <div className="text-[11px] text-stone-400 font-serif flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>for {couple.bride.firstName} & {couple.groom.firstName}</span>
        </div>
      </div>
    </footer>
  );
}
