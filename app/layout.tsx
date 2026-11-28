import type { Metadata, Viewport } from "next";
import "./globals.css";
import { weddingData } from "@/lib/wedding-data";

export const viewport: Viewport = {
  themeColor: "#FAF1E2",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jabhinalmetnikhil.vercel.app"),
  title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} - Royal Wedding Invitation`,
  description: `We cordially invite you to celebrate the wedding ceremony of ${weddingData.couple.bride.fullName} & ${weddingData.couple.groom.fullName} on ${weddingData.theDate.formattedDisplayDate}. #JabHinalMetNikhil`,
  icons: {
    icon: [
      { url: "/images/hn-royal-crest.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/hn-royal-crest.png", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jabhinalmetnikhil.vercel.app",
    siteName: "Hinal & Nikhil Wedding",
    title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} • Royal Wedding Invitation`,
    description: `Save the date for the wedding celebrations on ${weddingData.theDate.formattedDisplayDate}. #JabHinalMetNikhil`,
    images: [
      {
        url: "/images/og-share-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Hinal & Nikhil Royal Wedding Invitation",
      },
      {
        url: "/images/og-square-preview.jpg",
        width: 800,
        height: 800,
        alt: "Hinal & Nikhil Royal Wedding Crest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${weddingData.couple.bride.firstName} & ${weddingData.couple.groom.firstName} • Royal Wedding Invitation`,
    description: `Save the date for the wedding celebrations on ${weddingData.theDate.formattedDisplayDate}. #JabHinalMetNikhil`,
    images: ["/images/og-share-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FAF1E2]" style={{ colorScheme: "light" }}>
      <head>
        {/* Strictly enforce Light / White theme across all browsers and devices */}
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#FAF1E2" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        {/* Direct meta tags for WhatsApp & iMessage preview cards */}
        <meta property="og:image" content="https://jabhinalmetnikhil.vercel.app/images/og-share-preview.jpg" />
        <meta property="og:image:secure_url" content="https://jabhinalmetnikhil.vercel.app/images/og-share-preview.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hinal & Nikhil Royal Wedding Invitation" />
      </head>
      <body className="antialiased bg-[#FAF1E2] text-[#2C2523] min-h-screen selection:bg-gold-200 selection:text-gold-900 font-serif">
        {children}
      </body>
    </html>
  );
}
