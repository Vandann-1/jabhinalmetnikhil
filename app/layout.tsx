import type { Metadata } from "next";
import "./globals.css";
import { weddingData } from "@/lib/wedding-data";

export const metadata: Metadata = {
  title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} - Royal Wedding Invitation`,
  description: `We cordially invite you to celebrate the joyous union and wedding ceremonies of ${weddingData.couple.bride.fullName} & ${weddingData.couple.groom.fullName}.`,
  openGraph: {
    title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} • Wedding Invitation`,
    description: `Save the date for the wedding celebrations on ${weddingData.theDate.formattedDisplayDate}.`,
    images: [
      {
        url: weddingData.venue.venuePhoto,
        width: 1200,
        height: 630,
        alt: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} Wedding`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Great+Vibes&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FCFAF6] text-[#2C2523] min-h-screen selection:bg-gold-200 selection:text-gold-900 font-serif">
        {children}
      </body>
    </html>
  );
}
