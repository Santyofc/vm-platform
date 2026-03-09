"use client";

import React, { useEffect, useRef } from "react";
import { useMotion } from "../../core/MotionProvider";

export function AmbientGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouseX, mouseY } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const gridSize = 50;
    const dotSize = 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Calculate distance to mouse for glow effect
          const dx = x - mouseX.get();
          const dy = y - mouseY.get();
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          
          let opacity = 0.05;
          let currentDotSize = dotSize;

          if (distance < maxDist) {
            const factor = 1 - distance / maxDist;
            opacity = 0.05 + factor * 0.2;
            currentDotSize = dotSize + factor * 1.5;
            
            // Draw subtle lines to nearby points if mouse is close
            if (factor > 0.5) {
                ctx.strokeStyle = `rgba(37, 99, 235, ${(factor - 0.5) * 0.1})`;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(mouseX.get(), mouseY.get());
                ctx.stroke();
            }
          }

          ctx.fillStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
