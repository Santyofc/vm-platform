"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";

export function GlitchText({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  once = true 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const startAnimation = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setHasAnimated(true);
      }

      iteration += text.length / (duration * 20); // Adjust speed based on duration
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
       setTimeout(() => {
         startAnimation();
       }, delay * 1000);
    }
  }, [isInView, hasAnimated, startAnimation, delay]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText || (isInView ? "" : text.split("").map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join(""))}
    </motion.span>
  );
}
