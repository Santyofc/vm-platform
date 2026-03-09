"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface MotionContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  isHovering: boolean;
  setIsHovering: (val: boolean) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used within a MotionProvider");
  return context;
};

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Settings for a smooth follow effect
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <MotionContext.Provider value={{ mouseX, mouseY, springX, springY, isHovering, setIsHovering }}>
      {children}
    </MotionContext.Provider>
  );
};
