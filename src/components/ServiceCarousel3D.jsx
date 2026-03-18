import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const services = [
  {
    id: 0,
    title: 'Site Vitrine',
    category: 'Présence Web',
    price: '500 – 2 000€',
    accent: '#8b5cf6',
    accentRgb: '139,92,246',
    description:
      'Un site vitrine professionnel qui présente ton activité avec élégance et convertit tes visiteurs en clients. Conçu pour être rapide, beau et optimisé pour Google.',
    features: [
      'Design sur-mesure unique',
      'Responsive mobile first',
      'SEO on-page complet',
      'Formulaire de contact',
      'Google Analytics configuré',
      'Formation CMS incluse',
    ],
    stack: ['React', 'Next.js', 'Tailwind'],
  },
  {
    id: 1,
    title: 'Landing Page',
    category: 'Conversion',
    price: '500 – 1 200€',
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    description:
      "Une page unique ultra-optimisée pour convertir : lancement de produit, campagne pub ou collecte de leads. Chaque pixel est pensé pour transformer.",
    features: [
      'A/B testing ready',
      'Copywriting optimisé',
      'Animations premium',
      'CTA stratégique testé',
      'Pixel & tracking pub',
      'Vitesse maximale (Core Web Vitals)',
    ],
    stack: ['React', 'Framer Motion', 'GSAP'],
  },
  {
    id: 2,
    title: 'E-Commerce',
    category: 'Vente en ligne',
    price: '2 000 – 5 000€',
    accent: '#10b981',
    accentRgb: '16,185,129',
    description:
      'Boutique en ligne complète avec gestion des produits, paiement sécurisé et tableau de bord administrateur. Prête à vendre dès le lancement.',
    features: [
      'Catalogue produits illimité',
      'Paiement Stripe / PayPal',
      'Gestion des stocks',
      'Dashboard admin complet',
      'SEO e-commerce avancé',
      'Mobile-first optimisé',
    ],
    stack: ['Next.js', 'Stripe', 'Prisma'],
  },
  {
    id: 3,
    title: 'SaaS clé en main',
    category: 'Application Web',
    price: '3 000 – 5 000€+',
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    description:
      "Application web complète avec authentification, système d'abonnements, dashboard utilisateur et toute la stack technique nécessaire pour lancer ton SaaS.",
    features: [
      'Auth complète (OAuth, Magic Link)',
      'Abonnements Stripe',
      'Dashboard utilisateur',
      'API REST / GraphQL',
      'Base de données cloud',
      'CI/CD & déploiement inclus',
    ],
    stack: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    id: 4,
    title: 'Blog Premium',
    category: 'Contenu & SEO',
    price: '800 – 2 500€',
    accent: '#ec4899',
    accentRgb: '236,72,153',
    description:
      'Blog performant et optimisé SEO avec CMS headless, articles structurés et newsletter intégrée. Conçu pour dominer les résultats de recherche.',
    features: [
      'CMS headless (Sanity / Notion)',
      'SEO avancé & structuré',
      'Newsletter intégrée',
      'Recherche full-text',
      'Catégories, tags & auteurs',
      'RSS, sitemap & schema.org',
    ],
    stack: ['Next.js', 'Sanity', 'Resend'],
  },
  {
    id: 5,
    title: 'Projet sur mesure',
    category: 'Custom',
    price: 'Selon projet',
    accent: '#a78bfa',
    accentRgb: '167,139,250',
    description:
      "Tu as une idée unique qui ne rentre dans aucune case ? On la concrétise ensemble. Architecture, stack et budget adaptés précisément à ton besoin.",
    features: [
      'Analyse & cadrage offert',
      'Architecture personnalisée',
      'Stack adaptée au besoin',
      'Suivi & itérations continues',
      'Documentation technique',
      'Support post-lancement',
    ],
    stack: ['Sur-mesure', 'Devis gratuit'],
  },
]

function getCardTransform(offset, isMobile) {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  if (abs === 0) {
    return { scale: 1, rotateY: 0, x: 0, z: 0, opacity: 1, zIndex: 10, isVisible: true }
  }
  // On mobile: tighter spacing, hide cards beyond ±1
  if (isMobile) {
    if (abs > 1) return { scale: 0.7, rotateY: sign * 52, x: sign * 200, z: -150, opacity: 0, zIndex: 0, isVisible: false }
    return { scale: 0.78, rotateY: sign * 46, x: sign * 180, z: -100, opacity: 0.45, zIndex: 5, isVisible: true }
  }
  const scale = Math.max(0.58, 1 - abs * 0.13)
  const rotateY = sign * Math.min(52, abs * 46)
  const x = sign * Math.min(380, abs * 270)
  const z = -abs * 110
  const opacity = Math.max(0, 1 - abs * 0.3)
  const zIndex = Math.max(0, 10 - abs)
  return { scale, rotateY, x, z, opacity, zIndex, isVisible: abs <= 2 }
}

