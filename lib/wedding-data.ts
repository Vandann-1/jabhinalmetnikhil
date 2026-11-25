/**
 * WEDDING INVITATION CONFIGURATION & DATA SOURCE
 * 
 * Official Wedding Details for Hinal & Nikhil
 * Family: Shri Rakeshbhai Chhaganlal Darji & Smt. Nitaben Rakeshbhai Darji
 * Residence: C.K. House, New Metral, Taluka: Khedbrahma, District: Sabarkantha, Gujarat
 * Wedding Date: Tuesday, 26th January 2027
 */

export interface CeremonyEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  dressCodeSuggestion?: string;
  dressCodeDetails?: {
    girls?: string;
    boys?: string;
    palette?: ColorSwatch[];
  };
  icon: "om" | "sparkles" | "music" | "sun" | "ring" | "utensils" | "heart";
  specialNote?: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export interface ColorSwatch {
  name: string;
  hex: string;
  textDark?: boolean;
}

export interface WeddingData {
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      grandParents?: string;
      role: string;
    };
    groom: {
      firstName: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      grandParents?: string;
      role: string;
    };
    monogram: string;
    hashtag: string;
    auspiciousSymbol: string;
    tagline: string;
    gujaratiBlessing: string;
    familyGreeting: string;
  };
  theDate: {
    weddingDateISO: string;
    formattedDisplayDate: string;
    scratchCard: {
      day: string;
      month: string;
      year: string;
      label: string;
    };
  };
  venue: {
    name: string;
    hall: string;
    city: string;
    taluka: string;
    district: string;
    state: string;
    fullAddress: string;
    processionRoute: string;
    googleMapsEmbedUrl: string;
    googleMapsNavigationUrl: string;
    venuePhoto: string;
    contactPhone: string;
  };
  dressCode: {
    title: string;
    description: string;
    palette: ColorSwatch[];
    note: string;
  };
  ceremonies: CeremonyEvent[];
  rsvp: {
    contactPerson1: string;
    phone1: string;
    whatsapp1: string;
    contactPerson2?: string;
    phone2?: string;
    whatsapp2?: string;
    deadline: string;
    mealOptions: string[];
  };
  music: {
    audioUrl: string;
    trackTitle: string;
    artist: string;
  };
  loveStory?: Array<{
    phase: string;
    date: string;
    description: string;
  }>;
}

