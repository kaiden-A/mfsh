"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(234,234,0,0.7)';
    };

    const handleMouseLeave = () => {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = 'rgba(234,234,0,0.4)';
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateRing();

    const interactiveElements = document.querySelectorAll('button, a, .card, .module-card');
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}