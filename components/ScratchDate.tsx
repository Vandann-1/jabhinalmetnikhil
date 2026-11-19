"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, RotateCcw, Calendar, Check, Clock, Navigation } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface ScratchCanvasProps {
  label: string;
  revealedValue: string;
  subLabel?: string;
  onRevealed?: () => void;
  isAutoScratching?: boolean;
}

function ScratchCard({
  label,
  revealedValue,
  subLabel,
  onRevealed,
  isAutoScratching,
}: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  // Initialize crisp high-DPI metallic gold canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";

    // Rich metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#C9A043");
    gradient.addColorStop(0.22, "#F7E6B5");
    gradient.addColorStop(0.5, "#D8AD4C");
    gradient.addColorStop(0.78, "#FCEEC9");
    gradient.addColorStop(1, "#A97F29");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Elegant dual metallic border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(120, 85, 20, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(13, 13, width - 26, height - 26);

    // Text on scratch foil
    ctx.fillStyle = "#4A350E";
    ctx.font = "bold 15px 'Cinzel', serif, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ✦", width / 2, height / 2 - 12);

    ctx.fillStyle = "#6B4C12";
    ctx.font = "bold 12px 'Montserrat', sans-serif";
    ctx.fillText(label.toUpperCase(), width / 2, height / 2 + 13);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (x: number, y: number, radius = 28) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) {
          transparentCount += 8;
        }
      }

      if (transparentCount / totalPixels > 0.4) {
        setIsScratched(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onRevealed?.();
      }
    } catch {}
  };

  // Automated Smooth Scratch Animation (when scrolled into view)
  useEffect(() => {
    if (!isAutoScratching || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let step = 0;
    const totalSteps = 26;
    const width = canvas.width;
    const height = canvas.height;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      const y = progress * height;
      const x = (Math.sin(progress * Math.PI * 4) * 0.42 + 0.5) * width;

      scratch(x, y, 32);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsScratched(true);
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, width, height);
        onRevealed?.();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isAutoScratching]);

  // Pointer Handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawing.current = true;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    scratch(x, y);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    scratch(x, y);
  };

  return (
    <div className="flex flex-col items-center">
      {/* High-Definition Pure White Card */}
      <div className="relative w-[105px] h-[135px] sm:w-[125px] sm:h-[145px] rounded-2xl bg-white shadow-lg border-2 border-gold-400 p-2 flex flex-col items-center justify-center overflow-hidden group select-none">
        
        {/* Revealed Content: Ultra-Clean, Bold, Proper 26 January */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none bg-white">
          <span className="text-stone-400 text-[10px] uppercase tracking-widest font-sans font-bold mb-0.5">
            {label}
          </span>

          {/* Large, Clear, Regal Number / Month */}
          <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#7A1424] tracking-tight my-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)] leading-none">
            {revealedValue}
          </span>

          {subLabel ? (
            <span className="text-[11px] text-gold-800 font-cinzel font-bold tracking-wider mt-1">
              {subLabel}
            </span>
          ) : (
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-semibold mt-1">
              2027
            </span>
          )}

          {isScratched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </motion.div>
          )}
        </div>

        {/* Scratchable Canvas Layer (2x scale for retina crispness) */}
        <canvas
          ref={canvasRef}
          width={240}
          height={280}
          onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
          onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={(e) => {
            if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => { isDrawing.current = false; }}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-500 rounded-2xl ${
            isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      <span className="mt-1.5 text-xs font-cinzel font-bold text-stone-800 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function ScratchDate() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeAutoCard, setActiveAutoCard] = useState<number>(-1);
  const [revealedCount, setRevealedCount] = useState(0);
  const hasTriggeredScroll = useRef(false);
  const hasCelebrated = useRef(false);

  // Trigger smooth progressive auto-scratch on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredScroll.current) {
          hasTriggeredScroll.current = true;
          setTimeout(() => setActiveAutoCard(0), 400); // Card 1 (26)
          setTimeout(() => setActiveAutoCard(1), 1500); // Card 2 (JANUARY)
          setTimeout(() => setActiveAutoCard(2), 2600); // Card 3 (2027)
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardRevealed = () => {
    setRevealedCount((prev) => {
      const next = prev + 1;
      if (next >= 3 && !hasCelebrated.current) {
        hasCelebrated.current = true;
        try {
          confetti({
            particleCount: 95,
            spread: 95,
            origin: { y: 0.65 },
            colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#7A1424"],
          });
        } catch {}
      }
      return next;
    });
  };

  const handleReset = () => {
    setRevealedCount(0);
    hasCelebrated.current = false;
    setActiveAutoCard(-1);
    setTimeout(() => setActiveAutoCard(0), 200);
    setTimeout(() => setActiveAutoCard(1), 1300);
    setTimeout(() => setActiveAutoCard(2), 2400);
  };

  const handleAddWeddingToCalendar = () => {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Wedding Ceremony of Hinal & Nikhil"
    )}&details=${encodeURIComponent(
      "Hast Melap & Wedding Ceremony of Hinal & Nikhil. Procession from Galodiya to New Metral, Khedbrahma, Gujarat."
    )}&location=${encodeURIComponent(
      weddingData.venue.fullAddress
    )}&dates=20270126T070000Z/20270126T140000Z`;

    window.open(gCalUrl, "_blank");
  };

  const { day, month, year, label } = weddingData.theDate.scratchCard;

  return (
    <section ref={sectionRef} className="relative py-12 px-4 text-center">
      
      {/* Decorative Ribbon Header */}
      <div className="flex items-center justify-center gap-3 mb-1">
        <div className="h-[1px] w-12 bg-gold-400" />
        <span className="text-gold-700 font-script text-2xl">Auspicious Wedding Muhurat</span>
        <div className="h-[1px] w-12 bg-gold-400" />
      </div>

      <h2 className="text-3xl font-cinzel font-black text-stone-900 tracking-wide mb-3">
        SAVE THE DATE
      </h2>

      {/* Prominent Crystal-Clear 26 JANUARY 2027 Card (Bold, Majestic, Pure White Card) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[380px] mx-auto my-4 p-6 rounded-3xl bg-white border-2 border-gold-400 shadow-luxury flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        {/* Subtle Gold Corner Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold-400 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold-400 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold-400 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold-400 rounded-br pointer-events-none" />

        <span className="text-[11px] font-cinzel font-bold uppercase tracking-[0.25em] text-gold-800 mb-1">
          ✦ Sacred Matrimony Muhurat ✦
        </span>

        {/* Day of Week */}
        <span className="font-cinzel text-sm font-bold text-stone-600 tracking-[0.3em] uppercase mt-1">
          T U E S D A Y
        </span>

        {/* 26 Grand Display */}
        <div className="my-1">
          <span className="font-cinzel text-7xl sm:text-8xl font-black text-[#7A1424] tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(122,20,36,0.15)] block">
            26
          </span>
        </div>

        {/* Month & Year */}
        <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#7A1424] tracking-[0.18em] leading-none mb-2">
          JANUARY 2027
        </span>

        {/* Auspicious Muhurat Time */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-serif font-bold mt-1">
          <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>Hast Melap & Wedding Ceremony • 12:30 PM</span>
        </div>

        {/* Wedding Procession Route Summary under date */}
        <div className="mt-3 pt-3 border-t border-gold-200 w-full text-center">
          <p className="text-[11px] font-serif text-stone-700 font-medium flex items-center justify-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>Procession: <strong className="text-stone-900">Galodiya</strong> to <strong className="text-stone-900">New Metral</strong></span>
          </p>
        </div>
      </motion.div>

      {/* Scratch Instruction Prompt */}
      <p className="text-gold-800 text-xs font-serif tracking-widest mt-4 mb-4 flex items-center justify-center gap-1.5 font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
        <span>Auto-reveals on scroll or swipe with finger</span>
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
      </p>

      {/* The 3 Scratch Cards: 26 | JANUARY | 2027 */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-4">
        <ScratchCard
          label="Day"
          revealedValue={day}
          subLabel="Tuesday"
          isAutoScratching={activeAutoCard >= 0}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          label="Month"
          revealedValue={month}
          subLabel="2027"
          isAutoScratching={activeAutoCard >= 1}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          label="Year"
          revealedValue={year}
          subLabel="Hast Melap"
          isAutoScratching={activeAutoCard >= 2}
          onRevealed={handleCardRevealed}
        />
      </div>

      {/* Re-scratch & Calendar Controls */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {revealedCount >= 3 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs font-cinzel text-[#7A1424] bg-white px-4 py-1.5 rounded-full border border-gold-300 font-bold shadow-sm">
              ✨ 26th January 2027 Revealed ✨
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 bg-white border border-gold-300 shadow-sm"
              title="Scratch Again"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : null}

        <button
          onClick={handleAddWeddingToCalendar}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-gold-50 border border-gold-400 text-gold-900 text-xs font-serif font-bold shadow-sm transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-gold-600" />
          <span>Add 26th January 2027 to Calendar</span>
        </button>
      </div>

    </section>
  );
}
