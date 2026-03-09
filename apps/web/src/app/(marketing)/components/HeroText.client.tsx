"use client";
/**
 * HeroText — Client leaf
 *
 * Responsible only for the mount-entry animation on the hero copy.
 * Keeps "use client" out of the parent server tree.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

export default function HeroText({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slow, subtle upward parallax as user scrolls down
  const y = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-start"
    >
      {children}
    </motion.div>
  );
}
