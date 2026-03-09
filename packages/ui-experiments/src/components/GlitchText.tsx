"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export const GlitchText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  glitchSpeed = 40,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  glitchSpeed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [hasDecoded, setHasDecoded] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start initial hidden state
    setDisplayText(Array(text.length).fill("").join(""));

    // Wait for the requested delay
    const startTimeout = setTimeout(() => {
      setIsDecoding(true);
      
      let iteration = 0;
      const totalIterations = (duration * 1000) / glitchSpeed;

      const interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        // Progress based on text length to ensure smooth completion
        iteration += text.length / totalIterations;

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsDecoding(false);
          setHasDecoded(true);
        }
      }, glitchSpeed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay, duration, glitchSpeed]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      {displayText}
    </motion.span>
  );
};
