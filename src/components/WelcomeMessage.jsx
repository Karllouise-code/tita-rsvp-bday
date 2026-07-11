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

        <p className="text-cream/70 text-lg leading-relaxed mb-4">
          Sixty years of beautiful memories, and we're just getting started!
        </p>

        <p className="text-cream/50 text-base leading-relaxed">
          Celebrate Rose's 60th birthday with an evening of good food,
          great music, and even better company.
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
