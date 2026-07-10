"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number; // in ms
  delay?: number; // in ms
  threshold?: number; // 0 to 1
  className?: string;
  distance?: string; // e.g. "40px", "20px"
}

export function ScrollReveal({
  children,
  direction = "up",
  duration = 800,
  delay = 0,
  threshold = 0.05,
  className = "",
  distance = "40px",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { 
        threshold,
        // Trigger slightly before it enters viewport for smoother feel
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Define transition style
  const transitionStyle = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Premium expo-out ease
    willChange: "opacity, transform",
  };

  // Define initial and active positions based on direction
  const getDirectionStyle = () => {
    if (isVisible) {
      return { opacity: 1, transform: "translate(0, 0)" };
    }

    const styles: Record<string, any> = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        styles.transform = `translateY(${distance})`;
        break;
      case "down":
        styles.transform = `translateY(-${distance})`;
        break;
      case "left":
        styles.transform = `translateX(${distance})`;
        break;
      case "right":
        styles.transform = `translateX(-${distance})`;
        break;
      case "fade":
      default:
        // No translation, just fade
        break;
    }

    return styles;
  };

  return (
    <div
      ref={elementRef}
      style={{
        ...transitionStyle,
        ...getDirectionStyle(),
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
