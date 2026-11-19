"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function LoveStorySection() {
  const { loveStory, couple } = weddingData;

  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section className="relative py-14 px-4 max-w-xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Our Journey</span>
          <div className="h-[1px] w-12 bg-gold-400" />
        </div>
        <h2 className="text-3xl font-serif text-stone-800 tracking-wide font-normal">
          How Forever Began
        </h2>
        <p className="text-stone-500 font-serif text-xs sm:text-sm mt-1">
          The story of {couple.bride.firstName} & {couple.groom.firstName}
        </p>
      </div>

      {/* Story Cards */}
      <div className="space-y-6">
        {loveStory.map((item, index) => (
          <motion.div
            key={item.phase}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="rounded-2xl bg-white/90 backdrop-blur-sm border border-gold-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-gold-700 font-serif font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                {item.phase}
              </span>
              <span className="text-xs font-serif text-stone-400">
                {item.date}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed italic">
              &ldquo;{item.description}&rdquo;
            </p>

            <div className="absolute -bottom-6 -right-6 w-20 h-20 opacity-5 pointer-events-none">
              <Heart className="w-full h-full text-gold-600 fill-gold-600" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
