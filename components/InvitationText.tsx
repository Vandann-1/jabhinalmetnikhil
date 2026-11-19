"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function InvitationText() {
  const { couple } = weddingData;

  return (
    <section className="relative py-14 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      {/* Decorative Outer Arched Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE4] p-8 sm:p-12 md:p-16 border border-gold-300/80 shadow-luxury"
      >
        {/* Ornate Gold Corner Borders */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-gold-500 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-gold-500 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-gold-500 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-gold-500 rounded-br-xl pointer-events-none" />

        {/* Top Blessing */}
        <div className="text-gold-700 text-sm sm:text-base font-serif font-bold tracking-widest mb-3">
          {couple.auspiciousSymbol}
        </div>

        <p className="text-stone-500 text-xs sm:text-sm font-serif tracking-[0.2em] uppercase mb-8">
          You are cordially invited to celebrate the wedding ceremony of
        </p>

        {/* Desktop 2-Column or Mobile Stacked Lineage */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 my-8">
          
          {/* Groom's Family Column */}
          <div className="flex-1 text-center md:text-right">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-wide font-normal">
              {couple.groom.firstName}
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold mt-1">
              Son of {couple.groom.fatherName} & {couple.groom.motherName}
            </p>
            {couple.groom.grandParents && (
              <p className="text-xs text-stone-500 font-serif italic mt-1">
                Grandson of {couple.groom.grandParents}
              </p>
            )}
          </div>

          {/* Center Monogram Emblem Connector */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-1 shadow-seal border border-[#FEEBA4]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center p-2 shadow-inner">
                <img
                  src="/images/hn-logo-gold.png"
                  alt="HN"
                  className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <span className="font-script text-2xl text-gold-600 italic mt-1">with</span>
          </div>

          {/* Bride's Family Column */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-wide font-normal">
              {couple.bride.firstName}
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold mt-1">
              Daughter of {couple.bride.fatherName} & {couple.bride.motherName}
            </p>
            {couple.bride.grandParents && (
              <p className="text-xs text-stone-500 font-serif italic mt-1">
                Granddaughter of {couple.bride.grandParents}
              </p>
            )}
          </div>

        </div>

        {/* Divider with Heart */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold-400" />
          <Heart className="w-4 h-4 text-gold-500 fill-gold-500" />
          <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Heartfelt Note to Guests */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-lg sm:text-xl text-stone-800 font-medium mb-3">
            Dearest Family and Friends,
          </h3>
          <p className="text-sm sm:text-base text-stone-600 font-serif leading-relaxed italic">
            &ldquo;{couple.tagline} Join us for days filled with love, joyous laughter, sacred rituals, and unforgettable memories as we tie the knot and begin our forever.&rdquo;
          </p>
        </div>

        {/* Auspicious Seven Vows Footer */}
        <div className="mt-8 pt-6 border-t border-gold-200/60">
          <p className="text-xs sm:text-sm text-stone-500 font-serif tracking-widest uppercase font-medium">
            Mandap Muhurat • Sangeet • Pheras • Royal Banquet
          </p>
        </div>
      </motion.div>
    </section>
  );
}
