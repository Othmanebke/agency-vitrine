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
    if (!localStorage.getItem(COOKIE_KEY)) {
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => { localStorage.setItem(COOKIE_KEY, 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem(COOKIE_KEY, 'declined'); setVisible(false) }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[9990] left-0 right-0 px-3 sm:px-4"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
          role="dialog"
          aria-label="Consentement cookies"
        >
          {/* inner card */}
          <div className="max-w-2xl mx-auto bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
            {/* violet top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

            <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              {/* icon + text */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden>🍪</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Nous utilisons des cookies fonctionnels pour améliorer votre expérience.{' '}
                  <button
                    onClick={() => navigate('/mentions-legales')}
                    className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors whitespace-nowrap"
                  >
                    En savoir plus
                  </button>
                </p>
              </div>

              {/* buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={decline}
                  className="flex-1 sm:flex-none text-xs px-4 py-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 active:scale-95 transition-all"
                >
                  Refuser
                </button>
                <button
                  onClick={accept}
                  className="flex-1 sm:flex-none text-xs px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold transition-all shadow-lg shadow-violet-900/40"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
