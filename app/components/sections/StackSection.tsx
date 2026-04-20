import RevealWrapper from "../ui/RevealWrapper";

export default function StackSection() {
  const cards = [
    {
      icon: "bolt",
      title: "Reactive Core",
      body: "Vue 3 Composition API. Sub-millisecond state-driven UIs.",
      delay: "0.1s"
    },
    {
      icon: "database",
      title: "Realtime DB",
      body: "PocketBase — Auth, DB, Storage in one binary. Deploy in seconds.",
      delay: "0.2s",
      offset: true
    },
    {
      icon: "speed",
      title: "Vite Pipeline",
      body: "Lightning HMR and optimized builds. Zero config hell.",
      delay: "0.3s"
    },
    {
      icon: "code",
      title: "TypeScript",
      body: "Typed from day one. Ship confidently with full IDE support.",
      delay: "0.4s",
      offset: true
    }
  ];

  const tags = ["Vue.js 3.4", "PocketBase", "TypeScript", "Vite", "Tailwind", "Composition API"];

  return (
    <section className="relative z-10">
      <div className="section-inner py-20 px-5 max-w-7xl mx-auto">
        <RevealWrapper>
          <p className="section-label font-space-grotesk text-xs font-bold tracking-widest uppercase text-yellow mb-3">
            [ 01 // THE STACK ]
          </p>
          <h2 className="section-title font-space-grotesk font-black text-[clamp(2rem,5vw,3.75rem)] uppercase leading-none tracking-tighter mb-5">
            ENGINEERED<br/>FOR SPEED
          </h2>
        </RevealWrapper>
        
        <div className="stack-grid grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start mt-12">
          <RevealWrapper direction="left" delay="0.1s">
            <p className="stack-desc text-muted leading-relaxed mb-7 text-[0.925rem]">
              Lean, reactive machines using the fastest primitives in the ecosystem. Everything stripped to what matters: performance and clarity.
            </p>
            <div className="tags flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span 
                  key={i}
                  className="tag py-1 px-3 border border-outline font-space-grotesk font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-default hover:border-yellow hover:text-yellow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealWrapper>
          
          <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((card, i) => (
              <div 
                key={i}
                className={`card py-7 px-7 bg-dark2/80 border border-outline relative overflow-hidden transition-all duration-400 cursor-default hover:translate-y-1.5 hover:border-purple/25 ${
                  card.offset ? 'card-offset' : ''
                }`}
                style={{ transitionDelay: card.delay }}
              >
                <span className="material-symbols-outlined card-icon text-4xl text-yellow opacity-25 absolute top-4 right-4 transition-all duration-400 [font-variation-settings:'FILL'_0,'wght'_300,'GRAD'_0,'opsz'_24] group-hover:opacity-60 group-hover:scale-110 group-hover:-rotate-5">
                  {card.icon}
                </span>
                <p className="card-title font-space-grotesk font-black text-lg uppercase text-yellow mb-2.5">
                  {card.title}
                </p>
                <p className="card-body text-muted text-[0.825rem] leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}