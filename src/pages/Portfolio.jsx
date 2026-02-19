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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl w-full bg-[#0d0d1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/30"
        onClick={e => e.stopPropagation()}
      >
        {/* close btn */}
        <button
          aria-label="Fermer"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-violet-500/30 border border-white/10 hover:border-violet-500/40 flex items-center justify-center text-white transition-all text-sm"
        >✕</button>

        {/* image full */}
        <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-contain"
            onError={e => { e.currentTarget.parentElement.style.background = '#111'; e.currentTarget.style.display = 'none' }}
          />
          {/* gradient overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d0d1a] to-transparent" />
          {/* tag badge */}
          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 border border-violet-500/30 text-violet-300 backdrop-blur-sm">
            {project.tag}
          </span>
        </div>

        {/* info */}
        <div className="px-7 pb-7 pt-3">
          <h3 className="text-2xl font-black mb-2 leading-tight">{project.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
          <div className="mt-5 flex items-center gap-3">
            <div className={`flex-1 h-px bg-gradient-to-r ${project.color} opacity-60`} />
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">NovaWeb Studio</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Tech stack infinite marquee ─────────────────────────── */
const stacks = [
  { name: 'HTML5',      icon: 'https://cdn.simpleicons.org/html5/e34f26',       glow: 'rgba(227,79,38,0.5)' },
  { name: 'CSS3',       icon: 'https://cdn.simpleicons.org/css3/1572b6',        glow: 'rgba(21,114,182,0.5)' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/f7df1e',  glow: 'rgba(247,223,30,0.5)' },
  { name: 'React',      icon: 'https://cdn.simpleicons.org/react/61dafb',       glow: 'rgba(97,218,251,0.5)' },
  { name: 'Tailwind',   icon: 'https://cdn.simpleicons.org/tailwindcss/06b6d4', glow: 'rgba(6,182,212,0.5)' },
  { name: 'Vite',       icon: 'https://cdn.simpleicons.org/vite/646cff',        glow: 'rgba(100,108,255,0.5)' },
  { name: 'Vercel',     icon: 'https://cdn.simpleicons.org/vercel/ffffff',      glow: 'rgba(255,255,255,0.3)' },
  { name: 'WordPress',  icon: 'https://cdn.simpleicons.org/wordpress/21759b',   glow: 'rgba(33,117,155,0.5)' },
  { name: 'Node.js',    icon: 'https://cdn.simpleicons.org/nodedotjs/5fa04e',   glow: 'rgba(95,160,78,0.5)' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178c6',  glow: 'rgba(49,120,198,0.5)' },
  { name: 'Figma',      icon: 'https://cdn.simpleicons.org/figma/f24e1e',       glow: 'rgba(242,78,30,0.5)' },
  { name: 'OpenAI',     icon: 'https://cdn.simpleicons.org/openai/ffffff',      glow: 'rgba(255,255,255,0.3)' },
  { name: 'Shopify',    icon: 'https://cdn.simpleicons.org/shopify/96bf48',     glow: 'rgba(150,191,72,0.5)' },
  { name: 'Git',        icon: 'https://cdn.simpleicons.org/git/f05032',         glow: 'rgba(240,80,50,0.5)' },
]

function StackMarquee() {
  const doubled = [...stacks, ...stacks]
  return (
    <section className="relative py-14 overflow-hidden select-none">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#050510] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#050510] to-transparent" />

      {/* label */}
      <p className="text-center text-[10px] uppercase tracking-widest text-zinc-600 mb-8 font-semibold">Stack &amp; outils</p>

      {/* track */}
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 mx-5 px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:border-white/20 transition-colors group"
            style={{ boxShadow: `0 0 18px 0 ${s.glow.replace('0.5', '0')}` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 22px 0 ${s.glow}` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 18px 0 ${s.glow.replace('0.5', '0')}` }}
          >
            <img
              src={s.icon}
              alt={s.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'drop-shadow(0 0 4px ' + s.glow + ')' }}
            />
            <span className="text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </section>
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
        {/* tech stack marquee */}
        <StackMarquee />
      </main>

      <Footer />

      <AnimatePresence>
        {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  )
}
