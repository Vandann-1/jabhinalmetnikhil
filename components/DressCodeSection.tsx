"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, Check } from "lucide-react";
import { weddingData, ColorSwatch } from "@/lib/wedding-data";

export default function DressCodeSection() {
  const { dressCode } = weddingData;
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);

  return (
    <section className="relative py-14 px-4 max-w-xl mx-auto text-center">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Guest Attire</span>
          <div className="h-[1px] w-12 bg-gold-400" />
        </div>
        <h2 className="text-3xl font-serif text-stone-800 tracking-wide font-normal">
          Dress Code
        </h2>
        <p className="text-gold-700 text-xs sm:text-sm font-serif uppercase tracking-widest mt-1">
          {dressCode.title}
        </p>
      </div>

      {/* Main Dress Code Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F7F2E8] border border-gold-300/80 p-6 sm:p-8 shadow-luxury"
      >
        {/* Attire Model / Artwork Illustration */}
        <div className="relative max-w-xs mx-auto mb-6 rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 border border-gold-200 shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
            alt="Traditional Wedding Attire"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed max-w-md mx-auto mb-6">
          {dressCode.description}
        </p>

        {/* Recommended Shades Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs uppercase tracking-widest font-serif text-stone-600 font-semibold">
            Recommended Shades
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
        </div>

        {/* 5 Pastel Color Swatch Circles (Directly like the video!) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-4">
          {dressCode.palette.map((swatch) => {
            const isSelected = selectedColor?.name === swatch.name;
            return (
              <div key={swatch.name} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedColor(swatch)}
                  style={{ backgroundColor: swatch.hex }}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all transform hover:scale-110 shadow-sm flex items-center justify-center ${
                    isSelected
                      ? "border-gold-700 ring-2 ring-gold-400 scale-105"
                      : "border-white/80 hover:border-gold-300"
                  }`}
                  title={swatch.name}
                  aria-label={swatch.name}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        swatch.textDark ? "text-stone-800" : "text-white"
                      }`}
                    />
                  )}
                </button>
                <span className="mt-1.5 text-[10px] font-serif text-stone-600">
                  {swatch.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reserved Colors Etiquette Note (Like the video: "Please avoid wearing beige...") */}
        <div className="mt-6 pt-4 border-t border-gold-200/60 bg-gold-50/60 rounded-xl p-3 flex items-start gap-2.5 text-left">
          <Info className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-stone-700 font-serif leading-relaxed">
            {dressCode.note}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
