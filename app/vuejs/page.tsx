// app/basic-web/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Types
interface CodeBlock {
  title: string
  code: string
  language?: string
}

interface Section {
  id: string
  title: string
  icon?: string
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface GitHubUser {
  login: string
  id: number
  avatar_url: string
}

export default function BasicWebDevPage() {
  // Navigation state
  const [active, setActive] = useState<string>('intro')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Tab states
  const [routingTab, setRoutingTab] = useState(0)
  const [fetchTab, setFetchTab] = useState(0)
  
  // Demo states - Counter
  const [count, setCount] = useState(0)
  
  // Demo states - v-model binding
  const [nameInput, setNameInput] = useState('')
  
  // Demo states - Todo List
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  
  // Demo states - Fetch API
  const [joke, setJoke] = useState('')
  const [jokeLoading, setJokeLoading] = useState(false)
  const [jokeError, setJokeError] = useState('')
  const [githubUsers, setGithubUsers] = useState<GitHubUser[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  
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
  
  // Fetch joke from API
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
      setJokeError('Could not fetch joke — check your internet connection.')
    } finally {
      setJokeLoading(false)
    }
  }
  
  // Fetch GitHub users
  const fetchGitHubUsers = async () => {
    setUsersLoading(true)
    try {
      const res = await fetch('https://api.github.com/users?per_page=8')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setGithubUsers(data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setUsersLoading(false)
    }
  }
  
  // Add todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }
  
  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }
  
  // Handle Enter key for todo input
  const handleTodoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo()
  }
  
  // Simulate adding user (GitHub API doesn't allow anonymous POST)
  const addUser = () => {
    if (!newUsername.trim()) return
    const simulatedUser: GitHubUser = {
      login: newUsername.trim(),
      id: Date.now(),
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUsername)}&background=random`
    }
    setGithubUsers(prev => [simulatedUser, ...prev])
    setNewUsername('')
  }
  
  // Scroll spy for active section highlighting
  useEffect(() => {
    const ids = ['intro', 'reactivity', 'components', 'todos', 'props', 'styling', 'routing', 'fetch']
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
  
  // Load GitHub users on mount
  useEffect(() => {
    fetchGitHubUsers()
  }, [])
  
  // Navigation sections
  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: '🚀' },
    { id: 'reactivity', title: 'Reactivity', icon: '⚡' },
    { id: 'components', title: 'Components', icon: '🧩' },
    { id: 'todos', title: 'Todo List', icon: '✅' },
    { id: 'props', title: 'Props', icon: '📦' },
    { id: 'styling', title: 'Styling', icon: '🎨' },
    { id: 'routing', title: 'Routing', icon: '🔗' },
    { id: 'fetch', title: 'Fetch API', icon: '🌐' },
  ]
  
  // Code blocks
  const viteSetupCode = `# Create Vue project with Vite
$ npm create vite@latest my-vue-app
# Select: Vue → TypeScript/JavaScript

# Install dependencies
$ cd my-vue-app && npm install

