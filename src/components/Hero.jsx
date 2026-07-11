import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient background with subtle orange warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0f05] to-black" />

      {/* Subtle orange glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D45A00]/10 rounded-full blur-3xl" />

      {/* Ornamental gold line top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

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

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#D45A00] font-bold mb-8"
        >
          ROSE
        </motion.h2>

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
