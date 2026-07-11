import { motion } from 'framer-motion'

const Footer = () => {
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
