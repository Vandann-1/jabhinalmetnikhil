"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { weddingData } from "@/lib/wedding-data";

interface MusicPlayerProps {
  shouldPlay?: boolean;
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.loop = true;
    }
  }, []);

  // When shouldPlay becomes true (e.g. envelope unsealed)
  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until direct interaction
        });
    }
  }, [shouldPlay, isPlaying, hasInteracted]);

  const toggleMusic = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.music.audioUrl}
        preload="auto"
      />

      {/* Floating Music Pill Widget - Crisp, Solid, High-Contrast */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={toggleMusic}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: isPlaying
              ? "0 0 16px rgba(212, 175, 55, 0.6)"
              : "0 4px 12px rgba(0,0,0,0.12)",
          }}
          className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white border-2 border-gold-400 shadow-md text-stone-900 hover:bg-gold-50 transition-all group select-none"
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          title={weddingData.music.trackTitle}
        >
          {/* Animated sound wave bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-gold-600 rounded-full animate-bounce h-full" style={{ animationDelay: "0ms", animationDuration: "700ms" }} />
              <span className="w-0.5 bg-gold-600 rounded-full animate-bounce h-2/3" style={{ animationDelay: "150ms", animationDuration: "600ms" }} />
              <span className="w-0.5 bg-gold-600 rounded-full animate-bounce h-full" style={{ animationDelay: "300ms", animationDuration: "800ms" }} />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-stone-500 group-hover:text-stone-800" />
          )}

          <span className="text-[11px] font-serif font-black text-stone-800 hidden sm:inline-block">
            {isPlaying ? "Music Playing" : "Play Music"}
          </span>

          {isPlaying && (
            <Volume2 className="w-3.5 h-3.5 text-gold-600" />
          )}
        </motion.button>
      </div>
    </>
  );
}
