"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Navigation,
  MapPin,
  CalendarPlus,
  Heart,
  Music,
  Flame,
  Sun,
  UtensilsCrossed,
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

  const getEventIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Flame className="w-3.5 h-3.5 text-amber-700" />;
      case 1:
        return <Sun className="w-3.5 h-3.5 text-amber-700" />;
      case 2:
        return <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />;
      case 3:
        return <Music className="w-3.5 h-3.5 text-amber-700" />;
      case 4:
        return <Flame className="w-3.5 h-3.5 text-amber-700" />;
      case 5:
        return <Heart className="w-3.5 h-3.5 text-[#7A1424]" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-amber-700" />;
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 select-none">
      
      {/* Title Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400/80" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Ceremony Schedule
          </span>
          <div className="h-[1px] w-10 bg-gold-400/80" />
        </div>

        <h2 className="text-3xl font-cinzel font-black text-stone-900 tracking-wider">
          <TypewriterText text="WEDDING TIMELINE" speed={0.04} />
        </h2>
        <p className="text-stone-500 font-serif text-xs mt-1">
          24th January – 26th January 2027
        </p>

        {/* Minimal Day Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
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
                    ? "bg-gradient-to-b from-white via-[#FFF8F9] to-white border-2 border-[#7A1424]/40 shadow-md ring-1 ring-gold-400/50"
                    : "bg-white/95 border border-[#F3D5D8] shadow-sm hover:shadow-md"
                }`}
              >
                {/* Card Top Row: Number Badge, Date, Time Pill */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gold-100 to-amber-50 border border-gold-300 flex items-center justify-center shrink-0 shadow-2xs">
                      {getEventIcon(originalIndex)}
                    </div>
                    <span className="font-cinzel text-xs font-bold text-stone-800 tracking-wider">
                      {event.date}
                    </span>
                  </div>

                  {/* Clean Time Pill */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D5DC] text-[#7A1424] font-serif font-bold text-xs tracking-wide shrink-0">
                    <Clock className="w-3 h-3 text-[#7A1424] shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {/* Ceremony Title */}
                <h3 className="text-base sm:text-lg font-cinzel font-bold text-stone-900 tracking-wide mb-1">
                  <TypewriterText text={event.title} speed={0.03} delay={0.1} />
                </h3>

                {/* Subtitle / Meaning */}
                <p className="text-xs font-serif font-semibold text-gold-900 tracking-wide mb-1.5">
                  {event.subTitle}
                </p>

                {/* Description */}
                <p className="text-xs text-stone-600 font-serif leading-relaxed mb-3">
                  {event.description}
                </p>

                {/* Special Highlight for Wedding Procession Route */}
                {event.specialNote && (
                  <div className="my-2.5 p-2.5 rounded-xl bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs font-serif font-semibold flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{event.specialNote}</span>
                  </div>
                )}

                {/* Card Footer: Venue & Add to Calendar */}
                <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-[11px] font-serif text-stone-500">
                  <div className="flex items-center gap-1 text-stone-600 truncate mr-2">
                    <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCalendar(event)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-50 hover:bg-gold-50 border border-stone-200 text-stone-700 hover:text-gold-900 text-[10px] font-serif font-bold transition-all shrink-0 active:scale-95"
                    title="Add to Google Calendar"
                  >
                    <CalendarPlus className="w-3 h-3 text-gold-700" />
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
