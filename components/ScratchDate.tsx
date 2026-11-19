"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, Eye } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface ScratchCanvasProps {
  label: string;
  revealedValue: string;
  subLabel?: string;
  onRevealed?: () => void;
  forceReveal?: boolean;
}

function ScratchCard({
  label,
  revealedValue,
  subLabel,
  onRevealed,
  forceReveal,
}: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  // Initialize canvas with metallic gold gradient & texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";

    // Create metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#C9A043");
    gradient.addColorStop(0.25, "#F7E6B5");
    gradient.addColorStop(0.5, "#D8AD4C");
    gradient.addColorStop(0.75, "#FCEEC9");
    gradient.addColorStop(1, "#A97F29");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative inner border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Text prompts
    ctx.fillStyle = "#5A4213";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ✦", width / 2, height / 2 - 10);

    ctx.fillStyle = "#77571B";
    ctx.font = "11px sans-serif";
    ctx.fillText(label, width / 2, height / 2 + 12);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  useEffect(() => {
    if (forceReveal && !isScratched) {
      setIsScratched(true);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      onRevealed?.();
    }
  }, [forceReveal, isScratched, onRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Card responsive dimensions: small on mobile, spacious on desktop */}
      <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44 rounded-2xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F5ECE0] shadow-md hover:shadow-xl border-2 border-gold-300/80 p-2 sm:p-3 flex flex-col items-center justify-center overflow-hidden group select-none transition-shadow">
        
        {/* Revealed Content Behind the Scratch Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
          <span className="text-stone-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
            {label}
          </span>
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gold-700 tracking-tight my-1 drop-shadow-sm">
            {revealedValue}
          </span>
          {subLabel && (
            <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-widest font-medium">
              {subLabel}
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

        {/* Scratchable Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={160}
          height={180}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-500 rounded-2xl ${
            isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      <span className="mt-2 text-xs sm:text-sm font-serif text-stone-600 uppercase tracking-widest font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function ScratchDate() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [forceRevealAll, setForceRevealAll] = useState(false);
  const hasCelebrated = useRef(false);

  const handleCardRevealed = () => {
    setRevealedCount((prev) => {
      const next = prev + 1;
      if (next >= 3 && !hasCelebrated.current) {
        hasCelebrated.current = true;
        try {
          confetti({
            particleCount: 90,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#E8B4B8"],
          });
        } catch {}
      }
      return next;
    });
  };

  const handleRevealAllClick = () => {
    setForceRevealAll(true);
    setRevealedCount(3);
    if (!hasCelebrated.current) {
      hasCelebrated.current = true;
      try {
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#E8B4B8"],
        });
      } catch {}
    }
  };

  const { day, month, year, label } = weddingData.theDate.scratchCard;

  return (
    <section className="relative py-14 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
        <span className="text-gold-600 font-script text-2xl sm:text-3xl">Save The Date</span>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 font-normal tracking-wide">
        The Auspicious Date
      </h2>

      <p className="text-gold-700 text-xs sm:text-base font-serif tracking-widest mt-1 mb-8 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
        {label}
        <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
      </p>

      {/* The 3 Scratch Cards Row - Spacious on Desktop, Compact on Mobile */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-6">
        <ScratchCard
          label="Day"
          revealedValue={day}
          subLabel="Friday"
          forceReveal={forceRevealAll}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          label="Month"
          revealedValue={month}
          forceReveal={forceRevealAll}
          onRevealed={handleCardRevealed}
        />
        <ScratchCard
          label="Year"
          revealedValue={year}
          forceReveal={forceRevealAll}
          onRevealed={handleCardRevealed}
        />
      </div>

      {/* Action / Helper Button */}
      <div className="mt-4 flex flex-col items-center gap-2">
        {!forceRevealAll && revealedCount < 3 ? (
          <button
            onClick={handleRevealAllClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-stone-600 hover:text-gold-800 bg-white hover:bg-gold-50 rounded-full border border-stone-200 hover:border-gold-300 transition-all shadow-sm"
          >
            <Eye className="w-4 h-4 text-gold-600" />
            <span>Tap to reveal all cards instantly</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm text-gold-800 font-serif font-medium bg-gold-50 px-5 py-2.5 rounded-full border border-gold-200 shadow-sm"
          >
            🎉 {weddingData.theDate.formattedDisplayDate}
          </motion.div>
        )}
      </div>
    </section>
  );
}
