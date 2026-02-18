import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

const projects = [
  { title: 'Site vitrine — La Boulangerie', desc: 'Design & intégration CMS sur-mesure', tag: 'Site vitrine', color: 'from-amber-500/20 to-orange-600/10', img: '/src/assets/portfolio/p1.svg' },
  { title: 'Refonte — ShopEase', desc: 'UX audit, optimisation conversion & SEO', tag: 'Refonte', color: 'from-violet-500/20 to-pink-600/10', img: '/src/assets/portfolio/p2.svg' },
  { title: 'Campagne print — Summer Promo', desc: 'Flyers, affiches et visuels print', tag: 'Print', color: 'from-sky-500/20 to-blue-600/10', img: '/src/assets/portfolio/p3.svg' },
  { title: 'Landing — Mobile App', desc: 'Landing page haute conversion', tag: 'Landing', color: 'from-emerald-500/20 to-teal-600/10', img: '/src/assets/portfolio/p4.svg' },
  { title: 'Branding — Café Local', desc: 'Logo, charte graphique & supports', tag: 'Branding', color: 'from-rose-500/20 to-pink-600/10', img: '/src/assets/portfolio/p5.svg' },
  { title: 'Landing — Service Local', desc: 'Acquisition locale & référencement', tag: 'SEO', color: 'from-indigo-500/20 to-violet-600/10', img: '/src/assets/portfolio/p6.svg' },
  { title: 'E-commerce — BioShop', desc: 'Boutique en ligne Shopify + SEO', tag: 'E-commerce', color: 'from-lime-500/20 to-green-600/10', img: '/src/assets/portfolio/p7.svg' },
  { title: 'Dashboard — SaaS Analytics', desc: 'Interface admin React & data viz', tag: 'App Web', color: 'from-cyan-500/20 to-sky-600/10', img: '/src/assets/portfolio/p8.svg' },
  { title: 'Portfolio — Studio Photo', desc: 'Galerie fullscreen & booking', tag: 'Site vitrine', color: 'from-fuchsia-500/20 to-purple-600/10', img: '/src/assets/portfolio/p9.svg' },
  { title: 'Refonte — Cabinet Conseil', desc: 'Modernisation & génération de leads', tag: 'Refonte', color: 'from-yellow-500/20 to-amber-600/10', img: '/src/assets/portfolio/p10.svg' },
]

function Lightbox({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button aria-label="Fermer" onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">✕</button>
        <div className={`h-64 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
          <span className="text-7xl opacity-30">🖼️</span>
        </div>
        <div className="p-6">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">{project.tag}</span>
          <h3 className="text-xl font-black mt-1 mb-2">{project.title}</h3>
          <p className="text-zinc-400 text-sm">{project.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const VISIBLE = 3 // cards visible at once on desktop

export default function Portfolio() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [direction, setDirection] = useState(0)
  const shouldReduce = useReducedMotion()
  const dragX = useRef(0)

  useSEO({
    title: 'Portfolio — NovaWeb | Sites, Refontes, Branding & SEO',
    description: 'Découvrez les réalisations NovaWeb : sites vitrines, e-commerce, refontes, branding et campagnes SEO. Des projets concrets livrés avec soin.',
    path: '/portfolio',
  })

  const go = (dir) => {
    setDirection(dir)
    setActive(i => (i + dir + projects.length) % projects.length)
  }

  // indices to show: prev, active, next (looping)
  const indices = [-1, 0, 1].map(offset => (active + offset + projects.length) % projects.length)

  return (
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main" className="pt-24">
        {/* header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Nos réalisations</p>
          <h1 className="text-4xl md:text-5xl font-black">Portfolio</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Des projets concrets, livrés avec soin. Visuels à venir — les vraies captures seront intégrées prochainement.
          </p>
        </motion.header>

        {/* carousel */}
        <section className="relative max-w-6xl mx-auto px-6 pb-24 select-none">
          {/* cards track */}
          <div
            className="relative flex items-center justify-center gap-4 md:gap-6 overflow-hidden py-8"
            onMouseDown={e => { dragX.current = e.clientX }}
            onMouseUp={e => {
              const diff = dragX.current - e.clientX
              if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
            }}
            onTouchStart={e => { dragX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const diff = dragX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
            }}
          >
            {indices.map((projectIdx, pos) => {
              const isCenter = pos === 1
              const p = projects[projectIdx]
              return (
                <motion.article
                  key={projectIdx}
                  layout
                  animate={{
                    scale: isCenter ? 1 : 0.82,
                    opacity: isCenter ? 1 : 0.45,
                    filter: isCenter ? 'blur(0px)' : 'blur(1px)',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex-shrink-0 rounded-2xl overflow-hidden border cursor-pointer transition-colors
                    ${isCenter
                      ? 'w-full max-w-sm md:max-w-md border-violet-500/40 shadow-2xl shadow-violet-500/10'
                      : 'hidden md:block w-full max-w-xs border-white/[0.07]'
                    }`}
                  onClick={() => isCenter ? setLightbox(p) : go(pos === 0 ? -1 : 1)}
                  role="button"
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={isCenter ? `Voir ${p.title}` : pos === 0 ? 'Projet précédent' : 'Projet suivant'}
                >
                  {/* image area */}
                  <div className={`h-52 md:h-60 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-6xl opacity-20">🖼️</span>
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    )}
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-violet-300">
                      {p.tag}
                    </span>
                    {isCenter && (
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs">
                        ↗
                      </div>
                    )}
                  </div>
                  {/* info */}
                  <div className={`p-5 bg-white/[0.03] ${isCenter ? '' : 'hidden md:block'}`}>
                    <h3 className="font-bold text-sm md:text-base leading-snug mb-1">{p.title}</h3>
                    <p className="text-xs text-zinc-500">{p.desc}</p>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* prev / next buttons */}
          <button
            onClick={() => go(-1)}
            aria-label="Projet précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.05] border border-white/[0.10] hover:bg-white/10 hover:border-violet-500/40 flex items-center justify-center text-white transition-colors z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Projet suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.05] border border-white/[0.10] hover:bg-white/10 hover:border-violet-500/40 flex items-center justify-center text-white transition-colors z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Navigation projets">
            {projects.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Projet ${i + 1}`}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-2 bg-violet-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* counter */}
          <p className="text-center text-xs text-zinc-600 mt-4">
            {active + 1} / {projects.length}
          </p>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  )
}
