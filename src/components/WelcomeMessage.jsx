import { motion } from 'framer-motion'

const WelcomeMessage = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-gold mb-6">
          Please Join Us
        </h2>

        <p className="text-cream/80 text-lg leading-relaxed mb-4">
          Get ready for a night of fun games, exciting activities,
          and unforgettable moments!
        </p>

        <p className="text-cream/70 text-base leading-relaxed">
          Join us as we celebrate Rose's milestone with laughter, prizes,
          and a night full of entertainment hosted by our special host:{' '}
          <span className="text-gold font-semibold">Singing Host Bri</span>.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>
      </motion.div>
    </section>
  )
}

export default WelcomeMessage
