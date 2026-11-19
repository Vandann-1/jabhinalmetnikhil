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
    <main className="relative min-h-screen bg-[#FCFAF6] text-[#2C2523] overflow-x-hidden">
      {/* Interactive 3D Luxury Wax Seal Envelope Overlay */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* Persistent Floating Music Controller */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* Main Wedding Invitation Experience Container (Styled for mobile-first elegance) */}
      <div className="w-full max-w-xl mx-auto shadow-[0_0_60px_rgba(0,0,0,0.06)] bg-[#FCFAF6] min-h-screen border-x border-[#F0E6D8]/60 paper-texture">
        {/* 1. Hero Cover */}
        <HeroInvitation />

        {/* 2. Interactive Scratch to Reveal Date */}
        <div id="scratch-date-section">
          <ScratchDate />
        </div>

        {/* 3. Formal Family Invitation & Lineage */}
        <InvitationText />

        {/* 4. Multi-Ceremony Wedding Timeline */}
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
