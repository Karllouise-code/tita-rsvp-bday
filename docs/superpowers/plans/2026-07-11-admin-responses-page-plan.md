# Admin Responses Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Formspree with Firebase Firestore for RSVP storage and add a `/responses` admin page showing summary stats and full submission list.

**Architecture:** Firebase Firestore stores RSVP submissions. RSVP form writes directly to Firestore. A new `/responses` page reads from Firestore and displays stats (total, attending, declining, guests) plus a full table of responses. Same elegant gold/black theme.

**Tech Stack:** React, Firebase (firebase/app + firebase/firestore), Tailwind CSS, motion.dev

## Global Constraints

- Theme: Elegant/formal — Gold (`#D4AF37`) + Black (`#0A0A0A`) + Cream (`#FFF8E7`)
- Fonts: Playfair Display (headings), Inter (body)
- Mobile-first responsive design
- Firebase Firestore for data storage
- No authentication on `/responses` page
- Same visual style as invitation site

---

## File Structure

```
src/
├── firebase.js              # Firebase config + Firestore init
├── components/
│   ├── RSVPForm.jsx         # MODIFY — submit to Firestore
│   └── Responses.jsx        # CREATE — admin page
├── App.jsx                  # MODIFY — add /responses route
```

---

## Tasks

### Task 1: Firebase Setup + Install Dependencies

**Files:**
- Create: `src/firebase.js`
- Modify: `package.json` (add firebase, remove @formspree/react)

**Interfaces:**
- Produces: Initialized Firestore `db` export for use in other files

- [ ] **Step 1: Install Firebase, remove Formspree**

```bash
npm install firebase
npm uninstall @formspree/react
```

- [ ] **Step 2: Create `src/firebase.js`**

```js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace with your Firebase config from Project Settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Firebase SDK, remove Formspree"
```

---

### Task 2: Update RSVP Form to Use Firestore

**Files:**
- Modify: `src/components/RSVPForm.jsx`

**Interfaces:**
- Consumes: `db` from `src/firebase.js`
- Produces: Form submits documents to Firestore collection `rsvp-submissions`

- [ ] **Step 1: Rewrite `src/components/RSVPForm.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const RSVPForm = () => {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      attending: formData.get('attending'),
      guests: parseInt(formData.get('guests')) || 1,
      message: formData.get('message') || '',
      timestamp: serverTimestamp(),
    }

    try {
      await addDoc(collection(db, 'rsvp-submissions'), data)
      setStatus('success')
    } catch (error) {
      console.error('Error submitting RSVP:', error)
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
                      value="Joyfully Accept"
                      required
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="Regretfully Decline"
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
                  defaultValue="1"
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Message for Rose (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="A birthday message for Rose..."
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

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RSVPForm.jsx
git commit -m "feat: update RSVP form to submit to Firestore"
```

---

### Task 3: Create Responses Admin Page

**Files:**
- Create: `src/components/Responses.jsx`
- Modify: `src/App.jsx` (add route)

**Interfaces:**
- Consumes: `db` from `src/firebase.js`
- Produces: `<Responses />` component — stats cards + full table

- [ ] **Step 1: Create `src/components/Responses.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const StatCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 border border-gold/20 rounded-lg bg-black/50 text-center"
  >
    <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">{label}</p>
    <p className="font-heading text-4xl text-gold font-bold">{value}</p>
  </motion.div>
)

const Responses = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(collection(db, 'rsvp-submissions'), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setSubmissions(data)
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const totalRSVPs = submissions.length
  const attending = submissions.filter(s => s.attending === 'Joyfully Accept').length
  const declining = submissions.filter(s => s.attending === 'Regretfully Decline').length
  const totalGuests = submissions.reduce((sum, s) => sum + (s.guests || 0), 0)

  return (
    <div className="min-h-screen bg-black text-cream font-body">
      {/* Header */}
      <div className="py-12 px-4 border-b border-gold/20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-gold mb-2">
            Rose's 60th RSVPs
          </h1>
          <p className="text-cream/50 text-sm">Admin Dashboard</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gold/50 text-lg">Loading responses...</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <StatCard label="Total RSVPs" value={totalRSVPs} delay={0} />
              <StatCard label="Attending" value={attending} delay={0.1} />
              <StatCard label="Declining" value={declining} delay={0.2} />
              <StatCard label="Total Guests" value={totalGuests} delay={0.3} />
            </div>

            {/* Submissions Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-heading text-2xl text-gold mb-6">All Responses</h2>

              {submissions.length === 0 ? (
                <div className="text-center py-12 border border-gold/20 rounded-lg bg-black/50">
                  <p className="text-cream/50">No responses yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-gold/20 rounded-lg bg-black/50">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Name</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Attending</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Guests</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest hidden md:table-cell">Message</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest hidden sm:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub, index) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gold/10 last:border-0"
                        >
                          <td className="px-4 py-3 text-cream font-medium">{sub.name}</td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${sub.attending === 'Joyfully Accept' ? 'text-green-400' : 'text-red-400'}`}>
                              {sub.attending}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-cream/70">{sub.guests}</td>
                          <td className="px-4 py-3 text-cream/50 text-sm hidden md:table-cell max-w-xs truncate">
                            {sub.message || '—'}
                          </td>
                          <td className="px-4 py-3 text-cream/50 text-sm hidden sm:table-cell">
                            {sub.timestamp?.toDate?.().toLocaleDateString() || '—'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>

            {/* Back link */}
            <div className="text-center mt-12">
              <a
                href="/"
                className="text-gold/50 hover:text-gold text-sm transition-colors"
              >
                ← Back to Invitation
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Responses
```

- [ ] **Step 2: Update `src/App.jsx` to add route**

```jsx
import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import WelcomeMessage from './components/WelcomeMessage'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import Responses from './components/Responses'

function HomePage() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {
        setIsMuted(true)
        audioRef.current.muted = true
      })
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.muted = false
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.muted = true
    }
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <audio ref={audioRef} loop muted autoPlay>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <Hero isMuted={isMuted} toggleMute={toggleMute} />
      <WelcomeMessage />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
      <RSVPForm />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/responses" element={<Responses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 3: Install react-router-dom**

```bash
npm install react-router-dom
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Responses admin page with stats and table"
```

---

### Task 4: Final Testing + Deploy

**Files:**
- Verify: All components work together

**Interfaces:**
- Consumes: All previous tasks
- Produces: Production-ready site with Firestore integration

- [ ] **Step 1: Full build test**

```bash
npm run build
npm run preview
```

- [ ] **Step 2: Test flow**
1. Open site, fill out RSVP form
2. Check Firestore console — should see document
3. Open `/responses` — should see stats and table

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: final testing and polish"
```

---

## Firebase Setup Steps (User)

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click **Create a project** → name it (e.g., "rose-60th-rsvp")
3. Skip Google Analytics (not needed)
4. Click **Firestore Database** → **Create database**
5. Choose **Start in test mode** → Select location (asia-southeast1 for PH)
6. Go to **Project Settings** (gear icon) → **General** tab
7. Scroll to **Your apps** → Click web icon `</>`
8. Register app (e.g., "rose-rsvp-web")
9. Copy the `firebaseConfig` object
10. Paste into `src/firebase.js` replacing the placeholder values
11. Push code → Netlify redeploys → Site works with Firestore
