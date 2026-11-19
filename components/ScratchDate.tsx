"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, RotateCcw, Calendar, Clock, Navigation } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface ScratchCanvasProps {
  label: string;
  revealedValue: string;
  subLabel?: string;
  onRevealed?: () => void;
  isAutoScratching?: boolean;
}

function MinimalScratchBadge({
  label,
  revealedValue,
  subLabel,
  onRevealed,
  isAutoScratching,
}: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

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
    gradient.addColorStop(0.25, "#F7E6B5");
    gradient.addColorStop(0.5, "#D8AD4C");
    gradient.addColorStop(0.75, "#FCEEC9");
    gradient.addColorStop(1, "#A97F29");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Minimal gold border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.fillStyle = "#4A350E";
    ctx.font = "bold 13px 'Cinzel', serif, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH", width / 2, height / 2 - 8);

    ctx.fillStyle = "#6B4C12";
    ctx.font = "bold 11px 'Montserrat', sans-serif";
    ctx.fillText(label.toUpperCase(), width / 2, height / 2 + 10);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (x: number, y: number, radius = 26) => {
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
        if (pixels[i] === 0) transparentCount += 8;
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
    const totalSteps = 24;
    const width = canvas.width;
    const height = canvas.height;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const y = progress * height;
      const x = (Math.sin(progress * Math.PI * 4) * 0.42 + 0.5) * width;

      scratch(x, y, 28);

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
      {/* Sleek Minimal Badge directly on page, no card box */}
      <div className="relative w-[100px] h-[115px] sm:w-[115px] sm:h-[125px] rounded-2xl bg-white/70 backdrop-blur-sm border border-gold-400/80 p-2 flex flex-col items-center justify-center overflow-hidden select-none shadow-sm">
        
        {/* Revealed Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center pointer-events-none">
          <span className="text-stone-500 text-[10px] uppercase tracking-widest font-sans font-bold">
            {label}
          </span>
          <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#7A1424] tracking-tight my-0.5 leading-none">
            {revealedValue}
          </span>
          {subLabel && (
            <span className="text-[10px] text-gold-800 font-cinzel font-bold tracking-wider">
              {subLabel}
            </span>
          )}

          {isScratched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </motion.div>
          )}
        </div>

        {/* Scratchable Gold Foil */}
        <canvas
          ref={canvasRef}
          width={200}
          height={230}
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

      <span className="mt-1 text-[11px] font-cinzel font-bold text-stone-700 uppercase tracking-widest">
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredScroll.current) {
          hasTriggeredScroll.current = true;
          setTimeout(() => setActiveAutoCard(0), 400);
          setTimeout(() => setActiveAutoCard(1), 1400);
          setTimeout(() => setActiveAutoCard(2), 2400);
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
            particleCount: 80,
            spread: 85,
            origin: { y: 0.6 },
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
    setTimeout(() => setActiveAutoCard(1), 1200);
    setTimeout(() => setActiveAutoCard(2), 2200);
  };

  const handleAddWeddingToCalendar = () => {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Wedding of Hinal & Nikhil"
    )}&details=${encodeURIComponent(
      "Hast Melap & Wedding Ceremony of Hinal & Nikhil. Procession from Galodiya to New Metral, Khedbrahma, Gujarat. #JabHinalMetNikhil"
    )}&location=${encodeURIComponent(
      weddingData.venue.fullAddress
    )}&dates=20270126T070000Z/20270126T140000Z`;

    window.open(gCalUrl, "_blank");
  };

  const { day, month, year } = weddingData.theDate.scratchCard;

  return (
    <section id="date-section" ref={sectionRef} className="relative py-12 px-4 text-center">
      
      {/* Delicate Gold Accent Line */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-10 bg-gold-400/80" />
        <span className="text-gold-700 font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
          Auspicious Muhurat
        </span>
        <div className="h-[1px] w-10 bg-gold-400/80" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-stone-900 tracking-wider mb-1">
        SAVE THE DATE
      </h2>

      {/* Pure Editorial Typography — NO CARDS, Clean, Royal, Unmistakable */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-6 flex flex-col items-center justify-center text-center"
      >
        <span className="font-cinzel text-sm sm:text-base font-bold text-stone-600 tracking-[0.35em] uppercase mb-1">
          T U E S D A Y
        </span>

        {/* Grand 26 */}
        <span className="font-cinzel text-7xl sm:text-8xl font-black text-[#7A1424] tracking-tight leading-none drop-shadow-sm my-1">
          26
        </span>

        {/* Grand JANUARY 2027 */}
        <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#7A1424] tracking-[0.2em] uppercase leading-none mb-3">
          JANUARY 2027
        </span>

        {/* Auspicious Time & Ceremony */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/60 border border-gold-300 text-gold-950 text-xs font-serif font-bold mb-2">
          <Clock className="w-3.5 h-3.5 text-gold-700 shrink-0" />
          <span>Hast Melap & Wedding Ceremony • 12:30 PM</span>
        </div>

        {/* Procession Route */}
        <p className="text-xs font-serif text-stone-600 flex items-center justify-center gap-1.5 mt-1">
          <Navigation className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>Procession: <strong className="text-stone-900">Galodiya</strong> to <strong className="text-stone-900">New Metral</strong></span>
        </p>
      </motion.div>

      {/* Sleek Minimal Auto-Scratch Badges directly on background */}
      <div className="my-6">
        <p className="text-gold-800 text-[11px] font-serif tracking-widest mb-3 flex items-center justify-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
          <span>Auto-reveals on scroll or swipe with finger</span>
          <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
        </p>

        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4">
          <MinimalScratchBadge
            label="Day"
            revealedValue={day}
            subLabel="Tuesday"
            isAutoScratching={activeAutoCard >= 0}
            onRevealed={handleCardRevealed}
          />
          <MinimalScratchBadge
            label="Month"
            revealedValue={month}
            subLabel="2027"
            isAutoScratching={activeAutoCard >= 1}
            onRevealed={handleCardRevealed}
          />
          <MinimalScratchBadge
            label="Year"
            revealedValue={year}
            subLabel="Hast Melap"
            isAutoScratching={activeAutoCard >= 2}
            onRevealed={handleCardRevealed}
          />
        </div>
      </div>

      {/* Action Buttons: Minimal, clean */}
      <div className="flex flex-col items-center justify-center gap-2.5 mt-2">
        {revealedCount >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-cinzel text-[#7A1424] font-bold">
              ✨ 26th January 2027 Revealed ✨
            </span>
            <button
              onClick={handleReset}
              className="p-1 rounded-full text-stone-500 hover:text-stone-800 border border-gold-300 shadow-sm"
              title="Scratch Again"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        <button
          onClick={handleAddWeddingToCalendar}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-gold-400 text-gold-900 text-xs font-serif font-bold shadow-sm transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-gold-600" />
          <span>Add 26th January 2027 to Calendar</span>
        </button>
      </div>

    </section>
  );
}
