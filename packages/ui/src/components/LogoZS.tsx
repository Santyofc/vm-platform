import React from "react";
import Image from "next/image";

export const LogoZS = ({ className }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center overflow-hidden rounded-2xl`}>
    {/* Optional: Add a subtle animated backdrop or ring here later */}
    <Image 
      src="/images/mascot.png" 
      alt="Zona Sur Tech Logo" 
      fill 
      className="object-contain"
      priority
    />
  </div>
);
