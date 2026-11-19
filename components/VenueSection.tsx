"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function VenueSection() {
  const { venue } = weddingData;

  const handleOpenMaps = () => {
    window.open(venue.googleMapsNavigationUrl, "_blank");
  };

  return (
    <section className="relative py-10 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400/80" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Celebration Venue
          </span>
          <div className="h-[1px] w-10 bg-gold-400/80" />
        </div>

        <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-stone-900 mb-1">
          {venue.name}
        </h3>

        <p className="text-xs font-serif text-stone-600 max-w-xs mx-auto leading-relaxed mb-4">
          {venue.fullAddress}
        </p>

        <p className="text-xs font-serif text-amber-950 font-semibold mb-5 flex items-center justify-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-gold-600" />
          <span>Wedding Procession: <strong className="text-stone-900">Galodiya</strong> to <strong className="text-stone-900">New Metral</strong></span>
        </p>

        {/* Minimal Google Maps Button */}
        <button
          onClick={handleOpenMaps}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 hover:bg-white border border-gold-400 text-stone-800 text-xs font-serif font-bold shadow-sm transition-all"
        >
          <MapPin className="w-3.5 h-3.5 text-gold-600" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </button>
      </motion.div>
    </section>
  );
}
