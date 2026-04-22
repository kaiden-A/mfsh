// app/pocketbase/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Types
interface PocketBaseRecord {
  id: string
  title: string
  description: string
  created: string
  collectionId: string
  collectionName: string
}

interface CodeBlock {
  title: string
  code: string
  language?: string
}

interface Section {
  id: string
  title: string
  icon: string
}

interface SimulatedPost extends PocketBaseRecord {
  isNew?: boolean
}

export default function PocketBasePage() {
  // Navigation state
  const [active, setActive] = useState<string>('intro')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Tab states
  const [codeTab, setCodeTab] = useState(0)
  
  // Simulation states - PocketBase CRUD
  const [posts, setPosts] = useState<SimulatedPost[]>([
    { id: '1', title: 'Getting Started with PocketBase', description: 'Learn the basics of this powerful backend solution.', created: new Date().toISOString(), collectionId: 'posts', collectionName: 'posts' },
    { id: '2', title: 'Building APIs with SQLite', description: 'PocketBase uses SQLite for fast, reliable data storage.', created: new Date().toISOString(), collectionId: 'posts', collectionName: 'posts' },
  ])
  const [titleVal, setTitleVal] = useState('')
  const [descVal, setDescVal] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [lastAction, setLastAction] = useState<string>('')
  
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
  const goToSection = (id: string) => {
    setActive(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Simulate connecting to PocketBase
  const connectToPocketBase = async () => {
    setConnectionStatus('connecting')
    setLastAction('Connecting to PocketBase...')
    await new Promise(resolve => setTimeout(resolve, 800))
    setConnectionStatus('connected')
    setLastAction('✓ Connected to http://127.0.0.1:8090')
  }
  
  // Simulate adding a post to PocketBase
  const addPost = async () => {
    if (!titleVal.trim() || !descVal.trim()) {
      setLastAction('⚠ Please fill in both fields')
      return
    }
    
    setIsSubmitting(true)
    setLastAction('📤 Creating new record...')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const newPost: SimulatedPost = {
      id: Date.now().toString(),
      title: titleVal.trim(),
      description: descVal.trim(),
      created: new Date().toISOString(),
      collectionId: 'posts',
      collectionName: 'posts',
      isNew: true
    }
    
    setPosts(prev => [newPost, ...prev])
    setTitleVal('')
    setDescVal('')
    setIsSubmitting(false)
    setLastAction(`✓ Added: "${newPost.title}"`)
    
    // Remove "isNew" highlight after animation
    setTimeout(() => {
      setPosts(prev => prev.map(p => p.id === newPost.id ? { ...p, isNew: false } : p))
    }, 2000)
  }
  
  // Simulate deleting a post
  const deletePost = async (id: string) => {
    const post = posts.find(p => p.id === id)
    if (!post) return
    
    setLastAction(`🗑️ Deleting "${post.title}"...`)
    await new Promise(resolve => setTimeout(resolve, 400))
    
    setPosts(prev => prev.filter(p => p.id !== id))
    setLastAction(`✓ Deleted: "${post.title}"`)
  }
  
  // Simulate fetching data (refresh)
  const refreshPosts = async () => {
    setLastAction('🔄 Fetching latest posts...')
    await new Promise(resolve => setTimeout(resolve, 500))
    setLastAction('✓ Posts refreshed')
  }
  
  // Handle Enter key for inputs
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') action()
  }
  
  // Scroll spy
  useEffect(() => {
    const ids = ['intro', 'installation', 'collections', 'setup', 'crud', 'code']
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
  
  // Navigation sections
  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: '🚀' },
    { id: 'installation', title: 'Installation', icon: '⚙️' },
    { id: 'collections', title: 'Collections', icon: '📁' },
    { id: 'setup', title: 'Vue Setup', icon: '🔧' },
    { id: 'crud', title: 'CRUD Operations', icon: '⚡' },
    { id: 'code', title: 'Complete Code', icon: '💻' },
  ]
  
  // Code blocks
  const installationCode = `# Download PocketBase from pocketbase.io
# Extract and navigate to the folder
cd pocketbase_folder

# Start the server
./pocketbase serve

# Server runs at:
# → http://127.0.0.1:8090
# → Admin UI: http://127.0.0.1:8090/_/`

  const npmInstallCode = `# In your Vue project folder:
cd my-vue-project

# Install PocketBase SDK
npm install pocketbase

# Or with yarn:
yarn add pocketbase`

  const importCode = `<script setup>
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'

// Create PocketBase instance
const pb = new PocketBase('http://127.0.0.1:8090')

// Reactive state
const titleVal = ref('')
const descVal = ref('')
const posts = ref([])
</script>`

  const addRecordCode = `async function add() {
  const data = {
    title: titleVal.value,
    description: descVal.value
  }
  
  // Create record in 'posts' collection
  const record = await pb.collection('posts').create(data)
  
  // Add to local state
  posts.value.push(record)
  
  // Clear inputs
  titleVal.value = ''
  descVal.value = ''
}`

  const fetchRecordsCode = `onMounted(async () => {
  // Fetch all records from 'posts' collection
  const _posts = await pb.collection('posts').getFullList()
  
  // Populate local state using spread operator
  posts.value.push(..._posts)
})`

  const completeCode = `<script setup>
import { ref, onMounted } from 'vue'
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

const titleVal = ref('')
const descVal = ref('')
const posts = ref([])

async function add() {
  const data = {
    title: titleVal.value,
    description: descVal.value
  }
  const record = await pb.collection('posts').create(data)
  posts.value.push(record)
  titleVal.value = ''
  descVal.value = ''
}

onMounted(async () => {
  const _posts = await pb.collection('posts').getFullList()
  posts.value.push(..._posts)
})
</script>

<template>
  <input v-model="titleVal" placeholder="Title"><br>
  <input v-model="descVal" placeholder="Description"><br>
  <button @click="add">Add Post</button>

  <ul>
    <li v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
    </li>
  </ul>
</template>`

  // Code block component
  const CodeBlock = ({ title, code, language = 'bash' }: CodeBlock) => (
    <div className="my-4 rounded-lg overflow-hidden border border-[var(--color-outline)]">
      <div className="bg-[var(--color-dark3)] py-2 px-4 flex items-center justify-between border-b border-[var(--color-outline)]">
        <span className="font-[var(--mono)] text-xs text-[var(--color-muted)]">{title}</span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
      </div>
      <pre className="bg-[#0e0e12] text-[var(--color-muted)] p-4 font-[var(--mono)] text-xs leading-relaxed overflow-x-auto m-0">
        <code className="whitespace-pre break-normal">{code}</code>
      </pre>
    </div>
  )

  // Sidebar content
  const SidebarContent = () => (
    <nav className="space-y-1">
      {sections.map((section) => (
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
    </nav>
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
        <div className="p-4"><SidebarContent /></div>
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
              Backend Integration
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              Vue.js + PocketBase
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Build full-stack applications with an open-source backend, SQLite database, and built-in authentication.
            </p>
          </header>

          {/* ══ INTRODUCTION ══ */}
          <section id="intro" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🚀</span> What is PocketBase?
            </h2>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                <strong>PocketBase</strong> is an open-source backend solution with <strong>SQLite</strong> as its database, 
                built-in authentication, and a <strong>RESTful API</strong>. It's designed to be easy to use and deploy, 
                making it perfect for small to medium-sized projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
              {[
                { icon: '🗄️', title: 'SQLite Database', desc: 'Lightweight, file-based, no separate server needed' },
                { icon: '🔐', title: 'Built-in Auth', desc: 'Email/password, OAuth, and token management out of the box' },
                { icon: '🌐', title: 'RESTful API', desc: 'Auto-generated endpoints for all your collections' },
                { icon: '📦', title: 'Easy Deploy', desc: 'Single executable file — just upload and run' },
              ].map((feature, i) => (
                <div key={i} className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4">
                  <div className="text-xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-[var(--color-muted)]">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-5">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Why use a backend?</strong> With PocketBase, you don't need to set up servers, 
                databases, or authentication from scratch. Focus on building your app, not infrastructure.
              </p>
            </div>
          </section>

          {/* ══ INSTALLATION ══ */}
          <section id="installation" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚙️</span> Installation & Setup
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              PocketBase is incredibly simple to set up — no complex configuration required.
            </p>

            <CodeBlock title="Terminal — Start PocketBase Server" code={installationCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-5">
              <h4 className="font-semibold text-sm mb-3">Connection Simulator</h4>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  connectionStatus === 'connected' ? 'bg-[var(--color-lime)]' :
                  connectionStatus === 'connecting' ? 'bg-[var(--color-yellow)] animate-pulse' :
                  'bg-[var(--color-purple)]'
                }`} />
                <span className="text-sm font-mono">
                  {connectionStatus === 'connected' ? '● Connected' :
                   connectionStatus === 'connecting' ? '○ Connecting...' :
                   '○ Disconnected'}
                </span>
              </div>

              <button
                onClick={connectToPocketBase}
                disabled={connectionStatus !== 'disconnected'}
                className="w-full sm:w-auto py-2 px-4 bg-[var(--color-lime)] text-[var(--color-dark)] font-semibold rounded hover:opacity-90 transition disabled:opacity-50"
              >
                {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect to PocketBase'}
              </button>

              {lastAction && (
                <p className="text-xs text-[var(--color-muted)] mt-3 font-mono bg-[var(--color-dark3)] p-2 rounded">
                  {lastAction}
                </p>
              )}
            </div>

            <CodeBlock title="Install PocketBase SDK in Vue Project" code={npmInstallCode} />
          </section>

          {/* ══ COLLECTIONS ══ */}
          <section id="collections" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📁</span> Understanding Collections
            </h2>

            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                PocketBase uses <strong>collections</strong> to organize data — similar to tables in traditional databases. 
                Each collection stores related records, and each <strong>record</strong> is like a row with a unique ID.
              </p>
            </div>

            {/* Collection Visualizer */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-5">
              <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)] flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--color-muted)]">Collection: posts</span>
                <button
                  onClick={refreshPosts}
                  className="text-xs px-2 py-1 bg-[var(--color-dark4)] border border-[var(--color-outline)] rounded hover:bg-[var(--color-dark3)] transition"
                >
                  🔄 Refresh
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--color-dark3)] border-b border-[var(--color-outline)]">
                      <th className="text-left py-2 px-4 font-mono text-xs text-[var(--color-muted)]">id</th>
                      <th className="text-left py-2 px-4 font-mono text-xs text-[var(--color-muted)]">title</th>
                      <th className="text-left py-2 px-4 font-mono text-xs text-[var(--color-muted)] hidden sm:table-cell">description</th>
                      <th className="text-left py-2 px-4 font-mono text-xs text-[var(--color-muted)]">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr 
                        key={post.id} 
                        className={`border-b border-[var(--color-outline)] transition-all ${
                          post.isNew ? 'bg-[var(--color-lime)]/10 animate-pulse' : 'hover:bg-[var(--color-dark3)]'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-xs text-[var(--color-purple)]">{post.id.slice(0, 8)}...</td>
                        <td className="py-3 px-4 font-medium">{post.title}</td>
                        <td className="py-3 px-4 text-[var(--color-muted)] hidden sm:table-cell max-w-xs truncate">{post.description}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-[var(--color-purple)] hover:text-[var(--color-purple)]/80 transition p-1"
                            title="Delete record"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {posts.length === 0 && (
                <div className="p-6 text-center text-sm text-[var(--color-muted)]">
                  No records yet — add one using the form below! ✨
                </div>
              )}
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Record structure:</strong> Every record automatically includes <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">id</code>, 
                <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">created</code>, <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">updated</code>, 
                <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">collectionId</code>, and <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">collectionName</code>.
              </p>
            </div>
          </section>

          {/* ══ VUE SETUP ══ */}
          <section id="setup" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔧</span> Integrating with Vue.js
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Import PocketBase and set up reactive state to connect your Vue app to the backend.
            </p>

            {/* Setup Tabs */}
            <div className="my-5">
              <div className="flex border-b border-[var(--color-outline)] overflow-x-auto">
                {['Imports', 'Instance', 'State'].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setCodeTab(i)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                      codeTab === i
                        ? 'text-[var(--color-lime)] border-b-[var(--color-lime)]'
                        : 'text-[var(--color-muted)] border-b-transparent hover:text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <div className={codeTab === 0 ? 'block' : 'hidden'}>
                <CodeBlock title="Import Statements" code={importCode} language="vue" />
              </div>
              <div className={codeTab === 1 ? 'block' : 'hidden'}>
                <CodeBlock title="Create PocketBase Instance" code={`// Initialize with your PocketBase URL\nconst pb = new PocketBase('http://127.0.0.1:8090')\n\n// The 'pb' variable now holds your backend connection`} language="js" />
              </div>
              <div className={codeTab === 2 ? 'block' : 'hidden'}>
                <CodeBlock title="Reactive State with ref()" code={`// Form inputs\nconst titleVal = ref('')\nconst descVal = ref('')\n\n// Data storage\nconst posts = ref([])\n\n// These reactive variables automatically update the UI when changed`} language="js" />
              </div>
            </div>

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-4">
              <h4 className="font-semibold text-sm mb-2">Vue Template Bindings</h4>
              <pre className="font-mono text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] p-3 rounded overflow-x-auto">
{`<!-- Two-way binding with v-model -->
<input v-model="titleVal" placeholder="Title">
<input v-model="descVal" placeholder="Description">

<!-- Event handling with @click -->
<button @click="add">Add Post</button>

<!-- List rendering with v-for -->
<ul>
  <li v-for="post in posts" :key="post.id">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
  </li>
</ul>`}
              </pre>
            </div>
          </section>

          {/* ══ CRUD OPERATIONS ══ */}
          <section id="crud" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span> CRUD Operations Demo
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Learn how to Create, Read, Update, and Delete records with PocketBase.
            </p>

            {/* Interactive CRUD Form */}
            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-5">
              <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)]">
                <span className="font-mono text-xs text-[var(--color-muted)]">Live Demo — Create Post</span>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-muted)] mb-1">Title</label>
                    <input
                      type="text"
                      value={titleVal}
                      onChange={(e) => setTitleVal(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addPost)}
                      placeholder="Enter post title..."
                      className="w-full px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-outline)] rounded text-sm focus:outline-none focus:border-[var(--color-lime)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-muted)] mb-1">Description</label>
                    <textarea
                      value={descVal}
                      onChange={(e) => setDescVal(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addPost)}
                      placeholder="Enter post description..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-outline)] rounded text-sm focus:outline-none focus:border-[var(--color-lime)] resize-none"
                    />
                  </div>
                  <button
                    onClick={addPost}
                    disabled={isSubmitting || !titleVal.trim() || !descVal.trim()}
                    className="w-full py-2 bg-[var(--color-lime)] text-[var(--color-dark)] font-semibold rounded hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                        Creating...
                      </>
                    ) : (
                      '➕ Add Post to PocketBase'
                    )}
                  </button>
                </div>

                {lastAction && (
                  <div className="mt-4 p-3 bg-[var(--color-dark3)] rounded text-xs font-mono text-[var(--color-muted)]">
                    {lastAction}
                  </div>
                )}
              </div>
            </div>

            {/* Code Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">Create Record</h4>
                <CodeBlock title="add() Function" code={addRecordCode} language="js" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Fetch Records</h4>
                <CodeBlock title="onMounted Hook" code={fetchRecordsCode} language="js" />
              </div>
            </div>

            <div className="border-l-3 border-[var(--color-purple)] bg-[var(--color-purple)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Async/Await:</strong> PocketBase methods return Promises. Use <code className="font-mono">async/await</code> 
                for clean, readable code. Always handle errors in production with try/catch blocks.
              </p>
            </div>
          </section>

          {/* ══ COMPLETE CODE ══ */}
          <section id="code" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>💻</span> Complete Vue Component
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Here's the full code combining everything we've learned. Copy, paste, and run!
            </p>

            <CodeBlock title="PostList.vue — Complete Example" code={completeCode} language="vue" />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-5">
              <h4 className="font-semibold text-sm mb-3">🚀 Run Your App</h4>
              <ol className="space-y-2 text-sm text-[var(--color-muted)]">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[var(--color-lime)]">1.</span>
                  <span>Start PocketBase: <code className="bg-[var(--color-dark3)] px-1 rounded">./pocketbase serve</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[var(--color-lime)]">2.</span>
                  <span>Create "posts" collection with <code className="bg-[var(--color-dark3)] px-1 rounded">title</code> and <code className="bg-[var(--color-dark3)] px-1 rounded">description</code> fields</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[var(--color-lime)]">3.</span>
                  <span>Install SDK: <code className="bg-[var(--color-dark3)] px-1 rounded">npm install pocketbase</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[var(--color-lime)]">4.</span>
                  <span>Run Vue app: <code className="bg-[var(--color-dark3)] px-1 rounded">npm run serve</code> or <code className="bg-[var(--color-dark3)] px-1 rounded">npm run dev</code></span>
                </li>
              </ol>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Pro Tip:</strong> Use Vue DevTools to inspect reactive state and debug your PocketBase integration. 
                The <code className="font-mono">posts</code> array will show real-time updates as you add/delete records.
              </p>
            </div>
          </section>

          {/* Resources */}
          <section className="pt-8 border-t border-[var(--color-outline)]">
            <h3 className="font-semibold mb-4">📚 Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://pocketbase.io" target="_blank" rel="noopener" 
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">PocketBase Official Site</div>
                <div className="text-xs text-[var(--color-muted)]">pocketbase.io</div>
              </a>
              <a href="https://pocketbase.io/docs" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">PocketBase Documentation</div>
                <div className="text-xs text-[var(--color-muted)]">pocketbase.io/docs</div>
              </a>
              <a href="https://www.npmjs.com/package/pocketbase" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">PocketBase JS SDK</div>
                <div className="text-xs text-[var(--color-muted)]">npm: pocketbase</div>
              </a>
              <a href="https://vuejs.org/guide" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">Vue 3 Guide</div>
                <div className="text-xs text-[var(--color-muted)]">vuejs.org/guide</div>
              </a>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}