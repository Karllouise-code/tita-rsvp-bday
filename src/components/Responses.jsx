import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const StatCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 border border-gold/20 rounded-lg bg-black/50 text-center"
  >
    <p className="text-gold/70 text-sm uppercase tracking-widest mb-2">{label}</p>
    <p className="font-heading text-4xl text-gold font-bold">{value}</p>
  </motion.div>
)

const Responses = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(collection(db, 'rsvp-submissions'), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setSubmissions(data)
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const totalRSVPs = submissions.length
  const attending = submissions.filter(s => s.attending === 'Joyfully Accept').length
  const declining = submissions.filter(s => s.attending === 'Regretfully Decline').length
  const totalGuests = submissions.reduce((sum, s) => sum + (s.guests || 0), 0)

  return (
    <div className="min-h-screen bg-black text-cream font-body">
      {/* Header */}
      <div className="py-12 px-4 border-b border-gold/20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-gold mb-2">
            Rose's 60th RSVPs
          </h1>
          <p className="text-cream/50 text-sm">Admin Dashboard</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gold/50 text-lg">Loading responses...</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <StatCard label="Total RSVPs" value={totalRSVPs} delay={0} />
              <StatCard label="Attending" value={attending} delay={0.1} />
              <StatCard label="Declining" value={declining} delay={0.2} />
              <StatCard label="Total Guests" value={totalGuests} delay={0.3} />
            </div>

            {/* Submissions Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-heading text-2xl text-gold mb-6">All Responses</h2>

              {submissions.length === 0 ? (
                <div className="text-center py-12 border border-gold/20 rounded-lg bg-black/50">
                  <p className="text-cream/50">No responses yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-gold/20 rounded-lg bg-black/50">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Name</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Attending</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest">Guests</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest hidden md:table-cell">Message</th>
                        <th className="px-4 py-3 text-gold/70 text-sm uppercase tracking-widest hidden sm:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub, index) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gold/10 last:border-0"
                        >
                          <td className="px-4 py-3 text-cream font-medium">{sub.name}</td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${sub.attending === 'Joyfully Accept' ? 'text-green-400' : 'text-red-400'}`}>
                              {sub.attending}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-cream/70">{sub.guests}</td>
                          <td className="px-4 py-3 text-cream/50 text-sm hidden md:table-cell max-w-xs truncate">
                            {sub.message || '—'}
                          </td>
                          <td className="px-4 py-3 text-cream/50 text-sm hidden sm:table-cell">
                            {sub.timestamp?.toDate?.().toLocaleDateString() || '—'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>

            {/* Back link */}
            <div className="text-center mt-12">
              <a
                href="/"
                className="text-gold/50 hover:text-gold text-sm transition-colors"
              >
                ← Back to Invitation
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Responses
