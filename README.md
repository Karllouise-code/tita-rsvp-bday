# Rose's 60th Birthday Celebration

An elegant invitation website for Rose's 60th birthday celebration — "Sassy. Classy. Sixty."

**Live Site:** [rosela60th.netlify.app](https://rosela60th.netlify.app)

## Features

- **Animated Hero** — Framer Motion entrance animations with "ROSE" letter reveal
- **Background Music** — Muted by default, toggle via button (browser autoplay policy compliant)
- **Welcome Message** — Animated section introducing the event
- **Event Details** — Date, time, venue (with Google Maps link), and attire info
- **Photo Gallery** — Image gallery with infinite scroll strip
- **Countdown Timer** — Live countdown to August 16, 2026
- **RSVP Form** — Submit responses (attending/declining), guest count, and message — stored in Firebase Firestore
- **Floating RSVP Button** — Glass-style button appears while scrolling, auto-hides when RSVP section is in view
- **Share Invitation** — Native share API with clipboard fallback
- **Responsive Design** — Mobile-first with Tailwind CSS

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Firebase](https://firebase.google.com/) | Firestore database for RSVP responses |
| [React Router](https://reactrouter.com/) | Client-side routing |

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore enabled

### Setup

```bash
# Clone the repository
git clone https://github.com/<your-username>/roselia-rito-bday.git
cd roselia-rito-bday

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Firebase Configuration

Update `src/firebase.js` with your Firebase project credentials:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
}
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Deployment

Deployed on [Netlify](https://www.netlify.com/). The `netlify.toml` config handles the build and SPA redirects.

To deploy manually:

```bash
npm run build
# Upload the `dist/` folder to Netlify
```

## Project Structure

```
├── public/
│   ├── images/          # Static images
│   └── music/           # Background music (background.mp3)
├── src/
│   ├── components/
│   │   ├── Hero.jsx             # Hero section with animated title
│   │   ├── WelcomeMessage.jsx   # Welcome text section
│   │   ├── EventDetails.jsx     # Date, time, venue, attire cards
│   │   ├── PhotoGallery.jsx     # Infinite scroll photo strip
│   │   ├── Countdown.jsx        # Live countdown timer
│   │   ├── RSVPForm.jsx         # RSVP form with Firebase
│   │   ├── FloatingRSVP.jsx     # Floating RSVP button
│   │   ├── Responses.jsx        # Admin view of RSVP responses
│   │   └── Footer.jsx           # Footer with share button
│   ├── firebase.js      # Firebase configuration
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── netlify.toml         # Netlify build & redirect config
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## License

ISC
