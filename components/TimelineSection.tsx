"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Navigation, Flame, Sparkles, Music, Sun, Heart, UtensilsCrossed } from "lucide-react";
import { weddingData, CeremonyEvent } from "@/lib/wedding-data";

export default function TimelineSection() {
  const { ceremonies } = weddingData;
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const days = [
    { id: "all", label: "All Days" },
    { id: "24", label: "24 Jan (Sun)" },
    { id: "25", label: "25 Jan (Mon)" },
    { id: "26", label: "26 Jan (Tue)" },
  ];

  const handleFilterClick = (dayId: string) => {
    setSelectedDay(dayId);
    if (dayId !== "all") {
      const targetEvent = ceremonies.find((c) => c.date.includes(dayId));
      if (targetEvent && eventRefs.current[targetEvent.id]) {
        eventRefs.current[targetEvent.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const filteredCeremonies = ceremonies.filter((c) => {
    if (selectedDay === "all") return true;
    return c.date.includes(selectedDay);
  });

  return (
    <section className="relative py-14 px-3 sm:px-6">
      
      {/* Title Header */}
      <div className="text-center mb-8">
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

        {/* Minimal Day Filter Tabs for Quick Auto-Scroll */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => handleFilterClick(day.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-serif font-bold transition-all ${
                selectedDay === day.id
                  ? "bg-[#7A1424] text-white shadow-sm"
                  : "bg-[#FFF0F3] text-stone-700 border border-[#F5D5DC] hover:bg-[#FCE6EB]"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Pure Zig-Zag Timeline Layout (Clean, Centered Spine with Alternating Left/Right) --- */}
      <div className="relative max-w-sm sm:max-w-md mx-auto py-2">
        
        {/* Central Golden Spine Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 pointer-events-none" />

        {/* Alternating Zig-Zag Entries */}
        <div className="space-y-8">
          {filteredCeremonies.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                ref={(el) => { eventRefs.current[event.id] = el; }}
                className="relative flex items-center min-h-[90px]"
              >
                {/* Center Node Badge on Golden Spine */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gold-500 shadow-sm flex items-center justify-center z-10"
                >
                  <span className="font-cinzel text-[10px] font-bold text-[#7A1424]">
                    {index + 1}
                  </span>
                </motion.div>

                {/* Left Side Content Entry */}
                {isLeft ? (
                  <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-[45%] pr-3 text-right"
                  >
                    {/* Pinkish Time Badge */}
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFF0F3] border border-[#F5D5DC] text-[#7A1424] text-[10px] font-serif font-bold tracking-wide mb-1">
                      {event.time}
                    </span>

                    <p className="text-[10px] text-stone-500 font-serif font-medium">
                      {event.date}
                    </p>

                    <h3 className="text-sm sm:text-base font-cinzel font-bold text-stone-900 leading-tight mt-0.5">
                      {event.title}
                    </h3>

                    <p className="text-[11px] text-stone-600 font-serif leading-relaxed mt-0.5">
                      {event.description}
                    </p>

                    {event.specialNote && (
                      <p className="text-[10px] text-amber-900 font-serif font-semibold mt-1">
                        📍 {event.specialNote}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <div className="w-[45%]" />
                )}

                {/* Right Side Content Entry */}
                {!isLeft ? (
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-[45%] pl-3 ml-auto text-left"
                  >
                    {/* Pinkish Time Badge */}
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFF0F3] border border-[#F5D5DC] text-[#7A1424] text-[10px] font-serif font-bold tracking-wide mb-1">
                      {event.time}
                    </span>

                    <p className="text-[10px] text-stone-500 font-serif font-medium">
                      {event.date}
                    </p>

                    <h3 className="text-sm sm:text-base font-cinzel font-bold text-stone-900 leading-tight mt-0.5">
                      {event.title}
                    </h3>

                    <p className="text-[11px] text-stone-600 font-serif leading-relaxed mt-0.5">
                      {event.description}
                    </p>

                    {event.specialNote && (
                      <p className="text-[10px] text-amber-900 font-serif font-semibold mt-1">
                        📍 {event.specialNote}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <div className="w-[45%] ml-auto" />
                )}

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
