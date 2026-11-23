import type { Metadata } from "next";
import "./globals.css";
import { weddingData } from "@/lib/wedding-data";

export const metadata: Metadata = {
  title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} - Royal Wedding Invitation`,
  description: `We cordially invite you to celebrate the wedding ceremony of ${weddingData.couple.bride.fullName} & ${weddingData.couple.groom.fullName} on ${weddingData.theDate.formattedDisplayDate}.`,
  icons: {
    icon: "/images/hn-royal-crest.png",
    apple: "/images/hn-royal-crest.png",
  },
  openGraph: {
    title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} • Wedding Invitation`,
    description: `Save the date for the wedding celebrations on ${weddingData.theDate.formattedDisplayDate}.`,
    images: [
      {
        url: "/images/hn-royal-crest.png",
        width: 1024,
        height: 1024,
        alt: "Hinal & Nikhil Royal Wedding Crest",
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
    <html lang="en" className="scroll-smooth bg-[#FAF1E2]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FAF1E2] text-[#2C2523] min-h-screen selection:bg-gold-200 selection:text-gold-900 font-serif">
        {children}
      </body>
    </html>
  );
}
