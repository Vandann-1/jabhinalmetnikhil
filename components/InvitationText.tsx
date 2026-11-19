"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function InvitationText() {
  const { couple, venue } = weddingData;

  return (
    <section className="relative py-12 px-6 text-center">
      
      {/* Top Blessing */}
      <div className="text-gold-700 text-sm font-serif font-bold tracking-[0.25em] mb-2">
        {couple.auspiciousSymbol}
      </div>

      {/* Gujarati Blessing: સ્નેહાધીન */}
      <div className="inline-block px-4 py-1 rounded-full bg-gold-100/70 border border-gold-300 text-gold-900 text-xs font-serif font-bold mb-4 tracking-wider">
        સ્નેહાધીન
      </div>

      {/* Family Cordial Invitation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto space-y-4"
      >
        <p className="text-stone-500 text-xs font-serif tracking-[0.2em] uppercase">
          With the divine blessings of our ancestors, we
        </p>

        {/* Parents' Full Names */}
        <div className="py-2">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            {couple.bride.fatherName}
          </h3>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-800">
            {couple.bride.motherName}
          </h3>
        </div>

        <p className="text-stone-500 text-xs font-serif tracking-[0.2em] uppercase">
          cordially invite your gracious presence & blessings to celebrate the wedding of their daughter
        </p>

        {/* Bride & Groom Names */}
        <div className="py-4 space-y-2">
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] tracking-wide">
            {couple.bride.firstName}
          </h2>

          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="font-script text-2xl text-gold-600 italic">weds</span>
            <div className="h-[1px] w-12 bg-gold-400" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] tracking-wide">
            {couple.groom.firstName}
          </h2>

          <div className="pt-1.5 space-y-0.5">
            <p className="text-xs font-serif text-gold-900 font-bold tracking-wide">
              Son of {couple.groom.fatherName}
            </p>
            <p className="text-xs font-serif text-gold-900 font-bold tracking-wide">
              & {couple.groom.motherName}
            </p>
          </div>
        </div>

        {/* Heartfelt Note */}
        <p className="text-xs text-stone-600 font-serif italic max-w-xs mx-auto leading-relaxed pt-2">
          &ldquo;Your prayers, love, and warm presence will make our new beginning truly blessed and memorable.&rdquo;
        </p>

        {/* Residence Address */}
        <div className="pt-4 text-xs text-stone-600 font-serif flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>{venue.fullAddress}</span>
        </div>

      </motion.div>
    </section>
  );
}
