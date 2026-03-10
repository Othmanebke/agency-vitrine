import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

const projects = [
  {
    id: 1,
    title: 'Aivana',
    subtitle: 'Flyes SaaS',
    category: 'SaaS IA',
    desc: 'Dashboard moderne propulsé par l\'IA pour de la génération d\'insights et l\'automatisation avancée.',
    tech: ['Next.js', 'Tailwind', 'IA'],
    color: 'from-violet-500/20 to-indigo-600/10',
    accent: '#8b5cf6',
    image: new URL('../assets/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png', import.meta.url).href,
    challenge: "Créer une interface d'analyse de données IA complexe mais facile à prendre en main.",
    solution: "Dashboard ultra-réactif sous Next.js avec des visualisations de données en temps réel très fluides.",
    results: "Une rétention utilisateur B2B augmentée grâce à une expérience SaaS premium."
  },
  {
    id: 2,
    title: 'Ajt',
    subtitle: 'Blog',
    category: 'Blog',
    desc: 'Création d\'un blog ultra-rapide et optimisé pour le SEO avec une interface de lecture épurée.',
    tech: ['React', 'Tailwind', 'Next.js'],
    color: 'from-blue-500/20 to-indigo-600/10',
    accent: '#3b82f6',
    image: new URL('../assets/portfolio/Ajt-Blog-REACTTAILWINDnext.png', import.meta.url).href,
    challenge: "Créer un blog au design épuré, très rapide au chargement et irréprochable au niveau SEO.",
    solution: "Développement sur-mesure sous Next.js avec Tailwind. Architecture pensée pour les Core Web Vitals.",
    results: "Temps de chargement < 0.5s et excellente indexation organique."
  },
  {
    id: 3,
    title: 'Brows',
    subtitle: 'Creative',
    category: 'E-commerce',
    desc: 'Boutique en ligne et site de réservation premium pour un salon de beauté spécialisé dans le regard.',
    tech: ['WordPress', 'WooCommerce'],
    color: 'from-pink-500/20 to-fuchsia-600/10',
    accent: '#ec4899',
    image: new URL('../assets/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png', import.meta.url).href,
    challenge: "Digitaliser l'offre d'un salon de beauté haut de gamme et vendre des produits en ligne.",
    solution: "Création d'une boutique WooCommerce avec un design premium rose/fuchsia et module de réservation.",
    results: "+40% de réservations en ligne et lancement réussi de la gamme e-commerce."
  },
  {
    id: 4,
    title: 'Forma',
    subtitle: 'Immobilier',
    category: 'Agence Immo',
    desc: 'Plateforme immobilière moderne avec recherche avancée, filtres dynamiques et fiches détaillées.',
    tech: ['Next.js', 'Tailwind', 'React'],
    color: 'from-emerald-500/20 to-teal-600/10',
    accent: '#10b981',
    image: new URL('../assets/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png', import.meta.url).href,
    challenge: "Moderniser l'image de l'agence et faciliter la recherche de biens immobiliers.",
    solution: "Application React/Next.js dotée d'un moteur de recherche avec filtres avancés et géolocalisation.",
    results: "Augmentation significative des leads qualifiés via les fiches de propriétés."
  },
  {
    id: 5,
    title: 'Luxe Cars',
    subtitle: 'Location',
    category: 'Web App',
    desc: 'Application web de réservation de véhicules de luxe avec tunnel de conversion fluide et gestion des flottes.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    color: 'from-zinc-500/20 to-slate-600/10',
    accent: '#a1a1aa',
    image: new URL('../assets/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png', import.meta.url).href,
    challenge: "Mettre en place un système de réservation fluide pour une flotte de véhicules de prestige.",
    solution: "Interface React/Vite ultra-dynamique avec calendrier interactif et paiement intégré.",
    results: "Expérience client premium et réduction des appels téléphoniques de réservation."
  },
  {
    id: 6,
    title: 'Maison',
    subtitle: 'Parfumerie',
    category: 'E-commerce',
    desc: 'Boutique e-commerce haut de gamme experte dans la parfumerie de niche avec parcours utilisateur immersif.',
    tech: ['React', 'Next.js', 'Tailwind'],
    color: 'from-purple-500/20 to-violet-600/10',
    accent: '#a855f7',
    image: new URL('../assets/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png', import.meta.url).href,
    challenge: "Retranscrire l'univers olfactif luxueux dans une boutique en ligne ultra-performante.",
    solution: "Expérience e-commerce Next.js fluide, visuels immersifs et parcours d'achat sans friction.",
    results: "Positionnement haut de gamme affirmé et hausse du panier moyen."
  },
  {
    id: 7,
    title: 'Maison',
    subtitle: 'Verdure',
    category: 'Site Vitrine',
    desc: 'Site vitrine artisanal pour une boulangerie locale afin de présenter le savoir-faire et commander.',
    tech: ['HTML', 'CSS', 'JS'],
    color: 'from-amber-500/20 to-orange-600/10',
    accent: '#f59e0b',
    image: new URL('../assets/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png', import.meta.url).href,
    challenge: "Créer une vitrine artisanale authentique pour attirer et fidéliser la clientèle locale.",
    solution: "Design chaleureux (tons ambrés) avec menu dynamique et options de contact directes.",
    results: "Visibilité en ligne accrue dans le quartier et afflux de nouveaux clients."
  },
  {
    id: 8,
    title: 'NeuroFlow',
    subtitle: 'SaaS IA',
    category: 'App Web',
    desc: 'Interface d\'application SaaS propulsée par l\'intelligence artificielle avec un dashboard interactif en temps réel.',
    tech: ['Vite', 'Tailwind', 'React'],
    color: 'from-cyan-500/20 to-blue-600/10',
    accent: '#06b6d4',
    image: new URL('../assets/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png', import.meta.url).href,
    challenge: "Concevoir une interface utilisateur intuitive pour un outil d'Intelligence Artificielle complexe.",
    solution: "Dashboard analytique en React/Vite, data-visualisation en temps réel et mode sombre épuré.",
    results: "Adoption rapide par les utilisateurs B2B grâce à une UX grandement simplifiée."
  },
  {
    id: 9,
    title: 'Sora',
    subtitle: 'Thai Food',
    category: 'Restaurant',
    desc: 'Site vitrine élégant pour un restaurant thaïlandais, intégrant le menu digital et la réservation de tables.',
    tech: ['HTML', 'CSS', 'JS'],
    color: 'from-rose-500/20 to-red-600/10',
    accent: '#f43f5e',
    image: new URL('../assets/portfolio/SORA-RESTAUTHAI-HTMLCSSJS.png', import.meta.url).href,
    challenge: "Moderniser la présence en ligne du restaurant et digitaliser la prise de réservations.",
    solution: "Site vitrine vibrant et immersif intégrant le menu visuel et un module de réservation direct.",
    results: "Salles pleines le week-end et retours très positifs sur l'esthétique du site."
  },
  {
    id: 10,
    title: 'Wondercut',
    subtitle: 'Concept',
    category: 'Barber Shop',
    desc: 'Univers digital pensé pour un concept de barbier urbain avec prise de rendez-vous en ligne ultra-simplifiée.',
    tech: ['Next.js', 'Tailwind'],
    color: 'from-yellow-500/20 to-amber-600/10',
    accent: '#eab308',
    image: new URL('../assets/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png', import.meta.url).href,
    challenge: "Capter une clientèle urbaine et jeune avec un univers visuel fort et très assumé.",
    solution: "Design 'Dark & Gold' sous Next.js/Tailwind avec intégration directe de l'agenda de réservation.",
    results: "Agenda rempli 2 semaines à l'avance et renforcement de l'identité de marque."
  }
]

