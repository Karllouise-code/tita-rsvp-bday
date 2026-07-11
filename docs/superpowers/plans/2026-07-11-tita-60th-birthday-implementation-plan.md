# Tita's 60th Birthday Invitation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React.js digital invitation website for a 60th birthday celebration with elegant gold/black theme, scroll animations via motion.dev, countdown timer, photo gallery, RSVP form via Formspree, and share functionality.

**Architecture:** React.js (Vite) single-page app with 6 component sections. Tailwind CSS for styling. motion.dev for scroll-triggered and entrance animations. Formspree handles RSVP data collection (no backend). Deployed as static site on Netlify.

**Tech Stack:** React 18+, Vite, Tailwind CSS, motion.dev (framer-motion), Formspree

## Global Constraints

- Theme: Elegant/formal — Gold (`#D4AF37`) + Black (`#0A0A0A`) + Cream (`#FFF8E7`)
- Fonts: Playfair Display (headings), Inter (body) — via Google Fonts
- Mobile-first responsive design (breakpoints: 640px, 1024px)
- RSVP form submits to Formspree endpoint (placeholder form ID until user creates one)
- Background music starts muted, user clicks to play
- Deploy target: Netlify (static site)
- All placeholder content marked with `[TBD]` comments for easy replacement later

---

## File Structure

```
roselia-rito-bday/
├── public/
│   ├── images/              # Placeholder images, real photos later
│   │   └── placeholder.svg  # Placeholder image for gallery
│   └── music/
│       └── background.mp3   # Placeholder — user provides music file
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── EventDetails.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── Countdown.jsx
│   │   ├── RSVPForm.jsx
│   │   └── Footer.jsx
│   ├── App.jsx              # Main app — assembles all sections
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind directives + custom styles
├── index.html               # HTML template with Google Fonts
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .gitignore
├── netlify.toml
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-07-11-tita-60th-birthday-invitation-design.md
        └── plans/
            └── 2026-07-11-tita-60th-birthday-implementation-plan.md
```

---

## Tasks

### Task 1: Project Scaffolding + Dependencies

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `.gitignore`, `src/main.jsx`, `src/index.css`

**Interfaces:**
- Produces: Runnable Vite + React + Tailwind project (dev server starts successfully)

- [ ] **Step 1: Initialize project and install dependencies**

```bash
cd roselia-rito-bday
npm init -y
npm install react react-dom framer-motion
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-light': '#E8D48B',
        'gold-dark': '#B8960F',
        black: '#0A0A0A',
        cream: '#FFF8E7',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tita's 60th Birthday Celebration</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #0A0A0A;
  color: #FFF8E7;
}
```

- [ ] **Step 7: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: Create `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 9: Create placeholder `src/App.jsx`**

```jsx
function App() {
  return (
    <div className="min-h-screen bg-black text-cream">
      <h1 className="font-heading text-4xl text-gold text-center py-20">
        Tita's 60th Birthday
      </h1>
    </div>
  )
}

export default App
```

- [ ] **Step 10: Verify dev server runs**

```bash
npm run dev
```

Expected: Server starts, page shows "Tita's 60th Birthday" in gold text on black background.

- [ ] **Step 11: Add scripts to `package.json`**

Add to `"scripts"`:
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

- [ ] **Step 12: Initialize git and commit**

```bash
git init
git add .
git commit -m "feat: scaffold React + Vite + Tailwind project"
```

---

### Task 2: Hero Section

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.jsx` (import and render Hero)

**Interfaces:**
- Consumes: None
- Produces: `<Hero />` component — full-screen hero with animated text

- [ ] **Step 1: Create `src/components/Hero.jsx`**

```jsx
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1508] to-black" />

      {/* Ornamental gold line top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-gold-light tracking-[0.3em] uppercase text-sm mb-6"
        >
          You're Invited
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-cream/70 text-lg mb-4"
        >
          Celebrating 60 Years of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-gold font-bold mb-8"
        >
          [Tita's Name]
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center justify-center gap-4 text-cream/50 text-sm"
        >
          <span className="w-12 h-px bg-gold/40" />
          <span className="tracking-widest uppercase">August 16, 2026</span>
          <span className="w-12 h-px bg-gold/40" />
        </motion.div>
      </div>

      {/* Ornamental gold line bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-gold/40 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-gold/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
```

- [ ] **Step 2: Update `src/App.jsx` to render Hero**

