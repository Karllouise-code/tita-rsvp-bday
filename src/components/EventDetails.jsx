import { motion } from 'framer-motion'

const EventDetails = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="w-16 h-px bg-gold/40" />
          <span className="text-gold text-2xl">✦</span>
          <span className="w-16 h-px bg-gold/40" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-gold mb-12">
          Join Us for the Celebration
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Date</p>
            <p className="font-heading text-xl text-cream">August 16, 2026</p>
            <p className="text-cream/50 text-sm mt-1">Sunday</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Time</p>
            <p className="font-heading text-xl text-cream">[TBD]</p>
            <p className="text-cream/50 text-sm mt-1">Cocktails start at [TBD]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Venue</p>
            <p className="font-heading text-xl text-cream">[Zambales Resort]</p>
            <p className="text-cream/50 text-sm mt-1">[Full address TBD]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Attire</p>
            <p className="font-heading text-xl text-cream">Semi-Formal</p>
            <p className="text-cream/50 text-sm mt-1">Filipiniana encouraged</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default EventDetails
