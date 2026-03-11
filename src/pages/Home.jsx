import React, { useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import {
  MagneticTitle,
  MarqueeBand,
  ScrollTextReveal,
} from '../components/ScrollEffects'

/* ─── Pink keyword animated text reveal ─── */
function PinkRevealText({ text, pinkWords = [], className = '' }) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <p className={`flex flex-wrap justify-center gap-x-[0.32em] gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?']/g, '').toLowerCase()
        const isPink = pinkWords.some(kw => clean === kw.toLowerCase())
        return (
          <motion.span
            key={i}
            initial={shouldReduce ? {} : { opacity: 0, y: 28, filter: 'blur(10px)', scale: 0.92 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.045, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={isPink ? 'text-pink-400 relative' : 'relative'}
            style={isPink ? { textShadow: '0 0 28px rgba(244,114,182,0.55), 0 0 6px rgba(244,114,182,0.3)' } : {}}
          >
            {isPink && (
              <motion.span
                className="absolute inset-0 rounded blur-md bg-pink-400/20 -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.045 + 0.3, duration: 0.4 }}
              />
            )}
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

/* ─── Service Icons (animated SVGs) ─── */
function IconWeb() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="26" height="20" rx="3" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <path d="M3 11h26" className="transition-all duration-500 group-hover:stroke-pink-400" />
      <circle cx="7" cy="8" r="1" fill="currentColor" className="transition-all duration-500 group-hover:fill-red-400" />
      <circle cx="10.5" cy="8" r="1" fill="currentColor" className="transition-all duration-500 group-hover:fill-yellow-400" />
      <circle cx="14" cy="8" r="1" fill="currentColor" className="transition-all duration-500 group-hover:fill-green-400" />
      <path d="M10 17l3-3 3 3M20 15h4M20 19h4" className="transition-all duration-500 group-hover:stroke-violet-300" />
    </svg>
  )
}

function IconRefonte() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4v6l4-2" className="transition-all duration-500 group-hover:stroke-pink-400" />
      <circle cx="16" cy="16" r="10" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <path d="M16 16l5-5" className="transition-all duration-500 group-hover:stroke-violet-300" />
      <path d="M12 20l2-4 3 2 3-6" className="transition-all duration-500 group-hover:stroke-pink-300" />
    </svg>
  )
}

function IconPrint() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="20" height="24" rx="2" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <path d="M10 10h12M10 14h12M10 18h8" className="transition-all duration-500 group-hover:stroke-pink-300" />
      <circle cx="22" cy="22" r="4" className="transition-all duration-500 group-hover:stroke-pink-400 group-hover:fill-pink-500/20" />
      <path d="M22 20v4M20 22h4" className="transition-all duration-500 group-hover:stroke-pink-400" />
    </svg>
  )
}

function IconSEO() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="8" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <path d="M20 20l7 7" className="transition-all duration-500 group-hover:stroke-pink-400" strokeWidth="2" />
      <path d="M10 16l2-4 3 2 3-6" className="transition-all duration-500 group-hover:stroke-violet-300" />
    </svg>
  )
}

function IconCommunity() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="10" r="4" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <circle cx="8" cy="20" r="3" className="transition-all duration-500 group-hover:stroke-pink-400" />
      <circle cx="24" cy="20" r="3" className="transition-all duration-500 group-hover:stroke-pink-400" />
      <path d="M11 20h10" className="transition-all duration-500 group-hover:stroke-violet-300" />
      <path d="M16 14v3" className="transition-all duration-500 group-hover:stroke-violet-300" />
    </svg>
  )
}

function IconIA() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="16" height="16" rx="4" className="transition-all duration-500 group-hover:stroke-violet-400" />
      <circle cx="13" cy="13" r="1.5" fill="currentColor" className="transition-all duration-500 group-hover:fill-pink-400" />
      <circle cx="19" cy="13" r="1.5" fill="currentColor" className="transition-all duration-500 group-hover:fill-pink-400" />
      <path d="M13 17c0 0 1.5 2 3 2s3-2 3-2" className="transition-all duration-500 group-hover:stroke-pink-300" />
      <path d="M16 22v4M12 26h8" className="transition-all duration-500 group-hover:stroke-violet-300" />
      <path d="M6 10h-2M6 16h-2M26 10h2M26 16h2" className="transition-all duration-500 group-hover:stroke-violet-400" />
    </svg>
  )
}

const services = [
  {
    title: 'Site web sur-mesure',
    desc: 'Design unique, responsive, optimisé SEO — développé en code ou CMS selon tes besoins et objectifs.',
    icon: IconWeb,
    span: 'md:col-span-2 md:row-span-1',
    size: 'large',
  },
  {
    title: 'Refonte & optimisation',
    desc: 'Audit UX/UI complet, optimisation des performances et refonte stratégique pour booster tes conversions.',
    icon: IconRefonte,
    span: 'md:col-span-1 md:row-span-2',
    size: 'tall',
  },
  {
    title: 'SEO & Référencement',
    desc: 'Stratégie de visibilité on-page et technique pour grimper dans les résultats Google.',
    icon: IconSEO,
    span: 'md:col-span-1 md:row-span-1',
    size: 'standard',
  },
  {
    title: 'Flyers & supports print',
    desc: 'Création de flyers, cartes de visite, brochures et visuels print professionnels pour ta marque.',
    icon: IconPrint,
    span: 'md:col-span-1 md:row-span-1',
    size: 'standard',
  },
  {
    title: 'Community Management',
    desc: 'Gestion de tes réseaux sociaux, création de contenu engageant et stratégie d\'influence.',
    icon: IconCommunity,
    span: 'md:col-span-1 md:row-span-1',
    size: 'standard',
  },
  {
    title: 'Intégration IA',
    desc: 'Chatbots, automatisation et outils intelligents pour enrichir l\'expérience de tes visiteurs.',
    icon: IconIA,
    span: 'md:col-span-2 md:row-span-1',
    size: 'large',
  },
]

function BentoCard({ service, index }) {
  const shouldReduce = useReducedMotion()
  const Icon = service.icon

  return (
    <div className={service.span}>
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        }}
        whileHover={shouldReduce ? {} : { y: -8, boxShadow: '0 24px 80px rgba(139,92,246,0.2)' }}
        whileTap={shouldReduce ? {} : { scale: 0.98 }}
        className={`group relative overflow-hidden rounded-2xl cursor-default transition-all duration-500 h-full ${service.size === 'large'
          ? 'p-8 md:p-10'
          : service.size === 'tall'
            ? 'p-8'
            : 'p-6 md:p-8'
          }`}
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        tabIndex={0}
        role="listitem"
        aria-label={service.title}
      >
        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2), rgba(139,92,246,0.1))',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
          aria-hidden
        />

        {/* Icon */}
        <motion.div
          className="text-zinc-300 mb-5 group-hover:text-violet-300 transition-colors duration-500"
          whileHover={shouldReduce ? {} : { scale: 1.15, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon />
        </motion.div>

        <h3 className="font-bold mb-3 text-lg group-hover:text-white transition-colors duration-300">{service.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{service.desc}</p>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-hover:via-violet-500/60 transition-all duration-500" />
      </motion.article>
    </div>
  )
}

/* ─── Horizontal Scroll Showcase Items ─── */
const steps = [
  { num: '01', title: 'Analyse', sub: 'On cerne tes objectifs et ta cible.', accent: '#8b5cf6' },
  { num: '02', title: 'Design', sub: 'Maquettes propres, validées avec toi.', accent: '#ec4899' },
  { num: '03', title: 'Développement', sub: 'Code rapide, SEO-ready, responsive.', accent: '#10b981' },
  { num: '04', title: 'Lancement', sub: 'En ligne en moins de 10 jours.', accent: '#f59e0b' },
]

export default function Home() {
  const shouldReduce = useReducedMotion()
  useSEO({
    title: 'Wexor — Agence Digitale | Création de Sites Web Sur-Mesure',
    description: 'Wexor crée des sites web sur-mesure, rapides et accessibles pour PME et indépendants. Refonte, SEO, identité visuelle — devis gratuit en 48 h.',
    path: '/',
  })

  return (
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main">
        <Hero />

        {/* ─── Marquee Band ─── */}
        <MarqueeBand />

        {/* ─── Bento Grid Services ─── */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ce qu'on fait</p>
            <MagneticTitle>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 glow-title">Nos services</h2>
            </MagneticTitle>
            <p className="text-zinc-400 max-w-xl mb-14">Tout ce dont tu as besoin pour exister et performer en ligne.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            role="list"
            aria-label="Nos services"
          >
            {services.map((s, i) => (
              <BentoCard key={s.title} service={s} index={i} />
            ))}
          </motion.div>
        </section>

        {/* ─── Big Statement ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <PinkRevealText
            text="Nous ne faisons pas de sites web. Nous créons des expériences digitales qui transforment tes visiteurs en clients."
            pinkWords={['expériences', 'digitales', 'transforment', 'clients.']}
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
          />
        </section>

        {/* ─── Process Steps ─── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Notre processus</p>
            <MagneticTitle>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black glow-title">Comment on travaille</h2>
            </MagneticTitle>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[#050510] p-8 md:p-10 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-5xl md:text-6xl font-black leading-none" style={{ color: step.accent, textShadow: `0 0 40px ${step.accent}40` }}>
                  {step.num}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.sub}</p>
                <div className="mt-auto w-8 h-[2px] rounded-full transition-all duration-500 group-hover:w-16" style={{ background: step.accent }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Process ─── */}
        <Process />

        {/* ─── Marquee Band ─── */}
        <MarqueeBand />

        {/* ─── Portfolio Preview ─── */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-pink-400 mb-3 font-semibold">Nos réalisations</p>
            <MagneticTitle>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-12 glow-title">Projets Récents</h2>
            </MagneticTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
            {[
              {
                title: 'Brows',
                category: 'E-commerce',
                image: new URL('../assets/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png', import.meta.url).href,
                accent: '#ec4899',
                color: 'from-pink-500/20 to-fuchsia-600/10'
              },
              {
                title: 'Luxe Cars',
                category: 'Web App',
                image: new URL('../assets/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png', import.meta.url).href,
                accent: '#a1a1aa',
                color: 'from-zinc-500/20 to-slate-600/10'
              },
              {
                title: 'Maison Parfumerie',
                category: 'E-commerce',
                image: new URL('../assets/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png', import.meta.url).href,
                accent: '#a855f7',
                color: 'from-purple-500/20 to-violet-600/10'
              }
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: `0 24px 80px ${p.accent}20` }}
                className={`relative h-[400px] rounded-[2rem] overflow-hidden bg-gradient-to-br ${p.color} border border-white/10 group`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/40 to-transparent z-10" />
                <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1.5 rounded-full mb-3 inline-block" style={{ color: p.accent, borderColor: p.accent + '40', background: p.accent + '10' }}>
                    {p.category}
                  </span>
                  <h3 className="text-2xl font-black text-white">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <a href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            Voir tout le portfolio
          </a>
        </section>

        <Testimonials />

        <FAQ />

        {/* ─── Final Marketing Statement ─── */}
        <section className="relative max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={shouldReduce ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8 px-4 py-1.5 rounded border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-sm md:text-base tracking-widest uppercase"
          >
            [ le meilleur investissement ]
          </motion.div>

          <PinkRevealText
            text="Ton site web ne devrait pas être une dépense. C'est le meilleur commercial de ton entreprise, ouvert 24h/24 et 7j/7 pour convertir tes visiteurs en clients."
            pinkWords={['meilleur', 'commercial', 'convertir', 'clients.']}
            className="text-3xl md:text-5xl font-black leading-tight tracking-tight"
          />

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-14"
          >
            <a
              href="/contact"
              onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/20 hover:scale-105 hover:shadow-violet-500/40 transition-all"
            >
              On parle de ton projet ?
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
