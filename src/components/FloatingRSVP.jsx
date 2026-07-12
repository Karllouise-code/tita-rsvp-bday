import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingRSVP = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('section')
    const rsvp = document.getElementById('rsvp')
    if (!hero || !rsvp) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    const rsvpObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false)
        }
      },
      { threshold: 0.2 }
    )

    heroObserver.observe(hero)
    rsvpObserver.observe(rsvp)

    return () => {
      heroObserver.disconnect()
      rsvpObserver.disconnect()
    }
  }, [])

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToRSVP}
          className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-black/40 backdrop-blur-md border border-gold/40 text-gold font-semibold rounded-full hover:bg-black/50 hover:border-gold/60 transition-all flex items-center gap-2 shadow-lg"
        >
          RSVP Now
          <span className="text-lg">✦</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingRSVP
