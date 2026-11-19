"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, RotateCcw, Wand2 } from "lucide-react";
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
  const autoScratchTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize metallic gold scratch canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";

    // Gold metallic foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#C9A043");
    gradient.addColorStop(0.25, "#F7E6B5");
    gradient.addColorStop(0.5, "#D8AD4C");
    gradient.addColorStop(0.75, "#FCEEC9");
    gradient.addColorStop(1, "#A97F29");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Inner border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Prompt text
    ctx.fillStyle = "#5A4213";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ✦", width / 2, height / 2 - 8);

    ctx.fillStyle = "#77571B";
    ctx.font = "10px sans-serif";
    ctx.fillText(label, width / 2, height / 2 + 10);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Scratch erase function
  const scratch = (x: number, y: number, radius = 20) => {
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

      if (transparentCount / totalPixels > 0.42) {
        setIsScratched(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onRevealed?.();
      }
    } catch {}
  };

  // Automated Smooth Scratch Animation (when user scrolls into view!)
  useEffect(() => {
    if (!isAutoScratching || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let step = 0;
    const totalSteps = 28;
    const width = canvas.width;
    const height = canvas.height;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      // S-curve sweeping motion across the card
      const y = progress * height;
      const x = (Math.sin(progress * Math.PI * 4) * 0.4 + 0.5) * width;

      scratch(x, y, 24);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsScratched(true);
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, width, height);
        onRevealed?.();
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isAutoScratching]);

  // Touch and Mouse handlers
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
      <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F5ECE0] shadow-md border border-gold-300/80 p-2 flex flex-col items-center justify-center overflow-hidden group select-none">
        
        {/* Revealed Content Behind the Scratch Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
          <span className="text-stone-400 text-[10px] uppercase tracking-wider font-semibold">
            {label}
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-700 tracking-tight my-1 drop-shadow-sm">
            {revealedValue}
          </span>
          {subLabel && (
            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-medium">
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

        {/* Scratchable Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={130}
          height={150}
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

      <span className="mt-1.5 text-[11px] font-serif text-stone-600 uppercase tracking-widest font-medium">
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

  // Trigger smooth auto-scratch when user scrolls to this section!
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredScroll.current) {
          hasTriggeredScroll.current = true;

          // Start smooth progressive auto-scratching
          setTimeout(() => setActiveAutoCard(0), 400); // Card 1 (Day)
          setTimeout(() => setActiveAutoCard(1), 1600); // Card 2 (Month)
          setTimeout(() => setActiveAutoCard(2), 2800); // Card 3 (Year)
        }
      },
      { threshold: 0.35 }
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
            colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#E8B4B8", "#881337"],
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
    // Restart animation
    setTimeout(() => setActiveAutoCard(0), 200);
    setTimeout(() => setActiveAutoCard(1), 1400);
    setTimeout(() => setActiveAutoCard(2), 2600);
  };

  const { day, month, year, label } = weddingData.theDate.scratchCard;

  return (
    <section ref={sectionRef} className="relative py-12 px-4 text-center">
      
      {/* Decorative Ribbon Header */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-10 bg-gold-400" />
        <span className="text-gold-600 font-script text-2xl">Save The Date</span>
        <div className="h-[1px] w-10 bg-gold-400" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wide font-normal">
        The Auspicious Date
      </h2>

      <p className="text-gold-700 text-xs sm:text-sm font-serif tracking-widest mt-1 mb-6 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
        {label}
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
      </p>

      {/* The 3 Scratch Cards in a Row */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
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

      {/* Status & Re-play Button */}
      <div className="mt-3 flex flex-col items-center gap-2">
        {revealedCount >= 3 ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-serif text-gold-900 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200 font-medium">
              🎉 {weddingData.theDate.formattedDisplayDate}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-white border border-stone-200"
              title="Re-play Scratch"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 font-serif">
            <Wand2 className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
            <span>Auto-reveals on scroll or swipe with finger</span>
          </div>
        )}
      </div>

    </section>
  );
}
