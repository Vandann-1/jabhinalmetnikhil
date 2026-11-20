"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface AutoScrollerProps {
  shouldStart?: boolean;
}

export default function AutoScroller({ shouldStart }: AutoScrollerProps) {
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const userTouchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const hasUserInteractedRef = useRef(false);

  // Auto-scroll speed in pixels per second
  const SCROLL_SPEED = 40;

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
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Check if reached the end of the page
      if (currentScroll >= maxScroll - 6) {
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
    isAutoScrollingRef.current = true;
    lastTimeRef.current = null;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(scrollStep);
  }, [scrollStep]);

  // Handle manual user interactions (wheel, touch, pointer)
  useEffect(() => {
    const handleUserGesture = () => {
      hasUserInteractedRef.current = true;
      if (isAutoScrollingRef.current) {
        // Pause scrolling immediately so it never fights the user
        stopScrolling();

        if (userTouchTimeoutRef.current) {
          clearTimeout(userTouchTimeoutRef.current);
        }

        // Gently resume after 4.5 seconds of idle if user stopped touching
        userTouchTimeoutRef.current = setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (window.scrollY < maxScroll - 30) {
            startScrolling();
          }
        }, 4500);
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
    if (shouldStart && !hasUserInteractedRef.current) {
      const timer = setTimeout(() => {
        startScrolling();
      }, 2500); // 2.5s delay to enjoy hero header

      return () => clearTimeout(timer);
    }
  }, [shouldStart, startScrolling]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScrolling();
      if (userTouchTimeoutRef.current) clearTimeout(userTouchTimeoutRef.current);
    };
  }, [stopScrolling]);

  // Completely invisible background runner - no UI clutter or floating play buttons!
  return null;
}
