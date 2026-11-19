"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function RsvpSection() {
  const { rsvp, couple } = weddingData;

  const handleSendViaWhatsApp = () => {
    const message = `Namaste! 🙏\n\n*Wedding RSVP for ${couple.bride.firstName} & ${couple.groom.firstName}*\n\n` +
      `We are delighted to confirm our attendance for the wedding celebrations on 26th January 2027 in New Metral!\n\n` +
      `Looking forward to celebrating ${couple.hashtag}! 💖✨`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${rsvp.whatsapp1}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-10 bg-gold-400/80" />
          <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            Join the Celebration
          </span>
          <div className="h-[1px] w-10 bg-gold-400/80" />
        </div>

        <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-stone-900 mb-2">
          R.S.V.P
        </h3>

        <p className="text-xs text-stone-600 font-serif italic max-w-xs mx-auto leading-relaxed mb-6">
          Kindly confirm your gracious presence via WhatsApp to help us prepare a warm welcome for you.
        </p>

        {/* Minimal 1-Click WhatsApp RSVP Button */}
        <button
          onClick={handleSendViaWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#1F7A48] hover:bg-[#19663C] text-white text-xs sm:text-sm font-serif font-bold shadow-md transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#1F7A48]" />
          <span>Confirm Attendance on WhatsApp</span>
        </button>

        <p className="text-[11px] text-stone-500 font-serif mt-3">
          For queries, contact: <span className="font-semibold text-stone-800">{rsvp.contactPerson1}</span> ({rsvp.phone1})
        </p>
      </motion.div>
    </section>
  );
}
