import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import CanvasBackground from "./components/ui/CanvasBackground";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";

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

// ─── CHANGE THESE ────────────────────────────────────────────────
const BASE_URL = "https://mfsh.motionukict.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`; // 1200×630px recommended
// ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Motion-U | Full-Stack Hero Course",
    template: "%s | Motion-U",
  },
  description:
    "Master Vue 3.4, PocketBase, TypeScript & Vite. Build lean, reactive full-stack apps using the fastest primitives in the ecosystem. Go from zero to production-ready.",
  keywords: [
    "Vue 3",
    "Vue.js course",
    "PocketBase tutorial",
    "TypeScript full-stack",
    "Vite",
    "Tailwind CSS",
    "full-stack web development",
    "online coding course",
    "learn Vue.js",
    "web development bootcamp",
    "Motion-U",
    "JavaScript framework",
    "reactive programming",
  ],

  // ── Authorship & Publisher ────────────────────────────────────
  authors: [{ name: "Motion-U Club", url: BASE_URL }],
  creator: "Motion-U",
  publisher: "Motion-U Club",
  category: "Education",

  // ── Canonical & Alternates ────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────
  openGraph: {
    title: "Motion-U | Full-Stack Hero Course",
    description:
      "Master Vue 3.4, PocketBase, TypeScript & Vite. Build lean, reactive full-stack machines using the fastest primitives in the ecosystem.",
    url: BASE_URL,
    siteName: "Motion-U",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Motion-U Full-Stack Hero Course — Vue, PocketBase, TypeScript, Vite",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Motion-U | Full-Stack Hero Course",
    description:
      "Master Vue 3.4, PocketBase, TypeScript & Vite. Build production-ready full-stack apps.",
    site: "@motionuclub",      // ← replace with your handle
    creator: "@motionuclub",   // ← replace with your handle
    images: [OG_IMAGE],
  },

  // ── Verification ──────────────────────────────────────────────
  // Get your token at: https://search.google.com/search-console
  verification: {
    google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_TOKEN",
    // yandex: "...",
    // bing: "...",
  },

  // ── Misc ──────────────────────────────────────────────────────
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  applicationName: "Motion-U",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,   // allow zoom for accessibility
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131318" },
    { media: "(prefers-color-scheme: light)", color: "#131318" },
  ],
};

// ── JSON-LD Structured Data ───────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course`,
      name: "Full-Stack Hero Course",
      description:
        "Master Vue 3.4, PocketBase, TypeScript & Vite. Build lean, reactive full-stack apps using the fastest primitives in the modern web ecosystem.",
      url: BASE_URL,
      provider: {
        "@type": "Organization",
        name: "Motion-U Club",
        url: BASE_URL,
      },
      educationalLevel: "Intermediate",
      teaches: ["Vue.js", "PocketBase", "TypeScript", "Vite", "Tailwind CSS"],
      inLanguage: "en",
      courseMode: "online",
      isAccessibleForFree: false,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        inLanguage: "en",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Motion-U Club",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
      sameAs: [
        // Add your social profiles:
        // "https://twitter.com/motionuclub",
        // "https://github.com/motionuclub",
        // "https://youtube.com/@motionuclub",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Motion-U",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} scroll-smooth`}
    >
      <head>
        {/* JSON-LD Structured Data — read by Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect — speeds up font loading → better Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* PWA manifest — optional but improves Google recognition */}
        {/* <link rel="manifest" href="/manifest.json" /> */}

        {/* Favicon variants */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <CanvasBackground />
        <CustomCursor />
        <ScrollProgress />

        <main className="relative z-10">{children}</main>

        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </body>
    </html>
  );
}