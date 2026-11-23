"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Navigation } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";
import TypewriterText from "@/components/TypewriterText";

export default function ScratchDate() {
  const handleAddWeddingToCalendar = () => {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Wedding of Hinal & Nikhil"
    )}&details=${encodeURIComponent(
      "Hast Melap & Wedding Ceremony of Hinal & Nikhil. Procession from Galodiya to New Metral, Khedbrahma, Gujarat. #JabHinalMetNikhil"
    )}&location=${encodeURIComponent(
      weddingData.venue.fullAddress
    )}&dates=20270126T123000/20270126T193000&ctz=Asia/Kolkata`;

    window.open(gCalUrl, "_blank");
  };

  return (
    <section id="date-section" className="relative py-12 px-6 text-center select-none">
      
      {/* Delicate Gold Accent Header */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-10 bg-gold-400" />
        <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
          <TypewriterText text="Auspicious Muhurat" speed={0.03} />
        </span>
        <div className="h-[1px] w-10 bg-gold-400" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-stone-900 tracking-wider mb-2">
        <TypewriterText text="SAVE THE DATE" speed={0.05} delay={0.1} />
      </h2>

      {/* Pure Editorial Typography — Clean, Royal, Unmistakable */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-5 flex flex-col items-center justify-center text-center"
      >
        <span className="font-cinzel text-sm sm:text-base font-bold text-stone-700 tracking-[0.35em] uppercase mb-1">
          <TypewriterText text="T U E S D A Y" speed={0.04} delay={0.2} />
        </span>

        {/* Grand 26 */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
          className="font-cinzel text-7xl sm:text-8xl font-black text-[#7A1424] tracking-tight leading-none drop-shadow-sm my-1"
        >
          26
        </motion.span>

        {/* Grand JANUARY 2027 */}
        <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#7A1424] tracking-[0.2em] uppercase leading-none mb-3">
          <TypewriterText text="JANUARY 2027" speed={0.04} delay={0.4} />
        </span>

        {/* Auspicious Time & Ceremony Badge - High Contrast, Solid, Crisp */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-gold-400 text-stone-900 text-xs font-serif font-bold mb-3 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#7A1424] shrink-0" />
          <span className="text-[#7A1424] font-black">Hast Melap &amp; Wedding Ceremony</span>
          <span className="text-gold-500 font-bold">•</span>
          <span className="text-stone-900 font-black">12:30 PM</span>
        </div>

        {/* Procession Route */}
        <p className="text-xs font-serif text-stone-700 font-medium flex items-center justify-center gap-1.5 mt-1 mb-5">
          <Navigation className="w-3.5 h-3.5 text-gold-700 shrink-0" />
          <span>Procession: <strong className="text-stone-900 font-bold">Galodiya</strong> to <strong className="text-stone-900 font-bold">New Metral</strong></span>
        </p>

        {/* Add to Calendar Button */}
        <button
          onClick={handleAddWeddingToCalendar}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gold-50 border-2 border-gold-400 text-stone-900 text-xs font-serif font-black shadow-xs transition-all active:scale-95"
        >
          <Calendar className="w-4 h-4 text-gold-700" />
          <span>Add 26th January 2027 to Calendar</span>
        </button>
      </motion.div>

    </section>
  );
}
