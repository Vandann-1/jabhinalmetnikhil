"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Navigation,
  MapPin,
  CalendarPlus,
} from "lucide-react";
import { weddingData, CeremonyEvent } from "@/lib/wedding-data";
import TypewriterText from "@/components/TypewriterText";

export default function TimelineSection() {
  const { ceremonies } = weddingData;
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const days = [
    { id: "all", label: "All Events (6)" },
    { id: "24", label: "24 Jan (Sun)" },
    { id: "25", label: "25 Jan (Mon)" },
    { id: "26", label: "26 Jan (Tue)" },
  ];

  const handleFilterClick = (dayId: string) => {
    setSelectedDay(dayId);
    if (dayId !== "all") {
      const targetEvent = ceremonies.find((c) => c.date.includes(dayId));
      if (targetEvent && eventRefs.current[targetEvent.id]) {
        eventRefs.current[targetEvent.id]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const filteredCeremonies = ceremonies.filter((c) => {
    if (selectedDay === "all") return true;
    return c.date.includes(selectedDay);
  });

  const handleAddToCalendar = (event: CeremonyEvent) => {
    const startDate = event.calendarEvent.startDate.replace(/[-:]/g, "") + "Z";
    const endDate = event.calendarEvent.endDate.replace(/[-:]/g, "") + "Z";
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.calendarEvent.title
    )}&details=${encodeURIComponent(
      event.calendarEvent.description + " #JabHinalMetNikhil"
    )}&location=${encodeURIComponent(
      event.calendarEvent.location
    )}&dates=${startDate}/${endDate}`;
    window.open(gCalUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 select-none">
      
      {/* Title Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Ceremony Schedule
          </span>
          <div className="h-[1px] w-10 bg-gold-400" />
        </div>

        <h2 className="text-3xl font-cinzel font-black text-stone-900 tracking-wider">
          <TypewriterText text="WEDDING TIMELINE" speed={0.04} />
        </h2>
        <p className="text-stone-600 font-serif text-xs font-semibold mt-1">
          24th January – 26th January 2027
        </p>

        {/* Crisp High-Contrast Day Filter Badges */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => handleFilterClick(day.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif font-bold transition-all shadow-xs ${
                selectedDay === day.id
                  ? "bg-[#7A1424] text-white border-2 border-[#7A1424]"
                  : "bg-white text-stone-800 border-2 border-stone-300 hover:border-gold-500 hover:text-gold-900"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean & Easy Vertical Cards List */}
      <div className="space-y-4 max-w-md mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredCeremonies.map((event, index) => {
            const isWeddingProcession = event.id === "wedding-procession";
            const originalIndex = ceremonies.findIndex((c) => c.id === event.id);

            return (
              <motion.div
                key={event.id}
                ref={(el) => {
                  eventRefs.current[event.id] = el;
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative w-full rounded-2xl p-4 sm:p-5 transition-all ${
                  isWeddingProcession
                    ? "bg-white border-2 border-[#7A1424] shadow-md ring-2 ring-gold-400/40"
                    : "bg-white border-2 border-gold-300/80 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Card Top Row: Crisp Number Badge, Date, High-Contrast Time Badge */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    {/* Razor-Sharp Golden Number Badge */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#8C6D23] text-white font-cinzel font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-[#FFE89E]">
                      <span className="font-bold drop-shadow-xs">{originalIndex + 1}</span>
                    </div>

                    <span className="font-cinzel text-xs font-bold text-stone-900 tracking-wider">
                      {event.date}
                    </span>
                  </div>

                  {/* High-Contrast Bold Time Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A1424] text-white font-serif font-black text-xs tracking-wider shrink-0 shadow-xs border border-[#9A1E32]">
                    <Clock className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {/* Ceremony Title */}
                <h3 className="text-base sm:text-lg font-cinzel font-black text-stone-900 tracking-wide mb-1">
                  <TypewriterText text={event.title} speed={0.03} delay={0.1} />
                </h3>

                {/* Subtitle / Meaning */}
                <p className="text-xs font-serif font-bold text-[#8C6D23] tracking-wide mb-2">
                  {event.subTitle}
                </p>

                {/* Description */}
                <p className="text-xs text-stone-700 font-serif leading-relaxed mb-3">
                  {event.description}
                </p>

                {/* Ganesh Pooja Bandhani Theme Highlight */}
                {event.dressCodeDetails?.girls && (
                  <div className="my-2.5 p-3 rounded-xl bg-rose-50/90 border-2 border-rose-200 text-stone-900 text-xs font-serif shadow-2xs">
                    <span className="font-cinzel text-xs tracking-wider uppercase font-black text-[#7A1424] block mb-1">
                      Theme / Attire Code
                    </span>
                    <div className="space-y-1 text-stone-800">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-[#7A1424]">👗 For Girls:</span>
                        <span className="font-semibold">{event.dressCodeDetails.girls}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-[#7A1424]">👔 For Boys:</span>
                        <span className="font-semibold">{event.dressCodeDetails.boys}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Carnival Sangeet Pastel Colour Code Swatches */}
                {event.dressCodeDetails?.palette && (
                  <div className="my-2.5 p-3 rounded-xl bg-[#FAF6F8] border-2 border-purple-200 text-stone-900 text-xs font-serif shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinzel text-xs tracking-wider uppercase font-black text-[#7A1424]">
                        Theme: Pastel Colour Attire
                      </span>
                      <span className="text-[10px] font-serif text-stone-600 font-bold">
                        Colour Codes
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 pt-1">
                      {event.dressCodeDetails.palette.map((swatch) => (
                        <div key={swatch.name} className="flex flex-col items-center">
                          <div
                            style={{ backgroundColor: swatch.hex }}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-stone-300 shadow-xs"
                            title={`${swatch.name} (${swatch.hex})`}
                          />
                          <span className="text-[9px] font-serif font-black text-stone-800 mt-1 text-center truncate max-w-[55px]">
                            {swatch.name}
                          </span>
                          <span className="text-[8px] font-mono text-stone-500 font-bold uppercase">
                            {swatch.hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Highlight for Wedding Procession Route */}
                {event.specialNote && (
                  <div className="my-2.5 p-3 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-serif font-bold flex items-center gap-2 shadow-2xs">
                    <Navigation className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{event.specialNote}</span>
                  </div>
                )}

                {/* Card Footer: Venue & Add to Calendar */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs font-serif text-stone-600">
                  <div className="flex items-center gap-1.5 text-stone-800 font-semibold truncate mr-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCalendar(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-gold-50 border-2 border-gold-400 text-stone-900 hover:text-[#7A1424] text-[11px] font-serif font-black transition-all shrink-0 active:scale-95 shadow-2xs"
                    title="Add to Google Calendar"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-gold-700" />
                    <span>Add Event</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
}
