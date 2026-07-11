import { useState, useRef, useEffect } from 'react'
import Hero from './components/Hero'
import WelcomeMessage from './components/WelcomeMessage'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'

function App() {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay — user will need to click unmute
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
      {/* Background music - autoplay muted */}
      <audio ref={audioRef} loop autoPlay>
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
