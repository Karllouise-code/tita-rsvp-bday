# Admin Responses Page — Design Spec

## Overview

Replace Formspree with Firebase Firestore for RSVP data storage. Add a `/responses` admin page to view summary stats and full submission list. Same elegant gold/black theme as the invitation site.

---

## Architecture

- **Database:** Firebase Firestore (free tier)
- **Collection:** `rsvp-submissions`
- **Form:** RSVP form writes directly to Firestore
- **Admin page:** `/responses` reads from Firestore, displays stats + list
- **No authentication** — anyone with the URL can view

---

## RSVP Form Changes

**Remove:**
- `@formspree/react` package
- All Formspree integration code

**Add:**
- Firebase SDK (`firebase/app`, `firebase/firestore`)
- Form submits to Firestore collection `rsvp-submissions`

**Document structure:**
```json
{
  "name": "Juan Dela Cruz",
  "attending": "Joyfully Accept",
  "guests": 2,
  "message": "Happy birthday Rose!",
  "timestamp": "2026-07-11T07:16:00Z"
}
```

---

## /responses Page

### Summary Stats (top section)
Four cards in a row:
- **Total RSVPs** — count of all submissions
- **Attending** — count where attending = "Joyfully Accept"
- **Declining** — count where attending = "Regretfully Decline"
- **Total Guests** — sum of all guest counts

### Full List (below stats)
Table with columns:
- **Name** — submitter name
- **Attending** — Joyfully Accept / Regretfully Decline
- **Guests** — number
- **Message** — birthday message (truncated if long)
- **Date** — submission date

Sorted by newest first.

### Styling
- Same gold/black theme as invitation site
- Gold headings, cream text, black background
- Gold borders on cards and table
- Responsive (stacks on mobile)

---

## Firebase Setup (User Steps)

1. Go to [firebase.google.com](https://firebase.google.com)
2. Create project (e.g., "rose-60th-rsvp")
3. Create Firestore database (start in test mode)
4. Go to Project Settings → Add web app
5. Copy the config object
6. Paste into `src/firebase.js`

---

## File Changes

| File | Action |
|------|--------|
| `src/firebase.js` | **Create** — Firebase config + init |
| `src/components/RSVPForm.jsx` | **Modify** — submit to Firestore instead of Formspree |
| `src/components/Responses.jsx` | **Create** — admin page with stats + list |
| `src/App.jsx` | **Modify** — add route for `/responses` |
| `package.json` | **Modify** — add firebase, remove @formspree/react |

---

## Post-Deployment

- [ ] Create Firebase project
- [ ] Add Firebase config to `src/firebase.js`
- [ ] Test RSVP form submits to Firestore
- [ ] Test `/responses` page loads data
- [ ] Share `/responses` URL with tita
