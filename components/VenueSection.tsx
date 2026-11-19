"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function VenueSection() {
  const { venue } = weddingData;

  const handleOpenMaps = () => {
    window.open(venue.googleMapsNavigationUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">The Destination</span>
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
        <h2 className="text-2xl font-serif text-stone-800 tracking-wide font-normal">
          Location & Venue
        </h2>
        <p className="text-gold-700 text-xs font-serif uppercase tracking-widest mt-0.5">
          {venue.city}, {venue.state}
        </p>
      </div>

      {/* Main Venue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white border border-gold-300/80 shadow-luxury overflow-hidden"
      >
        {/* Venue Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
          <img
            src={venue.venuePhoto}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase tracking-widest text-gold-300 font-serif block font-medium">
              {venue.hall}
            </span>
            <h3 className="text-lg font-serif font-light text-white">
              {venue.name}
            </h3>
          </div>
        </div>

        {/* Venue Info Content */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base text-stone-900 font-medium">
                {venue.name}
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed mt-0.5">
                {venue.fullAddress}
              </p>
            </div>
          </div>

          {/* Map Preview Card with Floating 'Open in Maps' Button */}
          <div className="relative rounded-2xl overflow-hidden border border-gold-200 shadow-sm aspect-[16/10] bg-stone-100">
            <iframe
              src={venue.googleMapsEmbedUrl}
              title="Venue Location Map"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute top-2.5 left-2.5 z-10">
              <button
                onClick={handleOpenMaps}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 hover:bg-white text-stone-800 text-[11px] font-serif font-semibold shadow-md border border-stone-200 transition-all"
              >
                <Navigation className="w-3 h-3 text-gold-600" />
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <a
              href={`tel:${venue.contactPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-[11px] text-stone-600 font-serif"
            >
              <Phone className="w-3 h-3 text-gold-600" />
              <span>{venue.contactPhone}</span>
            </a>

            <button
              onClick={handleOpenMaps}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-stone-950 font-serif text-[11px] font-semibold shadow-sm transition-all"
            >
              <Navigation className="w-3 h-3" />
              <span>Directions</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
