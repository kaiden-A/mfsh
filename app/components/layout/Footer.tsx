import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[rgba(109,40,217,0.3)] bg-[#0a0a0d] py-10 px-5 relative z-10 mt-12">
      <div className="footer-inner max-w-7xl mx-auto flex justify-between items-end gap-8 flex-wrap">
        <div>
          <div className="footer-logo font-space-grotesk font-black text-2xl text-text flex items-center gap-2 mb-1">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="3" fill="#eaea00"/>
              <path d="M8 10 L18 26 L28 10" stroke="#131318" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" fill="none"/>
              <path d="M13 10 L18 19 L23 10" stroke="#131318" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" opacity="0.45"/>
            </svg>
            Motion-U
          </div>
          <p className="footer-copy text-xs tracking-widest uppercase text-[#5a5866]">
            ©2026 Motion-U Club — All Rights Reserved
          </p>
        </div>
        
        <div className="footer-links flex gap-10 flex-wrap">
          <div className="footer-col flex flex-col gap-2.5">
            <Link href="#" className="footer-link font-space-grotesk font-bold text-xs tracking-widest uppercase text-[#5a5866] no-underline transition-color duration-300 hover:text-yellow">
              Terms
            </Link>
            <Link href="#" className="footer-link font-space-grotesk font-bold text-xs tracking-widest uppercase text-[#5a5866] no-underline transition-color duration-300 hover:text-yellow">
              Privacy
            </Link>
          </div>
          <div className="footer-col flex flex-col gap-2.5">
            <Link href="#" className="footer-link font-space-grotesk font-bold text-xs tracking-widest uppercase text-[#5a5866] no-underline transition-color duration-300 hover:text-yellow">
              Grid Specs
            </Link>
            <Link href="#" className="footer-link font-space-grotesk font-bold text-xs tracking-widest uppercase text-[#5a5866] no-underline transition-color duration-300 hover:text-yellow">
              Manifesto
            </Link>
          </div>
          <div className="footer-col flex flex-col gap-2.5">
            <p className="footer-link font-space-grotesk font-bold text-xs tracking-widest uppercase text-yellow">
              Connect
            </p>
            <div className="footer-icons flex gap-3.5">
              {["terminal", "code", "public"].map((icon, i) => (
                <span 
                  key={i}
                  className="material-symbols-outlined footer-icon text-[#5a5866] cursor-pointer transition-all duration-300 hover:text-yellow hover:translate-y-0.75 [font-variation-settings:'FILL'_0,'wght'_300,'GRAD'_0,'opsz'_24]"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}