"use client";
/**
 * FeatureCardWrapper — Client leaf
 *
 * Wraps each bento card with a whileInView entrance animation.
 * Isolates "use client" to a thin wrapper so FeaturesGrid stays Server.
 */
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useMotion } from "../../../core/MotionProvider";

interface Props extends PropsWithChildren {
  colSpan?: string;
  rowSpan?: string;
  delay?: number;
}

export default function FeatureCardWrapper({
  children,
  colSpan = "",
  rowSpan = "",
  delay = 0,
}: Props) {
  const { setIsHovering } = useMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      whileHover={{ y: -5, scale: 1.02, backgroundColor: "rgba(37, 99, 235, 0.05)" }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      transition={{ 
        delay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`zs-card p-10 bg-zs-bg-secondary/40 backdrop-blur-xl group overflow-hidden relative border border-zs-border/50 hover:border-zs-blue/40 hover:shadow-zs-glow-blue/10 transition-colors ${colSpan} ${rowSpan}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zs-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </motion.div>
  );
}
