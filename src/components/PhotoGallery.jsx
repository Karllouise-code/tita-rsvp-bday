import { motion } from 'framer-motion'

const photos = [
  { id: 1, src: '/images/placeholder.svg', alt: 'Photo 1' },
  { id: 2, src: '/images/placeholder.svg', alt: 'Photo 2' },
  { id: 3, src: '/images/placeholder.svg', alt: 'Photo 3' },
  { id: 4, src: '/images/placeholder.svg', alt: 'Photo 4' },
  { id: 5, src: '/images/placeholder.svg', alt: 'Photo 5' },
  { id: 6, src: '/images/placeholder.svg', alt: 'Photo 6' },
]

const PhotoGallery = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
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

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-lg border border-gold/20"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-48 md:h-56 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PhotoGallery