function CheckIcon({ color }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={color} strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ── Modal rendered via Portal to escape the perspective stacking context ──
function ServiceModal({ service, onClose }) {
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const modal = (
    <motion.div
      className="fixed inset-0 z-[9990] flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-4 sm:mx-auto"
        initial={shouldReduce ? {} : { y: '100%' }}
        animate={shouldReduce ? {} : { y: 0 }}
        exit={shouldReduce ? {} : { y: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-t-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          style={{
            background: '#0c0716',
            borderTop: `1px solid rgba(${service.accentRgb},0.35)`,
            borderLeft: `1px solid rgba(${service.accentRgb},0.12)`,
            borderRight: `1px solid rgba(${service.accentRgb},0.12)`,
            boxShadow: `0 -24px 80px rgba(${service.accentRgb},0.18)`,
          }}
        >
          {/* Handle bar */}
          <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mb-6" />

          {/* Header */}
          <div className="flex items-start justify-between mb-5 gap-4">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: `rgba(${service.accentRgb},0.15)`, color: service.accent }}
              >
                {service.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white flex-shrink-0"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Price */}
          <div
            className="inline-flex items-baseline gap-2 mb-5 px-4 py-2.5 rounded-2xl"
            style={{
              background: `rgba(${service.accentRgb},0.1)`,
              border: `1px solid rgba(${service.accentRgb},0.2)`,
            }}
          >
            <span className="text-2xl sm:text-3xl font-black text-white">{service.price}</span>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">{service.description}</p>

          {/* Features */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: service.accent }}>
              Inclus dans ce service
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <CheckIcon color={service.accent} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.stack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium"
                style={{
                  background: `rgba(${service.accentRgb},0.1)`,
                  color: service.accent,
                  border: `1px solid rgba(${service.accentRgb},0.2)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              onClose()
              history.pushState({}, '', '/contact')
              window.dispatchEvent(new PopStateEvent('popstate'))
            }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, rgba(${service.accentRgb},0.9), rgba(${service.accentRgb},0.6))`,
              boxShadow: `0 8px 32px rgba(${service.accentRgb},0.3)`,
            }}
          >
            Démarrer ce projet
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )

  return createPortal(modal, document.body)
}

export default function ServiceCarousel3D() {
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduce = useReducedMotion()
  const startXRef = useRef(null)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const prev = useCallback(() => setActive((i) => (i - 1 + services.length) % services.length), [])
  const next = useCallback(() => setActive((i) => (i + 1) % services.length), [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (modalOpen) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next, modalOpen])

  // Touch swipe
  const handleTouchStart = (e) => { startXRef.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (startXRef.current === null) return
    const dx = e.changedTouches[0].clientX - startXRef.current
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
    startXRef.current = null
  }

  const currentService = services[active]

  return (
    <section
      className="relative py-16 sm:py-20"
      aria-label="Nos services"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background color per active service */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 70% 50% at 50% 65%, rgba(${currentService.accentRgb},0.11) 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />

      {/* 3D Carousel — perspective is set here, NOT on a parent of the modal */}
      <div
        className="relative h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center overflow-hidden"
        style={{ perspective: '1400px' }}
      >
        {services.map((service, i) => {
          const raw = (i - active + services.length) % services.length
          const wrappedOffset = raw > services.length / 2 ? raw - services.length : raw
          const t = getCardTransform(wrappedOffset, isMobile)
          const isActive = wrappedOffset === 0

          return (
            <motion.div
              key={service.id}
              className="absolute w-[260px] sm:w-[280px] md:w-[300px]"
              animate={{
                scale: t.scale,
                rotateY: t.rotateY,
                x: t.x,
                z: t.z,
                opacity: t.opacity,
                zIndex: t.zIndex,
              }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                pointerEvents: t.isVisible ? 'auto' : 'none',
              }}
              onClick={() => {
                if (isActive) setModalOpen(true)
                else setActive(i)
              }}
            >
              <div
                className="relative rounded-3xl p-6 sm:p-7 select-none cursor-pointer"
                style={{
                  background: isActive
                    ? `linear-gradient(145deg, rgba(${service.accentRgb},0.18) 0%, rgba(${service.accentRgb},0.05) 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? `1px solid rgba(${service.accentRgb},0.45)`
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive
                    ? `0 20px 60px rgba(${service.accentRgb},0.22), 0 1px 0 rgba(255,255,255,0.06) inset`
                    : '0 8px 32px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                  minHeight: isMobile ? 280 : 320,
                }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, rgba(${service.accentRgb},0.12) 0%, transparent 65%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ background: `rgba(${service.accentRgb},0.15)`, color: service.accent }}
                  >
                    {service.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-lg sm:text-xl font-black mb-4 sm:mb-5 tracking-tight" style={{ color: service.accent }}>
                    {service.price}
                  </p>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {service.features.slice(0, isMobile ? 2 : 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke={service.accent}
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="mt-5 flex items-center gap-2 text-xs sm:text-sm font-semibold"
                      style={{ color: service.accent }}
                    >
                      Voir le détail
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 sm:mt-8 relative z-10">
        <button
          onClick={prev}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
          aria-label="Service précédent"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 24 : 8,
                background: i === active ? currentService.accent : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-2 rounded-full"
              aria-label={`Aller à ${s.title}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
          aria-label="Service suivant"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal — via Portal, escapes the perspective stacking context */}
      <AnimatePresence>
        {modalOpen && (
          <ServiceModal
            service={currentService}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
