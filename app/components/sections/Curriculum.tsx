"use client";

import Link from "next/link";
import RevealWrapper from "../ui/RevealWrapper";

export default function CurriculumSection() {
  return (
    <section className="relative z-10">
      <div className="curriculum-inner py-20 px-5 max-w-7xl mx-auto">
        {/* Header */}
        <div className="curriculum-header flex justify-between items-end flex-wrap gap-4 border-b-2 border-[rgba(75,0,130,0.5)] pb-5 mb-10">
          <RevealWrapper>
            <div>
              <p className="section-label font-space-grotesk text-xs font-bold tracking-widest uppercase text-yellow mb-3">
                [ MODULES 01–04 ]
              </p>
              <h2 className="section-title font-space-grotesk font-black text-[clamp(2rem,5vw,3.75rem)] uppercase leading-none tracking-tighter mb-0">
                CURRICULUM
              </h2>
            </div>
          </RevealWrapper>
          
          <RevealWrapper delay="0.1s">
            <div className="text-right">
              <p className="section-label font-space-grotesk text-xs font-bold tracking-widest uppercase text-yellow mb-3">
                FULL IMMERSION
              </p>
              <p className="font-space-grotesk font-bold text-xs tracking-widest uppercase text-muted">
                Designed for Builders
              </p>
            </div>
          </RevealWrapper>
        </div>
        
        {/* Grid */}
        <div className="curriculum-grid grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-5">
          
          {/* Module 01 - Featured */}
          <RevealWrapper>
            <div className="module-card featured py-7 px-7 border border-[var(--color-outline)] bg-dark/80 relative overflow-hidden transition-all duration-400 cursor-default hover:border-yellow/30 hover:translate-y-1 border-[rgba(221,183,255,0.2)] bg-[linear-gradient(135deg,rgba(75,0,130,0.3),rgba(19,19,24,0.8))]">
              <p className="module-num font-space-grotesk text-xs font-bold tracking-widest text-yellow mb-3.5">01</p>
              <h3 className="module-title font-space-grotesk font-black text-lg uppercase mb-3.5">Foundations of Speed</h3>
              <ul className="module-list list-none flex flex-col gap-1">
                {["Modern JS Engine Mechanics", "Vue 3 Composition API", "Vite Build Optimization"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted text-[0.775rem] before:content-[''] before:w-1.25 before:h-1.25 before:bg-yellow before:flex-shrink-0">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="h-17 bg-black/20 mt-5 rounded-sm opacity-60" />
            </div>
          </RevealWrapper>
          
          {/* Module 02 */}
          <RevealWrapper delay="0.1s">
            <div className="module-card py-7 px-7 border border-[var(--color-outline)] bg-dark/80 relative overflow-hidden transition-all duration-400 cursor-default hover:border-yellow/30 hover:translate-y-1">
              <p className="module-num font-space-grotesk text-xs font-bold tracking-widest text-yellow mb-3.5">02</p>
              <h3 className="module-title font-space-grotesk font-black text-lg uppercase mb-3.5">Backend Motion</h3>
              <p className="text-muted text-sm leading-relaxed">
                PocketBase architecture, migrations, and secure auth flows.
              </p>
              <span className="material-symbols-outlined module-icon text-5xl mt-5 opacity-35 transition-all duration-400 [font-variation-settings:'FILL'_0,'wght'_200,'GRAD'_0,'opsz'_24] group-hover:opacity-65 group-hover:scale-110" style={{ color: 'var(--color-purple)' }}>
                storage
              </span>
            </div>
          </RevealWrapper>
          
          {/* Module 03 */}
          <RevealWrapper delay="0.2s">
            <div className="module-card py-7 px-7 border border-[var(--color-outline)] bg-dark/80 relative overflow-hidden transition-all duration-400 cursor-default hover:border-yellow/30 hover:translate-y-1">
              <p className="module-num font-space-grotesk text-xs font-bold tracking-widest text-yellow mb-3.5">03</p>
              <h3 className="module-title font-space-grotesk font-black text-lg uppercase mb-3.5">Visual Impact</h3>
              <p className="text-muted text-sm leading-relaxed">
                Advanced Tailwind, shaders, and interaction design systems.
              </p>
              <span className="material-symbols-outlined module-icon text-5xl mt-5 opacity-35 transition-all duration-400 [font-variation-settings:'FILL'_0,'wght'_200,'GRAD'_0,'opsz'_24] group-hover:opacity-65 group-hover:scale-110" style={{ color: 'var(--color-lime)' }}>
                brush
              </span>
            </div>
          </RevealWrapper>
          
          {/* CTA Banner - Fixed: col-span-full + proper grid context */}
          <RevealWrapper delay="0.1s">
            <div className="cta-banner lg:col-span-full py-10 px-7 bg-[linear-gradient(135deg,rgba(75,0,130,0.6),rgba(45,53,0,0.6))] border border-[rgba(221,183,255,0.2)] grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-border-color duration-400 relative overflow-hidden">
              <div>
                <h3 className="cta-title font-space-grotesk font-black text-[clamp(1.5rem,3vw,2.25rem)] uppercase leading-none mb-3.5">
                  READY TO INITIALIZE?
                </h3>
                <p className="cta-sub text-muted mb-7 leading-relaxed text-sm">
                  Join the few mastering the stack that will define the next decade.
                </p>
               <Link href={"https://docs.google.com/forms/d/e/1FAIpQLScjk2oEwq5aI8zD5Jq0Nv51MqUtCexuglCki0RBBSy6tei2GQ/viewform?usp=dialog"}>
                    <button className="btn-primary bg-yellow text-dark py-3.5 px-8 font-space-grotesk font-black text-[clamp(0.8rem,2vw,1rem)] tracking-widest uppercase border-none cursor-pointer relative overflow-hidden [clip-path:var(--clip-path-angled-btn-lg)] transition-transform duration-300 hover:translate-y-1 hover:shadow-[0_12px_40px_rgba(234,234,0,0.35)] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)] after:transform after:-translate-x-full after:transition-transform after:duration-500 hover:after:translate-x-full">
                    ENROLL_CORE_ACCESS
                    </button>
                </Link>
              </div>
              <div className="stats-grid grid grid-cols-2 gap-3.5">
                {[
                  { value: "3+", key: "Modules" },
                  { value: "2", key: "Projects" },
                  { value: "24/7", key: "Support" },
                  { value: "∞", key: "Updates" }
                ].map((stat, i) => (
                  <div key={i} className="stat-box py-4 px-4 bg-black/20 transition-all duration-300 hover:bg-black/40">
                    <span className="stat-val font-space-grotesk font-black text-3xl text-yellow block">
                      {stat.value}
                    </span>
                    <span className="stat-key text-xs tracking-widest uppercase text-muted">
                      {stat.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
          
        </div>
      </div>
    </section>
  );
}