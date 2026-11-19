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
import FallingPetals from "@/components/FallingPetals";

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
    <main className="relative min-h-screen bg-[#1C1613] flex justify-center selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* 1. Falling Rose & Golden Petals Background Layer */}
      <FallingPetals />

      {/* 2. Interactive 3D Luxury Embossed Wax Seal Envelope Overlay */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* 3. Floating Background Music Player */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* 4. Pure Mobile-First Screen Container (Max 440px width on desktop, 100% on mobile) */}
      <div className="w-full max-w-[440px] min-h-screen bg-[#FDFBF7] shadow-2xl relative border-x border-[#EDE2D2]/70 wedding-bg overflow-x-hidden">
        
        {/* Top subtle ornamental bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

        {/* 1. Hero Animated Video Card (Couple under Mandap with Falling Petals) */}
        <HeroInvitation />

        {/* 2. Interactive Auto-Scratch Date Section */}
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
