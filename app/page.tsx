"use client";

import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import HeroInvitation from "@/components/HeroInvitation";
import ScratchDate from "@/components/ScratchDate";
import InvitationText from "@/components/InvitationText";
import TimelineSection from "@/components/TimelineSection";
import CountdownTimer from "@/components/CountdownTimer";
import VenueSection from "@/components/VenueSection";
import DressCodeSection from "@/components/DressCodeSection";
import RsvpSection from "@/components/RsvpSection";
import LoveStorySection from "@/components/LoveStorySection";
import FooterSection from "@/components/FooterSection";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setStartMusic(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#FCFAF6] text-[#2C2523] overflow-x-hidden paper-texture">
      {/* 1. Full-Screen Interactive Luxury 3D Embossed Wax Seal Envelope */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* 2. Floating Background Royal Wedding Soundtrack Player */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* 3. Main Experience Container - Full Desktop & Mobile Responsive */}
      <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Subtle Decorative Side Gold Filigree Borders for Desktop (lg+) */}
        <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 w-8 h-96 border-l-2 border-gold-300/40 pointer-events-none opacity-60" />
        <div className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 w-8 h-96 border-r-2 border-gold-300/40 pointer-events-none opacity-60" />

        {/* 1. Hero Cover */}
        <HeroInvitation />

        {/* 2. Interactive Scratch to Reveal Date */}
        <div id="scratch-date-section">
          <ScratchDate />
        </div>

        {/* 3. Formal Family Invitation & Lineage */}
        <InvitationText />

        {/* 4. Multi-Ceremony Wedding Timeline (2-Column Alternating on Desktop, Left-Aligned on Mobile) */}
        <TimelineSection />

        {/* 5. Live Celebration Countdown Timer */}
        <CountdownTimer />

        {/* 6. Venue & Google Maps Navigation */}
        <VenueSection />

        {/* 7. Guest Dress Code & Pastel Palette */}
        <DressCodeSection />

        {/* 8. Our Love Story Timeline */}
        <LoveStorySection />

        {/* 9. Interactive RSVP & WhatsApp Confirmation */}
        <RsvpSection />

        {/* 10. Footer with Share & Re-seal Action */}
        <FooterSection onReopenEnvelope={handleReopenEnvelope} />
      </div>
    </main>
  );
}
