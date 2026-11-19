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
    <section className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-gold-600 font-script text-2xl sm:text-3xl">Celebrations</span>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-wide font-normal">
          Wedding Timeline
        </h2>
        <p className="text-stone-500 font-serif text-xs sm:text-sm mt-1">
          Join us across each sacred ceremony and joyful celebration
        </p>
      </div>

      {/* Responsive Timeline: Alternating 2-Column on Desktop (md+), Left-Aligned on Mobile */}
      <div className="relative">
        
        {/* Central Vertical Line for Desktop (md+), Left Line for Mobile */}
        <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300" />

        <div className="space-y-8 md:space-y-12">
          {ceremonies.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FFF7E3] via-[#F4E1BA] to-[#DEC080] border-2 border-gold-500 shadow-md flex items-center justify-center z-10">
                  {getIcon(event.icon)}
                </div>

                {/* Content Card (Desktop: half width, Mobile: left indented) */}
                <div className="w-full pl-12 md:pl-0 md:w-1/2 md:px-8">
                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-gold-200/90 p-6 shadow-sm hover:shadow-luxury transition-all">
                    
                    {/* Time & Date Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-800 text-xs font-serif font-bold tracking-wide border border-gold-200">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        {event.time}
                      </span>

                      <span className="text-xs text-stone-500 font-serif flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {event.date}
                      </span>
                    </div>

                    {/* Ceremony Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium">
                      {event.title}
                    </h3>
                    <p className="text-gold-700 text-xs sm:text-sm font-serif italic mb-2">
                      {event.subTitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Details & Location */}
                    <div className="flex flex-col gap-1 text-xs text-stone-600 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2 text-stone-800">
                        <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                        <span className="font-medium">{event.venue}</span>
                      </div>
                      {event.dressCodeSuggestion && (
                        <div className="text-xs text-stone-500 italic pl-6">
                          Attire Suggestion: {event.dressCodeSuggestion}
                        </div>
                      )}
                    </div>

                    {/* Add to Calendar Button */}
                    <div className="mt-4 pt-2 flex justify-end">
                      <button
                        onClick={() => handleAddToCalendar(event.calendarEvent)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-serif text-gold-800 hover:text-gold-900 bg-gold-50 hover:bg-gold-100 border border-gold-200 transition-colors shadow-sm"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-gold-600" />
                        <span>Save to Calendar</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Empty Half Column for Desktop Balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
