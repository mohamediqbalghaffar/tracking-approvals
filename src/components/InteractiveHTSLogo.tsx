"use client";

import React, { useState, useEffect, useRef } from "react";

interface InteractiveHTSLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const InteractiveHTSLogo: React.FC<InteractiveHTSLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute 3D rotation and translation factors
  const rotateX = coords.y * -14;
  const rotateY = coords.x * 16;
  const translateX = coords.x * 12;
  const translateY = coords.y * 12;

  const sizeClasses = {
    sm: "w-44 md:w-52",
    md: "w-56 md:w-64 lg:w-72",
    lg: "w-64 md:w-80 lg:w-96",
  }[size];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none flex flex-col items-center justify-center cursor-pointer ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Ambient Red Glow Backdrop */}
      <div
        className={`absolute -inset-6 rounded-full bg-gradient-to-tr from-red-600/25 via-red-500/15 to-transparent blur-2xl transition-all duration-700 pointer-events-none ${
          isHovered ? "opacity-100 scale-115" : "opacity-60 scale-95"
        }`}
        style={{
          transform: `translate(${translateX * 1.4}px, ${translateY * 1.4}px)`,
        }}
      />

      {/* Main Interactive Logo Image with 3D Tilt */}
      <div
        className="relative transition-transform duration-200 ease-out transform-gpu drop-shadow-[0_12px_24px_rgba(220,38,38,0.25)] dark:drop-shadow-[0_14px_32px_rgba(239,68,68,0.4)]"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0) scale(${
            isHovered ? 1.06 : 1
          })`,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src="/hts-logo.png"
          alt="HTS - Halabja Group Logo"
          className={`${sizeClasses} h-auto object-contain transition-all duration-300 drop-shadow-md`}
          draggable={false}
        />
      </div>
    </div>
  );
};
