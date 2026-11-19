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

  // Initialize canvas with realistic gold metallic gradient & texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
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

    // Subtle decorative border inside scratch foil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Subtle sparkles/text prompt on scratch surface
    ctx.fillStyle = "#5A4213";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH ✦", width / 2, height / 2 - 8);

    ctx.fillStyle = "#77571B";
    ctx.font = "9px sans-serif";
    ctx.fillText(label, width / 2, height / 2 + 10);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Handle force reveal
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

  // Scratch erase function
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
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch progress occasionally
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

      // Sample every 8th pixel for speed
      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) {
          transparentCount += 8;
        }
      }

      if (transparentCount / totalPixels > 0.42) {
        // Scratched more than 42%, reveal completely
        setIsScratched(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onRevealed?.();
      }
    } catch {
      // ignore security restrictions if any
    }
  };

  // Mouse Handlers
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

  // Touch Handlers
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
      <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-gradient-to-b from-white via-[#FCFAF6] to-[#F5ECE0] shadow-md border border-gold-300/80 p-2 flex flex-col items-center justify-center overflow-hidden group select-none">
        
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
          width={120}
          height={140}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-500 rounded-xl ${
            isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* Under-card label */}
      <span className="mt-2 text-[11px] font-serif text-stone-500 uppercase tracking-widest">
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
            particleCount: 80,
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
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#F3E5AB", "#FFF8DC", "#C5A059", "#E8B4B8"],
        });
      } catch {}
    }
  };

  const { day, month, year, label } = weddingData.theDate.scratchCard;

  return (
    <section className="relative py-12 px-4 max-w-lg mx-auto text-center">
      {/* Decorative floral emblem */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
        <span className="text-gold-600 font-script text-2xl">Save The Date</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 font-normal tracking-wide">
        The Auspicious Date
      </h2>

      <p className="text-gold-700 text-xs sm:text-sm font-serif tracking-widest mt-1 mb-6 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
        {label}
        <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
      </p>

      {/* The 3 Scratch Cards in a Row */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 mb-4">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-500 hover:text-gold-700 bg-stone-100 hover:bg-gold-50 rounded-full border border-stone-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tap to reveal all instantly</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gold-800 font-serif font-medium bg-gold-50 px-4 py-2 rounded-full border border-gold-200"
          >
            🎉 {weddingData.theDate.formattedDisplayDate}
          </motion.div>
        )}
      </div>
    </section>
  );
}
