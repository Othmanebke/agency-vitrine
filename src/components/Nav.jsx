import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function navigate(path) {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Tarifs', path: '/pricing' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'À propos', path: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(window.location.pathname)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onPop = () => { setCurrent(window.location.pathname); setOpen(false) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, link) => {
    if (link.hash) { setOpen(false); return }
    e.preventDefault()
    navigate(link.path)
    setOpen(false)
  }

  const isActive = (link) => {
    if (link.hash) return false
    return current === link.path
  }

  return (
    <>
      {/* Sticky wrapper — compact floating pill */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 px-4 pt-2.5 pb-3"
      >
        {/* Glass pill container — compact */}
        <div
          className={`mx-auto max-w-4xl rounded-xl overflow-hidden transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/40' : ''
            }`}
          style={{
            background: scrolled ? 'rgba(10, 8, 22, 0.7)' : 'rgba(10, 8, 22, 0.45)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(139,92,246,${scrolled ? '0.12' : '0.06'})`,
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(236,72,153,0.4), transparent)',
            }}
          />

          <div className="px-4 flex items-center justify-between" style={{ height: '56px' }}>
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNav(e, { path: '/' })}
              className="flex items-center gap-2 group"
            >
              <img src="/logo.png" alt="WEXOR Logo" className="h-14 w-auto scale-110 origin-left hover:scale-125 hover:brightness-125 transition-all duration-300" />
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-0.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleNav(e, link)}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-200 ${isActive(link) ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact') }}
                className="ml-2 relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-md shadow-violet-500/30 hover:shadow-violet-500/60 hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Devis gratuit</span>
                <svg className="relative w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </nav>

            {/* Burger */}
            <button
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen(o => !o)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-5 h-0.5 bg-white origin-center transition-all" />
              <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} className="block w-5 h-0.5 bg-white" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-5 h-0.5 bg-white origin-center transition-all" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mx-auto max-w-4xl mt-2 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(10, 8, 22, 0.85)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="px-4 py-3 space-y-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleNav(e, link)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link) ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); navigate('/contact'); setOpen(false) }}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow shadow-violet-500/30"
                >
                  Devis gratuit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