/* --- Animated Word Reveal for Descriptions --- */
function AnimatedWords({ text }) {
  const words = text.split(" ")
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i }
    })
  }
  const child = {
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", damping: 16, stiffness: 200 } },
    hidden: { opacity: 0, y: 15, filter: 'blur(8px)' }
  }

  return (
    <motion.div style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.3em" }} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

/* --- Animated Title Character by Character --- */
function AnimatedTitle({ title, subtitle, accent }) {
  const chars = title.split("")
  const child = {
    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="flex flex-col"
    >
      <div className="flex" style={{ perspective: "1000px" }}>
        {chars.map((char, index) => (
          <motion.span variants={child} key={index} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter" style={{ color: accent, textShadow: `0 0 30px ${accent}40` }}>
            {char}
          </motion.span>
        ))}
      </div>
      <motion.span
        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { delay: chars.length * 0.08 } } }}
        className="text-xl md:text-2xl lg:text-3xl font-extralight tracking-tight text-white mt-1"
      >
        {subtitle}
      </motion.span>
    </motion.div>
  )
}


function PortfolioCarouselCard({ project, onSelect }) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-[65vh] md:h-[550px] flex-shrink-0 flex items-center justify-center px-4 md:px-6">
      <motion.div
        className={`group relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br ${project.color} border border-white/10`}
        whileHover={shouldReduce ? {} : { y: -8, borderColor: project.accent + '80', boxShadow: `0 24px 80px ${project.accent}20` }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Image with Hover Scale */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          {/* Lighter overlay to let the beautiful image show through more */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/80 md:via-[#050510]/40 to-transparent z-10" />
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = '#111' }}
          />
        </div>

        {/* Card Content container - moved slightly down to give image more room at the top */}
        <div className="relative z-20 h-full p-5 md:p-8 lg:p-10 flex flex-col justify-end">

          <div className="flex items-center gap-4 mb-3 md:mb-5">
            <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ color: project.accent, borderColor: project.accent + '40', background: project.accent + '10' }}>
              {project.category}
            </span>
            <div className="h-px bg-white/20 flex-grow" />
            <span className="text-white/40 font-mono text-xs md:text-sm tracking-widest hidden md:block">
              {project.id < 10 ? `0${project.id}` : project.id}
            </span>
          </div>

          <div className="mb-4 md:mb-6">
            <AnimatedTitle title={project.title} subtitle={project.subtitle} accent={project.accent} />
          </div>

          <div className="text-zinc-300 text-xs md:text-base mb-5 md:mb-8 max-w-xl leading-relaxed font-light drop-shadow-md">
            <AnimatedWords text={project.desc} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 md:gap-3"
            >
              {project.tech.map(t => (
                <span key={t} className="text-[10px] md:text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.button
              onClick={onSelect}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md group-hover:border-white transition-colors bg-white/5"
              aria-label="Voir le projet"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

/* ── Tech stack infinite marquee ─────────────────────────── */
const DV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SI = 'https://cdn.simpleicons.org'

// Inline SVGs for logos that are black and invisible on dark background
const OPENAI_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2310a37f' d='M22.28 9.29a5.68 5.68 0 0 0-.49-4.67 5.74 5.74 0 0 0-6.17-2.75A5.73 5.73 0 0 0 11.28 0a5.74 5.74 0 0 0-5.47 3.98 5.72 5.72 0 0 0-3.83 2.77 5.75 5.75 0 0 0 .71 6.74 5.68 5.68 0 0 0 .49 4.67 5.74 5.74 0 0 0 6.17 2.75 5.7 5.7 0 0 0 4.34 1.87 5.74 5.74 0 0 0 5.47-3.98 5.72 5.72 0 0 0 3.83-2.77 5.75 5.75 0 0 0-.71-6.74zm-8.55 11.99a4.25 4.25 0 0 1-2.73-1c.03-.02.09-.05.13-.07l4.53-2.62a.73.73 0 0 0 .37-.64V10.7l1.91 1.1a.07.07 0 0 1 .04.05v5.29a4.27 4.27 0 0 1-4.25 4.14zM3.89 17.67a4.25 4.25 0 0 1-.51-2.85l.13.08 4.53 2.62a.74.74 0 0 0 .74 0l5.53-3.2v2.21a.07.07 0 0 1-.03.06L9.7 19.24a4.27 4.27 0 0 1-5.81-1.57zM2.81 8.17A4.25 4.25 0 0 1 5.03 6.1v5.37a.73.73 0 0 0 .37.64l5.53 3.19-1.91 1.1a.07.07 0 0 1-.07 0L4.38 13.8a4.27 4.27 0 0 1-1.57-5.63zm15.69 3.66-5.53-3.2 1.91-1.1a.07.07 0 0 1 .07 0l4.57 2.64a4.27 4.27 0 0 1-.66 7.7V12.47a.73.73 0 0 0-.36-.64zm1.9-2.87-.13-.08-4.53-2.61a.74.74 0 0 0-.74 0L9.47 9.47V7.26a.07.07 0 0 1 .03-.06l4.57-2.64a4.27 4.27 0 0 1 6.33 4.4zm-11.98 3.94-1.91-1.1a.07.07 0 0 1-.04-.05V6.46a4.27 4.27 0 0 1 7-3.28 3.6 3.6 0 0 0-.13.07L8.81 5.87a.73.73 0 0 0-.37.64zm1.04-2.24 2.46-1.42 2.46 1.42v2.83l-2.46 1.42-2.46-1.42z'/%3E%3C/svg%3E`
const VERCEL_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e2e2e2' d='M12 1L24 22H0L12 1z'/%3E%3C/svg%3E`
const GITHUB_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23c9d1d9' d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z'/%3E%3C/svg%3E`
const FRAMER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b5cf6' d='M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z'/%3E%3C/svg%3E`

const stacks = [
  { name: 'HTML5', icon: `${DV}/html5/html5-original.svg`, glow: 'rgba(227,79,38,0.6)' },
  { name: 'CSS3', icon: `${DV}/css3/css3-original.svg`, glow: 'rgba(21,114,182,0.6)' },
  { name: 'JavaScript', icon: `${DV}/javascript/javascript-original.svg`, glow: 'rgba(247,223,30,0.6)' },
  { name: 'React', icon: `${DV}/react/react-original.svg`, glow: 'rgba(97,218,251,0.6)' },
  { name: 'Tailwind', icon: `${DV}/tailwindcss/tailwindcss-original.svg`, glow: 'rgba(6,182,212,0.6)' },
  { name: 'Vite', icon: `${DV}/vitejs/vitejs-original.svg`, glow: 'rgba(100,108,255,0.6)' },
  { name: 'Vercel', icon: VERCEL_SVG, glow: 'rgba(226,226,226,0.45)' },
  { name: 'WordPress', icon: `${DV}/wordpress/wordpress-original.svg`, glow: 'rgba(33,117,155,0.6)' },
  { name: 'Node.js', icon: `${SI}/nodedotjs/5fa04e`, glow: 'rgba(95,160,78,0.6)' },
  { name: 'TypeScript', icon: `${DV}/typescript/typescript-original.svg`, glow: 'rgba(49,120,198,0.6)' },
  { name: 'Figma', icon: `${DV}/figma/figma-original.svg`, glow: 'rgba(242,78,30,0.6)' },
  { name: 'OpenAI', icon: OPENAI_SVG, glow: 'rgba(16,163,127,0.6)' },
  { name: 'Framer', icon: FRAMER_SVG, glow: 'rgba(139,92,246,0.6)' },
  { name: 'GitHub', icon: GITHUB_SVG, glow: 'rgba(201,209,217,0.5)' },
]

function StackMarquee() {
  const doubled = [...stacks, ...stacks]
  return (
    <section className="relative py-14 overflow-hidden select-none bg-[#050510]">
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
              loading="lazy"
              className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ width: 52, height: 52 }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const containerRef = useRef(null)
  const shouldReduce = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState(null)

  useSEO({
    title: 'Portfolio — Wexor | Sites, Refontes, Branding & SEO',
    description: 'Découvrez les réalisations Wexor : sites vitrines, e-commerce, refontes, branding et campagnes SEO. Des projets concrets livrés avec soin.',
    path: '/portfolio',
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const totalItems = projects.length

  const xPercent = useTransform(scrollYProgress, [0, 1], [0, -(totalItems - 1) * 100])
  const smoothX = useSpring(xPercent, { stiffness: 80, damping: 25 })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, -50])

  return (
    <div className="min-h-screen text-white bg-[#050510]">
      <Nav />

      <main role="main">
        {shouldReduce ? (
          <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
            <h2 className="text-4xl font-black mb-8">Nos réalisations</h2>
            {projects.map(p => (
              <div key={p.id} className="p-8 border border-white/10 rounded-3xl bg-white/5 flex flex-col gap-4">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-auto rounded-xl object-cover" />
                <h3 className="text-3xl font-bold mt-4">{p.title} <span className="text-zinc-400 font-light">{p.subtitle}</span></h3>
                <p className="text-zinc-400 mb-2">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map(t => <span key={t} className="px-3 py-1 bg-black/50 rounded-full text-xs">{t}</span>)}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section ref={containerRef} style={{ height: `${totalItems * 100}vh` }} className="relative w-full bg-[#050510]">
            {/* Sticky container that stays in view while we scroll vertically */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20">

              {/* Sticky Header positioned at the top */}
              <motion.div
                className="w-full px-[5vw] md:px-[20vw] lg:px-[25vw] mb-4 md:mb-8 lg:mb-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono">Nos réalisations</p>
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                    PORTFOLIO
                  </h2>
                </div>
                <p className="text-zinc-400 max-w-sm text-sm md:text-base mb-2 md:text-right">
                  Scrollez horizontalement ou vers le bas pour explorer nos projets.
                </p>
              </motion.div>

              {/* The horizontal sliding deck, slightly shorter to accommodate the header */}
              <motion.div
                style={{ x: useTransform(smoothX, v => `${v / totalItems}%`) }}
                className="flex items-center w-max z-10 pb-10"
              >
                {/* Left padding so the first card is centered: (100vw - 50vw)/2 = 25vw */}
                <div className="w-[7.5vw] md:w-[20vw] lg:w-[25vw] flex-shrink-0" />

                {projects.map((project) => (
                  <PortfolioCarouselCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />
                ))}

                {/* Right padding so the last card is centered */}
                <div className="w-[7.5vw] md:w-[20vw] lg:w-[25vw] flex-shrink-0" />
              </motion.div>
            </div>
          </section>
        )}

        {/* Tech Stack Marquee kept from original page */}
        <StackMarquee />
      </main>

      {/* Lightbox Modal rendered via Portal to escape CSS transform context */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`bg-gradient-to-br ${selectedProject.color} w-full max-w-5xl max-h-[90vh] rounded-3xl border border-white/20 overflow-hidden flex flex-col md:flex-row`}
                onClick={e => e.stopPropagation()}
              >
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                  <span className="text-xs font-mono tracking-widest uppercase mb-4 inline-block w-max border border-white/20 px-3 py-1.5 rounded-full" style={{ color: selectedProject.accent, background: selectedProject.accent + '15' }}>
                    {selectedProject.category}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-2xl font-light text-white/50 mb-6">{selectedProject.subtitle}</p>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    {selectedProject.desc}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-1">Le Défi</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-1">Notre Solution</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-1">Résultats</h4>
                      <p className="text-green-400 text-sm font-medium leading-relaxed">{selectedProject.results}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-xs font-semibold text-white/80 bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2 relative bg-black/50 overflow-hidden min-h-[300px]">
                  <img src={selectedProject.image} alt={selectedProject.title} loading="lazy" className="w-full h-full object-cover object-top opacity-90" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Footer />
    </div >
  )
}

