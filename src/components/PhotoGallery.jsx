import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    name: 'Starting Years',
    photos: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      src: `/images/starting_years (${i + 1}).jpg`,
      alt: `Starting Years ${i + 1}`,
    })),
  },
  {
    name: 'Selfie',
    photos: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      src: `/images/selfie (${i + 1}).jpg`,
      alt: `Selfie ${i + 1}`,
    })),
  },
  {
    name: 'Model',
    photos: Array.from({ length: 12 }, (_, i) => ({
      id: 100 + i + 1,
      src: `/images/model (${i + 1}).jpg`,
      alt: `Model ${i + 1}`,
    })),
  },
  {
    name: 'Presents',
    photos: Array.from({ length: 8 }, (_, i) => ({
      id: 200 + i + 1,
      src: `/images/presents (${i + 1}).jpg`,
      alt: `Presents ${i + 1}`,
    })),
  },
]

const ITEM_W = 256
const GAP = 16

const Lightbox = ({ photos, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full border border-gold/40 bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold transition-colors cursor-pointer z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold/40 bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold transition-colors cursor-pointer z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold/40 bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold transition-colors cursor-pointer z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="max-w-4xl w-full mx-16 max-h-[85vh] flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
        <motion.img
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, info) => {
            if (info.offset.x < -60) onNext()
            else if (info.offset.x > 60) onPrev()
          }}
          src={photos[index].src}
          alt={photos[index].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        />
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20">
        <span className="text-cream/70 text-sm tracking-widest">
          {index + 1} / {photos.length}
        </span>
      </div>
    </motion.div>
  )
}

const InfiniteStrip = ({ photos, onImageClick }) => {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const [offset, setOffset] = useState(0)

  const count = photos.length
  const setWidth = count * ITEM_W + (count - 1) * GAP
  const speed = count * 12

  useEffect(() => {
    let lastTime = performance.now()

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      if (!pausedRef.current) {
        offsetRef.current += speed * dt
        if (offsetRef.current >= setWidth) offsetRef.current -= setWidth
      }

      setOffset(offsetRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [setWidth, speed])

  const handleClick = (e, idx) => {
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x >= 0 && x <= rect.width) onImageClick(idx)
  }

  const doubled = [...photos, ...photos]

  return (
    <div
      className="overflow-hidden rounded-xl border border-gold/20 select-none"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => { pausedRef.current = false }}
    >
      <div
        ref={trackRef}
        className="flex py-2 px-2"
        style={{
          width: 'max-content',
          gap: `${GAP}px`,
          transform: `translateX(${-offset}px)`,
          willChange: 'transform',
        }}
      >
        {doubled.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="flex-none w-60 rounded-lg overflow-hidden border border-gold/15 bg-black/40 shrink-0 hover:border-gold/40 transition-colors cursor-pointer"
            onClick={(e) => handleClick(e, i % photos.length)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-52 object-contain pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const PhotoGallery = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  const currentPhotos = categories[activeTab].photos

  const openLightbox = useCallback((index) => {
    setLightbox(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const nextImage = useCallback(() => {
    setLightbox((prev) => (prev + 1) % currentPhotos.length)
  }, [currentPhotos.length])

  const prevImage = useCallback(() => {
    setLightbox((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length)
  }, [currentPhotos.length])

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">&#10022;</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-gold">
          Memories Through the Years
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => { setActiveTab(i); setLightbox(null) }}
              className={`px-5 py-2 rounded-full text-sm font-body tracking-wide transition-all duration-300 cursor-pointer border ${
                i === activeTab
                  ? 'bg-gold/15 border-gold/50 text-gold'
                  : 'bg-transparent border-gold/15 text-cream/50 hover:text-cream/70 hover:border-gold/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InfiniteStrip photos={currentPhotos} onImageClick={openLightbox} />
          </motion.div>
        </AnimatePresence>

        <p className="text-center mt-6 text-cream/40 text-xs tracking-wide">
          Hover to pause &middot; Click to preview
        </p>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={currentPhotos}
            index={lightbox}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default PhotoGallery
