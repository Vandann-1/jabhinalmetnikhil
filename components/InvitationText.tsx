"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function InvitationText() {
  const { couple } = weddingData;

  return (
    <section className="relative py-12 px-4 max-w-xl mx-auto text-center">
      {/* Decorative Outer Arched Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE4] p-8 sm:p-10 border border-gold-300/70 shadow-luxury"
      >
        {/* Ornate Gold Corner Borders */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500 rounded-br-lg pointer-events-none" />

        {/* Top Blessing */}
        <div className="text-gold-700 text-sm font-serif font-bold tracking-widest mb-3">
          {couple.auspiciousSymbol}
        </div>

        <p className="text-stone-500 text-xs sm:text-sm font-serif tracking-widest uppercase mb-6">
          You are cordially invited to celebrate the wedding ceremony of
        </p>

        {/* Couple Names & Lineage */}
        <div className="space-y-6 my-6">
          {/* Groom */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-wide font-normal">
              {couple.groom.firstName}
            </h2>
            <p className="text-xs uppercase tracking-widest text-gold-700 font-semibold mt-1">
              Son of {couple.groom.fatherName} & {couple.groom.motherName}
            </p>
            {couple.groom.grandParents && (
              <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">
                Grandson of {couple.groom.grandParents}
              </p>
            )}
          </div>

          {/* Elegant Connector */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="font-script text-3xl text-gold-600 px-2 italic">
              with
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          {/* Bride */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-wide font-normal">
              {couple.bride.firstName}
            </h2>
            <p className="text-xs uppercase tracking-widest text-gold-700 font-semibold mt-1">
              Daughter of {couple.bride.fatherName} & {couple.bride.motherName}
            </p>
            {couple.bride.grandParents && (
              <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">
                Granddaughter of {couple.bride.grandParents}
              </p>
            )}
          </div>
        </div>

        {/* Divider with Heart */}
        <div className="flex items-center justify-center gap-2 my-6">
          <div className="h-[1px] flex-1 max-w-[80px] bg-gold-300" />
          <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
          <div className="h-[1px] flex-1 max-w-[80px] bg-gold-300" />
        </div>

        {/* Heartfelt Note to Guests */}
        <div className="max-w-md mx-auto">
          <h3 className="font-serif text-base sm:text-lg text-stone-800 font-medium mb-2">
            Dearest Family and Friends,
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed italic">
            &ldquo;{couple.tagline} Join us for days filled with love, joyous laughter, sacred rituals, and unforgettable memories as we tie the knot and begin our forever.&rdquo;
          </p>
        </div>

        {/* Auspicious Mantra / Seven Vows mention */}
        <div className="mt-6 pt-4 border-t border-gold-200/60">
          <p className="text-[11px] text-stone-500 font-serif tracking-wider uppercase">
            Mandap Muhurat • Sangeet • Pheras • Royal Banquet
          </p>
        </div>
      </motion.div>
    </section>
  );
}
