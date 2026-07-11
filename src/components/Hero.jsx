import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = ({ isMuted, toggleMute }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient background with subtle orange warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0f05] to-black" />

      {/* Subtle orange glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D45A00]/10 rounded-full blur-3xl" />

      {/* Ornamental gold line top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Mute/Unmute button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors bg-black/40 backdrop-blur-sm"
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </motion.button>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-gold-light tracking-[0.3em] uppercase text-sm mb-6"
        >
          You're Invited
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-[#D45A00]">SASSY.</span>{' '}
          <span className="text-gold">CLASSY.</span>{' '}
          <span className="text-[#D45A00]">SIXTY.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-4 md:gap-6 mb-8"
        >
          {['R', 'O', 'S', 'E'].map((letter, index) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
              className="font-heading text-7xl md:text-9xl lg:text-[10rem] text-[#D45A00] font-bold leading-none"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center justify-center gap-4 text-cream/50 text-sm"
        >
          <span className="w-12 h-px bg-gold/40" />
          <span className="tracking-widest uppercase">August 16, 2026</span>
          <span className="w-12 h-px bg-gold/40" />
        </motion.div>
      </div>

      {/* Ornamental gold line bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-gold/40 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-gold/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
