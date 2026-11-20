"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";
import TypewriterText from "@/components/TypewriterText";

export default function InvitationText() {
  const { couple, venue } = weddingData;

  return (
    <section className="relative py-12 px-6 text-center select-none">
      
      {/* Top Blessing in Sanskrit */}
      <div className="text-gold-700 text-sm font-serif font-bold tracking-[0.25em] mb-2 flex items-center justify-center">
        <TypewriterText
          text={couple.auspiciousSymbol}
          lang="hi"
          speed={0.04}
          className="tracking-[0.25em]"
        />
      </div>

      {/* Gujarati Blessing: સ્નેહાધીન Badge - Solid, Crisp, High-Contrast */}
      <div className="inline-block px-4 py-1.5 rounded-full bg-white border-2 border-gold-400 text-[#7A1424] text-xs font-serif font-black mb-4 tracking-wider shadow-xs">
        <TypewriterText
          text="સ્નેહાધીન (Yours Affectionately)"
          lang="gu"
          speed={0.035}
        />
      </div>

      {/* Family Cordial Invitation */}
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Ancestor Blessing Intro */}
        <p className="text-stone-600 text-xs font-serif tracking-[0.2em] uppercase font-semibold">
          <TypewriterText
            text="With the divine blessings of our ancestors, we"
            speed={0.025}
          />
        </p>

        {/* Parents' Full Names */}
        <div className="py-2 space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            <TypewriterText
              text={couple.bride.fatherName}
              speed={0.03}
              delay={0.15}
            />
          </h3>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-800">
            <TypewriterText
              text={couple.bride.motherName}
              speed={0.03}
              delay={0.3}
            />
          </h3>
        </div>

        {/* Cordial Invitation Text */}
        <p className="text-stone-600 text-xs font-serif tracking-[0.2em] uppercase max-w-sm mx-auto leading-relaxed font-semibold">
          <TypewriterText
            text="cordially invite your gracious presence & blessings to celebrate the wedding of their daughter"
            speed={0.02}
            delay={0.2}
          />
        </p>

        {/* Bride & Groom Names */}
        <div className="py-4 space-y-2">
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] tracking-wide">
            <TypewriterText
              text={couple.bride.firstName}
              speed={0.06}
              delay={0.2}
              className="drop-shadow-xs"
            />
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 my-2"
          >
            <div className="h-[1px] w-12 bg-gold-400" />
            <span className="font-script text-2xl text-gold-600 italic">weds</span>
            <div className="h-[1px] w-12 bg-gold-400" />
          </motion.div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] tracking-wide">
            <TypewriterText
              text={couple.groom.firstName}
              speed={0.06}
              delay={0.3}
              className="drop-shadow-xs"
            />
          </h2>

          {/* Groom's Parents Lineage */}
          <div className="pt-2 space-y-0.5">
            <p className="text-xs font-serif text-gold-900 font-bold tracking-wide">
              <TypewriterText
                text={`Son of ${couple.groom.fatherName}`}
                speed={0.025}
                delay={0.2}
              />
            </p>
            <p className="text-xs font-serif text-gold-900 font-bold tracking-wide">
              <TypewriterText
                text={`& ${couple.groom.motherName}`}
                speed={0.025}
                delay={0.35}
              />
            </p>
          </div>
        </div>

        {/* Heartfelt Note with Blinking Pen Cursor */}
        <div className="text-xs text-stone-700 font-serif italic max-w-xs mx-auto leading-relaxed pt-2 font-medium">
          &ldquo;
          <TypewriterText
            text="Your prayers, love, and warm presence will make our new beginning truly blessed and memorable."
            speed={0.025}
            showCursor={true}
            delay={0.1}
          />
          &rdquo;
        </div>

        {/* Residence Address */}
        <div className="pt-4 text-xs text-stone-700 font-serif flex items-center justify-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-gold-700 shrink-0" />
          <TypewriterText
            text={venue.fullAddress}
            speed={0.02}
            delay={0.2}
          />
        </div>

      </div>
    </section>
  );
}
