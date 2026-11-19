"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, Check } from "lucide-react";
import { weddingData, ColorSwatch } from "@/lib/wedding-data";

export default function DressCodeSection() {
  const { dressCode } = weddingData;
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);

  return (
    <section className="relative py-12 px-4 text-center">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Guest Attire</span>
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
        <h2 className="text-2xl font-serif text-stone-800 tracking-wide font-normal">
          Dress Code
        </h2>
        <p className="text-gold-700 text-xs font-serif uppercase tracking-widest mt-0.5">
          {dressCode.title}
        </p>
      </div>

      {/* Main Dress Code Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F7F2E8] border border-gold-300/80 p-5 shadow-luxury"
      >
        {/* Attire Artwork */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 border border-gold-200 shadow-sm mb-4">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
            alt="Traditional Wedding Attire"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
        </div>

        {/* Description */}
        <p className="text-xs text-stone-700 font-serif leading-relaxed mb-4">
          {dressCode.description}
        </p>

        {/* Recommended Shades Header */}
        <div className="flex items-center justify-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-[11px] uppercase tracking-widest font-serif text-stone-600 font-semibold">
            Recommended Soft Pastels
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
        </div>

        {/* 5 Pastel Color Swatch Circles */}
        <div className="flex items-center justify-center gap-3 my-2">
          {dressCode.palette.map((swatch) => {
            const isSelected = selectedColor?.name === swatch.name;
            return (
              <div key={swatch.name} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedColor(swatch)}
                  style={{ backgroundColor: swatch.hex }}
                  className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-105 shadow-sm flex items-center justify-center ${
                    isSelected
                      ? "border-gold-700 ring-2 ring-gold-400 scale-105"
                      : "border-white/80 hover:border-gold-300"
                  }`}
                  title={swatch.name}
                  aria-label={swatch.name}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        swatch.textDark ? "text-stone-800" : "text-white"
                      }`}
                    />
                  )}
                </button>
                <span className="mt-1 text-[9px] font-serif text-stone-600">
                  {swatch.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reserved Colors Etiquette Note */}
        <div className="mt-4 pt-3 border-t border-gold-200/60 bg-gold-50/70 rounded-xl p-3 flex items-start gap-2 text-left">
          <Info className="w-3.5 h-3.5 text-gold-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-stone-700 font-serif leading-relaxed">
            {dressCode.note}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
