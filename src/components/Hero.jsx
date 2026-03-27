import React, { useState, useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion'

/* ── Cycling word ── */
const WORDS = ['convertissent', 'sur-mesure', 'performants', 'mémorables', 'visibles']

function CyclingWord() {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  if (shouldReduce) return <span className="text-gradient">{WORDS[0]}</span>

  return (
    <span className="inline-block relative" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ── Count-up ── */
function CountUp({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (!isInView) return
    const match = value.match(/\d+/)
    if (!match) return
    const end = parseInt(match[0])
    const prefix = value.slice(0, match.index)
    const suffix = value.slice(match.index + match[0].length)
    let start = 0
    const step = 1000 / 60
    const increment = end / (1200 / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setDisplay(value); clearInterval(timer) }
      else setDisplay(`${prefix}${Math.floor(start)}${suffix}`)
    }, step)
    return () => clearInterval(timer)
  }, [isInView, value])
  return <span ref={ref}>{display}</span>
}

/* ── Magnetic button ── */
function MagneticButton({ href, className, children, onClick }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })
  return (
    <motion.a
      ref={ref} href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={e => {
        if (shouldReduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.3)
        y.set((e.clientY - r.top - r.height / 2) * 0.3)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={shouldReduce ? {} : { scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >{children}</motion.a>
  )
}

/* ── Stats ── */
const stats = [
  { value: '+10', label: 'Clients accompagnés' },
  { value: '100%', label: 'Satisfaction client' },
  { value: '48h', label: 'Délai de réponse max' },
]

/* ── Logo marquee ── */
const logos = ['React', 'Next.js', 'Vercel', 'Figma', 'Framer', 'WordPress', 'Tailwind', 'SEO']

function LogoStrip() {
  const doubled = [...logos, ...logos]
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
    >
      <div className="flex items-center gap-12 animate-marquee w-max" style={{ animationDuration: '26s' }}>
        {doubled.map((name, i) => (
          <span key={i} className="shrink-0 text-xs font-semibold text-zinc-600 tracking-widest uppercase whitespace-nowrap hover:text-zinc-400 transition-colors">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Stagger variants ── */
const wrap = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const it = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Light streams — particules qui coulent de gauche → droite ── */
const STREAMS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  // démarre à gauche de la zone droite (35-55%) pour traverser vers la droite
  startX: 35 + Math.random() * 20,
  // hauteur variée sur toute la section
  top: 5 + Math.random() * 88,
  // largeur du trait lumineux
  width: 120 + Math.random() * 220,
  // épaisseur : fins au centre, épais rarement
  height: Math.random() < 0.3 ? 2 : 1,
  duration: 2.5 + Math.random() * 3,
  delay: Math.random() * 8,
  // couleur : violet ou pink ou blanc selon index
  color: i % 3 === 0
    ? 'rgba(220,180,255,'
    : i % 3 === 1
    ? 'rgba(244,114,182,'
    : 'rgba(255,255,255,',
  opacity: 0.25 + Math.random() * 0.45,
}))

function LightStreams({ shouldReduce }) {
  if (shouldReduce) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {STREAMS.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.startX}%`,
            width: s.width,
            height: s.height,
            borderRadius: 9999,
            /* fade in depuis gauche, corps lumineux, fade out à droite */
            background: `linear-gradient(90deg,
              rgba(255,255,255,0) 0%,
              ${s.color}${(s.opacity * 0.4).toFixed(2)}) 20%,
              ${s.color}${s.opacity.toFixed(2)}) 55%,
              ${s.color}${(s.opacity * 0.6).toFixed(2)}) 80%,
              rgba(255,255,255,0) 100%)`,
          }}
          initial={{ opacity: 0, x: -s.width * 0.3 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, s.width * 1.2],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050510]">

      {/* Glow de fond très subtil — centré/gauche */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 60% 55% at 20% 55%, rgba(139,92,246,0.13) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 40% at 75% 30%, rgba(236,72,153,0.06) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Light streams — droite du hero */}
      <LightStreams shouldReduce={shouldReduce} />

      {/* ── Contenu principal ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-16">

        <motion.div
          variants={shouldReduce ? {} : wrap}
          initial="hidden"
          animate="visible"
          className="flex flex-col"   /* pleine largeur, pas de max-w */
        >

          {/* Badge */}
          <motion.div
            variants={shouldReduce ? {} : it}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] text-zinc-300 text-xs font-medium mb-8 backdrop-blur-sm"
          >
            <svg className="w-3 h-3 flex-shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Agence digitale — Sites, Identité &amp; SEO
          </motion.div>

          {/* Titre — clamp responsive, jamais trop grand */}
          <motion.h1
            variants={shouldReduce ? {} : it}
            className="font-black leading-[1.04] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)' }}
          >
            <span className="block">On crée des sites</span>
            <span className="block mt-1">
              <CyclingWord />
            </span>
          </motion.h1>

          {/* Sous-titre — max 520px pour rester lisible */}
          <motion.p
            variants={shouldReduce ? {} : it}
            className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-[520px]"
          >
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={shouldReduce ? {} : it}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton
              href="/contact"
              onClick={e => {
                e.preventDefault()
                history.pushState({}, '', '/contact')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] backdrop-blur-sm hover:border-white/40 hover:bg-white/10 overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Nous contacter</span>
              <svg className="relative w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>

            <motion.button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Discuter avec l'IA
            </motion.button>
          </motion.div>

          {/* Stats + Logo strip sur la même ligne — comme dans la maquette */}
          <motion.div
            variants={shouldReduce ? {} : it}
            className="mt-10 border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row sm:items-center gap-6"
          >
            {/* Stats à gauche */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0">
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="hidden sm:block w-px h-8 bg-white/10" />}
                  <div>
                    <div className="text-white text-lg font-black">
                      <CountUp value={s.value} />
                    </div>
                    <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Séparateur vertical */}
            <div className="hidden sm:block w-px h-10 bg-white/10 shrink-0" />

            {/* Logo strip à droite — même hauteur que les stats */}
            <motion.div
              className="flex-1 min-w-0"
              initial={shouldReduce ? {} : { opacity: 0 }}
              animate={shouldReduce ? {} : { opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <LogoStrip />
            </motion.div>
          </motion.div>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-600"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={shouldReduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-violet-500/30 to-zinc-600" />
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}
