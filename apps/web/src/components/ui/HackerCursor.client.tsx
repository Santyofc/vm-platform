"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useMotion } from "../../core/MotionProvider";

export function HackerCursor() {
  const { springX, springY, isHovering } = useMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkMobile();
    setIsVisible(true);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Don't render on mobile or if reduced motion is preferred
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Main Dot */}
            <motion.div
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="w-2 h-2 bg-zs-cyan rounded-full shadow-zs-glow-cyan"
            />

            {/* Expansible Ring */}
            <motion.div
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                scale: isHovering ? 2.5 : 1,
                borderColor: isHovering ? "var(--color-zs-violet)" : "var(--color-zs-cyan)",
                opacity: isHovering ? 0.8 : 0.4,
              }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-8 h-8 rounded-full border border-zs-cyan flex items-center justify-center"
            >
               {/* Cyber Brackets in Hover State */}
               {isHovering && (
                 <div className="flex justify-between w-full px-1 text-[8px] font-mono text-zs-violet font-black">
                    <span>[</span>
                    <span>]</span>
                 </div>
               )}
            </motion.div>

            {/* Velocity Trail (Delayed follow) */}
            <motion.div
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              transition={{ delay: 0.1 }}
              className="w-12 h-12 rounded-full border border-zs-cyan/10"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
