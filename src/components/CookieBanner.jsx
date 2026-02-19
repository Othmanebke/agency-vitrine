import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'nw_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Small delay so it appears after the splash screen
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  function navigate(path) {
    history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9990] w-[calc(100%-2rem)] max-w-xl"
          role="dialog"
          aria-live="polite"
          aria-label="Consentement cookies"
        >
          <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl shadow-black/60">
            <div className="flex items-start gap-4">
              {/* icon */}
              <span className="text-2xl mt-0.5 flex-shrink-0">🍪</span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-1">Ce site utilise des cookies techniques</p>
                <p className="text-xs text-zinc-500 leading-snug">
                  Uniquement pour mémoriser tes préférences. Aucun tracking, aucune publicité.{' '}
                  <button
                    onClick={() => { decline(); navigate('/legal') }}
                    className="text-violet-400 hover:underline"
                  >
                    En savoir plus
                  </button>
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={accept}
                    className="px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={decline}
                    className="px-4 py-1.5 rounded-full border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
