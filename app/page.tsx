"use client";

import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import HeaderNav from "@/components/HeaderNav";
import HeroInvitation from "@/components/HeroInvitation";
import ScratchDate from "@/components/ScratchDate";
import InvitationText from "@/components/InvitationText";
import TimelineSection from "@/components/TimelineSection";
import CountdownTimer from "@/components/CountdownTimer";
import VenueSection from "@/components/VenueSection";
import FooterSection from "@/components/FooterSection";
import MusicPlayer from "@/components/MusicPlayer";
import AutoScroller from "@/components/AutoScroller";
import FallingPetals from "@/components/FallingPetals";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  const handleStartOpen = () => {
    setStartMusic(true);
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setStartMusic(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#FAF1E2] text-[#2C2523] flex justify-center selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* 1. Falling Petals Ambient Background */}
      <FallingPetals />

      {/* 2. Full-Screen Landing Envelope with Centered HN Monogram & #JabHinalMetNikhil Animation */}
      <Envelope 
        isOpen={isEnvelopeOpen} 
        onOpen={handleOpenEnvelope} 
        onStartOpen={handleStartOpen} 
      />

      {/* 3. Floating Background Royal Wedding Soundtrack Player */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* 4. Automated Cinematic Page Scroller (Auto-scrolls gently through the whole story) */}
      <AutoScroller shouldStart={isEnvelopeOpen} />

      {/* 4. Minimal Editorial Mobile Layout (Zero bulky cards, pure flowing luxury) */}
      <div className="w-full max-w-[450px] min-h-screen bg-[#FAF1E2] relative shadow-lg overflow-x-hidden p-0 m-0 border-0">
        
        {/* Sticky Header Navigation in Soft Pinkish Blush with #JabHinalMetNikhil (Perfect Center Alignment) */}
        <HeaderNav />

        {/* Full-bleed Seamless Video Hero */}
        <HeroInvitation />

        {/* Auspicious Muhurat & Save The Date (26 January 2027) */}
        <ScratchDate />

        {/* Lineage & Family Blessings (Shri Rakeshbhai & Smt. Nitaben Darji) */}
        <InvitationText />

        {/* Official 6-Ceremony Zig-Zag Timeline (Jan 24 - 26, 2027) */}
        <TimelineSection />

        {/* Live Countdown Timer */}
        <CountdownTimer />

        {/* Venue & Procession Route (C.K. House, Metral & Galodiya to Metral) */}
        <VenueSection />

        {/* Minimal Footer */}
        <FooterSection onReopenEnvelope={handleReopenEnvelope} />
      </div>
    </main>
  );
}
