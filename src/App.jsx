import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'
import Countdown from './components/Countdown'
import RSVPForm from './components/RSVPForm'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
      <RSVPForm />
    </div>
  )
}

export default App
