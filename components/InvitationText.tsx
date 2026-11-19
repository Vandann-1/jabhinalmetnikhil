"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function InvitationText() {
  const { couple } = weddingData;

  return (
    <section className="relative py-10 px-4 text-center">
      {/* Decorative Outer Arched Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE4] p-6 sm:p-8 border border-gold-300/80 shadow-luxury"
      >
        {/* Ornate Gold Corner Borders */}
        <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-gold-500 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-gold-500 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-gold-500 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-gold-500 rounded-br-lg pointer-events-none" />

        {/* Top Blessing */}
        <div className="text-gold-700 text-xs sm:text-sm font-serif font-bold tracking-widest mb-2">
          {couple.auspiciousSymbol}
        </div>

        <p className="text-stone-500 text-[11px] sm:text-xs font-serif tracking-[0.2em] uppercase mb-6">
          cordially invite you to the wedding of
        </p>

        {/* Groom & Bride Lineage */}
        <div className="space-y-4 my-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-900 tracking-wide font-normal">
              {couple.groom.firstName}
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Son of {couple.groom.fatherName} & {couple.groom.motherName}
            </p>
            {couple.groom.grandParents && (
              <p className="text-[10px] text-stone-400 font-serif italic mt-0.5">
                Grandson of {couple.groom.grandParents}
              </p>
            )}
          </div>

          {/* Center Monogram Emblem */}
          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8E691A] via-[#E9C874] to-[#FFF3C2] p-0.5 shadow-seal border border-[#FEEBA4]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E2B958] via-[#C59B27] to-[#875F0E] flex items-center justify-center p-1.5 shadow-inner">
                <img
                  src="/images/hn-logo-gold.png"
                  alt="HN"
                  className="w-full h-full object-contain filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
            <span className="font-script text-2xl text-gold-600 italic mt-0.5">with</span>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-stone-900 tracking-wide font-normal">
              {couple.bride.firstName}
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Daughter of {couple.bride.fatherName} & {couple.bride.motherName}
            </p>
            {couple.bride.grandParents && (
              <p className="text-[10px] text-stone-400 font-serif italic mt-0.5">
                Granddaughter of {couple.bride.grandParents}
              </p>
            )}
          </div>
        </div>

        {/* Divider with Heart */}
        <div className="flex items-center justify-center gap-2 my-5">
          <div className="h-[1px] flex-1 max-w-[60px] bg-gold-300" />
          <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
          <div className="h-[1px] flex-1 max-w-[60px] bg-gold-300" />
        </div>

        {/* Heartfelt Note to Guests */}
        <div className="max-w-xs mx-auto">
          <p className="text-xs text-stone-600 font-serif leading-relaxed italic">
            &ldquo;{couple.familyGreeting}&rdquo;
          </p>
        </div>

        {/* Auspicious Seven Vows Footer */}
        <div className="mt-5 pt-4 border-t border-gold-200/60">
          <p className="text-[10px] text-stone-500 font-serif tracking-widest uppercase">
            Mandap Muhurat • Sangeet • Pheras • Royal Banquet
          </p>
        </div>
      </motion.div>
    </section>
  );
}
