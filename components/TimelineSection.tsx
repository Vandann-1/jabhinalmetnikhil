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
} from "lucide-react";
import { weddingData, CeremonyEvent } from "@/lib/wedding-data";

export default function TimelineSection() {
  const { ceremonies } = weddingData;

  const getIcon = (iconName: CeremonyEvent["icon"]) => {
    switch (iconName) {
      case "om":
        return <Flame className="w-5 h-5 text-amber-600" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-gold-600" />;
      case "music":
        return <Music className="w-5 h-5 text-purple-600" />;
      case "sun":
        return <Sun className="w-5 h-5 text-amber-500" />;
      case "ring":
        return <Heart className="w-5 h-5 text-rose-600" />;
      case "utensils":
        return <UtensilsCrossed className="w-5 h-5 text-gold-700" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-600" />;
    }
  };

  const handleAddToCalendar = (event: CeremonyEvent["calendarEvent"]) => {
    // Generate Google Calendar Link
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
    <section className="relative py-14 px-4 max-w-xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Celebrations</span>
          <div className="h-[1px] w-12 bg-gold-400" />
        </div>
        <h2 className="text-3xl font-serif text-stone-800 tracking-wide font-normal">
          Wedding Timeline
        </h2>
        <p className="text-stone-500 font-serif text-xs sm:text-sm mt-1">
          Join us across each sacred ceremony and joyful celebration
        </p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-gold-300 before:via-gold-500 before:to-gold-300 space-y-8">
        {ceremonies.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Node Badge Icon on vertical line */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#FFF7E3] via-[#F4E1BA] to-[#DEC080] border-2 border-gold-500 shadow-md flex items-center justify-center z-10">
              {getIcon(event.icon)}
            </div>

            {/* Event Card */}
            <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-gold-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Event Time & Date Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-800 text-xs font-serif font-bold tracking-wide border border-gold-200">
                  <Clock className="w-3 h-3 text-gold-600" />
                  {event.time}
                </span>

                <span className="text-[11px] text-stone-500 font-serif flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  {event.date}
                </span>
              </div>

              {/* Ceremony Title */}
              <h3 className="text-lg sm:text-xl font-serif text-stone-900 font-medium">
                {event.title}
              </h3>
              <p className="text-gold-700 text-xs font-serif italic mb-2">
                {event.subTitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed mb-3">
                {event.description}
              </p>

              {/* Details & Location */}
              <div className="flex flex-col gap-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="font-medium">{event.venue}</span>
                </div>
                {event.dressCodeSuggestion && (
                  <div className="text-[11px] text-stone-500 italic pl-5">
                    Attire: {event.dressCodeSuggestion}
                  </div>
                )}
              </div>

              {/* Add to Calendar Button */}
              <div className="mt-3 pt-2 flex justify-end">
                <button
                  onClick={() => handleAddToCalendar(event.calendarEvent)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-serif text-gold-800 hover:text-gold-900 bg-gold-50 hover:bg-gold-100 border border-gold-200/80 transition-colors"
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
