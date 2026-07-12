import { motion } from 'framer-motion'

const EventDetails = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <img
        src="/images/presents (3).jpg"
        alt=""
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-auto object-cover opacity-25 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%, black 20%, transparent 70%)',
        }}
      />
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
            <p className="text-cream/70 text-sm mt-1">Sunday</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Time</p>
            <p className="font-heading text-xl text-cream">4:30 PM</p>
            <p className="text-cream/70 text-sm mt-1">Program starts at 4:30 PM</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 border border-gold/20 rounded-lg bg-black/50"
          >
            <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">Venue</p>
            <a
              href="https://www.google.com/maps/place/The+Serene+Woodlands+Private+Resort+%26+Events+Place/@14.9506503,120.6792961,12z/data=!4m10!1m2!2m1!1sThe+Serene+Woodlands+200+BE+Rose+St+Inaon+Pulilan+Bulacan!3m6!1s0x339655006538ee01:0x9980e919fc4de030!8m2!3d14.9506503!4d120.8317314!15sCjlUaGUgU2VyZW5lIFdvb2RsYW5kcyAyMDAgQkUgUm9zZSBTdCBJbmFvbiBQdWxpbGFuIEJ1bGFjYW5aOyI5dGhlIHNlcmVuZSB3b29kbGFuZHMgMjAwIGJlIHJvc2Ugc3QgaW5hb24gcHVsaWxhbiBidWxhY2FukgENc3dpbW1pbmdfcG9vbJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMTBTRkZyUm0xUlZrRjRWVEZTYkdSdVdqUldNMDVQVWtWYWNFMVdSUkFC4AEA-gEECF0QQw!16s%2Fg%2F11xdk03nvf?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <p className="font-heading text-xl text-cream group-hover:text-gold transition-colors">The Serene Woodlands</p>
              <p className="text-cream/70 text-sm mt-1 group-hover:text-gold/70 transition-colors">200 BE Rose St., Inaon, Pulilan, Bulacan</p>
              <p className="text-gold/40 text-xs mt-2 tracking-wider uppercase">Open in Maps</p>
            </a>
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
            <p className="text-cream/70 text-sm mt-1">Light colors: white, cream, or light brown</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default EventDetails
