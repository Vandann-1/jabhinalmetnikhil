"use client";

import React, { useEffect, useState } from "react";

export default function FallingPetals() {
  const [petals, setPetals] = useState<Array<{
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    isGold: boolean;
  }>>([]);

  useEffect(() => {
    // Generate 18 soft floating petals
    const newPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 8) + 12,
      duration: Math.floor(Math.random() * 6) + 8,
      delay: Math.random() * 7,
      isGold: i % 3 === 0,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.isGold ? (
            // Golden Marigold / Amber Petal
            <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-sm opacity-70">
              <path
                d="M15,0 C25,12 28,25 20,36 C15,40 8,36 3,25 C-3,12 8,0 15,0 Z"
                fill="url(#goldPetalGradient)"
              />
              <defs>
                <linearGradient id="goldPetalGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="60%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            // Soft Rose / Crimson Petal
            <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-sm opacity-75">
              <path
                d="M15,0 C26,10 28,24 20,35 C15,40 9,37 4,26 C-2,14 6,0 15,0 Z"
                fill="url(#rosePetalGradient)"
              />
              <defs>
                <linearGradient id="rosePetalGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="60%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
