"use client";

import { useEffect, useRef, useCallback } from "react";

interface AutoScrollerProps {
  shouldStart?: boolean;
}

export default function AutoScroller({ shouldStart }: AutoScrollerProps) {
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const accumulatedYRef = useRef(0);
  const userTouchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const isPausedRef = useRef(false);

  // "Lil lil" gentle luxury speed (~22 pixels per second for relaxed, effortless reading)
  const SCROLL_SPEED = 22;

  // Stop the animation frame loop
  const stopScrolling = useCallback(() => {
    isAutoScrollingRef.current = false;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    lastTimeRef.current = null;
    accumulatedYRef.current = 0;
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "";
    }
  }, []);

  // Frame step function with subpixel accumulation for silky 60/120fps motion
  const scrollStep = useCallback(
    (timestamp: number) => {
      if (!isAutoScrollingRef.current || isPausedRef.current) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Check if reached the end of the page
      if (currentScroll >= maxScroll - 6) {
        stopScrolling();
        return;
      }

      // Subpixel float accumulator for buttery smooth slow scrolling
      accumulatedYRef.current += SCROLL_SPEED * dt;
      if (accumulatedYRef.current >= 1) {
        const step = Math.floor(accumulatedYRef.current);
        window.scrollBy(0, step);
        accumulatedYRef.current -= step;
      }

      animFrameRef.current = requestAnimationFrame(scrollStep);
    },
    [SCROLL_SPEED, stopScrolling]
  );

  // Start scrolling
  const startScrolling = useCallback(() => {
    if (isAutoScrollingRef.current) return;
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "auto";
    }
    isAutoScrollingRef.current = true;
    isPausedRef.current = false;
    lastTimeRef.current = null;
    accumulatedYRef.current = 0;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(scrollStep);
  }, [scrollStep]);

  // Handle manual user interactions (wheel, touch, pointer, key)
  useEffect(() => {
    const handleUserGesture = () => {
      if (isAutoScrollingRef.current) {
        // Temporarily pause scrolling while user is reading or dragging
        isPausedRef.current = true;

        if (userTouchTimeoutRef.current) {
          clearTimeout(userTouchTimeoutRef.current);
        }

        // If near top (hero section), pause for 4 seconds; otherwise 3.5 seconds
        const isNearHero = window.scrollY < 120;
        const resumeDelay = isNearHero ? 4000 : 3500;

        userTouchTimeoutRef.current = setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (window.scrollY < maxScroll - 20) {
            isPausedRef.current = false;
            lastTimeRef.current = null;
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = requestAnimationFrame(scrollStep);
          }
        }, resumeDelay);
      }
    };

    window.addEventListener("wheel", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("touchmove", handleUserGesture, { passive: true });
    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("touchmove", handleUserGesture);
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      if (userTouchTimeoutRef.current) {
        clearTimeout(userTouchTimeoutRef.current);
      }
    };
  }, [scrollStep]);

  // Automatically start "lil lil" auto-scroll after envelope is opened
  useEffect(() => {
    if (shouldStart) {
      // 4.0s pause for guests to enjoy the hero video presentation and song intro
      const timer = setTimeout(() => {
        startScrolling();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      stopScrolling();
    }
  }, [shouldStart, startScrolling, stopScrolling]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScrolling();
      if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    };
  }, [stopScrolling]);

  return null;
}
