"use client";

import { useEffect, useRef } from "react";

interface RevealWrapperProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: string;
  className?: string;
}

export default function RevealWrapper({ 
  children, 
  direction = "up", 
  delay,
  className = "" 
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealClass = `reveal${direction !== "up" ? `-${direction}` : ""}`;

  return (
    <div 
      ref={ref} 
      className={`${revealClass} ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
}