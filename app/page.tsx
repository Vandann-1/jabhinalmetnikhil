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
    <main className="relative min-h-screen bg-[#FAF1E2] text-[#2C2523] flex justify-center selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* 1. Falling Rose & Golden Petals Background Layer */}
      <FallingPetals />

      {/* 2. Interactive 3D Luxury Embossed Wax Seal Envelope Overlay */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* 3. Floating Background Music Player */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* 4. Full Clean Mobile-First Container (Seamless #FAF1E2 Color Throughout, Flush Video) */}
      <div className="w-full max-w-[450px] min-h-screen bg-[#FAF1E2] relative shadow-lg overflow-x-hidden p-0 m-0 border-0">
        
        {/* 1. Hero Video - Full Screen Width, No Border, No Edges, Seamless Integration */}
        <HeroInvitation />

        {/* 2. Clear & Clean Date Section with 26 January in Royal Typography & Auto-Scratch */}
        <div id="scratch-date-section">
          <ScratchDate />
        </div>

        {/* 3. Formal Family Invitation & Lineage (Shri Rakeshbhai & Smt. Nitaben Darji) */}
        <InvitationText />

        {/* 4. Official 6-Ceremony Wedding Timeline (Jan 24 - 26, 2027) */}
        <TimelineSection />

        {/* 5. Live Celebration Countdown Timer to 26th Jan 2027 */}
        <CountdownTimer />

        {/* 6. Venue & Procession Route (C.K. House, Metral & Galodiya to Metral) */}
        <VenueSection />

        {/* 7. Guest Dress Code & Soft Pastel Palette */}
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
