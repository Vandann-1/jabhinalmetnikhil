"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  Sun,
  Flame,
  UtensilsCrossed,
  Heart,
  CalendarPlus,
  Navigation,
} from "lucide-react";
import { weddingData, CeremonyEvent } from "@/lib/wedding-data";

export default function TimelineSection() {
  const { ceremonies } = weddingData;

  const getIcon = (iconName: CeremonyEvent["icon"]) => {
    switch (iconName) {
      case "om":
        return <Flame className="w-4 h-4 text-amber-600" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-gold-600" />;
      case "music":
        return <Music className="w-4 h-4 text-purple-600" />;
      case "sun":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "ring":
        return <Heart className="w-4 h-4 text-rose-600" />;
      case "utensils":
        return <UtensilsCrossed className="w-4 h-4 text-gold-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold-600" />;
    }
  };

  const handleAddToCalendar = (event: CeremonyEvent["calendarEvent"]) => {
    const startIso = event.startDate.replace(/[-:]/g, "");
    const endIso = event.endDate.replace(/[-:]/g, "");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(
      event.location
    )}&dates=${startIso}/${endIso}`;

    window.open(gCalUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-4">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Ceremony Schedule</span>
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
        <h2 className="text-2xl font-serif text-stone-800 tracking-wide font-normal">
          Wedding Timeline
        </h2>
        <p className="text-stone-500 font-serif text-xs mt-0.5">
          24th January – 26th January 2027
        </p>
      </div>

      {/* Clean Mobile Vertical Timeline */}
      <div className="relative pl-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-gold-300 before:via-gold-500 before:to-gold-300 space-y-6">
        {ceremonies.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative"
          >
            {/* Timeline Node Badge Icon on vertical line */}
            <div className="absolute -left-6 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-[#FFF7E3] via-[#F4E1BA] to-[#DEC080] border-2 border-gold-500 shadow-sm flex items-center justify-center z-10">
              {getIcon(event.icon)}
            </div>

            {/* Event Card */}
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-gold-200/90 p-4 shadow-sm">
              
              {/* Event Time & Date Bar */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-50 text-gold-800 text-[11px] font-serif font-bold tracking-wide border border-gold-200">
                  <Clock className="w-3 h-3 text-gold-600" />
                  {event.time}
                </span>

                <span className="text-[10px] text-stone-500 font-serif flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  {event.date}
                </span>
              </div>

              {/* Ceremony Title */}
              <h3 className="text-base font-serif text-stone-900 font-bold">
                {event.title}
              </h3>
              <p className="text-gold-700 text-xs font-serif italic mb-1.5">
                {event.subTitle}
              </p>

              {/* Description */}
              <p className="text-xs text-stone-600 font-serif leading-relaxed mb-2.5">
                {event.description}
              </p>

              {/* Special Note (e.g. Procession from Galodiya to Metral) */}
              {event.specialNote && (
                <div className="mb-2.5 p-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] font-serif text-amber-900 flex items-start gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{event.specialNote}</span>
                </div>
              )}

              {/* Details & Location */}
              <div className="flex flex-col gap-1 text-[11px] text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-stone-800">
                  <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                  <span className="font-medium">{event.venue}</span>
                </div>
                {event.dressCodeSuggestion && (
                  <div className="text-[10px] text-stone-500 italic pl-4">
                    Attire: {event.dressCodeSuggestion}
                  </div>
                )}
              </div>

              {/* Add to Calendar Button */}
              <div className="mt-2.5 pt-1.5 flex justify-end">
                <button
                  onClick={() => handleAddToCalendar(event.calendarEvent)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-serif text-gold-800 hover:text-gold-900 bg-gold-50 hover:bg-gold-100 border border-gold-200 transition-colors"
                >
                  <CalendarPlus className="w-3 h-3 text-gold-600" />
                  <span>Save to Calendar</span>
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
