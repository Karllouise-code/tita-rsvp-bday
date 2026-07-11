import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const targetDate = new Date('2026-08-16T17:00:00').getTime()

const calculateTimeLeft = () => {
  const now = new Date().getTime()
  const diff = targetDate - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gold/30 rounded-lg bg-black/60">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-heading text-4xl md:text-5xl text-gold font-bold"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-2 text-cream/70 text-xs uppercase tracking-widest">{label}</span>
  </div>
)

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-gold mb-12">
          Counting Down To
        </h2>

        <div className="flex justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </section>
  )
}

export default Countdown
