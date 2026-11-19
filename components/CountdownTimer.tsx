"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(weddingData.theDate.weddingDateISO).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section className="relative py-10 px-4 text-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-script text-2xl text-gold-600 block mb-1">
          The Celebration Begins
        </span>
        <h2 className="text-xl font-serif text-stone-800 tracking-wide font-normal mb-6">
          Counting Down Every Moment
        </h2>
      </motion.div>

      {/* Countdown Card Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-3xl bg-white border-2 border-gold-300 p-6 shadow-luxury"
      >
        {/* Ticker Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          
          {/* Days */}
          <div className="flex flex-col items-center min-w-[55px]">
            <span className="font-serif text-3xl font-light text-stone-900 tracking-tight">
              {mounted ? timeLeft.days : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Days
            </span>
          </div>

          <span className="font-serif text-2xl text-gold-500 -mt-3">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[55px]">
            <span className="font-serif text-3xl font-light text-stone-900 tracking-tight">
              {mounted ? formatNumber(timeLeft.hours) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Hours
            </span>
          </div>

          <span className="font-serif text-2xl text-gold-500 -mt-3">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[55px]">
            <span className="font-serif text-3xl font-light text-stone-900 tracking-tight">
              {mounted ? formatNumber(timeLeft.minutes) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Minutes
            </span>
          </div>

          <span className="font-serif text-2xl text-gold-500 -mt-3">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[55px]">
            <span className="font-serif text-3xl font-light text-gold-600 tracking-tight">
              {mounted ? formatNumber(timeLeft.seconds) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mt-0.5">
              Seconds
            </span>
          </div>
        </div>

        {/* Footer info in countdown */}
        <div className="mt-4 pt-3 border-t border-gold-200/60 flex items-center justify-center gap-1.5 text-xs text-stone-600 font-serif">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>Until Hinal & Nikhil tie the knot</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
        </div>
      </motion.div>
    </section>
  );
}
