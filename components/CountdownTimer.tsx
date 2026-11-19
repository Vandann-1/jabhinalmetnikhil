"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold block mb-1">
          Counting Down Every Moment
        </span>

        {/* Minimal Numbers Row — NO CARDS */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-3">
          
          <div className="flex flex-col items-center min-w-[50px]">
            <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] leading-none">
              {mounted ? timeLeft.days : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 font-serif font-bold mt-1">
              Days
            </span>
          </div>

          <span className="font-cinzel text-2xl text-gold-500 -mt-3">:</span>

          <div className="flex flex-col items-center min-w-[50px]">
            <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] leading-none">
              {mounted ? formatNumber(timeLeft.hours) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 font-serif font-bold mt-1">
              Hours
            </span>
          </div>

          <span className="font-cinzel text-2xl text-gold-500 -mt-3">:</span>

          <div className="flex flex-col items-center min-w-[50px]">
            <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] leading-none">
              {mounted ? formatNumber(timeLeft.minutes) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 font-serif font-bold mt-1">
              Mins
            </span>
          </div>

          <span className="font-cinzel text-2xl text-gold-500 -mt-3">:</span>

          <div className="flex flex-col items-center min-w-[50px]">
            <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] leading-none">
              {mounted ? formatNumber(timeLeft.seconds) : "00"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 font-serif font-bold mt-1">
              Secs
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
