import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleShare = async () => {
    const shareData = {
      title: "Rose's 60th Birthday Celebration",
      text: "You're invited to celebrate 60 years of joy! Join us on August 16, 2026.",
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <footer className="py-16 px-4 border-t border-gold/20">
      {/* Background music — user provides audio file */}
      <audio ref={audioRef} loop>
        {/* TODO: Add your music file to public/music/background.mp3 */}
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center space-y-8"
      >
        {/* Share Button */}
        <div>
          <p className="text-gold/70 text-sm uppercase tracking-widest mb-4">
            Share the Joy
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-8 py-3 border border-gold rounded-full text-gold hover:bg-gold hover:text-black transition-colors"
          >
            Share Invitation
          </motion.button>
        </div>

        {/* Music Toggle */}
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors mx-auto"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </motion.button>
          <p className="text-cream/30 text-xs mt-2">
            {isPlaying ? 'Playing' : 'Click for music'}
          </p>
        </div>

        {/* Credits */}
        <div className="pt-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-16 h-px bg-gold/20" />
            <span className="text-gold/40 text-sm">✦</span>
            <span className="w-16 h-px bg-gold/20" />
          </div>
          <p className="text-cream/30 text-xs">
            Hosted with love by Family
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
