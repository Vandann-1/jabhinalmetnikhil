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
        ivory: {
          50: "#FCFAF6",
          100: "#F9F6F0",
          200: "#F3EDE2",
          300: "#EBE2D2",
          400: "#DECDB6",
        },
        champagne: {
          50: "#FBF8F1",
          100: "#F6F0DE",
          200: "#ECE0C1",
          300: "#E1CD9D",
          400: "#D3B776",
          500: "#C4A252",
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
        burgundy: {
          700: "#7A1C2C",
          800: "#5E1220",
          900: "#450C16",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-pinyon)", "'Great Vibes'", "cursive"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        emboss: "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(197, 155, 39, 0.08), inset 0 1px 2px rgba(255,255,255,0.8)",
        luxury: "0 10px 30px -5px rgba(180, 140, 60, 0.15), 0 0 0 1px rgba(197, 155, 39, 0.2)",
        goldGlow: "0 0 25px rgba(212, 176, 85, 0.4)",
        seal: "0 6px 14px rgba(139, 101, 20, 0.35), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)",
      },
      backgroundImage: {
        "gold-shimmer": "linear-gradient(135deg, #ECC876 0%, #FDF3C7 50%, #C49826 100%)",
        "gold-metallic": "linear-gradient(110deg, #bfa054 0%, #f4e4ba 25%, #d1ab55 50%, #f7eac7 75%, #b38f42 100%)",
        "parchment": "radial-gradient(circle at 50% 50%, #FFFDF9 0%, #F7F3E9 100%)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
