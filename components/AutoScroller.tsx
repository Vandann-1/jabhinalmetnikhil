"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Compass } from "lucide-react";

interface AutoScrollerProps {
  shouldStart?: boolean;
}

export default function AutoScroller({ shouldStart }: AutoScrollerProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const userTouchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);

  // Auto-scroll speed in pixels per second
  const SCROLL_SPEED = 42;

  // Stop the animation frame loop
  const stopScrolling = useCallback(() => {
    isAutoScrollingRef.current = false;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  // Frame step function
  const scrollStep = useCallback(
    (timestamp: number) => {
      if (!isAutoScrollingRef.current) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // clamp to 100ms
      lastTimeRef.current = timestamp;

      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Check if reached the end of the page
      if (currentScroll >= maxScroll - 4) {
        setIsAtBottom(true);
        setIsActive(false);
        stopScrolling();
        return;
      }

      // Scroll smoothly
      window.scrollBy(0, SCROLL_SPEED * dt);

      animFrameRef.current = requestAnimationFrame(scrollStep);
    },
    [SCROLL_SPEED, stopScrolling]
  );

  // Start scrolling
  const startScrolling = useCallback(() => {
    setIsAtBottom(false);
    setIsPausedByUser(false);
    setIsActive(true);
    isAutoScrollingRef.current = true;
    lastTimeRef.current = null;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(scrollStep);
  }, [scrollStep]);

  // Pause scrolling temporarily
  const pauseScrolling = useCallback(() => {
    setIsActive(false);
    stopScrolling();
  }, [stopScrolling]);

  // Track progress and bottom position
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((currentScroll / maxScroll) * 100)));
        setScrollProgress(progress);
        if (currentScroll >= maxScroll - 8) {
          setIsAtBottom(true);
          if (isAutoScrollingRef.current) {
            setIsActive(false);
            stopScrolling();
          }
        } else {
          setIsAtBottom(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stopScrolling]);

  // Handle manual user interactions (wheel, touch, pointer)
  useEffect(() => {
    const handleUserGesture = () => {
      if (isAutoScrollingRef.current) {
        // Pause scrolling immediately so it never fights the user
        stopScrolling();
        setIsActive(false);
        setIsPausedByUser(true);

        // Clear existing resume timeout
        if (userTouchTimeoutRef.current) {
          clearTimeout(userTouchTimeoutRef.current);
        }

        // Auto-resume after 3.8s of idle if user stopped touching
        userTouchTimeoutRef.current = setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (window.scrollY < maxScroll - 20) {
            startScrolling();
          }
        }, 3800);
      }
    };

    window.addEventListener("wheel", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("pointerdown", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("pointerdown", handleUserGesture);
      if (userTouchTimeoutRef.current) {
        clearTimeout(userTouchTimeoutRef.current);
      }
    };
  }, [startScrolling, stopScrolling]);

  // Start auto-scroll automatically after envelope unseals
  useEffect(() => {
    if (shouldStart && !isActive && !isPausedByUser) {
      const timer = setTimeout(() => {
        startScrolling();
      }, 2200); // 2.2s delay to admire hero header

      return () => clearTimeout(timer);
    }
  }, [shouldStart, isActive, isPausedByUser, startScrolling]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScrolling();
      if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    };
  }, [stopScrolling]);

  // Toggle button clicked by user
  const handleToggle = () => {
    if (userTouchTimeoutRef.current) {
      clearTimeout(userTouchTimeoutRef.current);
    }

    if (isAtBottom) {
      // Replay from top
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        startScrolling();
      }, 600);
      return;
    }

    if (isActive) {
      setIsPausedByUser(true);
      pauseScrolling();
    } else {
      startScrolling();
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.92 }}
        animate={{
          boxShadow: isActive
            ? "0 0 20px rgba(212, 175, 55, 0.5)"
            : "0 4px 12px rgba(0,0,0,0.12)",
        }}
        className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-gold-400/80 shadow-lg text-stone-800 hover:bg-white transition-all group select-none"
        aria-label={
          isAtBottom
            ? "Replay Auto-Scroll"
            : isActive
            ? "Pause Auto-Scroll"
            : "Start Auto-Scroll"
        }
        title={
          isAtBottom
            ? "Replay Invitation from Top"
            : isActive
            ? "Pause Automatic Scrolling"
            : "Auto-Scroll Invitation"
        }
      >
        {/* State Icon */}
        {isAtBottom ? (
          <RotateCcw className="w-4 h-4 text-gold-700 animate-spin-slow" />
        ) : isActive ? (
          <div className="relative flex items-center justify-center w-4 h-4">
            <span className="absolute w-2 h-2 rounded-full bg-gold-600 animate-ping opacity-75" />
            <Pause className="w-3.5 h-3.5 text-gold-700" />
          </div>
        ) : (
          <Play className="w-3.5 h-3.5 text-stone-600 fill-stone-600 group-hover:text-gold-700 group-hover:fill-gold-700" />
        )}

        {/* Text Label */}
        <span className="text-[11px] font-serif font-medium text-stone-700 hidden sm:inline-block">
          {isAtBottom
            ? "Replay Story"
            : isActive
            ? "Auto-Scrolling"
            : "Auto-Scroll"}
        </span>

        {/* Mini Percentage Badge */}
        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300/80">
          {scrollProgress}%
        </span>
      </motion.button>
    </div>
  );
}
