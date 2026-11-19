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
        particleCount: 80,
        spread: 85,
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
    <section className="relative py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-gold-600 font-script text-2xl sm:text-3xl">Presence & Blessings</span>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-wide font-normal">
          RSVP
        </h2>
        <p className="text-stone-500 font-serif text-xs sm:text-sm mt-1">
          Kindly grace us with your response by {rsvp.deadline}
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-white border border-gold-300/80 p-6 sm:p-10 md:p-12 shadow-luxury"
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-2">
              Thank You, {formData.guestName}!
            </h3>
            <p className="text-stone-600 font-serif text-sm sm:text-base max-w-md mx-auto mb-8">
              Your response has been received with warm love. We look forward to celebrating together!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleSendViaWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif text-sm font-semibold shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="text-stone-500 hover:text-stone-800 text-xs sm:text-sm font-serif underline"
              >
                Edit Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Guest Name & Attendance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-serif text-stone-700 font-semibold mb-2">
                  Your Full Name / Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="e.g. Mr. & Mrs. Amit Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-sm transition-all bg-[#FCFAF6]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-serif text-stone-700 font-semibold mb-2">
                  Will you be attending?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "yes" })}
                    className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-serif transition-all flex items-center justify-center gap-2 ${
                      formData.attending === "yes"
                        ? "border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-sm"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Joyfully Attending</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "no" })}
                    className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-serif transition-all flex items-center justify-center gap-2 ${
                      formData.attending === "no"
                        ? "border-stone-600 bg-stone-100 text-stone-900 font-bold shadow-sm"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span>Regretfully Declining</span>
                  </button>
                </div>
              </div>
            </div>

            {formData.attending === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Number of Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-serif text-stone-700 font-semibold mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-600" />
                    Number of Guests Attending
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-sm transition-all bg-[#FCFAF6]"
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
                  <label className="block text-xs uppercase tracking-wider font-serif text-stone-700 font-semibold mb-2 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-gold-600" />
                    Meal Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {rsvp.mealOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, diet: opt })}
                        className={`px-3 py-2.5 rounded-lg border text-xs font-serif text-left transition-all ${
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
              </div>
            )}

            {/* Warm Wishes */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-serif text-stone-700 font-semibold mb-2">
                Blessings & Wishes for Hinal & Nikhil
              </label>
              <textarea
                rows={3}
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                placeholder="Write your heartfelt blessings, lovely memories, or advice..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-stone-800 font-serif text-sm transition-all resize-none bg-[#FCFAF6]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-stone-950 font-serif text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit RSVP Online</span>
              </button>

              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif text-sm font-medium shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>RSVP via WhatsApp</span>
              </button>
            </div>

            {/* Concierge Contact Footer */}
            <div className="pt-4 text-center border-t border-stone-100 text-xs text-stone-500 font-serif">
              For any accommodation or travel questions, please contact {rsvp.contactPerson1} ({rsvp.phone1})
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
