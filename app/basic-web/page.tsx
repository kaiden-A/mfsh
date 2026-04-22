// app/basic-web/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Types
interface Attribute {
  name: string
  el: string
  desc: string
}

interface EventItem {
  ev: string
  when: string
  use: string
}

interface ConceptCard {
  icon: string
  title: string
  desc: string
}

interface TipCard {
  title: string
  desc: string
}

export default function BasicWebDevPage() {
  // Navigation state
  const [active, setActive] = useState<'outcomes' | 'html' | 'css' | 'tips'>('outcomes')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Tab states
  const [rt, setRt] = useState(0)
  const [ht, setHt] = useState(0)
  
  // Demo states
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('')
  const [joke, setJoke] = useState('')
  const [jokeLoading, setJokeLoading] = useState(false)
  const [jokeError, setJokeError] = useState('')
  
  // Refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])
  
  // Scroll to section
  const goToSection = (id: 'outcomes' | 'html' | 'css' | 'tips') => {
    setActive(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Fetch joke
  const fetchJoke = async () => {
    setJokeLoading(true)
    setJokeError('')
    setJoke('')
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setJoke(data.joke)
    } catch (err) {
      setJokeError('Could not fetch — check your internet connection.')
    } finally {
      setJokeLoading(false)
    }
  }
  
  // Scroll spy
  useEffect(() => {
    const ids = ['outcomes', 'html', 'css', 'tips']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as typeof active
            if (id && ids.includes(id)) setActive(id)
          }
        })
      },
      { rootMargin: '-25% 0px -60% 0px' }
    )
    
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        sectionRefs.current[id] = el
        observer.observe(el)
      }
    })
    
    return () => observer.disconnect()
  }, [])
  
  // Data
  const attrs: Attribute[] = [
    { name: 'id', el: 'Global', desc: 'Unique identifier — used for CSS & JS targeting' },
    { name: 'class', el: 'Global', desc: 'Groups elements for shared CSS styles' },
    { name: 'style', el: 'Global', desc: 'Inline CSS (overrides external stylesheets)' },
    { name: 'hidden', el: 'Global', desc: 'Hides element without removing it from the DOM' },
    { name: 'disabled', el: 'button, input, select…', desc: 'Prevents the user from interacting with the element' },
    { name: 'src', el: 'img, audio, video…', desc: 'URL of the embedded content' },
    { name: 'href', el: 'a, link', desc: 'URL of the linked resource' },
    { name: 'alt', el: 'img', desc: 'Fallback text for screen readers & broken images' },
    { name: 'loading="lazy"', el: 'img, iframe', desc: 'Defers loading until element is near the viewport' },
  ]
  
  const events: EventItem[] = [
    { ev: 'onclick / @click', when: 'User clicks the element', use: 'Button actions, toggles' },
    { ev: 'onsubmit / @submit', when: 'Form is submitted', use: 'Validate and send form data' },
    { ev: 'onchange / @change', when: 'Input value changes (on blur)', use: 'Dropdowns, checkboxes' },
    { ev: 'oninput / @input', when: 'Input changes immediately', use: 'Real-time search, char count' },
    { ev: 'onkeydown / @keydown', when: 'A keyboard key is pressed', use: 'Keyboard shortcuts, validation' },
    { ev: 'onmouseover / @mouseover', when: 'Mouse enters the element', use: 'Tooltips, hover highlights' },
    { ev: 'onfocus / @focus', when: 'Element receives focus', use: 'Highlight active input field' },
    { ev: 'onblur / @blur', when: 'Element loses focus', use: 'Validate field on exit' },
    { ev: 'onscroll / @scroll', when: 'User scrolls the page', use: 'Infinite scroll, sticky nav' },
  ]

  const concepts: ConceptCard[] = [
    { icon: '📦', title: 'ref()', desc: 'Wraps a primitive into a reactive reference. Access via .value in JS.' },
    { icon: '🗂️', title: 'reactive()', desc: 'Makes an entire object reactive. Properties tracked deeply.' },
    { icon: '🔁', title: 'computed()', desc: 'Derives a value from reactive data. Recalculates automatically.' },
    { icon: '👁️', title: 'watch()', desc: 'Runs a side effect when a reactive value changes.' },
  ]

  const tips: TipCard[] = [
    { title: '🖐️ Hands-On First', desc: 'Start each module with a 5-minute coding challenge before theory.' },
    { title: '🌍 Real-World Context', desc: 'Connect concepts to production examples.' },
    { title: '👥 Peer Code Review', desc: 'Swap screens for 3-minute feedback after exercises.' },
    { title: '❓ Q&A Breaks', desc: 'Allocate time after each outcome for questions.' },
    { title: '⚠️ Anticipate Pitfalls', desc: 'Watch for reactivity loss, router mismatches, CORS errors.' },
    { title: '💬 Feedback Loop', desc: 'End sessions with "What will you build tomorrow?"' },
  ]

  // Sidebar content (reusable for desktop + mobile)
  const SidebarContent = () => (
    <>
      <div className="mb-6">
        <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest mb-2 pl-2">Outcomes</div>
        {[
          { label: '1.1 Reactivity', id: 'outcomes' as const },
          { label: '1.2 Frontend Dev', id: 'outcomes' as const },
          { label: '1.3 Routing', id: 'outcomes' as const },
          { label: '1.4 Fetch API', id: 'outcomes' as const },
        ].map((link, i) => (
          <button
            key={`outcome-${i}`}
            onClick={() => goToSection(link.id)}
            className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all w-full text-left ${
              active === link.id
                ? 'bg-[var(--color-lime)]/10 text-[var(--color-lime)] font-semibold'
                : 'text-[var(--color-muted)] hover:bg-[var(--color-dark3)] hover:text-[var(--color-text)]'
            }`}
          >
            <span className={`w-1.25 h-1.25 rounded-full bg-current flex-shrink-0 ${active === link.id ? 'opacity-100' : 'opacity-35'}`} />
            {link.label}
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest mb-2 pl-2">HTML</div>
        {[
          { label: 'What is HTML?', id: 'html' as const },
          { label: 'Tags & Structure', id: 'html' as const },
          { label: 'Attributes', id: 'html' as const },
          { label: 'Events', id: 'html' as const },
        ].map((link, i) => (
          <button
            key={`html-${i}`}
            onClick={() => goToSection(link.id)}
            className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all w-full text-left ${
              active === link.id
                ? 'bg-[var(--color-lime)]/10 text-[var(--color-lime)] font-semibold'
                : 'text-[var(--color-muted)] hover:bg-[var(--color-dark3)] hover:text-[var(--color-text)]'
            }`}
          >
            <span className={`w-1.25 h-1.25 rounded-full bg-current flex-shrink-0 ${active === link.id ? 'opacity-100' : 'opacity-35'}`} />
            {link.label}
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest mb-2 pl-2">CSS</div>
        {[
          { label: 'Selectors', id: 'css' as const },
          { label: 'Tailwind CSS', id: 'css' as const },
        ].map((link, i) => (
          <button
            key={`css-${i}`}
            onClick={() => goToSection(link.id)}
            className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all w-full text-left ${
              active === link.id
                ? 'bg-[var(--color-lime)]/10 text-[var(--color-lime)] font-semibold'
                : 'text-[var(--color-muted)] hover:bg-[var(--color-dark3)] hover:text-[var(--color-text)]'
            }`}
          >
            <span className={`w-1.25 h-1.25 rounded-full bg-current flex-shrink-0 ${active === link.id ? 'opacity-100' : 'opacity-35'}`} />
            {link.label}
          </button>
        ))}
      </div>
      
      <div>
        <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest mb-2 pl-2">Day 1</div>
        <button
          onClick={() => goToSection('tips')}
          className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all w-full text-left ${
            active === 'tips'
              ? 'bg-[var(--color-lime)]/10 text-[var(--color-lime)] font-semibold'
              : 'text-[var(--color-muted)] hover:bg-[var(--color-dark3)] hover:text-[var(--color-text)]'
          }`}
        >
          <span className={`w-1.25 h-1.25 rounded-full bg-current flex-shrink-0 ${active === 'tips' ? 'opacity-100' : 'opacity-35'}`} />
          Facilitation Tips
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-[var(--color-text)] font-[var(--sans)]">
      {/* Navigation */}
      <Navbar />

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-16 right-4 z-50 p-2.5 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg shadow-lg"
        aria-label="Toggle navigation menu"
      >
        <span className="material-symbols-outlined text-[var(--color-lime)]">
          {mobileMenuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 bg-[var(--color-dark2)] border-b border-[var(--color-outline)] max-h-[60vh] overflow-y-auto transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="p-4">
          <SidebarContent />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] max-w-[1120px] mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-7 px-4 pb-8 pl-7 border-r border-[var(--color-outline)]">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="py-8 px-4 md:py-12 md:px-8 lg:px-12 pb-20 md:pl-14 max-w-full md:max-w-[800px] mx-auto w-full">
          {/* Page Header */}
          <header className="mb-10 md:mb-14 pb-8 md:pb-10 border-b border-[var(--color-outline)]">
            <div className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-lime)] tracking-widest uppercase mb-3 md:mb-4 flex items-center gap-3 after:content-[''] after:h-px after:flex-1 after:bg-[var(--color-outline)]">
              Day 1 · Module Overview
            </div>
            <h1 className="font-[var(--sans)] text-2xl md:text-[clamp(2rem,4vw,2.9rem)] font-bold leading-tight tracking-tight mb-2 md:mb-3">
              Basic Web Development<br className="hidden sm:inline" />
              <em className="not-italic text-[var(--color-lime)]">with Vue.js</em>
            </h1>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              A structured introduction to reactivity, frontend architecture, client-side routing, and API integration — using real Vue 3, HTML, and CSS.
            </p>
            
            {/* Progress Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 md:p-5 mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-[var(--mono)] text-xs text-[var(--color-muted)] tracking-widest uppercase mb-2">Course Progress</div>
                <div className="h-1 bg-[var(--color-dark3)] rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-[var(--color-lime)] rounded-full shadow-[0_0_8px_rgba(185,211,0,0.4)]" />
                </div>
                <div className="flex flex-wrap justify-between gap-1 mt-2 text-xs">
                  <span className="font-[var(--mono)] text-[var(--color-muted)]">Module 1</span>
                  <span className="font-[var(--mono)] text-[var(--color-muted)]">Module 2</span>
                  <span className="font-[var(--mono)] text-[var(--color-muted)]">Module 3</span>
                  <span className="font-[var(--mono)] text-[var(--color-muted)]">Module 4</span>
                </div>
              </div>
              <div className="font-[var(--sans)] text-2xl md:text-3xl font-bold text-[var(--color-lime)] whitespace-nowrap">25%</div>
            </div>
          </header>

          {/* ══ OUTCOMES ══ */}
          <section id="outcomes" className="mb-12 md:mb-16 scroll-mt-24">
            <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
              <span className="font-[var(--mono)] text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] border border-[var(--color-outline)] py-1 px-2 rounded whitespace-nowrap mt-0.5">Module 1</span>
              <div>
                <h2 className="font-[var(--sans)] text-lg md:text-xl font-bold leading-tight tracking-tight mb-0.5">Learning Outcomes</h2>
                <p className="text-sm text-[var(--color-muted)]">What you'll understand and build by the end of Day 1.</p>
              </div>
            </div>

            {/* 1.1 Reactivity */}
            <div>
              <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">1.1 — Understanding Reactivity in a Web App</h3>
              <div className="prose">
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  <strong>Reactivity</strong> means the UI automatically updates when data changes — no manual DOM manipulation needed. Vue 3 achieves this through a proxy-based system that watches your data and re-renders only what changed.
                </p>
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  The core idea is <strong>data binding</strong>: connect a variable to a piece of the UI, and they stay in sync at all times.
                </p>
              </div>

              {/* Concept Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 md:my-5">
                {concepts.map((card, i) => (
                  <div key={`concept-${i}`} className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 transition-all hover:border-[var(--color-lime)] hover:shadow-[0_0_0_1px_rgba(185,211,0,0.12)]">
                    <div className="text-lg mb-1">{card.icon}</div>
                    <h4 className="text-sm font-semibold mb-1 text-[var(--color-text)]">{card.title}</h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Callout */}
              <div className="border-l-3 border-[var(--color-purple)] bg-[var(--color-purple)]/5 rounded-r-lg py-2.5 px-3 my-5 md:my-6">
                <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-purple)] tracking-widest uppercase mb-1">⚠️ Reactivity Caveat</div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed m-0">
                  Destructuring a <code className="font-[var(--mono)] text-xs md:text-sm bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded break-all">reactive()</code> object loses reactivity. Use <code className="font-[var(--mono)] text-xs md:text-sm bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded break-all">toRefs()</code> to safely extract individual properties while keeping them reactive.
                </p>
              </div>

              {/* Demo Box - Counter */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-4 md:my-5">
                <div className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)] py-2 px-4 flex items-center justify-between">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)]">Live Demo — Reactivity with ref()</span>
                  <span className="font-[var(--mono)] text-xs bg-[var(--color-lime)]/10 text-[var(--color-lime)] px-2 py-0.5 rounded-full font-semibold border border-[var(--color-lime)]/20">Vue 3 · try it!</span>
                </div>
                <div className="p-4 md:p-6">
                  <span className="font-[var(--sans)] text-4xl md:text-5xl font-bold text-[var(--color-lime)] block text-center my-2">{count}</span>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    <button 
                      onClick={() => setCount(c => c - 1)}
                      className="font-[var(--sans)] text-sm font-semibold bg-[var(--color-dark4)] text-[var(--color-text)] border border-[var(--color-outline)] py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-opacity hover:opacity-85 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      − Decrement
                    </button>
                    <button 
                      onClick={() => setCount(c => c + 1)}
                      className="font-[var(--sans)] text-sm font-semibold bg-[var(--color-lime)] text-[var(--color-dark)] border-none py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-opacity hover:opacity-85 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      + Increment
                    </button>
                    <button 
                      onClick={() => setCount(0)}
                      className="font-[var(--sans)] text-sm font-semibold bg-[var(--color-purple)]/12 text-[var(--color-purple)] border border-[var(--color-purple)]/30 py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-opacity hover:opacity-85 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="text-center text-sm text-[var(--color-muted)] mt-2">
                    Computed double: <strong>{count * 2}</strong> — updates automatically
                  </p>
                </div>
              </div>

              {/* Code Block - Responsive */}
              <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">Counter.vue</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                  <code className="whitespace-pre break-normal">
{`<script setup>
    import { ref, computed } from 'vue'

    // ref() creates a reactive number
    const count = ref(0)

    // computed() derives a value automatically
    const doubled = computed(() => count.value * 2)
</script>

<template>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubled }}</p>
    <button @click="count++">Increment</button>
    <button @click="count = 0">Reset</button>
</template>`}
                  </code>
                </pre>
              </div>

              {/* Activity */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg py-3 px-4 my-4 md:my-5">
                <div className="flex items-center gap-1 font-[var(--mono)] text-xs font-bold tracking-widest uppercase text-[var(--color-yellow)] mb-2">🧑‍💻 Activities</div>
                <ul className="pl-5 space-y-1">
                  <li className="text-sm leading-relaxed text-[var(--color-muted)]">Create a component using <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">ref()</code> to track a user's name input in real-time.</li>
                  <li className="text-sm leading-relaxed text-[var(--color-muted)]">Use <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">computed()</code> to show the character count of the name.</li>
                  <li className="text-sm leading-relaxed text-[var(--color-muted)]">Try destructuring a <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">reactive()</code> object — see what breaks, then fix it with <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">toRefs()</code>.</li>
                </ul>
              </div>

              <hr className="border-none border-t border-[var(--color-outline)] my-8 md:my-10" />
            </div>

            {/* 1.2 Frontend Dev */}
            <div>
              <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">1.2 — Developing a Frontend App with HTML, CSS & JavaScript</h3>
              <div className="prose">
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  Vue is a <strong>progressive framework</strong> — you can drop it into a single HTML file, or build a full Single-File Component (SFC) app. An SFC (<code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">.vue</code> file) keeps your template, script, and styles all in one place.
                </p>
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  Vue's template syntax extends plain HTML with directives like <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">v-for</code> (loops), <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">v-if</code> (conditionals), and <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">v-model</code> (two-way binding).
                </p>
              </div>

              {/* Demo - v-model */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-4 md:my-5">
                <div className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)] py-2 px-4 flex items-center justify-between">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)]">Live Demo — v-model two-way binding</span>
                  <span className="font-[var(--mono)] text-xs bg-[var(--color-lime)]/10 text-[var(--color-lime)] px-2 py-0.5 rounded-full font-semibold border border-[var(--color-lime)]/20">Vue 3 · try it!</span>
                </div>
                <div className="p-4 md:p-6">
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type your name here…"
                    className="font-[var(--sans)] text-sm border border-[var(--color-outline)] rounded-lg py-2.5 px-3 bg-[var(--color-dark)] text-[var(--color-text)] w-full mb-2 outline-none transition border-color focus:border-[var(--color-lime)] min-h-[44px]"
                  />
                  <p className="text-sm">
                    Hello, <strong>{username || 'stranger'}</strong>! 👋
                  </p>
                </div>
              </div>

              {/* Code Block - CardList */}
              <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">CardList.vue — Single-File Component</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                  <code className="whitespace-pre break-normal">
{`<script setup>
    // defineProps receives data from a parent component
    const props = defineProps({ items: Array })
</script>

<template>
  <div class="card-grid">
    <!-- v-for loops over an array -->
    <article v-for="item in items" :key="item.id">
      {{ item.title }}
    </article>
  </div>
</template>

<!-- scoped: styles only apply to this component -->
<style scoped>
.card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>`}
                  </code>
                </pre>
              </div>

              <hr className="border-none border-t border-[var(--color-outline)] my-8 md:my-10" />
            </div>

            {/* 1.3 Routing - Tabs */}
            <div>
              <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">1.3 — How Routing Works</h3>
              <div className="prose">
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  In a <strong>Single-Page Application (SPA)</strong>, the browser never fully reloads. Vue Router intercepts navigation and swaps out the visible component — giving users a fast, app-like experience.
                </p>
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  You define <strong>routes</strong> (URL → component mappings), place <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;RouterView /&gt;</code> where the matched component should render, and use <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;RouterLink&gt;</code> for navigation instead of plain <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;a&gt;</code> tags.
                </p>
              </div>

              {/* Tabs - Scrollable on mobile */}
              <div className="my-4 md:my-5">
                <div className="flex border-b border-[var(--color-outline)] gap-0 overflow-x-auto scrollbar-hide">
                  {['Route Config', 'Navigation Guard', 'In a Component'].map((label, i) => (
                    <button
                      key={`rt-tab-${i}`}
                      onClick={() => setRt(i)}
                      className={`font-[var(--sans)] text-sm font-medium py-2 px-4 border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${
                        rt === i 
                          ? 'text-[var(--color-lime)] border-b-[var(--color-lime)] font-semibold' 
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)] border-b-transparent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                {/* Tab Panels */}
                <div className={rt === 0 ? 'block' : 'hidden'}>
                  <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                    <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                      <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">router/index.js</span>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                    </div>
                    <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                      <code className="whitespace-pre break-normal">
{`// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import UserView    from '../views/UserView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/user/:id',
    component: UserView,
    meta: { requiresAuth: true },
    children: [
      { path: 'profile', component: ProfileView }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className={rt === 1 ? 'block' : 'hidden'}>
                  <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                    <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                      <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)]">Navigation Guard</span>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                    </div>
                    <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                      <code className="whitespace-pre break-normal">
{`// Runs before every route change
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className={rt === 2 ? 'block' : 'hidden'}>
                  <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                    <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                      <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)]">In a Component</span>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                    </div>
                    <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                      <code className="whitespace-pre break-normal">
{`<script setup>
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()
    const route  = useRoute()

    console.log(route.params.id)

    const goHome = () => router.push('/')
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterView />
</template>`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <hr className="border-none border-t border-[var(--color-outline)] my-8 md:my-10" />
            </div>

            {/* 1.4 Fetch API */}
            <div>
              <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">1.4 — Making API Requests with the Fetch API</h3>
              <div className="prose">
                <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                  The <strong>Fetch API</strong> is built into the browser — no library needed. It returns a <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">Promise</code>, so you use <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">async/await</code> to handle responses. Always manage loading and error states so users never see a blank screen.
                </p>
              </div>

              {/* Demo - Fetch Joke */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-4 md:my-5">
                <div className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)] py-2 px-4 flex items-center justify-between">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)]">Live Demo — Fetch a random joke</span>
                  <span className="font-[var(--mono)] text-xs bg-[var(--color-lime)]/10 text-[var(--color-lime)] px-2 py-0.5 rounded-full font-semibold border border-[var(--color-lime)]/20">Fetch API · try it!</span>
                </div>
                <div className="p-4 md:p-6">
                  <button 
                    onClick={fetchJoke} 
                    disabled={jokeLoading}
                    className="font-[var(--sans)] text-sm font-semibold bg-[var(--color-lime)] text-[var(--color-dark)] border-none py-2 px-4 rounded-lg cursor-pointer transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] w-full sm:w-auto"
                  >
                    {jokeLoading ? 'Loading…' : '🎲 Fetch a Joke'}
                  </button>
                  {jokeError && (
                    <p className="text-[var(--color-purple)] mt-3 text-sm">{jokeError}</p>
                  )}
                  {joke && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{joke}</p>
                  )}
                </div>
              </div>

              {/* Code Block - DataFetch */}
              <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                  <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">DataFetch.vue — GET & POST patterns</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                  <code className="whitespace-pre break-normal">
{`<script setup>
import { ref } from 'vue'

const data    = ref(null)
const loading = ref(false)
const error   = ref(null)

// ── GET Request ──────────────────────────────────────
const fetchData = async () => {
  loading.value = true
  error.value   = null
  try {
    const res = await fetch('https://api.example.com/posts')
    if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`)
    data.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// ── POST Request ─────────────────────────────────────
const submitForm = async (formData) => {
  const res = await fetch('/api/submit', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(formData)
  })
  return res.json()
}
</script>

<template>
  <div v-if="loading">Loading…</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <ul v-else>
    <li v-for="post in data" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* ══ HTML ══ */}
          <section id="html" className="mb-12 md:mb-16 scroll-mt-24">
            <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
              <span className="font-[var(--mono)] text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] border border-[var(--color-outline)] py-1 px-2 rounded whitespace-nowrap mt-0.5">Refresher</span>
              <div>
                <h2 className="font-[var(--sans)] text-lg md:text-xl font-bold leading-tight tracking-tight mb-0.5">HTML — HyperText Markup Language</h2>
                <p className="text-sm text-[var(--color-muted)]">The skeleton of every web page.</p>
              </div>
            </div>

            <div className="prose">
              <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                HTML is the standard language for structuring web content. Elements are written as <strong>tags</strong>, and browsers use them to know what kind of content to display — headings, paragraphs, images, links, and so on.
              </p>
            </div>

            {/* Code - Minimal HTML */}
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">index.html — Minimal page</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Page Title</title>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`}
                </code>
              </pre>
            </div>

            {/* Callout */}
            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg py-2.5 px-3 my-5 md:my-6">
              <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-lime)] tracking-widest uppercase mb-1">💡 How it renders</div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed m-0">
                HTML renders top-to-bottom. <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code> signals HTML5. <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;head&gt;</code> holds metadata (invisible to users). <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;body&gt;</code> holds visible content. Headings go from <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;h1&gt;</code> (most important) to <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;h6&gt;</code> (least important).
              </p>
            </div>

            {/* Page Structure Code */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">Page Structure</h3>
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">layout.html</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`<header>
  <h1>Company Name</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<main>
  <h1>Page Title</h1>
  <p>Content goes here.</p>
</main>

<footer>
  <p>© 2025 Company Name</p>
</footer>`}
                </code>
              </pre>
            </div>

            {/* Common Tags - Tabs */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">Common Tags</h3>
            <div className="my-4 md:my-5">
              <div className="flex border-b border-[var(--color-outline)] gap-0 overflow-x-auto scrollbar-hide">
                {['Lists', 'Links & Images', 'Tables', 'Forms'].map((label, i) => (
                  <button
                    key={`ht-tab-${i}`}
                    onClick={() => setHt(i)}
                    className={`font-[var(--sans)] text-sm font-medium py-2 px-4 border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${
                      ht === i 
                        ? 'text-[var(--color-lime)] border-b-[var(--color-lime)] font-semibold' 
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)] border-b-transparent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Tab Panels */}
              <div className={ht === 0 ? 'block' : 'hidden'}>
                <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                  <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                    <code className="whitespace-pre break-normal">
{`<!-- Unordered list (bullet points) -->
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>

<!-- Ordered list (numbered) -->
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className={ht === 1 ? 'block' : 'hidden'}>
                <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                  <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                    <code className="whitespace-pre break-normal">
{`<!-- target="_blank" opens in a new tab -->
<a href="https://vuejs.org" target="_blank">Vue.js Docs</a>

<!-- alt text shown if image fails to load -->
<img src="photo.jpg" alt="A descriptive label" loading="lazy"/>

<!-- Responsive image with multiple sizes -->
<picture>
  <source srcset="photo-small.jpg" media="(max-width: 600px)"/>
  <img src="photo-large.jpg" alt="Photo"/>
</picture>`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className={ht === 2 ? 'block' : 'hidden'}>
                <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                  <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                    <code className="whitespace-pre break-normal">
{`<table>
  <thead>
    <tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Jill</td><td>Smith</td><td>50</td></tr>
  </tbody>
</table>`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className={ht === 3 ? 'block' : 'hidden'}>
                <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
                  <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                    <code className="whitespace-pre break-normal">
{`<form action="/submit" method="POST">
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname"/>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email"/>

  <select name="role">
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
  </select>

  <button type="submit">Submit</button>
</form>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Attributes Table - Scrollable */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">HTML Attributes</h3>
            <div className="prose"><p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">Attributes add extra configuration to elements. They always appear inside the opening tag.</p></div>
            <div className="overflow-x-auto my-4 md:my-5 border border-[var(--color-outline)] rounded-lg">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)]">
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left whitespace-nowrap">Attribute</th>
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left whitespace-nowrap">Elements</th>
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {attrs.map((a) => (
                    <tr key={a.name} className="border-b border-[var(--color-outline)] last:border-b-0 hover:bg-[var(--color-dark3)] transition">
                      <td className="font-[var(--mono)] text-sm text-[var(--color-lime)] whitespace-nowrap py-2 px-3 md:px-4">{a.name}</td>
                      <td className="text-[var(--color-muted)] text-sm py-2 px-3 md:px-4">{a.el}</td>
                      <td className="text-[var(--color-muted)] text-sm py-2 px-3 md:px-4">{a.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Events Table - Scrollable */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">DOM Events</h3>
            <div className="prose"><p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">Events are actions that happen in the browser — a click, a keypress, a form submission. You can listen for them and run code in response.</p></div>
            <div className="overflow-x-auto my-4 md:my-5 border border-[var(--color-outline)] rounded-lg">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)]">
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left whitespace-nowrap">Event</th>
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left">Triggered when…</th>
                    <th className="font-[var(--mono)] text-xs font-bold text-[var(--color-muted)] tracking-widest uppercase py-2 px-3 md:px-4 text-left">Common use</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.ev} className="border-b border-[var(--color-outline)] last:border-b-0 hover:bg-[var(--color-dark3)] transition">
                      <td className="font-[var(--mono)] text-sm text-[var(--color-lime)] whitespace-nowrap py-2 px-3 md:px-4">{e.ev}</td>
                      <td className="text-[var(--color-muted)] text-sm py-2 px-3 md:px-4">{e.when}</td>
                      <td className="text-[var(--color-muted)] text-sm py-2 px-3 md:px-4">{e.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Events Code Example */}
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">events.html — Keyboard listener example</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`<input
  type="text"
  placeholder="Press any key…"
  onkeydown="document.getElementById('out').textContent = 'Key: ' + event.key"
/>
<p id="out"></p>`}
                </code>
              </pre>
            </div>
          </section>

          {/* ══ CSS ══ */}
          <section id="css" className="mb-12 md:mb-16 scroll-mt-24">
            <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
              <span className="font-[var(--mono)] text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] border border-[var(--color-outline)] py-1 px-2 rounded whitespace-nowrap mt-0.5">Refresher</span>
              <div>
                <h2 className="font-[var(--sans)] text-lg md:text-xl font-bold leading-tight tracking-tight mb-0.5">CSS — Cascading Style Sheets</h2>
                <p className="text-sm text-[var(--color-muted)]">Control how your HTML looks and feels.</p>
              </div>
            </div>

            <div className="prose">
              <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                CSS describes the <strong>presentation</strong> of HTML. You can attach styles via a linked <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">.css</code> file, a <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">&lt;style&gt;</code> block inside HTML, or directly via a <code className="font-[var(--mono)] text-xs bg-[var(--color-dark3)] border border-[var(--color-outline)] text-[var(--color-lime)] px-1 py-0.5 rounded">style</code> attribute on an element.
              </p>
            </div>

            {/* CSS Code */}
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">style.css — Linked stylesheet</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`/* Link in HTML: <link rel="stylesheet" href="style.css"> */

body {
  background-color: lightblue;
  font-family: sans-serif;
}

h1 {
  color: white;
  text-align: center;
}

/* Select by class */
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* Select by id */
#main-title {
  font-size: 2rem;
  font-weight: bold;
}`}
                </code>
              </pre>
            </div>

            {/* CSS Selectors */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">CSS Selectors</h3>
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">selectors.css</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`/* All <p> elements */
p { color: red; }

/* Direct children only */
.parent > .child { color: blue; }

/* Hover state */
button:hover { background: green; }

/* First and last child */
li:first-child { font-weight: bold; }
li:last-child  { color: gray; }

/* Pseudo-elements — generated content */
.card::before {
  content: '★ ';
  color: gold;
}

/* CSS Custom Properties — define once, use everywhere */
:root {
  --primary:   #2d6a4f;
  --font-size: 16px;
}
h1 { color: var(--primary); }
p  { font-size: var(--font-size); }`}
                </code>
              </pre>
            </div>

            {/* Tailwind CSS */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">Tailwind CSS</h3>
            <div className="prose">
              <p className="mb-3 md:mb-4 text-sm leading-relaxed text-[var(--color-text)]">
                Tailwind is a <strong>utility-first CSS framework</strong>. Instead of writing custom CSS rules, you apply small pre-built classes directly in your HTML markup. This keeps styles co-located with your structure and speeds up development significantly.
              </p>
            </div>

            {/* Tailwind Code */}
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">tailwind-example.html</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`<!-- Traditional CSS approach -->
<div class="card">Hello</div>
<!-- Then write: .card { padding: 1rem; background: white; } -->

<!-- Tailwind approach: classes do the work directly -->
<div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
  Hello
</div>

<!-- Responsive: md: applies on medium screens and up -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Dark mode support -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Adapts to system theme
</div>`}
                </code>
              </pre>
            </div>

            {/* Callout */}
            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg py-2.5 px-3 my-5 md:my-6">
              <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-lime)] tracking-widest uppercase mb-1">📚 Learn More</div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed m-0">
                Full Tailwind documentation at <strong>tailwindcss.com</strong>. Use the search to find any property — type "flex", "grid", "padding" and you'll immediately see the right utility class.
              </p>
            </div>
          </section>

          {/* ══ TIPS ══ */}
          <section id="tips" className="mb-12 md:mb-16 scroll-mt-24">
            <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
              <span className="font-[var(--mono)] text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] border border-[var(--color-outline)] py-1 px-2 rounded whitespace-nowrap mt-0.5">Day 1</span>
              <div>
                <h2 className="font-[var(--sans)] text-lg md:text-xl font-bold leading-tight tracking-tight mb-0.5">Facilitation Guide</h2>
                <p className="text-sm text-[var(--color-muted)]">Tips for instructors and session leads.</p>
              </div>
            </div>

            {/* Tips Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 md:mt-5">
              {tips.map((tip, i) => (
                <div key={`tip-${i}`} className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 transition-all hover:border-[var(--color-outline)]">
                  <h4 className="text-sm font-semibold mb-1 text-[var(--color-text)]">{tip.title}</h4>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Start Commands */}
            <h3 className="font-[var(--sans)] text-base font-semibold mt-6 md:mt-8 mb-2 text-[var(--color-text)]">Quick Start Commands</h3>
            <div className="my-4 md:my-5 rounded-lg overflow-hidden border border-[var(--color-outline)]">
              <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
                <span className="font-[var(--mono)] text-xs md:text-sm text-[var(--color-muted)] truncate">terminal</span>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs md:text-sm leading-relaxed overflow-x-auto m-0 tab-size-2">
                <code className="whitespace-pre break-normal">
{`# Create a new Vue 3 project (official scaffolding)
$ npm create vue@latest my-app
# Select: TypeScript ✓  Vue Router ✓  ESLint ✓

# Install dependencies and start dev server
$ cd my-app && npm install && npm run dev
# → http://localhost:5173

# Add Tailwind CSS to the project
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p`}
                </code>
              </pre>
            </div>

            {/* Resources Callout */}
            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg py-2.5 px-3 my-5 md:my-6">
              <div className="font-[var(--mono)] text-xs font-bold text-[var(--color-lime)] tracking-widest uppercase mb-1">📖 Resources</div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed m-0">
                <strong>Vue 3 Docs</strong>: vuejs.org/guide &nbsp;·&nbsp;
                <strong>Vue Router</strong>: router.vuejs.org &nbsp;·&nbsp;
                <strong>Tailwind CSS</strong>: tailwindcss.com &nbsp;·&nbsp;
                <strong>MDN Web Docs</strong>: developer.mozilla.org
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}