"use client";

import React from "react";
import { Heart, Share2, Sparkles, RotateCcw } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface FooterSectionProps {
  onReopenEnvelope: () => void;
}

export default function FooterSection({ onReopenEnvelope }: FooterSectionProps) {
  const { couple, venue } = weddingData;

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
    <footer className="relative mt-20 pt-16 pb-24 px-4 text-center border-t border-gold-200/60 bg-gradient-to-b from-transparent via-[#FBF7F0] to-[#F5ECE0]">
      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-1 flex items-center justify-center shadow-seal border border-[#FEEBA4] mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center">
            <span className="font-script text-2xl text-[#3A2504] font-bold">
              {couple.monogram}
            </span>
          </div>
        </div>

        <h3 className="font-serif text-2xl text-stone-900 font-normal">
          {couple.bride.firstName} & {couple.groom.firstName}
        </h3>
        <p className="text-gold-700 font-serif text-xs uppercase tracking-widest mt-1 mb-4">
          {couple.hashtag}
        </p>

        <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-sm leading-relaxed mb-6">
          &ldquo;With gratitude in our hearts, we eagerly await your gracious presence to bless our new beginning.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-600 hover:bg-gold-700 text-white font-serif text-xs font-semibold shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Invitation</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-gold-50 text-stone-700 border border-gold-300 font-serif text-xs font-medium transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
            <span>Re-seal Envelope</span>
          </button>
        </div>

        {/* Small Credits / Signature */}
        <div className="text-[11px] text-stone-400 font-serif flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>for {couple.bride.firstName} & {couple.groom.firstName}</span>
        </div>
      </div>
    </footer>
  );
}
