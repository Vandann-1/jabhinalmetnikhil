/**
 * WEDDING INVITATION CONFIGURATION & DATA SOURCE
 * 
 * Configured specifically for Hinal & Nikhil
 * Based on the wedding invitation video:
 * Date: Tuesday, 26th January 2026
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
  icon: "om" | "sparkles" | "music" | "sun" | "ring" | "utensils" | "heart";
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
    state: string;
    fullAddress: string;
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
      fullName: "Hinal Shah",
      fatherName: "Mr. Rajesh Shah",
      motherName: "Mrs. Bhavna Shah",
      grandParents: "Late Shri Kantilal Shah & Smt. Shardaben Shah",
      role: "The Bride",
    },
    groom: {
      firstName: "Nikhil",
      fullName: "Nikhil Patel",
      fatherName: "Mr. Mahendra Patel",
      motherName: "Mrs. Rekha Patel",
      grandParents: "Late Shri Govindbhai Patel & Smt. Maniben Patel",
      role: "The Groom",
    },
    monogram: "H & N",
    hashtag: "#HinalFoundHerNik",
    auspiciousSymbol: "|| श्री गणेशाय नमः ||",
    tagline: "cordially invite you to the wedding of their daughter",
    familyGreeting: "With the divine blessings of Lord Ganesha, our ancestors, and our beloved parents, we embark on this sacred journey of eternal love and seven vows.",
  },

  theDate: {
    // Exact date from user's video: Tuesday, 26th January 2026
    weddingDateISO: "2026-01-26T10:00:00+05:30",
    formattedDisplayDate: "Tuesday, 26th January 2026",
    scratchCard: {
      day: "26",
      month: "JANUARY",
      year: "2026",
      label: "✦ Scratch to reveal our wedding date ✦",
    },
  },

  venue: {
    name: "The Royal Heritage Palace & Lawns",
    hall: "Crystal Ballroom & The Royal Mandap",
    city: "Ahmedabad",
    state: "Gujarat, India",
    fullAddress: "The Royal Heritage Palace, S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.42878486518!2d72.48366935!3d23.0338634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsNavigationUrl: "https://maps.google.com/?q=The+Royal+Heritage+Palace+Ahmedabad",
    venuePhoto: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80",
    contactPhone: "+91 98765 43210",
  },

  dressCode: {
    title: "Royal Traditional Attire",
    description: "We warmly invite our family and friends to celebrate with us in graceful traditional attire inspired by soft pastel tones.",
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
      id: "mandap-muhurat",
      title: "Ganesh Sthapana & Mandap Muhurat",
      subTitle: "Invocations & Auspicious Blessings",
      date: "Monday, 25th January 2026",
      time: "09:30 AM",
      venue: "Home Sanctuary & Shantiniketan Lawns",
      description: "Seeking the divine blessings of Lord Ganesha for an auspicious start to the wedding festivities.",
      dressCodeSuggestion: "Traditional Yellow & Mustard Outfits",
      icon: "om",
      calendarEvent: {
        title: "Ganesh Sthapana - Hinal & Nikhil",
        description: "Auspicious blessings and prayer ceremony",
        location: "Home Sanctuary, Ahmedabad",
        startDate: "2026-01-25T09:30:00",
        endDate: "2026-01-25T12:00:00",
      },
    },
    {
      id: "mehendi",
      title: "Mehendi & Folk Celebration",
      subTitle: "Henna, Laughter & Melodies",
      date: "Monday, 25th January 2026",
      time: "03:30 PM",
      venue: "The Heritage Courtyard",
      description: "Adorning hands with auspicious henna motifs, accompanied by traditional folk tunes.",
      dressCodeSuggestion: "Vibrant Greens & Floral Prints",
      icon: "sparkles",
      calendarEvent: {
        title: "Mehendi Ceremony - Hinal & Nikhil",
        description: "Henna designs and vibrant music",
        location: "The Heritage Courtyard",
        startDate: "2026-01-25T15:30:00",
        endDate: "2026-01-25T19:00:00",
      },
    },
    {
      id: "sangeet",
      title: "Sangeet Sandhya & Musical Night",
      subTitle: "Dance, Glitz & Dhol Beats",
      date: "Monday, 25th January 2026",
      time: "07:30 PM",
      venue: "Grand Ballroom, The Royal Heritage Palace",
      description: "An enchanting evening of dance performances, music, laughter, and celebration.",
      dressCodeSuggestion: "Evening Glamour & Indo-Western",
      icon: "music",
      calendarEvent: {
        title: "Sangeet Night - Hinal & Nikhil",
        description: "Evening musical performances and celebration",
        location: "Grand Ballroom, The Royal Heritage Palace",
        startDate: "2026-01-25T19:30:00",
        endDate: "2026-01-25T23:59:00",
      },
    },
    {
      id: "haldi",
      title: "Haldi & Phoolon Ki Holi",
      subTitle: "Golden Glow & Floral Showers",
      date: "Tuesday, 26th January 2026",
      time: "08:30 AM",
      venue: "Poolside Lawns, The Royal Heritage Palace",
      description: "Purifying turmeric paste blessings with marigold petals and joyful laughter.",
      dressCodeSuggestion: "Bright Yellows & Mustard Outfits",
      icon: "sun",
      calendarEvent: {
        title: "Haldi Ceremony - Hinal & Nikhil",
        description: "Turmeric rituals and flower shower",
        location: "Poolside Lawns",
        startDate: "2026-01-26T08:30:00",
        endDate: "2026-01-26T11:00:00",
      },
    },
    {
      id: "wedding",
      title: "Baraat, Varmala & Hast Melap",
      subTitle: "The Sacred Vows & Pheras",
      date: "Tuesday, 26th January 2026",
      time: "05:00 PM onwards",
      venue: "The Royal Mandap & Lawns",
      description: "Baraat arrival followed by garland exchange (Varmala) and sacred pheras around the holy fire.",
      dressCodeSuggestion: "Royal Ethnic / Pastel Elegance",
      icon: "ring",
      calendarEvent: {
        title: "Wedding Ceremony - Hinal & Nikhil",
        description: "Baraat, Varmala, and sacred Hast Melap",
        location: "The Royal Mandap & Lawns",
        startDate: "2026-01-26T17:00:00",
        endDate: "2026-01-26T21:00:00",
      },
    },
    {
      id: "reception",
      title: "Royal Banquet & Dinner",
      subTitle: "Feast, Blessings & Merriment",
      date: "Tuesday, 26th January 2026",
      time: "07:30 PM onwards",
      venue: "The Grand Royal Lawns",
      description: "Join us for a lavish dinner banquet to bless the newlywed couple as they embark on eternity.",
      dressCodeSuggestion: "Royal Formal / Traditional",
      icon: "utensils",
      calendarEvent: {
        title: "Wedding Reception - Hinal & Nikhil",
        description: "Dinner banquet and blessings",
        location: "The Grand Royal Lawns",
        startDate: "2026-01-26T19:30:00",
        endDate: "2026-01-26T23:30:00",
      },
    },
  ],

  rsvp: {
    contactPerson1: "Rajesh Shah (Bride's Father)",
    phone1: "+91 98765 43210",
    whatsapp1: "919876543210",
    contactPerson2: "Mahendra Patel (Groom's Father)",
    phone2: "+91 91234 56789",
    whatsapp2: "919123456789",
    deadline: "10th January 2026",
    mealOptions: ["Pure Vegetarian", "Jain Food", "Swaminarayan", "Standard"],
  },

  music: {
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-indian-traditional-sitar-and-percussion-335.mp3",
    trackTitle: "Mangal Vivah Sitar & Flute",
    artist: "Traditional Royal Melodies",
  },

  loveStory: [
    {
      phase: "The First Hello",
      date: "November 2023",
      description: "What was meant to be a quick coffee conversation blossomed into hours of discovering shared dreams and an unspoken spark.",
    },
    {
      phase: "The Proposal",
      date: "February 2025",
      description: "Under a blanket of stars overlooking the gentle ocean breeze, Nikhil asked Hinal to be his forever companion, and through happy tears, she said YES!",
    },
    {
      phase: "Two Families, One Heart",
      date: "January 2026",
      description: "Surrounded by our dearest parents, family, and lifelong friends, we unite our souls under the sacred holy fire.",
    },
  ],
};