# Start dev server
$ npm run dev
# → http://localhost:5173`

  const appVueCode = `<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>`

  const helloWorldCode = `<script setup>
import { ref } from 'vue'

defineProps({ msg: String })
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is {{ count }}</button>
</template>`

  const counterComponentCode = `<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">
    count is {{ count }}
  </button>
</template>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>`

  const todoListCode = `<script setup>
import { ref } from 'vue'
const todos = ref([])
const todo = ref("")

function addTodo() {
  todos.value.push(todo.value)
  todo.value = ""
}
</script>

<template>
  <input v-model="todo" placeholder="Add todo..." />
  <button @click="addTodo">Add</button>
  <ul>
    <li v-for="t in todos" :key="t">{{ t }}</li>
  </ul>
</template>`

  const propsExampleCode = `<script setup>
// Parent: App.vue
import TodoItem from './components/TodoItem.vue'
const todos = ref(['Learn Vue', 'Build app'])
</script>

<template>
  <TodoItem v-for="todo in todos" :key="todo" :todo="todo" />
</template>

<!-- Child: TodoItem.vue -->
<script setup>
defineProps({ todo: String })
</script>

<template>
  <li>{{ todo }}</li>
</template>`

  const tailwindExampleCode = `<template>
  <button 
    @click="count++"
    class="bg-blue-500 hover:bg-blue-700 text-white 
           font-bold py-2 px-4 rounded transition"
  >
    count is {{ count }}
  </button>
</template>`

  const routerSetupCode = `// main.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).use(router).mount('#app')`

  const navigationGuardCode = `// Global guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})`

  const componentNavigationCode = `<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

console.log(route.params.id)
const goHome = () => router.push('/')
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterView />
</template>`

  const fetchGetCode = `<script setup>
import { ref } from 'vue'
const users = ref([])

fetch('https://api.github.com/users')
  .then(res => res.json())
  .then(data => { users.value = data })
  .catch(err => console.error(err))
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.login }}
    </li>
  </ul>
</template>`

  const fetchPostCode = `<script setup>
import { ref } from 'vue'
const username = ref('')

async function addUser() {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value })
  })
  const json = await res.json()
  // Handle response...
}
</script>

<template>
  <input v-model="username" />
  <button @click="addUser">Add User</button>
</template>`

  // Sidebar content component
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

  // Code block component
  const CodeBlock = ({ title, code, language = 'vue' }: CodeBlock) => (
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
              Beginning VueJS
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              VueJS Workshop Notes
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              A practical guide to building interactive web applications with Vue 3, Vite, and modern tooling.
            </p>
          </header>

          {/* ══ INTRODUCTION ══ */}
          <section id="intro" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🚀</span> What is VueJS?
            </h2>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                VueJS is a JavaScript framework for building <strong>Single Page Applications</strong> for the web. 
                It uses HTML, CSS, JS and employs both <strong>component-based</strong> and <strong>declarative programming</strong> 
                models to build user interfaces.
              </p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                It's a <strong>progressive framework</strong> — flexible and incrementally adoptable.
              </p>
            </div>

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-4">
              <h4 className="font-semibold text-sm mb-2">VueJS Use Cases:</h4>
              <ul className="space-y-1 text-sm text-[var(--color-muted)]">
                <li>• Enhancing static HTML without a build step</li>
                <li>• Embedding as Web Components on any page</li>
                <li>• Single-Page Applications (SPA)</li>
                <li>• Fullstack / Server-Side Rendering (SSR)</li>
                <li>• Jamstack / Static Site Generation (SSG)</li>
                <li>• Targeting desktop, mobile, WebGL, and even the terminal</li>
              </ul>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-5">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Before we begin:</strong> Install NodeJS — this is required to install JS libraries, 
                frameworks, and packages via NPM throughout this workshop.
              </p>
            </div>

            <h3 className="font-semibold mt-6 mb-3">Setting up with Vite</h3>
            <p className="text-sm text-[var(--color-muted)] mb-3">
              <strong>Vite</strong> (French: "veet") is a local development server created by Evan You, 
              the creator of Vue.js. It supports TypeScript, JSX, and uses Rollup/esbuild for bundling.
            </p>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Key features: Hot Module Replacement (HMR), built-in SSR support, listens on port 5173 by default.
            </p>

            <CodeBlock title="Terminal — Create Vue Project" code={viteSetupCode} />

            <p className="text-sm text-[var(--color-muted)] mb-3">
              After setup, you'll find a <code className="bg-[var(--color-dark3)] px-1 py-0.5 rounded font-mono text-xs">src</code> folder 
              with <code className="bg-[var(--color-dark3)] px-1 py-0.5 rounded font-mono text-xs">App.vue</code> — your entry point.
            </p>

            <CodeBlock title="src/App.vue" code={appVueCode} />
          </section>

          {/* ══ REACTIVITY ══ */}
          <section id="reactivity" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span> Understanding Reactivity
            </h2>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                In Vue, reactive variables automatically update the UI when their values change.
              </p>
            </div>

            <CodeBlock title="Reactive variable with ref()" code={helloWorldCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-5">
              <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)]">
                <span className="font-mono text-xs text-[var(--color-muted)]">Live Demo — Reactive Counter</span>
              </div>
              <div className="p-5">
                <div className="text-4xl font-bold text-[var(--color-lime)] text-center mb-4 transition-all">
                  {count}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <button
                    onClick={() => setCount(c => c - 1)}
                    className="px-4 py-2 bg-[var(--color-dark4)] border border-[var(--color-outline)] rounded hover:bg-[var(--color-dark3)] transition min-h-[44px]"
                  >
                    − Decrement
                  </button>
                  <button
                    onClick={() => setCount(c => c + 1)}
                    className="px-4 py-2 bg-[var(--color-lime)] text-[var(--color-dark)] font-semibold rounded hover:opacity-90 transition min-h-[44px]"
                  >
                    + Increment
                  </button>
                  <button
                    onClick={() => setCount(0)}
                    className="px-4 py-2 bg-[var(--color-purple)]/20 text-[var(--color-purple)] border border-[var(--color-purple)]/40 rounded hover:opacity-90 transition min-h-[44px]"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-center text-sm text-[var(--color-muted)]">
                  Computed double: <strong className="text-[var(--color-lime)]">{count * 2}</strong>
                </p>
              </div>
            </div>

            <div className="border-l-3 border-[var(--color-purple)] bg-[var(--color-purple)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Mustache syntax:</strong> Use <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">{`{{ variable }}`}</code> 
                in templates to display reactive data. Vue handles the DOM updates automatically — no need for 
                <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">getElementById()</code>.
              </p>
            </div>

            <CodeBlock title="Plain JS vs Vue — Event Handling" code={`// Plain JavaScript (tedious)
let count = 0
const el = document.getElementById('count')
function increment() {
  count++
  el.innerHTML = count  // Manual DOM update
}

// Vue (declarative)
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <button @click="count++">{{ count }}</button>
</template>`} />
          </section>

          {/* ══ COMPONENTS ══ */}
          <section id="components" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🧩</span> Component-Based Development
            </h2>
            
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Vue uses Single-File Components (<code className="font-mono bg-[var(--color-dark3)] px-1 rounded">.vue</code>) 
              that combine template, script, and styles in one file.
            </p>

            <CodeBlock title="Counter.vue — Reusable Component" code={counterComponentCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-5">
              <h4 className="font-semibold text-sm mb-3">v-model — Two-Way Binding Demo</h4>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Type your name..."
                className="w-full px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-outline)] rounded mb-3 text-sm focus:outline-none focus:border-[var(--color-lime)]"
              />
              <p className="text-sm">
                Hello, <strong className="text-[var(--color-lime)]">{nameInput || 'stranger'}</strong>! 👋
              </p>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Scoped CSS:</strong> The <code className="font-mono">&lt;style scoped&gt;</code> attribute 
                ensures styles only apply to the current component, preventing global CSS conflicts.
              </p>
            </div>
          </section>

          {/* ══ TODO LIST ══ */}
          <section id="todos" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>✅</span> Building a Todo List
            </h2>

            <CodeBlock title="TodoList.vue" code={todoListCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden my-5">
              <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)]">
                <span className="font-mono text-xs text-[var(--color-muted)]">Interactive Todo List</span>
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleTodoKeyPress}
                    placeholder="Add a new todo..."
                    className="flex-1 px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-outline)] rounded text-sm focus:outline-none focus:border-[var(--color-lime)]"
                  />
                  <button
                    onClick={addTodo}
                    className="px-4 py-2 bg-[var(--color-lime)] text-[var(--color-dark)] font-semibold rounded hover:opacity-90 transition whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
                
                {todos.length === 0 ? (
                  <p className="text-sm text-[var(--color-muted)] text-center py-4">
                    No todos yet — add one above! ✨
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {todos.map((todo) => (
                      <li
                        key={todo.id}
                        className="flex items-center justify-between p-3 bg-[var(--color-dark3)] rounded border border-[var(--color-outline)] group"
                      >
                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-4 h-4 rounded border-[var(--color-outline)] accent-[var(--color-lime)]"
                          />
                          <span className={`text-sm ${todo.completed ? 'line-through text-[var(--color-muted)]' : ''}`}>
                            {todo.text}
                          </span>
                        </label>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="opacity-0 group-hover:opacity-100 text-[var(--color-purple)] hover:text-[var(--color-purple)]/80 transition p-1"
                          aria-label="Delete todo"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">v-model</h4>
                <p className="text-xs text-[var(--color-muted)]">
                  Binds input value to component state. Changes in input update state; state changes update input.
                </p>
              </div>
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">v-for</h4>
                <p className="text-xs text-[var(--color-muted)]">
                  Renders a list by looping over an array. Always use <code className="font-mono">:key</code> for performance.
                </p>
              </div>
            </div>
          </section>

          {/* ══ PROPS ══ */}
          <section id="props" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📦</span> Props — Component Communication
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Props allow parent components to pass data down to child components.
            </p>

            <CodeBlock title="Parent → Child with Props" code={propsExampleCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-4">
              <h4 className="font-semibold text-sm mb-2">Prop Definition Patterns</h4>
              <pre className="font-mono text-xs text-[var(--color-muted)] bg-[var(--color-dark3)] p-3 rounded overflow-x-auto">
{`// Single prop
defineProps({ msg: String })

// Multiple props with types
defineProps({
  msg: String,
  count: Number,
  isActive: Boolean,
  items: Array,
  config: Object
})

// With default values & validation
defineProps({
  msg: { type: String, required: true },
  count: { type: Number, default: 0 }
})`}
              </pre>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Tip:</strong> Use <code className="font-mono">:propName</code> (shorthand for <code className="font-mono">v-bind:propName</code>) 
                to pass dynamic values. Use plain <code className="font-mono">propName="value"</code> for static strings.
              </p>
            </div>
          </section>

          {/* ══ STYLING ══ */}
          <section id="styling" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎨</span> Styling with Tailwind CSS
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Tailwind CSS is a utility-first framework — compose designs using small, pre-built classes directly in your markup.
            </p>

            <CodeBlock title="Tailwind-Powered Button" code={tailwindExampleCode} />

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-5">
              <h4 className="font-semibold text-sm mb-3">Live Preview</h4>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                  Primary
                </button>
                <button className="bg-[var(--color-purple)] hover:bg-[var(--color-purple)]/90 text-white font-bold py-2 px-4 rounded transition">
                  Secondary
                </button>
                <button className="bg-[var(--color-dark3)] hover:bg-[var(--color-dark4)] text-[var(--color-text)] font-bold py-2 px-4 rounded border border-[var(--color-outline)] transition">
                  Outline
                </button>
              </div>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Pro Tip:</strong> Install the <strong>Tailwind CSS IntelliSense</strong> VSCode extension 
                for autocomplete, syntax highlighting, and linting. Learn more at <a href="https://tailwindcss.com" className="text-[var(--color-lime)] hover:underline" target="_blank" rel="noopener">tailwindcss.com</a>.
              </p>
            </div>
          </section>

          {/* ══ ROUTING ══ */}
          <section id="routing" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔗</span> Client-Side Routing with Vue Router
            </h2>

            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                In SPAs, routing happens on the client — the browser doesn't reload. Vue Router maps URLs to components 
                and handles navigation without full page refreshes.
              </p>
            </div>

            {/* Routing Tabs */}
            <div className="my-5">
              <div className="flex border-b border-[var(--color-outline)] overflow-x-auto">
                {['Route Config', 'Navigation Guard', 'In Component'].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setRoutingTab(i)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                      routingTab === i
                        ? 'text-[var(--color-lime)] border-b-[var(--color-lime)]'
                        : 'text-[var(--color-muted)] border-b-transparent hover:text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <div className={routingTab === 0 ? 'block' : 'hidden'}>
                <CodeBlock title="router/index.js — Route Configuration" code={routerSetupCode} />
              </div>
              <div className={routingTab === 1 ? 'block' : 'hidden'}>
                <CodeBlock title="Global Navigation Guard" code={navigationGuardCode} />
              </div>
              <div className={routingTab === 2 ? 'block' : 'hidden'}>
                <CodeBlock title="Using Router in Components" code={componentNavigationCode} />
              </div>
            </div>

            <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg p-4 my-4">
              <h4 className="font-semibold text-sm mb-2">Router Components</h4>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                <li>
                  <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">&lt;RouterView /&gt;</code> — 
                  Renders the matched component for the current route
                </li>
                <li>
                  <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">&lt;RouterLink to="/path"&gt;</code> — 
                  Declarative navigation (replaces &lt;a&gt; tags)
                </li>
                <li>
                  <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">useRouter()</code> / <code className="font-mono bg-[var(--color-dark3)] px-1 rounded">useRoute()</code> — 
                  Composition API hooks for programmatic navigation
                </li>
              </ul>
            </div>
          </section>

          {/* ══ FETCH API ══ */}
          <section id="fetch" className="mb-12 scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🌐</span> Making API Requests with Fetch
            </h2>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              The Fetch API is built into modern browsers — no library needed. It returns Promises, 
              making it perfect for async/await patterns.
            </p>

            {/* Fetch Tabs */}
            <div className="my-5">
              <div className="flex border-b border-[var(--color-outline)] overflow-x-auto">
                {['GET Request', 'POST Request'].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setFetchTab(i)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                      fetchTab === i
                        ? 'text-[var(--color-lime)] border-b-[var(--color-lime)]'
                        : 'text-[var(--color-muted)] border-b-transparent hover:text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <div className={fetchTab === 0 ? 'block' : 'hidden'}>
                <CodeBlock title="GET — Fetch GitHub Users" code={fetchGetCode} />
              </div>
              <div className={fetchTab === 1 ? 'block' : 'hidden'}>
                <CodeBlock title="POST — Submit Data" code={fetchPostCode} />
              </div>
            </div>

            {/* Interactive Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
              {/* Joke Fetcher */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden">
                <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)]">
                  <span className="font-mono text-xs text-[var(--color-muted)]">Demo: Fetch Random Joke</span>
                </div>
                <div className="p-4">
                  <button
                    onClick={fetchJoke}
                    disabled={jokeLoading}
                    className="w-full py-2 bg-[var(--color-lime)] text-[var(--color-dark)] font-semibold rounded hover:opacity-90 transition disabled:opacity-50"
                  >
                    {jokeLoading ? 'Loading…' : '🎲 Fetch a Joke'}
                  </button>
                  {jokeError && <p className="text-[var(--color-purple)] text-sm mt-2">{jokeError}</p>}
                  {joke && <p className="text-sm mt-3 leading-relaxed">{joke}</p>}
                </div>
              </div>

              {/* GitHub Users */}
              <div className="bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg overflow-hidden">
                <div className="bg-[var(--color-dark3)] py-2 px-4 border-b border-[var(--color-outline)]">
                  <span className="font-mono text-xs text-[var(--color-muted)]">Demo: GitHub Users</span>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Simulate adding user..."
                      className="flex-1 px-3 py-2 bg-[var(--color-dark)] border border-[var(--color-outline)] rounded text-sm"
                    />
                    <button
                      onClick={addUser}
                      className="px-3 py-2 bg-[var(--color-purple)]/20 text-[var(--color-purple)] border border-[var(--color-purple)]/40 rounded text-sm hover:opacity-90 transition"
                    >
                      Add
                    </button>
                  </div>
                  
                  {usersLoading ? (
                    <p className="text-sm text-[var(--color-muted)]">Loading users…</p>
                  ) : (
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {githubUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-2 bg-[var(--color-dark3)] rounded">
                          <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-mono">{user.login}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-l-3 border-[var(--color-lime)] bg-[var(--color-lime)]/5 rounded-r-lg p-3 my-4">
              <p className="text-sm text-[var(--color-muted)]">
                <strong>Best Practice:</strong> Always handle loading and error states when fetching data. 
                Use try/catch with async/await for cleaner error handling than .catch() chains.
              </p>
            </div>
          </section>

          {/* Resources */}
          <section className="pt-8 border-t border-[var(--color-outline)]">
            <h3 className="font-semibold mb-4">📚 Additional Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://vuejs.org/guide" target="_blank" rel="noopener" 
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">Vue 3 Official Guide</div>
                <div className="text-xs text-[var(--color-muted)]">vuejs.org/guide</div>
              </a>
              <a href="https://router.vuejs.org" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">Vue Router</div>
                <div className="text-xs text-[var(--color-muted)]">router.vuejs.org</div>
              </a>
              <a href="https://vitejs.dev" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">Vite Build Tool</div>
                <div className="text-xs text-[var(--color-muted)]">vitejs.dev</div>
              </a>
              <a href="https://tailwindcss.com" target="_blank" rel="noopener"
                 className="p-3 bg-[var(--color-dark2)] border border-[var(--color-outline)] rounded-lg hover:border-[var(--color-lime)] transition block">
                <div className="font-semibold text-sm">Tailwind CSS</div>
                <div className="text-xs text-[var(--color-muted)]">tailwindcss.com</div>
              </a>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}