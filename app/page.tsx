"use client";

import React, { useState } from "react";
import Envelope from "@/components/Envelope";
import HeroInvitation from "@/components/HeroInvitation";
import ScratchDate from "@/components/ScratchDate";
import InvitationText from "@/components/InvitationText";
import TimelineSection from "@/components/TimelineSection";
import CountdownTimer from "@/components/CountdownTimer";
import VenueSection from "@/components/VenueSection";
import RsvpSection from "@/components/RsvpSection";
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
    <main className="relative min-h-screen bg-white wedding-bg text-[#2C2523] flex justify-center selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden">
      
      {/* 1. Falling Rose & Golden Petals Background Layer */}
      <FallingPetals />

      {/* 2. Full-Screen Pure White Luxury Embossed Wax Seal Envelope with Centered HN Monogram */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* 3. Floating Background Royal Wedding Soundtrack Player */}
      <MusicPlayer shouldPlay={startMusic} />

      {/* 4. Pure Clean Mobile-First Container (Seamless White Paper Texture, Flush Full-Bleed Video) */}
      <div className="w-full max-w-[450px] min-h-screen bg-white wedding-bg relative shadow-2xl overflow-x-hidden p-0 m-0 border-0">
        
        {/* 1. Hero Animated Video - Full-Screen Width, No Borders, Seamlessly Integrated */}
        <HeroInvitation />

        {/* 2. Ultra-Clear 26 January 2027 Date Display & Auto-Scratch Cards */}
        <div id="scratch-date-section">
          <ScratchDate />
        </div>

        {/* 3. Formal Family Invitation & Lineage (Shri Rakeshbhai & Smt. Nitaben Darji, C.K. House, સ્નેહાધીન) */}
        <InvitationText />

        {/* 4. Official 6-Ceremony Wedding Timeline (Jan 24 - 26, 2027) */}
        <TimelineSection />

        {/* 5. Live Celebration Countdown Timer to 26th January 2027 */}
        <CountdownTimer />

        {/* 6. Venue & Procession Route (C.K. House, Metral & Galodiya to Metral) */}
        <VenueSection />

        {/* 7. Interactive RSVP & Instant WhatsApp Confirmation */}
        <RsvpSection />

        {/* 8. Footer with Share & Re-seal Action */}
        <FooterSection onReopenEnvelope={handleReopenEnvelope} />
      </div>
    </main>
  );
}
