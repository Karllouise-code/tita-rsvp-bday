import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import PhotoGallery from './components/PhotoGallery'

function App() {
  return (
    <div className="min-h-screen bg-black text-cream font-body">
      <Hero />
      <EventDetails />
      <PhotoGallery />
    </div>
  )
}

export default App
