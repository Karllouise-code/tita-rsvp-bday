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