export const weddingData: WeddingData = {
  couple: {
    bride: {
      firstName: "Hinal",
      fullName: "Hinal Darji",
      fatherName: "Shri Rakeshbhai Chhaganlal Darji",
      motherName: "Smt. Nitaben Rakeshbhai Darji",
      grandParents: "Late Shri Chhaganlal Darji Pariwar",
      role: "The Bride",
    },
    groom: {
      firstName: "Nikhil",
      fullName: "Nikhil Rathod",
      fatherName: "Shri Mukeshbhai Manilal Rathod",
      motherName: "Smt. Induben Mukeshbhai Rathod",
      role: "The Groom",
    },
    monogram: "H & N",
    hashtag: "#JabHinalMetNikhil",
    auspiciousSymbol: "|| श्री गणेशाय नमः ||",
    tagline: "cordially invite you to the wedding of our daughter",
    gujaratiBlessing: "સ્નેહાધીન (Yours Affectionately)",
    familyGreeting: "Shri Rakeshbhai Chhaganlal Darji and Smt. Nitaben Rakeshbhai Darji cordially invite you and your family to grace the auspicious wedding ceremonies of our beloved daughter Hinal with Nikhil (Son of Shri Mukeshbhai Manilal Rathod and Smt. Induben Mukeshbhai Rathod).",
  },

  theDate: {
    weddingDateISO: "2027-01-26T12:30:00+05:30",
    formattedDisplayDate: "Tuesday, 26th January 2027",
    scratchCard: {
      day: "26",
      month: "JANUARY",
      year: "2027",
      label: "✦ Scratch to reveal the wedding date ✦",
    },
  },

  venue: {
    name: "C.K. House",
    hall: "Residence & Celebrations Grounds",
    city: "New Metral",
    taluka: "Khedbrahma",
    district: "Sabarkantha",
    state: "Gujarat",
    fullAddress: "C.K. House, New Metral, Taluka: Khedbrahma, District: Sabarkantha, Gujarat",
    processionRoute: "The wedding procession will proceed from Galodiya to Metral",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116345.2289658253!2d73.003463!3d24.032115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395d852a394ec5b3%3A0x6b245a4980bbd454!2sKhedbrahma%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsNavigationUrl: "https://maps.google.com/?q=Metral+Khedbrahma+Sabarkantha+Gujarat",
    venuePhoto: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80",
    contactPhone: "+91 98765 43210",
  },

  dressCode: {
    title: "Carnival Pastel Colour Attire",
    description: "For the Carnival (Sangeet), we warmly invite our family and friends to celebrate with us in graceful traditional attire inspired by soft pastel tones.",
    palette: [
      { name: "Blush Rose", hex: "#F3D5D8", textDark: true },
      { name: "Sage Mint", hex: "#D3E2D5", textDark: true },
      { name: "Champagne Gold", hex: "#EBDDBA", textDark: true },
      { name: "Powder Blue", hex: "#D0DEEE", textDark: true },
      { name: "Soft Lavender", hex: "#E3D5E8", textDark: true },
    ],
    note: "Special Note: Traditional crimson/deep red is reserved for the bride, and royal ivory sherwani is reserved for the groom.",
  },

  ceremonies: [
    {
      id: "ganesh-sthapana",
      title: "1. Ganesh Sthapana (Pooja)",
      subTitle: "Divine Invocations & Auspicious Beginnings",
      date: "Sunday, 24th January 2027",
      time: "09:00 AM",
      venue: "C.K. House, New Metral",
      description: "Seeking the divine blessings of Lord Ganesha for an auspicious start to all wedding ceremonies.",
      dressCodeSuggestion: "Theme: Bandhani dress/saree for girls and kurta with bandhani dupatta for boys",
      dressCodeDetails: {
        girls: "Bandhani dress / saree",
        boys: "Kurta with bandhani dupatta",
      },
      icon: "om",
      calendarEvent: {
        title: "Ganesh Sthapana - Hinal & Nikhil",
        description: "Auspicious blessings and prayer ceremony. Theme: Bandhani dress/saree for girls & Kurta with bandhani dupatta for boys",
        location: "C.K. House, New Metral, Khedbrahma",
        startDate: "2027-01-24T09:00:00",
        endDate: "2027-01-24T11:30:00",
      },
    },
    {
      id: "varghodo",
      title: "2. Varghodo",
      subTitle: "Traditional Festive Royal Procession",
      date: "Monday, 25th January 2027",
      time: "10:00 AM",
      venue: "New Metral, Khedbrahma",
      description: "The grand Gujarati Varghodo procession celebrated with joyful folk music, traditional dhol beats, and blessings.",
      dressCodeSuggestion: "Traditional Gujarati Festive Attire",
      icon: "sparkles",
      calendarEvent: {
        title: "Varghodo - Hinal & Nikhil",
        description: "Royal procession and folk celebrations",
        location: "New Metral, Khedbrahma",
        startDate: "2027-01-25T10:00:00",
        endDate: "2027-01-25T12:00:00",
      },
    },
    {
      id: "lunch-ceremony",
      title: "3. Lunch / Meal Ceremony",
      subTitle: "Festive Preeti Bhojan (Mahaprasad)",
      date: "Monday, 25th January 2027",
      time: "12:30 PM",
      venue: "C.K. House Dining Grounds, New Metral",
      description: "Join us for a sumptuous traditional festive luncheon feast with family, relatives, and close friends.",
      dressCodeSuggestion: "Day Festive Ethnic",
      icon: "utensils",
      calendarEvent: {
        title: "Lunch / Meal Ceremony - Hinal & Nikhil",
        description: "Traditional Preeti Bhojan banquet",
        location: "C.K. House, New Metral, Khedbrahma",
        startDate: "2027-01-25T12:30:00",
        endDate: "2027-01-25T15:00:00",
      },
    },
    {
      id: "carnival-sangeet",
      title: "4. Carnival (Sangeet)",
      subTitle: "Music, Dance & Glitzy Celebration",
      date: "Monday, 25th January 2027",
      time: "03:00 PM",
      venue: "Celebration Lawns, New Metral",
      description: "An exhilarating afternoon of energetic dance performances, vibrant tunes, singing, and joy.",
      dressCodeSuggestion: "Theme: Pastel Colour Attire",
      dressCodeDetails: {
        palette: [
          { name: "Blush Rose", hex: "#F3D5D8", textDark: true },
          { name: "Sage Mint", hex: "#D3E2D5", textDark: true },
          { name: "Champagne Gold", hex: "#EBDDBA", textDark: true },
          { name: "Powder Blue", hex: "#D0DEEE", textDark: true },
          { name: "Soft Lavender", hex: "#E3D5E8", textDark: true },
        ],
      },
      icon: "music",
      calendarEvent: {
        title: "Carnival (Sangeet) - Hinal & Nikhil",
        description: "Musical carnival and dance celebration. Theme: Pastel Colour Attire",
        location: "Celebration Lawns, New Metral, Khedbrahma",
        startDate: "2027-01-25T15:00:00",
        endDate: "2027-01-25T18:30:00",
      },
    },
    {
      id: "grah-shanti",
      title: "5. Grah Shanti (Havan)",
      subTitle: "Sacred Vedic Rituals & Planetary Harmony",
      date: "Monday, 25th January 2027",
      time: "09:00 PM",
      venue: "C.K. House Sanctuary, New Metral",
      description: "The auspicious Grah Shanti Havan ceremony performed under Vedic mantras for divine harmony and peace.",
      dressCodeSuggestion: "Pure Traditional Attire",
      icon: "sun",
      calendarEvent: {
        title: "Grah Shanti (Havan) - Hinal & Nikhil",
        description: "Vedic havan and religious peace ceremony",
        location: "C.K. House, New Metral, Khedbrahma",
        startDate: "2027-01-25T21:00:00",
        endDate: "2027-01-25T23:30:00",
      },
    },
    {
      id: "wedding-procession",
      title: "6. Wedding Procession & Hast Melap",
      subTitle: "Galodiya to Metral • Sacred Pheras",
      date: "Tuesday, 26th January 2027",
      time: "12:30 PM",
      venue: "New Metral, Taluka: Khedbrahma",
      description: "The grand wedding procession will proceed from Galodiya to Metral, followed by the sacred Varmala, Hast Melap, and seven vows.",
      specialNote: "The wedding procession will proceed from Galodiya to Metral.",
      dressCodeSuggestion: "Royal Ethnic / Pastel Elegance",
      icon: "ring",
      calendarEvent: {
        title: "Wedding Ceremony - Hinal & Nikhil",
        description: "Procession from Galodiya to Metral & sacred Hast Melap",
        location: "New Metral, Khedbrahma, Sabarkantha",
        startDate: "2027-01-26T12:30:00",
        endDate: "2027-01-26T17:30:00",
      },
    },
  ],

  rsvp: {
    contactPerson1: "Shri Rakeshbhai Darji",
    phone1: "+91 98765 43210",
    whatsapp1: "919876543210",
    contactPerson2: "Smt. Nitaben Darji",
    phone2: "+91 91234 56789",
    whatsapp2: "919123456789",
    deadline: "15th January 2027",
    mealOptions: ["Pure Vegetarian", "Jain Food", "Swaminarayan", "Standard"],
  },

  music: {
    audioUrl: "/audio/kudmayi-wedding-tune.mp3",
    trackTitle: "Kudmayi (Wedding Tune) - Rocky Aur Rani",
    artist: "Shahid Mallya & Pritam",
  },

  loveStory: [
    {
      phase: "The First Hello",
      date: "November 2023",
      description: "What was meant to be a quick conversation blossomed into hours of discovering shared dreams, mutual respect, and an unspoken spark.",
    },
    {
      phase: "The Proposal",
      date: "February 2025",
      description: "Under a blanket of stars overlooking the gentle ocean breeze, Nikhil asked Hinal to be his forever companion, and through happy tears, she said YES!",
    },
    {
      phase: "Two Families, One Heart",
      date: "January 2027",
      description: "Surrounded by our dearest parents, family, and lifelong friends, we unite our souls under the sacred holy fire.",
    },
  ],
};
