import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const RSVPForm = () => {
  const [status, setStatus] = useState('idle') // idle, submitting, succeeded, error
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guests: 1,
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        guests: Number(formData.guests),
        createdAt: serverTimestamp(),
      })
      setStatus('succeeded')
    } catch (err) {
      console.error('Error adding document: ', err)
      setStatus('error')
    }
  }

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-gold/40" />
            <span className="text-gold text-2xl">✦</span>
            <span className="w-16 h-px bg-gold/40" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-gold mb-4">
            RSVP
          </h2>
          <p className="text-cream/50 text-sm">
            Kindly respond by August 2, 2026
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'succeeded' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border border-gold/20 rounded-lg bg-black/50"
            >
              <p className="font-heading text-2xl text-gold mb-4">Thank You!</p>
              <p className="text-cream/70">
                We look forward to celebrating with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 p-8 border border-gold/20 rounded-lg bg-black/50"
            >
              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Will you attend?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="Joyfully Accept"
                      required
                      checked={formData.attending === 'Joyfully Accept'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="Regretfully Decline"
                      required
                      checked={formData.attending === 'Regretfully Decline'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Message for Rose (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="A birthday message for Rose..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default RSVPForm
