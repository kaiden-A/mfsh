// app/setup/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Types
interface SetupStep {
  id: string
  title: string
  icon: string
  description: string
  downloadUrl: string
  verifyCommand?: string
  tips: string[]
  imageAlt?: string
}

interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

interface SystemInfo {
  os: string
  nodeVersion: string | null
  npmVersion: string | null
  detected: boolean
}

export default function SetupGuidePage() {
  // Navigation state
  const [active, setActive] = useState<string>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 'vscode', label: 'Visual Studio Code installed', completed: false },
    { id: 'node', label: 'Node.js installed & verified', completed: false },
    { id: 'pocketbase', label: 'PocketBase downloaded', completed: false },
    { id: 'github', label: 'GitHub account created', completed: false },
  ])
  
  // System detection state
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    os: 'Unknown',
    nodeVersion: null,
    npmVersion: null,
    detected: false,
  })
  
  // Download tracking
  const [downloadedTools, setDownloadedTools] = useState<Record<string, boolean>>({})
  
  // Refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  // Setup steps data
  const setupSteps: SetupStep[] = [
    {
      id: 'vscode',
      title: 'Visual Studio Code',
      icon: '💻',
      description: 'A powerful, free code editor with extensions, debugging, and Git integration built-in.',
      downloadUrl: 'https://code.visualstudio.com/download',
      verifyCommand: 'code --version',
      tips: [
        'Install the "Vue Language Features" extension for Vue.js support',
        'Enable "Format on Save" in settings for consistent code style',
        'Use Ctrl+` (or Cmd+`) to open the integrated terminal',
      ],
      imageAlt: 'VSCode interface showing a Vue project',
    },
    {
      id: 'node',
      title: 'Node.js',
      icon: '🟢',
      description: 'JavaScript runtime built on Chrome\'s V8 engine. Essential for running build tools and local servers.',
      downloadUrl: 'https://nodejs.org/',
      verifyCommand: 'node -v && npm -v',
      tips: [
        'Always download the LTS (Long Term Support) version for stability',
        'Node.js includes npm (Node Package Manager) automatically',
        'Restart your terminal after installation to update PATH',
      ],
      imageAlt: 'Node.js logo with version output',
    },
    {
      id: 'pocketbase',
      title: 'PocketBase',
      icon: '🗄️',
      description: 'Open-source backend with SQLite, authentication, and REST API in a single executable file.',
      downloadUrl: 'https://github.com/pocketbase/pocketbase/releases',
      tips: [
        'Download the version matching your OS (Windows/macOS/Linux)',
        'Extract the executable to a folder you\'ll remember (e.g., ~/tools/pocketbase)',
        'Run with ./pocketbase serve to start the backend server',
      ],
      imageAlt: 'PocketBase admin dashboard',
    },
    {
      id: 'github',
      title: 'GitHub Account',
      icon: '🐙',
      description: 'Platform for version control, collaboration, and deploying your projects to the world.',
      downloadUrl: 'https://github.com/signup',
      tips: [
        'Use a professional email address for your account',
        'Enable two-factor authentication for security',
        'Generate an SSH key for passwordless Git operations',
        'Explore GitHub Student Developer Pack if you\'re eligible',
      ],
      imageAlt: 'GitHub profile setup page',
    },
  ]
  
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
  const goToSection = (id: string) => {
    setActive(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Toggle checklist item
  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }
  
  // Mark tool as downloaded
  const markDownloaded = (toolId: string) => {
    setDownloadedTools(prev => ({ ...prev, [toolId]: true }))
    // Also mark checklist as complete
    setChecklist(prev => prev.map(item => 
      item.id === toolId ? { ...item, completed: true } : item
    ))
  }
  
  // Detect system info (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent
      let os = 'Unknown'
      
      if (ua.includes('Win')) os = 'Windows'
      else if (ua.includes('Mac')) os = 'macOS'
      else if (ua.includes('Linux')) os = 'Linux'
      
      // Try to detect Node via a simple fetch to a local endpoint (won't work without backend)
      // Instead, we'll just show the OS and let users verify manually
      setSystemInfo({
        os,
        nodeVersion: null,
        npmVersion: null,
        detected: true,
      })
    }
  }, [])
  
  // Scroll spy for active section
  useEffect(() => {
    const ids = ['overview', 'vscode', 'node', 'pocketbase', 'github', 'troubleshooting']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
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
  
  // Calculate progress
  const completedSteps = checklist.filter(i => i.completed).length
  const progressPercent = Math.round((completedSteps / checklist.length) * 100)
  
  // Navigation sections
  const navSections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    ...setupSteps.map(s => ({ id: s.id, title: s.title, icon: s.icon })),
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' },
  ]
  
  // Sidebar content component
  const SidebarContent = () => (
    <nav className="space-y-1">
      {navSections.map((section) => (
        <button
          key={section.id}
          onClick={() => goToSection(section.id)}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all text-left ${
            active === section.id
              ? 'bg-[var(--color-lime)]/10 text-[var(--color-lime)] font-semibold'
              : 'text-[var(--color-muted)] hover:bg-[var(--color-dark3)] hover:text-[var(--color-text)]'
          }`}
        >
          <span className="text-lg">{section.icon}</span>
          {section.title}
        </button>
      ))}
      
      {/* Progress indicator in sidebar */}
      <div className="mt-6 pt-4 border-t border-[var(--color-outline)]">
        <div className="text-xs font-mono text-[var(--color-muted)] mb-2">Progress</div>
        <div className="h-1.5 bg-[var(--color-dark3)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-lime)] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-[var(--color-muted)] mt-1">
          {completedSteps}/{checklist.length} steps complete
        </div>
      </div>
    </nav>
  )
  
  // Download button component
  const DownloadButton = ({ url, toolId, label = 'Download' }: { url: string; toolId: string; label?: string }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => markDownloaded(toolId)}
      className={`inline-flex items-center gap-2 py-2 px-4 rounded font-medium transition ${
        downloadedTools[toolId]
          ? 'bg-[var(--color-lime)]/20 text-[var(--color-lime)] border border-[var(--color-lime)]/40 cursor-default'
          : 'bg-[var(--color-lime)] text-[var(--color-dark)] hover:opacity-90'
      }`}
    >
      {downloadedTools[toolId] ? (
        <>
          <span className="material-symbols-outlined text-sm">check_circle</span>
          Downloaded ✓
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-sm">download</span>
          {label}
        </>
      )}
    </a>
  )
  
  // Verification command component
  const VerifyCommand = ({ command, toolId }: { command: string; toolId: string }) => {
    const [copied, setCopied] = useState(false)
    
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    
    return (
      <div className="mt-4">
        <div className="text-xs font-mono text-[var(--color-muted)] mb-2">Verify installation:</div>
        <div className="flex items-center gap-2 bg-[var(--color-dark3)] rounded-lg p-3 font-mono text-xs">
          <code className="text-[var(--color-lime)] flex-1 break-all">{command}</code>
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-[var(--color-dark4)] rounded transition"
            title="Copy to clipboard"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
        <p className="text-xs text-[var(--color-muted)] mt-2">
          Run this in your terminal. You should see version numbers if installed correctly.
        </p>
      </div>
    )
  }
  
  // Tips component
  const TipsList = ({ tips }: { tips: string[] }) => (
    <div className="mt-4">
      <div className="text-xs font-mono text-[var(--color-muted)] mb-2">💡 Pro Tips:</div>
      <ul className="space-y-1.5">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm text-[var(--color-muted)] flex items-start gap-2">
            <span className="text-[var(--color-lime)] mt-0.5">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-[var(--color-text)] font-[var(--sans)]">
      <Navbar />

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-16 right-4 z-50 p-2.5 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-[var(--color-lime)]">
          {mobileMenuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 bg-[var(--color-dark2)] border-b border-[var(--color-outline)] max-h-[60vh] overflow-y-auto transition-transform ${
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
        <aside className="hidden md:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-7 px-4 border-r border-[var(--color-outline)]">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="py-8 px-4 md:py-12 md:px-8 lg:px-12 pb-20 md:pl-14 max-w-[800px] mx-auto w-full">
          
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-[var(--color-outline)]">
            <div className="font-[var(--mono)] text-xs text-[var(--color-lime)] tracking-widest uppercase mb-3">
              Getting Started
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              Development Environment Setup
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Follow this guide to install the essential tools for building Vue.js applications with PocketBase.
            </p>
            
            {/* Progress Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Setup Progress</span>
                <span className="text-lg font-bold text-[var(--color-lime)]">{progressPercent}%</span>
              </div>
              <div className="h-2 bg-[var(--color-dark3)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--color-lime)] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {checklist.map((item) => (
                  <label 
                    key={item.id}
                    className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border cursor-pointer transition ${
                      item.completed 
                        ? 'bg-[var(--color-lime)]/10 border-[var(--color-lime)]/40 text-[var(--color-lime)]' 
                        : 'bg-[var(--color-dark3)] border-[var(--color-outline)] text-[var(--color-muted)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklist(item.id)}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                      item.completed ? 'bg-[var(--color-lime)] border-[var(--color-lime)]' : 'border-[var(--color-outline)]'
                    }`}>
                      {item.completed && <span className="material-symbols-outlined text-[8px] text-[var(--color-dark)]">check</span>}
                    </span>
                    {item.label.split(' ')[0]}
                  </label>
                ))}
              </div>
            </div>
          </header>

          {/* ══ OVERVIEW ══ */}
          <section id="overview" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📋</span> Overview
            </h2>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                This guide walks you through setting up a complete development environment for building 
                modern web applications with <strong>Vue.js</strong> and <strong>PocketBase</strong>. 
                Each step includes download links, installation instructions, and verification commands.
              </p>
            </div>

            {/* System Info Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-5">
              <h4 className="font-semibold text-sm mb-3">🖥️ Your System</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-[var(--color-muted)] mb-1">Operating System</div>
                  <div className="font-mono text-[var(--color-lime)]">
                    {systemInfo.detected ? systemInfo.os : 'Detecting...'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-muted)] mb-1">Browser</div>
                  <div className="font-mono text-[var(--color-lime)]">
                    {navigator.userAgent.includes('Chrome') ? 'Chrome/Chromium' : 
                     navigator.userAgent.includes('Firefox') ? 'Firefox' :
                     navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-muted)] mt-3">
                Note: Node.js version detection requires terminal access. Use the verification commands below.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
              {setupSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => goToSection(step.id)}
                  className="flex items-start gap-3 p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition text-left group"
                >
                  <span className="text-2xl group-hover:scale-110 transition">{step.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-[var(--color-muted)] line-clamp-2">{step.description}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-5">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Estimated time:</strong> 15-20 minutes. All tools are free and open-source. 
                Restart your terminal after installing Node.js to ensure PATH updates take effect.
              </p>
            </div>
          </section>

          {/* ══ VSCODE ══ */}
          <section id="vscode" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>💻</span> Step 1: Visual Studio Code
            </h2>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              VSCode is a lightweight but powerful source code editor with built-in support for JavaScript, 
              TypeScript, Vue.js, and thousands of extensions.
            </p>

            {/* Download Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-5 my-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-base mb-1">Download VSCode</h4>
                  <p className="text-sm text-[var(--color-muted)]">Free • Windows, macOS, Linux</p>
                </div>
                <DownloadButton url="https://code.visualstudio.com/download" toolId="vscode" />
              </div>
              
              <VerifyCommand command="code --version" toolId="vscode" />
              <TipsList tips={[
                'Install the "Vue Language Features" extension for Vue.js support',
                'Enable "Format on Save" in settings for consistent code style',
                'Use Ctrl+` (or Cmd+`) to open the integrated terminal',
                'Try the "Live Server" extension for instant browser preview',
              ]} />
            </div>

            {/* Recommended Extensions */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">🔌 Recommended Extensions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Vue Language Features', publisher: 'Vue.js', desc: 'Syntax highlighting, IntelliSense' },
                  { name: 'ESLint', publisher: 'Microsoft', desc: 'Code linting and error checking' },
                  { name: 'Prettier', publisher: 'Prettier', desc: 'Automatic code formatting' },
                  { name: 'GitLens', publisher: 'GitKraken', desc: 'Enhanced Git blame and history' },
                ].map((ext, i) => (
                  <div key={i} className="p-3 bg-[var(--color-dark3)] rounded-lg border border-[var(--color-outline)]">
                    <div className="font-medium text-sm">{ext.name}</div>
                    <div className="text-xs text-[var(--color-muted)]">{ext.publisher}</div>
                    <div className="text-xs text-[var(--color-muted)] mt-1">{ext.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ NODE.JS ══ */}
          <section id="node" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🟢</span> Step 2: Node.js
            </h2>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Node.js allows you to run JavaScript outside the browser. It includes <strong>npm</strong> 
              (Node Package Manager) for installing libraries and tools.
            </p>

            {/* Download Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-5 my-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-base mb-1">Download Node.js LTS</h4>
                  <p className="text-sm text-[var(--color-muted)]">Recommended for most users • Includes npm</p>
                </div>
                <DownloadButton url="https://nodejs.org/" toolId="node" label="Download LTS" />
              </div>
              
              <VerifyCommand command="node -v && npm -v" toolId="node" />
              
              <div className="mt-4 p-3 bg-[var(--color-dark3)] rounded-lg border border-[var(--color-outline)]">
                <div className="text-xs font-mono text-[var(--color-muted)] mb-2">Expected output:</div>
                <pre className="font-mono text-xs text-[var(--color-lime)]">
{`v20.x.x
10.x.x`}
                </pre>
              </div>
              
              <TipsList tips={[
                'Always download the LTS (Long Term Support) version for stability',
                'Node.js includes npm (Node Package Manager) automatically',
                'Restart your terminal after installation to update PATH',
                'Use nvm (Node Version Manager) to switch between Node versions easily',
              ]} />
            </div>

            {/* Version Compatibility */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">📊 Version Compatibility</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)]">
                      <th className="text-left py-2 px-3 font-mono text-xs text-[var(--color-muted)]">Tool</th>
                      <th className="text-left py-2 px-3 font-mono text-xs text-[var(--color-muted)]">Min Version</th>
                      <th className="text-left py-2 px-3 font-mono text-xs text-[var(--color-muted)]">Recommended</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--color-outline)]">
                      <td className="py-2 px-3 font-medium">Node.js</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">18.x</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">20.x LTS</td>
                    </tr>
                    <tr className="border-b border-[var(--color-outline)]">
                      <td className="py-2 px-3 font-medium">npm</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">9.x</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">10.x</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Vue CLI / Vite</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">-</td>
                      <td className="py-2 px-3 font-mono text-[var(--color-lime)]">Latest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ══ POCKETBASE ══ */}
          <section id="pocketbase" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🗄️</span> Step 3: PocketBase
            </h2>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              PocketBase is a single-file backend with SQLite, authentication, file storage, and a 
              real-time REST API. No complex setup required.
            </p>

            {/* Download Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-5 my-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-base mb-1">Download PocketBase</h4>
                  <p className="text-sm text-[var(--color-muted)]">Open Source • Single executable</p>
                </div>
                <DownloadButton 
                  url="https://github.com/pocketbase/pocketbase/releases" 
                  toolId="pocketbase" 
                  label="Get Latest Release" 
                />
              </div>
              
              <div className="mt-4">
                <div className="text-xs font-mono text-[var(--color-muted)] mb-2">After download:</div>
                <pre className="font-mono text-xs text-[var(--color-lime)] bg-[var(--color-dark3)] p-3 rounded overflow-x-auto">
{`# Extract the downloaded file
# Navigate to the folder in terminal
cd ~/Downloads/pocketbase

# Start the server
./pocketbase serve

# Access the admin UI:
# → http://127.0.0.1:8090/_/`}
                </pre>
              </div>
              
              <TipsList tips={[
                'Download the version matching your OS (Windows/macOS/Linux)',
                'Extract the executable to a folder you\'ll remember (e.g., ~/tools/pocketbase)',
                'Run with ./pocketbase serve to start the backend server',
                'The admin UI is at http://127.0.0.1:8090/_/ — create your first admin account there',
              ]} />
            </div>

            {/* PocketBase Features */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '🗄️', title: 'SQLite Database', desc: 'File-based, zero-config, portable' },
                { icon: '🔐', title: 'Auth Built-in', desc: 'Email/password, OAuth, tokens' },
                { icon: '📁', title: 'File Storage', desc: 'Upload & serve files with rules' },
                { icon: '⚡', title: 'Realtime API', desc: 'WebSocket subscriptions included' },
              ].map((feature, i) => (
                <div key={i} className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg">
                  <div className="text-lg mb-1">{feature.icon}</div>
                  <div className="font-medium text-sm">{feature.title}</div>
                  <div className="text-xs text-[var(--color-muted)]">{feature.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ GITHUB ══ */}
          <section id="github" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🐙</span> Step 4: GitHub Account
            </h2>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              GitHub is the world's leading platform for version control, collaboration, and open-source development.
            </p>

            {/* Signup Card */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-5 my-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-base mb-1">Create GitHub Account</h4>
                  <p className="text-sm text-[var(--color-muted)]">Free tier includes unlimited public repos</p>
                </div>
                <DownloadButton url="https://github.com/signup" toolId="github" label="Sign Up Free" />
              </div>
              
              <TipsList tips={[
                'Use a professional email address for your account',
                'Enable two-factor authentication for security',
                'Generate an SSH key for passwordless Git operations',
                'Explore GitHub Student Developer Pack if you\'re eligible',
                'Create a new repository for each project you build',
              ]} />
            </div>

            {/* Git Setup Commands */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">⚙️ Configure Git Locally</h4>
              <pre className="font-mono text-xs text-[var(--color-lime)] bg-[var(--color-dark3)] p-3 rounded overflow-x-auto">
{`# Set your identity (use the email from your GitHub account)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set default branch name
git config --global init.defaultBranch main

# Verify configuration
git config --global --list`}
              </pre>
            </div>

            {/* SSH Key Setup */}
            <div className="mt-5 p-4 bg-[var(--color-dark3)] border border-[var(--color-outline)] rounded-lg">
              <h5 className="font-medium text-sm mb-2">🔑 Generate SSH Key (Recommended)</h5>
              <pre className="font-mono text-xs text-[var(--color-lime)] overflow-x-auto">
{`# Generate new SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start ssh-agent and add key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Then add it to GitHub: Settings → SSH and GPG keys → New SSH key`}
              </pre>
            </div>
          </section>

          {/* ══ TROUBLESHOOTING ══ */}
          <section id="troubleshooting" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔧</span> Troubleshooting
            </h2>

            <div className="space-y-4">
              {[
                {
                  issue: 'Command not found: node / npm / code',
                  solution: 'Restart your terminal or computer after installation. On Windows, ensure the installer added Node to your PATH. On macOS/Linux, try running source ~/.zshrc or source ~/.bash_profile.',
                },
                {
                  issue: 'PocketBase won\'t start / port already in use',
                  solution: 'Check if another instance is running. Use lsof -i :8090 (macOS/Linux) or netstat -ano | findstr :8090 (Windows) to find the process. Or start PocketBase on a different port: ./pocketbase serve --http=0.0.0.0:8091',
                },
                {
                  issue: 'Permission denied when running ./pocketbase',
                  solution: 'On macOS/Linux, make the file executable: chmod +x pocketbase. On Windows, right-click the .exe → Properties → Unblock if you see a security warning.',
                },
                {
                  issue: 'Git authentication fails',
                  solution: 'If using HTTPS, use a Personal Access Token instead of your password. Better yet, set up SSH keys for passwordless authentication.',
                },
                {
                  issue: 'Vue dev server won\'t start',
                  solution: 'Ensure Node.js is installed correctly (node -v). Try deleting node_modules and package-lock.json, then run npm install again. Check that your project\'s Node version matches the requirements.',
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg">
                  <h4 className="font-medium text-sm text-[var(--color-purple)] mb-2">❓ {item.issue}</h4>
                  <p className="text-sm text-[var(--color-muted)]">{item.solution}</p>
                </div>
              ))}
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-6">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Still stuck?</strong> Search the error message online, check the official docs, 
                or ask for help in community forums. Most setup issues have been solved before!
              </p>
            </div>
          </section>

          {/* ══ NEXT STEPS ══ */}
          <section className="pt-8 border-t border-[var(--color-outline)]">
            <h3 className="font-semibold mb-4">🎉 You're All Set!</h3>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              With your development environment ready, you can now start building Vue.js applications 
              backed by PocketBase. Here's what to do next:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { step: '1', title: 'Create Vue Project', cmd: 'npm create vue@latest my-app' },
                { step: '2', title: 'Start PocketBase', cmd: './pocketbase serve' },
                { step: '3', title: 'Connect & Build', cmd: 'npm run dev' },
              ].map((item) => (
                <div key={item.step} className="p-4 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg">
                  <div className="text-lg font-bold text-[var(--color-lime)] mb-2">{item.step}</div>
                  <div className="font-medium text-sm mb-1">{item.title}</div>
                  <code className="text-xs font-mono text-[var(--color-muted)] bg-[var(--color-dark3)] px-2 py-1 rounded block">
                    {item.cmd}
                  </code>
                </div>
              ))}
            </div>

            {/* Resources */}
            <h4 className="font-semibold text-sm mb-3">📚 Helpful Resources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Vue 3 Guide', url: 'https://vuejs.org/guide', desc: 'Official documentation' },
                { title: 'PocketBase Docs', url: 'https://pocketbase.io/docs', desc: 'Backend reference' },
                { title: 'Vite Config', url: 'https://vitejs.dev/config', desc: 'Build tool setup' },
                { title: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook', desc: 'Version control basics' },
              ].map((resource, i) => (
                <a 
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block"
                >
                  <div className="font-medium text-sm">{resource.title}</div>
                  <div className="text-xs text-[var(--color-muted)]">{resource.desc}</div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}