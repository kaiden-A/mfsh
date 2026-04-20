"use client";

import { useEffect, useRef } from "react";
import RevealWrapper from "../ui/RevealWrapper";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll('[data-target]');
    
    const animateCounter = (el: Element) => {
      if (el.getAttribute('data-counted')) return;
      el.setAttribute('data-counted', '1');
      
      const target = +el.getAttribute('data-target')!;
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target / 60;
      
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="manifesto py-20 px-5 text-center bg-dark/90 border-y border-white/3">
      <div className="manifesto-inner max-w-3xl mx-auto">
        <span className="material-symbols-outlined manifesto-icon text-7xl text-yellow block mb-7 animate-icon-float [font-variation-settings:'FILL'_0,'wght'_200,'GRAD'_0,'opsz'_24]">
          verified_user
        </span>
        
        <RevealWrapper>
          <h2 className="manifesto-title font-space-grotesk font-black text-[clamp(1.75rem,4vw,3rem)] uppercase leading-none tracking-tighter italic mb-8">
            The Hero's Journey Begins at the Terminal
          </h2>
        </RevealWrapper>
        
        <div className="manifesto-text text-muted text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed flex flex-col gap-4">
          <RevealWrapper>
            <p>
              Modern development has become over-engineered. We traded speed for comfort.{" "}
              <span className="highlight text-yellow font-bold">Motion-U</span> is a return to form.
            </p>
          </RevealWrapper>
          <RevealWrapper delay="0.15s">
            <p>
              We teach you to think in components, architect scalable data flows, and build products that feel like the future.
            </p>
          </RevealWrapper>
        </div>
        
        <div className="counter-row flex gap-8 justify-center flex-wrap mt-14 pt-10 border-t border-white/5">
          {[
            { target: 27, suffix: "+", label: "Developers Trained", delay: "0.1s" },
            { target: 99, suffix: "%", label: "Satisfaction", delay: "0.2s" },
            { target: 24, suffix: "", label: "Hours to Ship", delay: "0.3s" }
          ].map((counter, i) => (
            <RevealWrapper key={i} delay={counter.delay}>
              <div className="counter-item text-center min-w-30">
                <span 
                  className="counter-num font-space-grotesk font-black text-[clamp(2rem,4vw,2.75rem)] text-yellow block"
                  data-target={counter.target}
                  data-suffix={counter.suffix}
                >
                  0
                </span>
                <span className="counter-desc text-xs tracking-widest uppercase text-muted">
                  {counter.label}
                </span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}