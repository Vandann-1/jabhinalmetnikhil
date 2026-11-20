"use client";

import React, { useRef, useEffect } from "react";

export default function HeroInvitation() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-start p-0 m-0 overflow-hidden bg-[#FAF1E2]">
      {/* Full-bleed Seamless Video - No Borders, No Edges, Flush Screen Presentation */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#FAF1E2]">
        <video
          ref={videoRef}
          src="/videos/hero-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover block border-0 rounded-none shadow-none"
        />

        {/* Soft bottom edge blend to seamlessly transition into cream background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF1E2] via-[#FAF1E2]/60 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
