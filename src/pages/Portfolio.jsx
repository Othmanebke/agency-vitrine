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
const DV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SI = 'https://cdn.simpleicons.org'

// Inline SVGs for logos that are black and invisible on dark background
const OPENAI_SVG  = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2310a37f' d='M22.28 9.29a5.68 5.68 0 0 0-.49-4.67 5.74 5.74 0 0 0-6.17-2.75A5.73 5.73 0 0 0 11.28 0a5.74 5.74 0 0 0-5.47 3.98 5.72 5.72 0 0 0-3.83 2.77 5.75 5.75 0 0 0 .71 6.74 5.68 5.68 0 0 0 .49 4.67 5.74 5.74 0 0 0 6.17 2.75 5.7 5.7 0 0 0 4.34 1.87 5.74 5.74 0 0 0 5.47-3.98 5.72 5.72 0 0 0 3.83-2.77 5.75 5.75 0 0 0-.71-6.74zm-8.55 11.99a4.25 4.25 0 0 1-2.73-1c.03-.02.09-.05.13-.07l4.53-2.62a.73.73 0 0 0 .37-.64V10.7l1.91 1.1a.07.07 0 0 1 .04.05v5.29a4.27 4.27 0 0 1-4.25 4.14zM3.89 17.67a4.25 4.25 0 0 1-.51-2.85l.13.08 4.53 2.62a.74.74 0 0 0 .74 0l5.53-3.2v2.21a.07.07 0 0 1-.03.06L9.7 19.24a4.27 4.27 0 0 1-5.81-1.57zM2.81 8.17A4.25 4.25 0 0 1 5.03 6.1v5.37a.73.73 0 0 0 .37.64l5.53 3.19-1.91 1.1a.07.07 0 0 1-.07 0L4.38 13.8a4.27 4.27 0 0 1-1.57-5.63zm15.69 3.66-5.53-3.2 1.91-1.1a.07.07 0 0 1 .07 0l4.57 2.64a4.27 4.27 0 0 1-.66 7.7V12.47a.73.73 0 0 0-.36-.64zm1.9-2.87-.13-.08-4.53-2.61a.74.74 0 0 0-.74 0L9.47 9.47V7.26a.07.07 0 0 1 .03-.06l4.57-2.64a4.27 4.27 0 0 1 6.33 4.4zm-11.98 3.94-1.91-1.1a.07.07 0 0 1-.04-.05V6.46a4.27 4.27 0 0 1 7-3.28 3.6 3.6 0 0 0-.13.07L8.81 5.87a.73.73 0 0 0-.37.64zm1.04-2.24 2.46-1.42 2.46 1.42v2.83l-2.46 1.42-2.46-1.42z'/%3E%3C/svg%3E`
const VERCEL_SVG  = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e2e2e2' d='M12 1L24 22H0L12 1z'/%3E%3C/svg%3E`
const GITHUB_SVG  = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23c9d1d9' d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z'/%3E%3C/svg%3E`
const FRAMER_SVG  = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b5cf6' d='M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z'/%3E%3C/svg%3E`
const NODEJS_SVG  = `${DV}/nodejs/nodejs-plain-wordmark.svg`

const stacks = [
  { name: 'HTML5',      icon: `${DV}/html5/html5-original.svg`,             glow: 'rgba(227,79,38,0.6)' },
  { name: 'CSS3',       icon: `${DV}/css3/css3-original.svg`,               glow: 'rgba(21,114,182,0.6)' },
  { name: 'JavaScript', icon: `${DV}/javascript/javascript-original.svg`,   glow: 'rgba(247,223,30,0.6)' },
  { name: 'React',      icon: `${DV}/react/react-original.svg`,             glow: 'rgba(97,218,251,0.6)' },
  { name: 'Tailwind',   icon: `${DV}/tailwindcss/tailwindcss-original.svg`, glow: 'rgba(6,182,212,0.6)' },
  { name: 'Vite',       icon: `${DV}/vitejs/vitejs-original.svg`,           glow: 'rgba(100,108,255,0.6)' },
  { name: 'Vercel',     icon: VERCEL_SVG,                                   glow: 'rgba(226,226,226,0.45)' },
  { name: 'WordPress',  icon: `${DV}/wordpress/wordpress-original.svg`,     glow: 'rgba(33,117,155,0.6)' },
  { name: 'Node.js',    icon: `${SI}/nodedotjs/5fa04e`,                     glow: 'rgba(95,160,78,0.6)' },
  { name: 'TypeScript', icon: `${DV}/typescript/typescript-original.svg`,   glow: 'rgba(49,120,198,0.6)' },
  { name: 'Figma',      icon: `${DV}/figma/figma-original.svg`,             glow: 'rgba(242,78,30,0.6)' },
  { name: 'OpenAI',     icon: OPENAI_SVG,                                   glow: 'rgba(16,163,127,0.6)' },
  { name: 'Framer',     icon: FRAMER_SVG,                                   glow: 'rgba(139,92,246,0.6)' },
  { name: 'GitHub',     icon: GITHUB_SVG,                                   glow: 'rgba(201,209,217,0.5)' },
]

function StackMarquee() {
  const doubled = [...stacks, ...stacks]
  return (
    <section className="relative py-14 overflow-hidden select-none">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#050510] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#050510] to-transparent" />

      {/* label */}
      <p className="text-center text-[10px] uppercase tracking-widest text-zinc-600 mb-8 font-semibold">Stack &amp; outils</p>

      {/* track */}
      <div className="flex items-center animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((s, i) => (
          <div
            key={i}
            className="mx-6 group cursor-default transition-all"
            onMouseEnter={e => { e.currentTarget.querySelector('img').style.filter = `drop-shadow(0 0 12px ${s.glow}) drop-shadow(0 0 4px ${s.glow})` }}
            onMouseLeave={e => { e.currentTarget.querySelector('img').style.filter = `drop-shadow(0 0 0px transparent)` }}
          >
            <img
              src={s.icon}
              alt={s.name}
              width={52}
              height={52}
              className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ width: 52, height: 52 }}
            />
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
