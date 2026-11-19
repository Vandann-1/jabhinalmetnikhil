"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Navigation } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function TimelineSection() {
  const { ceremonies } = weddingData;

  return (
    <section className="relative py-12 px-6">
      
      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400/80" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Ceremony Schedule
          </span>
          <div className="h-[1px] w-10 bg-gold-400/80" />
        </div>
        <h2 className="text-3xl font-cinzel font-black text-stone-900 tracking-wider">
          WEDDING TIMELINE
        </h2>
        <p className="text-stone-500 font-serif text-xs mt-1">
          24th January – 26th January 2027
        </p>
      </div>

      {/* Minimal Editorial Vertical Timeline — NO CARDS, Pure Minimal Line */}
      <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gradient-to-b before:from-gold-300 before:via-gold-500 before:to-gold-300 space-y-7 max-w-sm mx-auto">
        {ceremonies.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="relative"
          >
            {/* Minimal Gold Bullet Node on line */}
            <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-gold-500 shadow-sm" />

            {/* Time & Date Header */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-serif font-bold text-gold-900 tracking-wide">
                {event.date}
              </span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-xs font-serif font-bold text-[#7A1424] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#7A1424]" />
                {event.time}
              </span>
            </div>

            {/* Ceremony Title */}
            <h3 className="text-lg font-cinzel font-bold text-stone-900 leading-tight">
              {event.title}
            </h3>

            {/* Subtitle / Description */}
            <p className="text-xs text-stone-600 font-serif leading-relaxed mt-0.5">
              {event.description}
            </p>

            {/* Special Route Note */}
            {event.specialNote && (
              <p className="text-[11px] font-serif text-amber-900 font-medium flex items-center gap-1.5 mt-1">
                <Navigation className="w-3 h-3 text-gold-600 shrink-0" />
                <span>{event.specialNote}</span>
              </p>
            )}
          </motion.div>
        ))}
      </div>

    </section>
  );
}
