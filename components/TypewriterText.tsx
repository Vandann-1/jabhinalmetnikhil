"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  className?: string;
  speed?: number; // Delay per grapheme/character (seconds)
  delay?: number; // Delay before typing starts (seconds)
  showCursor?: boolean; // Blinking golden typing cursor
  cursorClassName?: string;
  once?: boolean; // Animate only once or each time entering view
  lang?: "en" | "gu" | "hi";
  glow?: boolean;
}

export default function TypewriterText({
  text,
  as: Component = "span",
  className = "",
  speed = 0.032,
  delay = 0.1,
  showCursor = false,
  cursorClassName = "",
  once = true,
  lang = "en",
  glow = false,
}: TypewriterTextProps) {
  // Split text into words and segment each word into graphemes (safe for Gujarati/Hindi matras)
  const wordsWithGraphemes = useMemo(() => {
    const rawWords = text.split(" ");
    return rawWords.map((word) => {
      if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
        try {
          const segmenter = new (Intl as any).Segmenter(lang, { granularity: "grapheme" });
          const segments: string[] = [];
          for (const s of segmenter.segment(word)) {
            segments.push(s.segment);
          }
          return segments;
        } catch {
          return Array.from(word);
        }
      }
      return Array.from(word);
    });
  }, [text, lang]);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 4,
      filter: glow ? "blur(2px)" : "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.14,
        ease: "easeOut",
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-4% 0px -6% 0px" }}
      variants={containerVariants}
      className={`inline-block ${className}`}
    >
      {wordsWithGraphemes.map((chars, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {chars.map((char, charIndex) => (
            <motion.span
              key={`char-${wordIndex}-${charIndex}`}
              variants={charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {/* Add trailing space between words (except the last word) */}
          {wordIndex < wordsWithGraphemes.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}

      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
          className={`inline-block ml-1 font-normal text-gold-600 select-none ${cursorClassName}`}
        >
          |
        </motion.span>
      )}
    </MotionComponent>
  );
}
