"use client";

import React from "react";
import { Heart, RotateCcw } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface FooterSectionProps {
  onReopenEnvelope: () => void;
}

export default function FooterSection({ onReopenEnvelope }: FooterSectionProps) {
  const { couple } = weddingData;

  return (
    <footer className="relative mt-10 pt-10 pb-20 px-6 text-center border-t border-gold-300/60 bg-[#FAF1E2]">
      <div className="max-w-xs mx-auto flex flex-col items-center">
        
        {/* Royal Wedding Crest */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center mb-3">
          <img
            src="/images/hn-royal-crest.png"
            alt="Hinal & Nikhil Royal Crest"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <h3 className="font-cinzel text-2xl font-black text-stone-900">
          {couple.bride.firstName} & {couple.groom.firstName}
        </h3>

        {/* Wedding Hashtag */}
        <p className="text-gold-800 font-cinzel text-xs font-bold tracking-[0.2em] uppercase mt-1 mb-3">
          #JabHinalMetNikhil
        </p>

        <p className="text-xs text-stone-600 font-serif italic max-w-xs leading-relaxed mb-6">
          &ldquo;With gratitude in our hearts, we eagerly await your gracious presence to bless our new beginning.&rdquo;
        </p>

        {/* Action Button */}
        <div className="w-full mb-6">
          <button
            onClick={onReopenEnvelope}
            className="w-full py-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 border border-gold-300 font-serif text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
            <span>Re-seal Envelope</span>
          </button>
        </div>

        {/* Signature */}
        <div className="text-[11px] text-stone-400 font-serif flex items-center justify-center gap-1">
          <span>Crafted with love for {couple.bride.firstName} & {couple.groom.firstName}</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
        </div>
      </div>
    </footer>
  );
}
