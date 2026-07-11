# RSVP Navigation Design

## Goal

Add prominent RSVP navigation to the Rose's 60th birthday site: a CTA button in the Hero section and a floating button that persists while scrolling, both smooth-scrolling to the RSVP form.

## Approach

**Approach A: Hero RSVP button + floating button with auto-hide.**

The Hero's existing scroll indicator is replaced by an RSVP Now button. A secondary floating RSVP button appears at the bottom-right after scrolling past the Hero and hides when the RSVP section is in view.

## Components to Modify

### 1. `src/components/Hero.jsx` — Hero RSVP Button

**Changes:**
- Remove the scroll indicator (animated mouse icon, lines 105–118)
- Add a gold "RSVP Now" button below the event date line, with a small downward chevron
- Button uses Framer Motion entrance animation (fade-in, delay after date appears)
- Click handler: `document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })`

**Visual spec:**
- Gold filled button (`bg-gold text-black`)
- Rounded-lg, px-6 py-3
- Small downward chevron icon below or inside the button
- `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}` for micro-interactions
- Entrance: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, delay ~2s

### 2. `src/components/FloatingRSVP.jsx` — New Component

**Location:** Fixed bottom-right corner (`position: fixed`, `bottom: 24px`, `right: 24px`)

**Visual spec:**
- Gold filled pill: `bg-gold text-black rounded-full px-5 py-3 shadow-lg`
- Text: `RSVP Now ✦`
- `z-50` to stay above all content
- Framer Motion: slide-in from right + fade on appear, fade-out on hide

**Visibility logic (IntersectionObserver):**
- **Hidden** when Hero section is in view (Hero has its own RSVP button)
- **Visible** after scrolling past the Hero
- **Hidden** when RSVP section is in view (no need to scroll to yourself)
- Two observers: one on the Hero section, one on the RSVP section
- State: `const [visible, setVisible] = useState(false)`
- Hero observer: `setVisible(false)` when intersecting, `setVisible(true)` when not (with a small threshold)
- RSVP observer: `setVisible(false)` when intersecting

**Behavior:**
- Click: `document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })`

### 3. `src/components/RSVPForm.jsx` — Add Section ID

**Changes:**
- Add `id="rsvp"` to the `<section>` element (line 37)
- No other changes to the form

### 4. `src/App.jsx` — Mount FloatingRSVP

**Changes:**
- Import `FloatingRSVP`
- Render `<FloatingRSVP />` inside `HomePage`, outside the main content flow (e.g., after `</div>` wrapping the sections, or as a sibling)

## Data Flow

No state management changes. The floating button is self-contained with its own IntersectionObserver. No props need to be passed between components.

## Edge Cases

- **RSVP form hidden (not rendered):** The floating button still works since it scrolls to the section id. If RSVP is ever conditionally hidden, the floating button should also be hidden.
- **Mobile:** The floating button should not overlap the mute button (top-right). Placing it at bottom-right avoids this.
- **Hero in view on page load:** Floating button starts hidden (correct — Hero has its own RSVP button).

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/Hero.jsx` | Modify — replace scroll indicator with RSVP button |
| `src/components/FloatingRSVP.jsx` | Create — new floating RSVP button component |
| `src/components/RSVPForm.jsx` | Modify — add `id="rsvp"` to section |
| `src/App.jsx` | Modify — import and mount FloatingRSVP |
