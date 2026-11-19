"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Navigation } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function ScratchDate() {
  const handleAddWeddingToCalendar = () => {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Wedding of Hinal & Nikhil"
    )}&details=${encodeURIComponent(
      "Hast Melap & Wedding Ceremony of Hinal & Nikhil. Procession from Galodiya to New Metral, Khedbrahma, Gujarat. #JabHinalMetNikhil"
    )}&location=${encodeURIComponent(
      weddingData.venue.fullAddress
    )}&dates=20270126T070000Z/20270126T140000Z`;

    window.open(gCalUrl, "_blank");
  };

  return (
    <section id="date-section" className="relative py-12 px-6 text-center">
      
      {/* Delicate Gold Accent Header */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-10 bg-gold-400/80" />
        <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
          Auspicious Muhurat
        </span>
        <div className="h-[1px] w-10 bg-gold-400/80" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-stone-900 tracking-wider mb-2">
        SAVE THE DATE
      </h2>

      {/* Pure Editorial Typography — Clean, Royal, Unmistakable */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-5 flex flex-col items-center justify-center text-center"
      >
        <span className="font-cinzel text-sm sm:text-base font-bold text-stone-600 tracking-[0.35em] uppercase mb-1">
          T U E S D A Y
        </span>

        {/* Grand 26 */}
        <span className="font-cinzel text-7xl sm:text-8xl font-black text-[#7A1424] tracking-tight leading-none drop-shadow-sm my-1">
          26
        </span>

        {/* Grand JANUARY 2027 */}
        <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#7A1424] tracking-[0.2em] uppercase leading-none mb-3">
          JANUARY 2027
        </span>

        {/* Auspicious Time & Ceremony */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-100/60 border border-gold-300 text-gold-950 text-xs font-serif font-bold mb-2">
          <Clock className="w-3.5 h-3.5 text-gold-700 shrink-0" />
          <span>Hast Melap & Wedding Ceremony • 12:30 PM</span>
        </div>

        {/* Procession Route */}
        <p className="text-xs font-serif text-stone-600 flex items-center justify-center gap-1.5 mt-1 mb-5">
          <Navigation className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>Procession: <strong className="text-stone-900">Galodiya</strong> to <strong className="text-stone-900">New Metral</strong></span>
        </p>

        {/* Add to Calendar Button */}
        <button
          onClick={handleAddWeddingToCalendar}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-gold-400 text-gold-900 text-xs font-serif font-bold shadow-sm transition-all active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5 text-gold-600" />
          <span>Add 26th January 2027 to Calendar</span>
        </button>
      </motion.div>

    </section>
  );
}
