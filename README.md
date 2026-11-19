# 💍 Hinal & Nikhil — Luxury Digital Wedding Invitation

A royal, interactive mobile-first digital wedding invitation web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Inspired by luxury physical wedding cards and high-end digital invitations, featuring a 3D embossed wax seal envelope, interactive scratch-to-reveal wedding dates, multi-ceremony timeline, real-time countdown ticker, Google Maps navigation, pastel dress code swatches, and instant WhatsApp RSVP.

---

## ✨ Features & Interactive Elements

1. **💌 3D Embossed Envelope & Interactive Wax Seal**
   - Realistic ivory/cream luxury paper texture with embossed floral corners.
   - Golden 3D wax seal with **"H & N"** monogram.
   - Unfolds smoothly with 3D perspective animation upon click.
   - Triggers celebratory golden confetti and begins romantic background soundtrack.

2. **👑 Grand Cover & Auspicious Blessing**
   - Auspicious invocation: `|| श्री गणेशाय नमः ||`.
   - Grand typography with royal gold gradient for **Hinal & Nikhil**.
   - Romantic palace archway with glowing lanterns.

3. **✦ Interactive Scratch-to-Reveal The Date ✦**
   - Real HTML5 Canvas metallic gold foil scratch effect.
   - 3 separate scratch cards: **DAY** (18) | **MONTH** (DECEMBER) | **YEAR** (2026).
   - Scratching with mouse or touch erases the metallic gold foil to reveal the date.
   - Confetti burst upon scratching all three cards.
   - "Reveal All" quick button for instant access.

4. **📜 Formal Family Invitation & Lineage**
   - Arched royal frame with blessings of parents and ancestors.
   - Groom's family details (Mr. Mahendra Patel & Mrs. Rekha Patel).
   - Bride's family details (Mr. Rajesh Shah & Mrs. Bhavna Shah).

5. **📅 Multi-Ceremony Wedding Timeline**
   - Full schedule of all traditional celebrations:
     - **Ganesh Sthapana & Mandap Muhurat**
     - **Mehendi & Folk Celebration**
     - **Sangeet Sandhya & Musical Night**
     - **Haldi & Phoolon Ki Holi**
     - **Baraat, Varmala & Hast Melap (The Sacred Pheras)**
     - **Royal Banquet & Reception**
   - Each event includes date, time, venue, attire suggestion, and a **"Save to Calendar"** button (syncs directly with Google Calendar / Apple Calendar).

6. **⏳ Live Countdown Timer**
   - Real-time ticker counting down Days, Hours, Minutes, and Seconds until the big day.

7. **📍 Venue & Google Maps Navigation**
   - High-resolution venue photo with palace architecture.
   - Embedded Google Map with location pin.
   - "Open in Maps" button for instant GPS navigation.
   - Direct concierge contact phone link.

8. **👗 Dress Code & Recommended Pastel Palette**
   - Attire guidance for guests.
   - 5 interactive pastel color swatch circles (Blush Rose, Sage Mint, Champagne Gold, Powder Blue, Soft Lavender).
   - Etiquette note regarding reserved colors for the bride & groom.

9. **💌 Interactive RSVP & Instant WhatsApp Confirmation**
   - Guest name, attendance selection, number of guests, and dietary preferences (Pure Vegetarian, Jain, Swaminarayan, etc.).
   - Personal blessing/wishes text area.
   - One-click **"WhatsApp RSVP"** button that generates and sends a pre-formatted message directly to the family's WhatsApp number.

10. **🎵 Ambient Background Music Player**
    - Floating gold audio widget in bottom-right corner.
    - Traditional royal sitar & flute melody.
    - Play/pause toggle with animated equalizer bars.

---

## 🛠️ How to Customize Your Data

All wedding data is centrally organized in a single configuration file:
👉 **[`lib/wedding-data.ts`](./lib/wedding-data.ts)**

Simply open `lib/wedding-data.ts` and edit the values:

```typescript
export const weddingData = {
  couple: {
    bride: {
      firstName: "Hinal",
      fullName: "Hinal Shah",
      fatherName: "Mr. Rajesh Shah",
      motherName: "Mrs. Bhavna Shah",
      ...
    },
    groom: {
      firstName: "Nikhil",
      fullName: "Nikhil Patel",
      fatherName: "Mr. Mahendra Patel",
      motherName: "Mrs. Rekha Patel",
      ...
    },
    monogram: "H & N",
    hashtag: "#HinalFoundHerNik",
  },
  theDate: {
    weddingDateISO: "2026-12-18T18:00:00+05:30",
    scratchCard: {
      day: "18",
      month: "DECEMBER",
      year: "2026",
    },
  },
  venue: {
    name: "The Grand Royal Heritage Palace",
    city: "Ahmedabad",
    fullAddress: "...",
    googleMapsNavigationUrl: "...",
  },
  ceremonies: [
    // Add, remove, or modify wedding functions
  ],
  dressCode: {
    palette: [ ... ],
  },
  rsvp: {
    whatsapp1: "919876543210", // Your WhatsApp number with country code
  },
  music: {
    audioUrl: "...", // Royalty-free or custom MP3 URL
  }
};
```

---

## 🚀 Running the Project

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```
