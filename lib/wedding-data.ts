/**
 * WEDDING INVITATION CONFIGURATION & DATA SOURCE
 * 
 * 💡 EDIT THIS FILE to customize all data for Hinal & Nikhil's Wedding Invitation:
 * - Couple names & family details
 * - Wedding dates & scratch-card reveal numbers
 * - Ceremonies & timeline events
 * - Venue, map link & address
 * - Dress code & pastel color swatches
 * - RSVP phone / WhatsApp numbers
 * - Music audio URL
 */

export interface CeremonyEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string; // e.g. "Dec 17, 2026"
  time: string; // e.g. "04:00 PM"
  venue: string;
  description: string;
  dressCodeSuggestion?: string;
  icon: "om" | "sparkles" | "music" | "sun" | "ring" | "utensils" | "heart";
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO format e.g. "2026-12-17T16:00:00"
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
    monogram: string; // e.g. "H & N"
    hashtag: string; // e.g. "#HinalWedsNikhil"
    auspiciousSymbol: string; // "|| श्री गणेशाय नमः ||" or "|| Shree Ganeshaya Namah ||"
    tagline: string;
    familyGreeting: string;
  };
  theDate: {
    weddingDateISO: string; // Target date for countdown ticker
    formattedDisplayDate: string;
    scratchCard: {
      day: string; // "18"
      month: string; // "DECEMBER"
      year: string; // "2026"
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
    whatsapp1: string; // Country code included without '+' for wa.me link e.g. "919876543210"
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
    tagline: "Together with their families, invite you to celebrate the joyous union of their souls.",
    familyGreeting: "With the divine blessings of our ancestors and our beloved parents, we embark on this sacred journey of eternal love, companionship, and seven vows.",
  },

  theDate: {
    weddingDateISO: "2026-12-18T18:00:00+05:30",
    formattedDisplayDate: "Friday, 18th December 2026",
    scratchCard: {
      day: "18",
      month: "DECEMBER",
      year: "2026",
      label: "✦ Scratch to reveal the wedding date ✦",
    },
  },

  venue: {
    name: "The Grand Royal Heritage Palace",
    hall: "Crystal Ballroom & The Royal Lawns",
    city: "Ahmedabad",
    state: "Gujarat, India",
    fullAddress: "The Grand Royal Heritage Palace, S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054",
    // Interactive Google Maps Embed
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.42878486518!2d72.48366935!3d23.0338634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsNavigationUrl: "https://maps.google.com/?q=The+Grand+Royal+Heritage+Palace+Ahmedabad",
    venuePhoto: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1200&q=80",
    contactPhone: "+91 98765 43210",
  },

  dressCode: {
    title: "Royal Traditional Attire",
    description: "We kindly invite our beloved family and friends to celebrate with us in graceful traditional attire inspired by gentle pastel tones.",
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
      title: "Ganesh Sthapana & Mandap Muhurat",
      subTitle: "Invocations & Auspicious Blessings",
      date: "Thursday, 17th December 2026",
      time: "09:30 AM",
      venue: "Home Sanctuary & Shantiniketan Lawns",
      description: "Seeking the divine blessings of Lord Ganesha for an auspicious start to the wedding festivities.",
      dressCodeSuggestion: "Traditional Yellow / Orange hues",
      icon: "om",
      calendarEvent: {
        title: "Ganesh Sthapana - Hinal & Nikhil",
        description: "Auspicious blessings and prayer ceremony",
        location: "Home Sanctuary, Ahmedabad",
        startDate: "2026-12-17T09:30:00",
        endDate: "2026-12-17T12:00:00",
      },
    },
    {
      id: "mehendi",
      title: "Mehendi & Folk Celebration",
      subTitle: "Henna, Laughter & Melodies",
      date: "Thursday, 17th December 2026",
      time: "03:30 PM",
      venue: "The Heritage Courtyard",
      description: "Adorning hands with auspicious henna motifs, accompanied by traditional folk tunes and delicacies.",
      dressCodeSuggestion: "Vibrant Greens & Floral Prints",
      icon: "sparkles",
      calendarEvent: {
        title: "Mehendi Ceremony - Hinal & Nikhil",
        description: "Henna designs and vibrant music",
        location: "The Heritage Courtyard",
        startDate: "2026-12-17T15:30:00",
        endDate: "2026-12-17T19:00:00",
      },
    },
    {
      id: "sangeet",
      title: "Sangeet Sandhya & Musical Night",
      subTitle: "Dance, Glitz & Dhol Beats",
      date: "Thursday, 17th December 2026",
      time: "07:30 PM",
      venue: "Grand Ballroom, The Grand Royal Palace",
      description: "An enchanting evening of dance performances, music, laughter, and high-energy celebrations.",
      dressCodeSuggestion: "Evening Glamour & Indo-Western",
      icon: "music",
      calendarEvent: {
        title: "Sangeet Night - Hinal & Nikhil",
        description: "Evening musical performances and celebration",
        location: "Grand Ballroom, The Grand Royal Palace",
        startDate: "2026-12-17T19:30:00",
        endDate: "2026-12-17T23:59:00",
      },
    },
    {
      id: "haldi",
      title: "Haldi & Phoolon Ki Holi",
      subTitle: "Golden Glow & Floral Showers",
      date: "Friday, 18th December 2026",
      time: "10:00 AM",
      venue: "Poolside Gardens, The Grand Royal Palace",
      description: "Purifying turmeric paste blessings with petals of marigold and joyful laughter.",
      dressCodeSuggestion: "Bright Yellows & Mustard Outfits",
      icon: "sun",
      calendarEvent: {
        title: "Haldi Ceremony - Hinal & Nikhil",
        description: "Turmeric rituals and flower shower",
        location: "Poolside Gardens",
        startDate: "2026-12-18T10:00:00",
        endDate: "2026-12-18T12:30:00",
      },
    },
    {
      id: "wedding",
      title: "Baraat, Varmala & Hast Melap",
      subTitle: "The Sacred Vows & Pheras",
      date: "Friday, 18th December 2026",
      time: "05:30 PM onwards",
      venue: "The Royal Pavilion & Mandap",
      description: "Baraat arrival followed by garland exchange (Varmala) and sacred pheras around the holy fire.",
      dressCodeSuggestion: "Royal Ethnic / Pastel Elegance",
      icon: "ring",
      calendarEvent: {
        title: "Wedding Ceremony - Hinal & Nikhil",
        description: "Baraat, Varmala, and sacred Hast Melap",
        location: "The Royal Pavilion & Mandap",
        startDate: "2026-12-18T17:30:00",
        endDate: "2026-12-18T21:00:00",
      },
    },
    {
      id: "reception",
      title: "Royal Banquet & Reception",
      subTitle: "Feast, Blessings & Merriment",
      date: "Friday, 18th December 2026",
      time: "08:00 PM onwards",
      venue: "The Grand Royal Lawns",
      description: "Join us for a lavish dinner banquet to bless the newlywed couple as they embark on eternity.",
      dressCodeSuggestion: "Royal Formal / Traditional",
      icon: "utensils",
      calendarEvent: {
        title: "Wedding Reception - Hinal & Nikhil",
        description: "Dinner banquet and blessings",
        location: "The Grand Royal Lawns",
        startDate: "2026-12-18T20:00:00",
        endDate: "2026-12-18T23:30:00",
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
    deadline: "1st December 2026",
    mealOptions: ["Pure Vegetarian", "Jain Food", "Swaminarayan", "Standard"],
  },

  music: {
    // Royalty-free acoustic sitar / flute romantic wedding theme
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-indian-traditional-sitar-and-percussion-335.mp3",
    trackTitle: "Mangal Vivah Sitar & Flute",
    artist: "Traditional Royal Melodies",
  },

  loveStory: [
    {
      phase: "The First Hello",
      date: "November 2023",
      description: "What was meant to be a 30-minute quick coffee conversation blossomed into four hours of discovering shared dreams, silly jokes, and an unspoken spark.",
    },
    {
      phase: "The Proposal",
      date: "February 2025",
      description: "Under a blanket of stars overlooking the gentle ocean breeze, Nikhil asked Hinal to be his forever companion, and through happy tears, she said YES!",
    },
    {
      phase: "Two Families, One Heart",
      date: "December 2026",
      description: "Surrounded by our dearest parents, family, and lifelong friends, we unite our souls under the sacred holy fire.",
    },
  ],
};