```jsx
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev` — Hero section should show with staggered text animations and gold theme.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/App.jsx
git commit -m "feat: add Hero section with animated entrance"
```

---

### Task 3: Event Details Section

**Files:**
- Create: `src/components/EventDetails.jsx`
- Modify: `src/App.jsx` (import and render EventDetails)

**Interfaces:**
- Consumes: None
- Produces: `<EventDetails />` component — scroll-triggered fade-in with event info

- [ ] **Step 1: Create `src/components/EventDetails.jsx`**

```jsx
import { motion } from 'framer-motion'

const EventDetails = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-gold mb-12">
          Join Us for the Celebration
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Date</p>
            <p className="font-heading text-xl text-cream">August 16, 2026</p>
            <p className="text-cream/50 text-sm mt-1">Sunday</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Time</p>
            <p className="font-heading text-xl text-cream">[TBD]</p>
            <p className="text-cream/50 text-sm mt-1">Cocktails start at [TBD]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Venue</p>
            <p className="font-heading text-xl text-cream">[Zambales Resort]</p>
            <p className="text-cream/50 text-sm mt-1">[Full address TBD]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Attire</p>
            <p className="font-heading text-xl text-cream">Semi-Formal</p>
            <p className="text-cream/50 text-sm mt-1">Filipiniana encouraged</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default EventDetails
```

- [ ] **Step 2: Update `src/App.jsx`**

```jsx
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Scroll down past Hero — Event Details cards should fade in one by one on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/EventDetails.jsx src/App.jsx
git commit -m "feat: add Event Details section with scroll animations"
```

---

### Task 4: Photo Gallery Section

**Files:**
- Create: `src/components/PhotoGallery.jsx`
- Create: `public/images/placeholder.svg`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None
- Produces: `<PhotoGallery />` component — responsive grid with staggered scroll animations

- [ ] **Step 1: Create `public/images/placeholder.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#1a1a1a"/>
  <text x="200" y="150" text-anchor="middle" dominant-baseline="middle" fill="#555" font-family="sans-serif" font-size="16">
    Photo Coming Soon
  </text>
</svg>
```

- [ ] **Step 2: Create `src/components/PhotoGallery.jsx`**

```jsx
import { motion } from 'framer-motion'

const photos = [
  { id: 1, src: '/images/placeholder.svg', alt: 'Photo 1' },
  { id: 2, src: '/images/placeholder.svg', alt: 'Photo 2' },
  { id: 3, src: '/images/placeholder.svg', alt: 'Photo 3' },
  { id: 4, src: '/images/placeholder.svg', alt: 'Photo 4' },
  { id: 5, src: '/images/placeholder.svg', alt: 'Photo 5' },
  { id: 6, src: '/images/placeholder.svg', alt: 'Photo 6' },
]

const PhotoGallery = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-gold">
          Memories Through the Years
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-lg border border-gold/20"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-48 md:h-56 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PhotoGallery
```

- [ ] **Step 3: Update `src/App.jsx`**

```jsx
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
    </div>
  )
}

export default App
```

- [ ] **Step 4: Verify in browser**

Gallery grid shows 6 placeholder images, stagger in on scroll, scale on hover.

- [ ] **Step 5: Commit**

```bash
git add src/components/PhotoGallery.jsx public/images/placeholder.svg src/App.jsx
git commit -m "feat: add Photo Gallery section with placeholder images"
```

---

### Task 5: Countdown Timer Section

**Files:**
- Create: `src/components/Countdown.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None (reads current time, calculates delta to August 16, 2026)
- Produces: `<Countdown />` component — live ticking countdown with animated numbers

- [ ] **Step 1: Create `src/components/Countdown.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const targetDate = new Date('2026-08-16T00:00:00').getTime()

const calculateTimeLeft = () => {
  const now = new Date().getTime()
  const diff = targetDate - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gold/30 rounded-lg bg-black/60">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-heading text-4xl md:text-5xl text-gold font-bold"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-2 text-cream/50 text-xs uppercase tracking-widest">{label}</span>
  </div>
)

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-gold mb-12">
          Counting Down To
        </h2>

        <div className="flex justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </section>
  )
}

export default Countdown
```

- [ ] **Step 2: Update `src/App.jsx`**

```jsx
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Countdown shows days/hours/minutes/seconds ticking down to Aug 16, 2026. Numbers animate on change.

- [ ] **Step 4: Commit**

```bash
git add src/components/Countdown.jsx src/App.jsx
git commit -m "feat: add Countdown Timer section with animated numbers"
```

---

### Task 6: RSVP Form Section

**Files:**
- Create: `src/components/RSVPForm.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None
- Produces: `<RSVPForm />` component — form that POSTs to Formspree, shows success state

