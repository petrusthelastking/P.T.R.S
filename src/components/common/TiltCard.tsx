"use client";

import React, { useRef, useState, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
  perspective?: number; // Perspective value in pixels
  scale?: number; // Scale on hover
  enableGlare?: boolean; // Enable reflective glare effect
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  enableGlare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to the card's top-left corner
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized coordinates (-0.5 to 0.5) from the center of the card
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    // Calculate rotation angles
    const rotateX = -normalizedY * maxTilt;
    const rotateY = normalizedX * maxTilt;

    // Apply transform styles
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
      transformStyle: "preserve-3d",
    });

    // Handle glare positioning
    if (enableGlare) {
      const glareX = (mouseX / width) * 100;
      const glareY = (mouseY / height) * 100;

      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 80%)`,
        transition: "opacity 0.1s ease-out",
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset rotations smoothly
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      transformStyle: "preserve-3d",
    });

    if (enableGlare) {
      setGlareStyle({
        opacity: 0,
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare overlay */}
      {enableGlare && (
        <div
          className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
}

export default TiltCard;
