export default function Ticker() {
  const items = [
    "VueJS Composition API", "PocketBase Realtime", "Tailwind Systems",
    "High Performance", "TypeScript", "Vite Build"
  ];

  return (
    <div className="ticker-wrap relative z-20 overflow-hidden bg-yellow -rotate-2 scale-x-105 my-14 py-2.5">
      <div className="ticker-track flex whitespace-nowrap animate-ticker">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="font-space-grotesk font-black text-sm tracking-widest uppercase text-dark px-6 shrink-0">
              {item}
            </span>
            <span className="px-6 shrink-0 text-dark/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}