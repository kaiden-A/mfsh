import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import CanvasBackground from "./components/ui/CanvasBackground";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";

// Font configuration
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motion-U | Full-Stack Hero Course",
  description: "Master Vue 3.4, PocketBase, TypeScript & Vite. Build lean, reactive machines using the fastest primitives in the ecosystem.",
  keywords: ["Vue.js", "PocketBase", "TypeScript", "Vite", "Tailwind", "Full-Stack", "Web Development"],
  authors: [{ name: "Motion-U Club" }],
  creator: "Motion-U",
  publisher: "Motion-U Club",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://motion-u.dev"),
  openGraph: {
    title: "Motion-U | Full-Stack Hero Course",
    description: "Master the stack that defines the next decade.",
    url: "https://motion-u.dev",
    siteName: "Motion-U",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion-U | Full-Stack Hero Course",
    description: "Master Vue 3.4, PocketBase, TypeScript & Vite.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#131318",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} scroll-smooth`}>
      <body className="antialiased">
        {/* Background & UI Elements */}
        <CanvasBackground />
        <CustomCursor />
        <ScrollProgress />
        
        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>
        
        {/* Google Fonts for Material Symbols */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </body>
    </html>
  );
}