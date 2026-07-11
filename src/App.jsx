import { useState, useRef, useEffect } from 'react'
import Hero from './components/Hero'
import WelcomeMessage from './components/WelcomeMessage'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'

function App() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.play().catch(() => {})
    }
    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-black text-cream font-body">
      {/* Background music - autoplay muted */}
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

export default App
