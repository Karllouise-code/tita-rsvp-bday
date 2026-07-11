import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// TODO: Replace with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guests: '1',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
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
          {status === 'success' ? (
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Juan Dela Cruz"
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
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-cream">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      required
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
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold/70 text-sm uppercase tracking-widest mb-2">
                  Message for Tita (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-gold/30 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="A birthday message for Tita..."
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
