"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, Check } from "lucide-react";
import { weddingData, ColorSwatch } from "@/lib/wedding-data";

export default function DressCodeSection() {
  const { dressCode } = weddingData;
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);

  return (
    <section className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
      {/* Title */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-gold-600 font-script text-2xl sm:text-3xl">Guest Attire</span>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-wide font-normal">
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
        className="rounded-3xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F7F2E8] border border-gold-300/80 p-6 sm:p-10 shadow-luxury"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Attire Artwork */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-stone-100 border border-gold-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
              alt="Traditional Wedding Attire"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
          </div>

          {/* Details & Pastel Swatches */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
              {dressCode.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed mb-6">
              {dressCode.description}
            </p>

            {/* Recommended Shades Header */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-xs uppercase tracking-widest font-serif text-stone-600 font-semibold">
                Recommended Soft Pastel Shades
              </span>
              <Sparkles className="w-4 h-4 text-gold-500" />
            </div>

            {/* 5 Pastel Color Swatch Circles */}
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 my-2">
              {dressCode.palette.map((swatch) => {
                const isSelected = selectedColor?.name === swatch.name;
                return (
                  <div key={swatch.name} className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedColor(swatch)}
                      style={{ backgroundColor: swatch.hex }}
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 transition-all transform hover:scale-110 shadow-sm flex items-center justify-center ${
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
                    <span className="mt-1.5 text-[10px] sm:text-xs font-serif text-stone-600">
                      {swatch.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Reserved Colors Etiquette Note */}
            <div className="mt-6 pt-4 border-t border-gold-200/60 bg-gold-50/70 rounded-2xl p-4 flex items-start gap-3 text-left">
              <Info className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-700 font-serif leading-relaxed">
                {dressCode.note}
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
