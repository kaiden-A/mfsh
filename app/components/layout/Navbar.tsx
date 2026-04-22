"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<"VueJS" | "PocketBase" | "BasicWeb">();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleTabClick = (tab: "VueJS" | "PocketBase" | "BasicWeb") => {
    setActiveTab(tab);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 border-white/10' : 'bg-dark/70 border-white/5'
      } backdrop-blur-2xl border-b`}
    >
      <div className="nav-inner flex justify-between items-center px-4 md:px-6 py-3.5 max-w-7xl mx-auto gap-4">
        
        {/* Logo */}
        <Link href="/" className="logo flex items-center gap-2.5 no-underline shrink-0">
        <div className="logo-mark w-9 h-9 shrink-0 relative">
            <Image 
            src="/logo.png" 
            alt="Motion-U Logo" 
            fill 
            className="object-contain"
            priority // Ensures the logo loads immediately
            />
        </div>
        <span className="logo-text font-space-grotesk font-black text-xl italic text-yellow tracking-tighter whitespace-nowrap">
            Motion-U
        </span>
        </Link>

        {/* Desktop Tabs */}
        <div className="nav-tabs flex gap-0 border border-outline overflow-hidden shrink-0 desktop-only">
          <Link href={'/'}>
            <button 
              className={`nav-tab px-4 py-2 font-space-grotesk font-bold text-xs tracking-widest uppercase bg-transparent border-none cursor-pointer relative transition-all duration-250 whitespace-nowrap hover:text-white hover:bg-white/4 ${
                activeTab === "BasicWeb" ? 'text-yellow after:scale-x-100' : 'text-white/55 after:scale-x-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:transform after:transition-transform after:duration-250`}
              onClick={() => handleTabClick("BasicWeb")}
            >
              Basic Web
            </button>
          </Link>
          <button 
            className={`nav-tab px-4 py-2 font-space-grotesk font-bold text-xs tracking-widest uppercase bg-transparent border-none cursor-pointer relative transition-all duration-250 whitespace-nowrap hover:text-white hover:bg-white/4 ${
              activeTab === "VueJS" ? 'text-yellow after:scale-x-100' : 'text-white/55 after:scale-x-0'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:transform after:transition-transform after:duration-250`}
            onClick={() => handleTabClick("VueJS")}
          >
            VueJS
          </button>
          <button 
            className={`nav-tab px-4 py-2 font-space-grotesk font-bold text-xs tracking-widest uppercase bg-transparent border-none cursor-pointer relative transition-all duration-250 whitespace-nowrap hover:text-white hover:bg-white/4 border-l border-outline ${
              activeTab === "PocketBase" ? 'text-yellow after:scale-x-100' : 'text-white/55 after:scale-x-0'
            } after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:transform after:transition-transform after:duration-250`}
            onClick={() => handleTabClick("PocketBase")}
          >
            PocketBase
          </button>
        </div>

        {/* Right Section */}
        <div className="nav-right flex items-center gap-4 shrink-0">
            <Link href={"https://docs.google.com/forms/d/e/1FAIpQLScjk2oEwq5aI8zD5Jq0Nv51MqUtCexuglCki0RBBSy6tei2GQ/viewform?usp=dialog"}>
                <button className="nav-btn bg-yellow text-dark py-2 px-4 font-space-grotesk font-black text-xs tracking-widest uppercase border-none cursor-pointer relative overflow-hidden transition-all duration-300 [clip-path:var(--clip-path-angled-btn)] whitespace-nowrap hover:before:translate-x-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:transform before:-translate-x-full before:transition-transform before:duration-300">
                    <span className="relative z-10">JOIN_CORE</span>
                </button>
            </Link>
          <button 
            className={`hamburger flex flex-col gap-1.25 bg-none border-none cursor-pointer p-1 mobile-only ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span className="block w-5.5 h-0.5 bg-text transition-all duration-300 rounded-sm" />
            <span className="block w-5.5 h-0.5 bg-text transition-all duration-300 rounded-sm" />
            <span className="block w-5.5 h-0.5 bg-text transition-all duration-300 rounded-sm" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu hidden flex-col gap-0 bg-dark/98 border-t border-outline p-0 overflow-hidden transition-[max-height,padding] duration-400 ease-in-out mobile-only ${
          mobileMenuOpen ? 'flex max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <p className="tab-label text-xs text-muted tracking-widest px-6 pt-5 pb-2">Track</p>
        <div className="mobile-menu-tabs flex gap-0 m-4 border border-outline">
          <button 
            className={`flex-1 text-center py-2.5 border-none ${activeTab === "BasicWeb" ? 'text-yellow bg-yellow/8' : ''}`}
            onClick={() => handleTabClick("BasicWeb")}
          >
            Basic Web
          </button>
          <button 
            className={`flex-1 text-center py-2.5 border-none ${activeTab === "VueJS" ? 'text-yellow bg-yellow/8' : ''}`}
            onClick={() => handleTabClick("VueJS")}
          >
            VueJS
          </button>
          <button 
            className={`flex-1 text-center py-2.5 border-none ${activeTab === "PocketBase" ? 'text-yellow bg-yellow/8' : ''}`}
            onClick={() => handleTabClick("PocketBase")}
          >
            PocketBase
          </button>
        </div>
        <Link href="#" className="text-yellow mt-2 px-6 py-3 font-space-grotesk font-bold text-xs tracking-widest uppercase no-underline hover:bg-yellow/5 hover:text-yellow transition-colors">
          Join Core →
        </Link>
      </div>
    </nav>
  );
}