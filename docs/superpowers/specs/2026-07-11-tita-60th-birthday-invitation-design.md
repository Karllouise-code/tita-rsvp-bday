# Tita's 60th Birthday — Digital Invitation Website

## Overview

A single-page React.js digital invitation (e-vite) for a 60th birthday celebration. Elegant/formal theme with gold and black color palette. Animated with motion.dev for a cinematic, video-like experience. RSVP data collected via Formspree (no backend). Deployed on Vercel.

---

## Theme & Design Tokens

- **Primary Colors:** Black (`#0A0A0A`), Gold (`#D4AF37`)
- **Accent:** Soft cream/ivory (`#FFF8E7`) for text backgrounds
- **Fonts:**
  - Headings: Playfair Display (serif, elegant)
  - Body: Inter (clean sans-serif)
- **Style:** Elegant, formal, celebratory — gold gradients, subtle floral/ornamental accents

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React.js (Vite) |
| Animations | motion.dev (framer-motion) |
| Styling | Tailwind CSS |
| RSVP Data | Formspree (free tier) |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## Page Sections (Top to Bottom)

### 1. Hero Section
- Full-screen background: gold gradient with subtle ornamental/pattern overlay
- Animated text sequence using motion.dev:
  1. "You're Invited" fades in with slight upward motion
  2. "Celebrating 60 Years of" fades in (delayed)
  3. "[Tita's Name]" enters with scale + fade (delayed)
- Gentle floating animation on decorative elements

### 2. Event Details Section
- Centered card or section with elegant border/styling
- Content:
  - **Date:** August 16, 2026
  - **Time:** [Placeholder — TBD]
  - **Venue:** [Placeholder — Zambales Resort, TBD]
  - **Dress Code:** [Placeholder — Semi-formal / Filipiniana]
- motion.dev: section fades in on scroll (IntersectionObserver trigger)

### 3. Photo Gallery Section
- Responsive grid layout:
  - Mobile: 2 columns
  - Tablet: 3 columns
  - Desktop: 4 columns
- Placeholder images (gray boxes with camera icon) until real photos arrive
- motion.dev: photos stagger in on scroll (each photo animates with slight delay), subtle scale on hover

### 4. Countdown Timer Section
- Large, elegant countdown display: `XX Days : XX Hours : XX Minutes : XX Seconds`
- Gold numbers on dark background
- Updates every second in real-time
- motion.dev: numbers animate on change (flip/slide effect)

### 5. RSVP Form Section
- Clean, centered form with elegant styling
- Fields:
  - **Name** (text, required)
  - **Attending** (Yes / No radio buttons, required)
  - **Number of Guests** (number input, default 1)
  - **Message for Tita** (textarea, optional)
- Submit button with gold hover effect
- Success state: "Thank you! We look forward to celebrating with you."
- motion.dev: form slides up on scroll, success message fades in

### 6. Footer
- **Share Button:** Copies link to clipboard + opens share sheet (Messenger, Viber, Facebook)
- **Hosted By:** "Hosted with love by [Your Name]"
- **Music Toggle:** Small speaker icon, click to play/pause background music
  - Starts muted (respects autoplay policies)
  - Soft classical/elegant instrumental track
- motion.dev: subtle fade-in on scroll

---

## RSVP Data Collection

- **Service:** Formspree (https://formspree.io)
- **How it works:**
  - Create a form on Formspree, get a form ID
  - React form submits POST to Formspree endpoint
  - Responses viewable on Formspree dashboard (exportable to CSV)
- **Free tier:** 50 submissions/month — more than enough
- **No backend required** — stays fully static on Vercel

---

## Responsive Design (Mobile-First)

- Designed for mobile first (primary viewing: Messenger/Viber on phones)
- Breakpoints:
  - Mobile: < 640px (default)
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Touch-friendly buttons and form inputs
- Readable text sizes on all screens

---

## File Structure (Planned)

```
roselia-rito-bday/
├── public/
│   └── images/          # Placeholder + real photos later
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── EventDetails.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── Countdown.jsx
│   │   ├── RSVPForm.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Tailwind + custom styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── docs/
    └── superpowers/specs/
        └── 2026-07-11-tita-60th-birthday-invitation-design.md
```

---

## Placeholders (To Be Finalized Later)

| Item | Placeholder Value |
|------|-------------------|
| Tita's Name | [TBD] |
| Party Time | [TBD] |
| Venue Full Address | Zambales Resort, [Specific Resort TBD] |
| Dress Code | Semi-formal / Filipiniana |
| Background Music | Elegant instrumental (TBD) |
| Photos | Placeholder images until real photos arrive |

---

## Success Criteria

1. Website loads fast on mobile (Vercel CDN)
2. Elegant, formal visual feel — gold/black theme
3. Smooth scroll animations via motion.dev
4. Countdown timer works correctly
5. RSVP form submits to Formspree successfully
6. Share button works on mobile devices
7. Background music plays/pauses on user interaction
8. Deployed and accessible via Vercel URL

---

## Future Enhancements (Out of Scope for Now)

- Animated photo slideshow (auto-play)
- Guest message wall / guestbook
- QR code generation for sharing
- Custom domain mapping on Vercel
