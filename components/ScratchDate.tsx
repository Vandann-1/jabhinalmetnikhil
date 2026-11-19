"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, RotateCcw, CalendarCheck2 } from "lucide-react";
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
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(120, 85, 20, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Text on scratch foil
    ctx.fillStyle = "#4A350E";
    ctx.font = "bold 15px 'Cinzel', serif, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ✦", width / 2, height / 2 - 12);

    ctx.fillStyle = "#6B4C12";
    ctx.font = "bold 13px 'Montserrat', sans-serif";
    ctx.fillText(label.toUpperCase(), width / 2, height / 2 + 14);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (x: number, y: number, radius = 24) => {
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
      {/* High-Definition Responsive Card */}
      <div className="relative w-[105px] h-[125px] sm:w-[115px] sm:h-[135px] rounded-2xl bg-gradient-to-b from-white via-[#FFFDF9] to-[#F8F1E4] shadow-md border-2 border-gold-400/80 p-2.5 flex flex-col items-center justify-center overflow-hidden group select-none">
        
        {/* Revealed Content: Ultra-Clean, Proper, Bold Font */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
          <span className="text-stone-400 text-[10px] uppercase tracking-wider font-sans font-semibold">
            {label}
          </span>

          {/* Large, Clear, Regal Number / Month */}
          <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#7A1424] tracking-tight my-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] leading-none">
            {revealedValue}
          </span>

          {subLabel ? (
            <span className="text-[10px] text-gold-800 font-serif font-bold italic tracking-wider">
              {subLabel}
            </span>
          ) : (
            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-sans font-medium">
              2027
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

        {/* Scratchable Canvas Layer (High-Resolution 2x scale for retina crispness) */}
        <canvas
          ref={canvasRef}
          width={220}
          height={260}
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

      <span className="mt-1.5 text-xs font-cinzel font-bold text-stone-700 uppercase tracking-widest">
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
      { threshold: 0.3 }
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
            particleCount: 85,
            spread: 90,
            origin: { y: 0.65 },
            colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#8B1D2C"],
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

  const { day, month, year, label } = weddingData.theDate.scratchCard;

  return (
    <section ref={sectionRef} className="relative py-10 px-4 text-center bg-[#FAF1E2]">
      
      {/* Decorative Ribbon Header */}
      <div className="flex items-center justify-center gap-3 mb-1">
        <div className="h-[1px] w-10 bg-gold-400" />
        <span className="text-gold-700 font-script text-2xl">Auspicious Celebration</span>
        <div className="h-[1px] w-10 bg-gold-400" />
      </div>

      <h2 className="text-3xl font-cinzel font-bold text-stone-900 tracking-wide mb-1">
        Save The Date
      </h2>

      {/* Prominent Crystal-Clear Date Banner (As requested: 26 January in clear clean proper font!) */}
      <div className="my-3 px-4 py-2 rounded-2xl bg-white/95 border-2 border-gold-300 shadow-sm inline-flex items-center gap-2">
        <CalendarCheck2 className="w-4 h-4 text-[#8B1D2C] shrink-0" />
        <span className="font-cinzel text-sm sm:text-base font-extrabold text-[#7A1424] tracking-wide">
          Tuesday, 26th January 2027
        </span>
      </div>

      <p className="text-gold-800 text-xs font-serif tracking-widest mt-1 mb-5 flex items-center justify-center gap-1.5 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
        {label}
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
      </p>

      {/* The 3 Scratch Cards in a Row: 26 | JANUARY | 2027 */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-4">
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
          isAutoScratching={activeAutoCard >= 1}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          label="Year"
          revealedValue={year}
          isAutoScratching={activeAutoCard >= 2}
          onRevealed={handleCardRevealed}
        />
      </div>

      {/* Re-scratch / Status Control */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {revealedCount >= 3 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-cinzel text-[#7A1424] bg-white/90 px-4 py-1.5 rounded-full border border-gold-300 font-bold shadow-sm">
              ✨ 26th January 2027 Revealed ✨
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 bg-white border border-gold-200 shadow-sm"
              title="Scratch Again"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <span className="text-[11px] text-stone-500 font-serif italic">
            Auto-reveals on scroll or swipe with finger
          </span>
        )}
      </div>

    </section>
  );
}
