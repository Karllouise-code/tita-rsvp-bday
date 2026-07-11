# RSVP Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a prominent RSVP button in the Hero section and a floating RSVP button that appears while scrolling, both smooth-scrolling to the RSVP form.

**Architecture:** The Hero's scroll indicator is replaced by a gold "RSVP Now" CTA button. A new `FloatingRSVP` component uses IntersectionObserver to show/hide a fixed-position button based on scroll position. Both trigger `scrollIntoView({ behavior: 'smooth' })` targeting the RSVP section's `id="rsvp"`.

**Tech Stack:** React, Tailwind CSS, Framer Motion, IntersectionObserver API

## Global Constraints

- Existing Tailwind config with custom colors: `gold`, `gold-light`, `cream`, `cream/70`, etc.
- Framer Motion already used throughout — use `motion` components for animations
- No test framework configured — verify via `npm run dev` visual inspection
- No new dependencies needed

---

### Task 1: Add `id="rsvp"` to RSVPForm section

**Files:**
- Modify: `src/components/RSVPForm.jsx:37`

**Interfaces:**
- Produces: `<section id="rsvp">` element for scroll targeting

- [ ] **Step 1: Add id to the section element**

Open `src/components/RSVPForm.jsx`. On line 37, change:
```jsx
<section className="relative py-20 px-4 overflow-hidden">
```
to:
```jsx
<section id="rsvp" className="relative py-20 px-4 overflow-hidden">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RSVPForm.jsx
git commit -m "feat: add id=rsvp to RSVP section for scroll targeting"
```

---

### Task 2: Replace Hero scroll indicator with RSVP button

**Files:**
- Modify: `src/components/Hero.jsx:104-118`

**Interfaces:**
- Consumes: smooth scroll via `document.getElementById('rsvp').scrollIntoView()`
- Produces: Hero with gold "RSVP Now" CTA button

- [ ] **Step 1: Replace scroll indicator with RSVP button**

Open `src/components/Hero.jsx`. Delete lines 104-118 (the scroll indicator `motion.div` block) and replace with:

```jsx
      {/* RSVP CTA button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2"
      >
        RSVP Now
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>
```

- [ ] **Step 2: Verify**

Run `npm run dev` and confirm:
- The Hero section shows a gold "RSVP Now" button with a chevron at the bottom
- Clicking it smooth-scrolls to the RSVP form
- The old scroll indicator (mouse icon) is gone

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: replace scroll indicator with RSVP Now button in Hero"
```

---

### Task 3: Create FloatingRSVP component

**Files:**
- Create: `src/components/FloatingRSVP.jsx`

**Interfaces:**
- Consumes: smooth scroll via `document.getElementById('rsvp').scrollIntoView()`
- Produces: `<FloatingRSVP />` component ready to mount in App

- [ ] **Step 1: Create the FloatingRSVP component**

Create `src/components/FloatingRSVP.jsx` with:

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingRSVP = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('section')
    const rsvp = document.getElementById('rsvp')
    if (!hero || !rsvp) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    const rsvpObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false)
        }
      },
      { threshold: 0.2 }
    )

    heroObserver.observe(hero)
    rsvpObserver.observe(rsvp)

    return () => {
      heroObserver.disconnect()
      rsvpObserver.disconnect()
    }
  }, [])

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToRSVP}
          className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-gold text-black font-semibold rounded-full shadow-lg hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          RSVP Now
          <span className="text-lg">✦</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingRSVP
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FloatingRSVP.jsx
git commit -m "feat: add FloatingRSVP component with IntersectionObserver"
```

---

### Task 4: Mount FloatingRSVP in App

**Files:**
- Modify: `src/App.jsx:1-10` (imports), `src/App.jsx:48` (render)

**Interfaces:**
- Consumes: `<FloatingRSVP />` from Task 3

- [ ] **Step 1: Add import**

Open `src/App.jsx`. Add after line 10 (the `Responses` import):

```jsx
import FloatingRSVP from './components/FloatingRSVP'
```

- [ ] **Step 2: Mount the component**

In `src/App.jsx`, add `<FloatingRSVP />` after line 49 (`<Footer />`), inside the wrapping `<div>`:

```jsx
      <Footer />
      <FloatingRSVP />
```

- [ ] **Step 3: Verify end-to-end**

Run `npm run dev` and confirm:
1. Hero shows "RSVP Now" button with chevron at bottom
2. Clicking it smooth-scrolls to RSVP section
3. After scrolling past the Hero, a floating gold "RSVP Now ✦" button appears bottom-right
4. Floating button smooth-scrolls to RSVP when clicked
5. Floating button hides when the RSVP section is in view
6. Floating button is hidden while the Hero is in view
7. On mobile, the floating button doesn't overlap the mute button (top-right)

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: mount FloatingRSVP in HomePage"
```
