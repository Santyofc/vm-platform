"use client";
/**
 * HeroDemo — Client Component
 *
 * Heavy visual: floating mascot image + HackerTerminal canvas effect.
 * Loaded via dynamic() with ssr:false from HeroSection.tsx — never
 * blocks the critical path or LCP element.
 *
 * Parallax scroll (useScroll/useTransform) is scoped here, not on the
 * entire page container.
 */
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useMotion } from "../../../core/MotionProvider";

const HackerTerminal = dynamic(
  () =>
    import("@repo/ui-experiments").then((mod) => ({
      default: mod.HackerTerminal,
    })),
  { ssr: false, loading: () => <div className="w-full h-64 animate-pulse bg-zs-bg-secondary/50 rounded-2xl" /> }
);

export default function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMotion();

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  // 3D Tilt based on mouse
  const rotateX = useTransform(mouseY, [0, 1200], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1920], [-5, 5]);

  return (
    <motion.div 
      ref={ref} 
      style={{ 
        y: scrollY, 
        rotateX, 
        rotateY, 
        perspective: 1000 
      }} 
      className="relative hidden lg:block"
    >
      {/* Glow backdrop */}
      <div className="absolute -inset-10 bg-gradient-to-r from-zs-blue/10 to-zs-violet/10 blur-3xl rounded-full opacity-30 animate-pulse" />

      {/* Mascot Layer - Higher depth */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: useTransform(rotateX, (v) => v * 2),
          rotateY: useTransform(rotateY, (v) => v * 2),
          translateZ: 50
        }}
        className="absolute -top-32 -right-16 z-20 w-80 h-80 drop-shadow-[0_0_35px_rgba(37,99,235,0.4)]"
      >
        <Image
          src="/images/mascot.png"
          alt="Zona Sur Tech Mascot"
          fill
          sizes="(max-width: 1024px) 0px, 320px"
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Terminal Layer */}
      <motion.div 
        style={{ translateZ: 0 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-zs-border/50 bg-zs-bg-secondary/20 backdrop-blur-sm"
      >
        <HackerTerminal />
      </motion.div>
    </motion.div>
  );
}
