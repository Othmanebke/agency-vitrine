import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

const projects = [
  { title: 'Site vitrine — La Boulangerie', desc: 'Création de site vitrine moderne avec menu, horaires & prise de contact en ligne', tag: 'Site vitrine', color: 'from-amber-500/20 to-orange-600/10', img: new URL('../assets/portfolio/p1.jpg', import.meta.url).href },
  { title: 'Refonte — Restaurant Gastronomique', desc: 'Refonte complète : nouveau design, réservation en ligne & optimisation mobile', tag: 'Refonte', color: 'from-rose-500/20 to-red-600/10', img: new URL('../assets/portfolio/p2.jpg', import.meta.url).href },
  { title: 'SEO Local — Thai Food', desc: 'Stratégie SEO local, fiche Google Business, pages ciblées par quartier', tag: 'SEO', color: 'from-orange-500/20 to-yellow-600/10', img: new URL('../assets/portfolio/p3.jpg', import.meta.url).href },
  { title: 'Branding — Brows Creative', desc: 'Identité visuelle complète : logo, charte, supports & site de booking', tag: 'Branding', color: 'from-pink-500/20 to-fuchsia-600/10', img: new URL('../assets/portfolio/p4.jpg', import.meta.url).href },
  { title: 'E-commerce — Montres Design', desc: 'Boutique en ligne haut de gamme, fiches produit & tunnel de vente optimisé', tag: 'E-commerce', color: 'from-zinc-500/20 to-slate-600/10', img: new URL('../assets/portfolio/p5.jpg', import.meta.url).href },
  { title: 'Landing — Artisan Local', desc: 'Landing page haute conversion, formulaire de devis & tracking Google Ads', tag: 'Landing', color: 'from-indigo-500/20 to-violet-600/10', img: new URL('../assets/portfolio/p6.jpg', import.meta.url).href },
  { title: 'SaaS — Dashboard Analytics', desc: 'Interface admin React avec tableaux de bord, graphiques & gestion utilisateurs', tag: 'SaaS', color: 'from-sky-500/20 to-blue-600/10', img: new URL('../assets/portfolio/p7.jpg', import.meta.url).href },
  { title: 'Full Stack — Plateforme Web', desc: 'Application full stack : authentification, base de données & API REST', tag: 'App Web', color: 'from-emerald-500/20 to-teal-600/10', img: new URL('../assets/portfolio/p8.jpg', import.meta.url).href },
  { title: 'E-commerce — Mode & Lifestyle', desc: 'Boutique Shopify sur-mesure, intégration paiement & gestion des stocks', tag: 'E-commerce', color: 'from-violet-500/20 to-purple-600/10', img: new URL('../assets/portfolio/p9.jpg', import.meta.url).href },
  { title: 'Portfolio — Studio Créatif', desc: 'Portfolio interactif fullscreen, galerie filtrable & formulaire de contact', tag: 'Site vitrine', color: 'from-lime-500/20 to-green-600/10', img: new URL('../assets/portfolio/p10.jpg', import.meta.url).href },
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
        <div className={`h-64 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
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
            Des projets concrets, livrés avec soin.
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
                    <img
                      src={p.img}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
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
