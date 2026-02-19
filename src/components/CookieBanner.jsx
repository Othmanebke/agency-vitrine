import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'nw_cookie_consent'

function navigate(path) {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show only if no consent stored yet
    if (!localStorage.getItem(COOKIE_KEY)) {
      // Small delay so it doesn't conflict with splash screen
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9990] w-[calc(100%-2rem)] max-w-2xl"
          role="dialog"
          aria-label="Consentement cookies"
        >
          <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl shadow-black/60 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* icon */}
            <span className="text-2xl flex-shrink-0" aria-hidden>🍪</span>

            {/* text */}
            <p className="text-xs text-zinc-400 leading-relaxed flex-1">
              Nous utilisons des cookies fonctionnels pour améliorer votre expérience.{' '}
              <button
                onClick={e => { e.preventDefault(); navigate('/mentions-legales') }}
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
              >
                En savoir plus
              </button>
            </p>

            {/* actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none text-xs px-4 py-2 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none text-xs px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
