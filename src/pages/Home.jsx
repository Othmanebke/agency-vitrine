import React, { useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Packages from '../components/Packages'
import Footer from '../components/Footer'

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
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springRX = useSpring(rotX, { stiffness: 300, damping: 25 })
  const springRY = useSpring(rotY, { stiffness: 300, damping: 25 })

  const handleMove = (e) => {
    if (!ref.current || shouldReduce) return
    const r = ref.current.getBoundingClientRect()
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const handleLeave = () => { rotX.set(0); rotY.set(0) }

  const Icon = service.icon

  return (
    <motion.article
      ref={ref}
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
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-2xl cursor-default transition-colors duration-500 ${service.span} ${service.size === 'large'
        ? 'p-8 md:p-10'
        : service.size === 'tall'
          ? 'p-8'
          : 'p-6 md:p-8'
        }`}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
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
          maskComposite: 'exclude',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Icon with hover animation */}
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
  )
}

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

        {/* ─── Bento Grid Services ─── */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ce qu'on fait</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 glow-title">Nos services</h2>
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

        <Process />

        <Testimonials />

        <FAQ />

        <Packages />

      </main>

      <Footer />
    </div>
  )
}
