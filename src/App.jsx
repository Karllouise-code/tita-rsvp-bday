import Hero from './components/Hero'
import WelcomeMessage from './components/WelcomeMessage'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
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
