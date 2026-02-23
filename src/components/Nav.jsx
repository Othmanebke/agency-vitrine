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
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => { setCurrent(window.location.pathname); setOpen(false) }
    window.addEventListener('popstate', onPop)
    return () => { window.removeEventListener('popstate', onPop) }
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative z-50"
    >
      <div className="mx-auto max-w-7xl">
        <div className="px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNav(e, { path: '/' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-shadow duration-300">N</div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">NovaWeb</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleNav(e, link)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${isActive(link)
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact') }}
              className="ml-3 relative inline-flex items-center gap-1 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-md shadow-violet-500/30 hover:shadow-violet-500/60 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Devis gratuit
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </nav>

          {/* Burger */}
          <button
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-0.5 bg-white origin-center transition-all" />
            <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-0.5 bg-white origin-center transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-5 space-y-1 bg-black/80 backdrop-blur-2xl border-t border-white/10">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleNav(e, link)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link) ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); setOpen(false) }} className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow shadow-violet-500/30">
                Devis gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
