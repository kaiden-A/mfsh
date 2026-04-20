"use client";

import RevealWrapper from "../ui/RevealWrapper";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero min-h-screen flex flex-col items-center justify-center relative z-10 pt-28 pb-16 px-5 text-center">
      <p className="hero-eyebrow font-space-grotesk text-xs font-bold tracking-widest uppercase text-yellow mb-8 opacity-0 animate-fade-up [animation-delay:0.2s]">
        <span className="inline-block animate-glitch">[ SYSTEM_INITIALIZED // ACCESSING_CORE ]</span>
      </p>
      
      <h1 className="hero-title font-space-grotesk font-black text-[clamp(3.5rem,11vw,9.5rem)] leading-none uppercase tracking-tighter text-transparent text-stroke mb-10">
        <span className="line block opacity-0 animate-reveal-line [animation-delay:0.4s]">MODERN</span>
        <span className="line block opacity-0 animate-reveal-line [animation-delay:0.6s] text-yellow text-stroke-none">FULL-STACK</span>
        <span className="line block opacity-0 animate-reveal-line [animation-delay:0.8s]">HERO</span>
      </h1>
      
      <p className="hero-sub max-w-xl mx-auto mb-10 text-muted text-[clamp(0.875rem,2vw,1rem)] leading-relaxed opacity-0 animate-fade-up [animation-delay:1s]">
        We build lean, reactive machines using the fastest primitives in the ecosystem. Master the stack that defines the next decade.
      </p>
      
      <div className="hero-cta-group flex gap-3.5 justify-center flex-wrap opacity-0 animate-fade-up [animation-delay:1.2s]">
        <Link href={"https://docs.google.com/forms/d/e/1FAIpQLScjk2oEwq5aI8zD5Jq0Nv51MqUtCexuglCki0RBBSy6tei2GQ/viewform?usp=dialog"}>
            <button className="btn-primary bg-yellow text-dark py-3.5 px-8 font-space-grotesk font-black text-[clamp(0.8rem,2vw,1rem)] tracking-widest uppercase border-none cursor-pointer relative overflow-hidden [clip-path:var(--clip-path-angled-btn-lg)] transition-transform duration-300 hover:translate-y-1 hover:shadow-[0_12px_40px_rgba(234,234,0,0.35)] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)] after:transform after:-translate-x-full after:transition-transform after:duration-500 hover:after:translate-x-full">
            <span className="material-symbols-outlined align-middle mr-1.5 text-base">rocket_launch</span>
            REGISTER_NOW
            </button>
        </Link>
      </div>
      
      <div className="metrics flex gap-8 justify-center mt-14 flex-wrap opacity-0 animate-fade-up [animation-delay:1.4s] pt-10 border-t border-white/5 w-full">
        {[
          { value: "<12ms", label: "Latency" },
          { value: "99.99%", label: "Uptime" },
          { value: "3+", label: "Modules" },
          { value: "2", label: "Projects" }
        ].map((metric, i) => (
          <div key={i} className="metric-item text-center min-w-20">
            <span className="metric-val font-space-grotesk font-black text-[clamp(1.5rem,3vw,2rem)] text-yellow block">
              {metric.value}
            </span>
            <span className="metric-label text-xs tracking-widest uppercase text-muted">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Code Snippets */}
      <div className="code-snippet left bottom-[18%] left-[3%]">
        const init = () =&gt; {'{'}<br/>
        &nbsp;&nbsp;system.mode = 'HERO';<br/>
        &nbsp;&nbsp;return 'ASCEND';<br/>
        {'}'};
      </div>
      <div className="code-snippet right bottom-[18%] right-[3%]">
        import {'{'} motion {'}'} from '@core';<br/>
        motion.deploy({'{'}<br/>
        &nbsp;&nbsp;speed: 'max'<br/>
        {'}'});
      </div>
    </section>
  );
}