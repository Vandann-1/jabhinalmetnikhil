"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, MessageCircle, Heart, Users, Utensils } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

export default function RsvpSection() {
  const { rsvp, couple } = weddingData;

  const [formData, setFormData] = useState({
    guestName: "",
    attending: "yes",
    guestCount: 2,
    diet: rsvp.mealOptions[0] || "Pure Vegetarian",
    wishes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#E8B4B8", "#8E1D30"],
      });
    } catch {}

    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.guestName.trim()) {
      alert("Please enter your name before sending RSVP via WhatsApp.");
      return;
    }

    const message = `Namaste! 🙏\n\n*Wedding RSVP for ${couple.bride.firstName} & ${couple.groom.firstName}*\n\n` +
      `*Guest Name:* ${formData.guestName}\n` +
      `*Attending:* ${formData.attending === "yes" ? "Joyfully Attending 🎉" : "Regretfully Declining"}\n` +
      (formData.attending === "yes" ? `*Total Guests:* ${formData.guestCount}\n` : "") +
      (formData.attending === "yes" ? `*Diet Preference:* ${formData.diet}\n` : "") +
      (formData.wishes ? `*Wishes for Couple:* "${formData.wishes}"\n\n` : "\n") +
      `Looking forward to celebrating ${couple.hashtag}! 💖`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${rsvp.whatsapp1}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-gold-400" />
          <span className="text-gold-600 font-script text-2xl">Presence & Blessings</span>
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
        <h2 className="text-2xl font-serif text-stone-800 tracking-wide font-normal">
          RSVP
        </h2>
        <p className="text-stone-500 font-serif text-xs mt-0.5">
          Kindly respond by {rsvp.deadline}
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white border border-gold-300/80 p-5 sm:p-6 shadow-luxury"
      >
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 mb-1">
              Thank You, {formData.guestName}!
            </h3>
            <p className="text-stone-600 font-serif text-xs max-w-xs mx-auto mb-5">
              Your response has been noted with love. We eagerly look forward to celebrating with you!
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleSendViaWhatsApp}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="text-stone-500 hover:text-stone-800 text-xs font-serif underline mt-1"
              >
                Edit Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Guest Name */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-serif text-stone-700 font-semibold mb-1">
                Your Full Name / Family Name *
              </label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="e.g. Mr. & Mrs. Amit Shah"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-xs transition-all bg-[#FCFAF6]"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-serif text-stone-700 font-semibold mb-1.5">
                Will you be attending?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: "yes" })}
                  className={`p-2.5 rounded-xl border text-xs font-serif transition-all flex items-center justify-center gap-1.5 ${
                    formData.attending === "yes"
                      ? "border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-sm"
                      : "border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Joyfully Attending</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: "no" })}
                  className={`p-2.5 rounded-xl border text-xs font-serif transition-all flex items-center justify-center gap-1.5 ${
                    formData.attending === "no"
                      ? "border-stone-600 bg-stone-100 text-stone-900 font-bold shadow-sm"
                      : "border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <span>Declining</span>
                </button>
              </div>
            </div>

            {formData.attending === "yes" && (
              <>
                {/* Number of Guests */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-serif text-stone-700 font-semibold mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-600" />
                    Number of Guests Attending
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-xs transition-all bg-[#FCFAF6]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dietary Preferences */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-serif text-stone-700 font-semibold mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-gold-600" />
                    Meal Preference
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {rsvp.mealOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, diet: opt })}
                        className={`px-2.5 py-2 rounded-lg border text-[11px] font-serif text-left transition-all ${
                          formData.diet === opt
                            ? "border-gold-500 bg-gold-50 text-gold-900 font-semibold"
                            : "border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Warm Wishes */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-serif text-stone-700 font-semibold mb-1">
                Blessings & Wishes for Hinal & Nikhil
              </label>
              <textarea
                rows={2}
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                placeholder="Write your loving blessings or message..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-xs transition-all resize-none bg-[#FCFAF6]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-stone-950 font-serif text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit RSVP</span>
              </button>

              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif text-xs font-medium shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>

            {/* Contact Host Footer */}
            <div className="pt-2 text-center border-t border-stone-100 text-[10px] text-stone-500 font-serif">
              For any questions, contact {rsvp.contactPerson1} ({rsvp.phone1})
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
