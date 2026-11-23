"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { weddingData, ColorSwatch } from "@/lib/wedding-data";
import TypewriterText from "@/components/TypewriterText";

export default function DressCodeSection() {
  const { dressCode } = weddingData;
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);

  return (
    <section id="attire-section" className="relative py-12 px-4 sm:px-6 text-center select-none">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Guest Attire Guide
          </span>
          <div className="h-[1px] w-10 bg-gold-400" />
        </div>

        <h2 className="text-3xl font-cinzel font-black text-stone-900 tracking-wider">
          <TypewriterText text="CEREMONY DRESS CODES" speed={0.04} />
        </h2>
        <p className="text-stone-600 font-serif text-xs font-semibold mt-1">
          Traditional Elegance &amp; Pastel Celebration Themes
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        
        {/* 1. Ganesh Pooja Bandhani Theme Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl bg-white border-2 border-gold-300/80 p-5 shadow-xs text-left"
        >
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-stone-200">
            <span className="font-cinzel text-xs font-bold text-stone-900 tracking-wider">
              Sunday, 24th January 2027 • 9:00 AM
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7A1424] text-white font-serif font-black text-[11px] tracking-wide">
              Ganesh Pooja
            </span>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-black text-[#7A1424] mb-1">
            Bandhani Theme Attire
          </h3>
          <p className="text-xs text-stone-600 font-serif leading-relaxed mb-3">
            Celebrate the auspicious Ganesh Sthapana in vibrant traditional Bandhani patterns.
          </p>

          <div className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 space-y-1.5 text-xs font-serif">
            <div className="flex items-center gap-2">
              <span className="font-black text-[#7A1424]">👗 For Girls:</span>
              <span className="text-stone-800 font-semibold">Bandhani dress / saree</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#7A1424]">👔 For Boys:</span>
              <span className="text-stone-800 font-semibold">Kurta with Bandhani dupatta</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Carnival (Sangeet) Pastel Attire Card with Colour Codes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl bg-white border-2 border-[#7A1424]/40 p-5 shadow-md ring-2 ring-gold-400/40 text-left"
        >
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-stone-200">
            <span className="font-cinzel text-xs font-bold text-stone-900 tracking-wider">
              Monday, 25th January 2027 • 3:00 PM
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900 text-white font-serif font-black text-[11px] tracking-wide">
              Carnival Sangeet
            </span>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-black text-stone-900 mb-1">
            Pastel Colour Attire
          </h3>
          <p className="text-xs text-stone-600 font-serif leading-relaxed mb-4">
            Join the energetic Carnival Sangeet in soothing, photogenic soft pastel shades.
          </p>

          {/* Pastel Colour Codes Swatches */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F8] border border-rose-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-cinzel font-black text-stone-900 tracking-wider uppercase">
                Recommended Colour Codes
              </span>
              <span className="text-[10px] font-serif font-bold text-gold-800">
                Tap shade to inspect
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {dressCode.palette.map((swatch) => {
                const isSelected = selectedColor?.name === swatch.name;
                return (
                  <div key={swatch.name} className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedColor(swatch)}
                      style={{ backgroundColor: swatch.hex }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all transform hover:scale-105 shadow-xs flex items-center justify-center ${
                        isSelected
                          ? "border-[#7A1424] ring-2 ring-gold-400 scale-105"
                          : "border-stone-300"
                      }`}
                      title={`${swatch.name} (${swatch.hex})`}
                      aria-label={swatch.name}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            swatch.textDark ? "text-stone-900" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                    <span className="mt-1.5 text-[10px] font-serif font-black text-stone-800 text-center leading-tight truncate max-w-[60px]">
                      {swatch.name}
                    </span>
                    <span className="text-[9px] font-mono text-stone-500 font-bold uppercase mt-0.5">
                      {swatch.hex}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedColor && (
              <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-serif">
                <span className="text-stone-700">Selected Shade:</span>
                <span className="font-bold text-[#7A1424]">
                  {selectedColor.name} ({selectedColor.hex})
                </span>
              </div>
            )}
          </div>

          {/* Reserved Colors Etiquette Note */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-950 font-serif leading-relaxed">
            <strong className="text-amber-900">Kindly Note:</strong> Traditional deep red/crimson is reserved for the bride, and royal ivory is reserved for the groom.
          </div>
        </motion.div>

      </div>

    </section>
  );
}
