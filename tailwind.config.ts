import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF9",
          100: "#FAF1E2", // The exact sampled video background color
          200: "#F5E7D0",
          300: "#EED7B7",
          400: "#DFC095",
        },
        gold: {
          100: "#F9F1DC",
          200: "#EEDDB1",
          300: "#E3C886",
          400: "#D4B055",
          500: "#C59B27",
          600: "#A9801C",
          700: "#8B6514",
          800: "#6B4C0E",
        },
        royalMaroon: {
          700: "#8B1D2C",
          800: "#6B121E",
          900: "#4D0A14",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "Georgia", "serif"],
        script: ["'Great Vibes'", "'Pinyon Script'", "cursive"],
        sans: ["'Montserrat'", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(180, 140, 60, 0.12), 0 0 0 1px rgba(197, 155, 39, 0.18)",
        seal: "0 6px 14px rgba(139, 101, 20, 0.35), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