- [ ] **Step 1: Create `src/components/RSVPForm.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// TODO: Replace with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guests: '1',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-gold/40" />
            <span className="text-gold text-2xl">✦</span>
            <span className="w-16 h-px bg-gold/40" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-gold mb-4">
            RSVP
          </h2>
          <p className="text-cream/50 text-sm">
            Kindly respond by August 2, 2026
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border border-gold/20 rounded-lg bg-black/50"
            >
              <p className="font-heading text-2xl text-gold mb-4">Thank You!</p>
              <p className="text-cream/70">
                We look forward to celebrating with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 p-8 border border-gold/20 rounded-lg bg-black/50"
            >
              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Will you attend?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Message for Tita (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="A birthday message for Tita..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default RSVPForm
```

- [ ] **Step 2: Update `src/App.jsx`**

```jsx
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
      <RSVPForm />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Form renders, can fill out fields, submit sends to Formspree (will show error until real form ID is set — that's expected). Success state shows after successful submit.

- [ ] **Step 4: Commit**

```bash
git add src/components/RSVPForm.jsx src/App.jsx
git commit -m "feat: add RSVP Form section with Formspree integration"
```

---

### Task 7: Footer with Share + Music

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `public/music/` (directory — user adds music file later)
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None
- Produces: `<Footer />` component — share button, music toggle, credits

- [ ] **Step 1: Create `src/components/Footer.jsx`**

```jsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleShare = async () => {
    const shareData = {
      title: "Tita's 60th Birthday Celebration",
      text: "You're invited to celebrate 60 years of joy! Join us on August 16, 2026.",
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <footer className="py-16 px-4 border-t border-gold/20">
      {/* Background music — user provides audio file */}
      <audio ref={audioRef} loop>
        {/* TODO: Add your music file to public/music/background.mp3 */}
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center space-y-8"
      >
        {/* Share Button */}
        <div>
          <p className="text-gold/70 text-sm uppercase tracking-widest mb-4">
            Share the Joy
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-8 py-3 border border-gold rounded-full text-gold hover:bg-gold hover:text-black transition-colors"
          >
            Share Invitation
          </motion.button>
        </div>

        {/* Music Toggle */}
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors mx-auto"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </motion.button>
          <p className="text-cream/30 text-xs mt-2">
            {isPlaying ? 'Playing' : 'Click for music'}
          </p>
        </div>

        {/* Credits */}
        <div className="pt-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-16 h-px bg-gold/20" />
            <span className="text-gold/40 text-sm">✦</span>
            <span className="w-16 h-px bg-gold/20" />
          </div>
          <p className="text-cream/30 text-xs">
            Hosted with love by [Your Name]
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 2: Update `src/App.jsx`**

```jsx
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
      <RSVPForm />
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify in browser**

Footer shows Share button (copies link on desktop, native share on mobile), music toggle (no audio file yet — that's fine), and credits text.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx src/App.jsx public/music/
git commit -m "feat: add Footer with share button and music toggle"
```

---

### Task 8: Final Polish + Netlify Deployment Config

**Files:**
- Modify: `index.html` (add meta tags, favicon)
- Create: `netlify.toml` (build config)
- Verify: All components, responsive design, final commit

**Interfaces:**
- Consumes: All previous tasks
- Produces: Production-ready, deployable site

- [ ] **Step 1: Update `index.html` with meta tags**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="You're invited to celebrate 60 years of joy! Join us on August 16, 2026 in Zambales." />
    <meta property="og:title" content="Tita's 60th Birthday Celebration" />
    <meta property="og:description" content="You're invited to celebrate 60 years of joy!" />
    <meta property="og:type" content="website" />
    <title>Tita's 60th Birthday Celebration</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 3: Test full build**

```bash
npm run build
npm run preview
```

Expected: Build succeeds, preview shows full site with all sections working.

- [ ] **Step 4: Verify responsive design**

Check on mobile viewport (Chrome DevTools, 375px width) — all sections should stack properly, text readable, buttons touchable.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: final polish and meta tags for production"
```

- [ ] **Step 6: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/roselia-rito-bday.git
git branch -M main
git push -u origin main
```

- [ ] **Step 7: Deploy on Netlify**

1. Go to netlify.com → Add new site → Import an existing project
2. Connect your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click Deploy
6. Site is live on `https://your-project.netlify.app`

---

## Post-Deployment Checklist

- [ ] Replace `[Tita's Name]` in Hero section
- [ ] Replace `[Your Name]` in Footer
- [ ] Fill in party time, venue address, dress code in EventDetails
- [ ] Create Formspree form and update `FORMSPREE_ENDPOINT` in RSVPForm
- [ ] Add real photos to `public/images/` and update PhotoGallery array
- [ ] Add background music file to `public/music/background.mp3`
- [ ] Share the Netlify URL with family!
