import React from 'react'
import { motion } from 'framer-motion'

function navigate(path) {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.07]">
      {/* top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="WEXOR Logo" className="h-8 w-auto hover:brightness-125 transition-all duration-300" />
          </div>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">Création de sites sur-mesure, identité visuelle et stratégies digitales pour faire grandir ta marque.</p>
          <div className="mt-5 flex gap-3">
            {/* TikTok */}
            <a href="https://tiktok.com/@wexo_agence" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white hover:border-violet-500/50 hover:bg-white/[0.10] transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/wexor_agence" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white hover:border-violet-500/50 hover:bg-white/[0.10] transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Navigation</h4>
          <ul className="space-y-2.5">
            {[['Accueil', '/'], ['Tarifs', '/pricing'], ['Portfolio', '/portfolio'], ['À propos', '/about']].map(([label, path]) => (
              <li key={label}>
                {path.endsWith('.html') ? (
                  <a href={path} className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
                ) : (
                  <a href={path} onClick={e => { e.preventDefault(); navigate(path) }} className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Contact</h4>
          <ul className="space-y-2.5 text-sm text-zinc-500">
            <li><a href="mailto:othmane.bouakline.pro@gmail.com" className="hover:text-white transition-colors">othmane.bouakline.pro@gmail.com</a></li>
            <li><a href="tel:+33660805337" className="hover:text-white transition-colors">06 60 80 53 37</a></li>
            <li className="mt-4">
              <a href="/contact" onClick={e => { e.preventDefault(); navigate('/contact') }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors">
                Demander un devis →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Wexor. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <a
              href="/mentions-legales"
              onClick={e => { e.preventDefault(); navigate('/mentions-legales') }}
              className="hover:text-zinc-400 transition-colors"
            >
              Mentions légales
            </a>
            <span className="text-zinc-700">·</span>
            <span>Fait avec ❤️ en France</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
