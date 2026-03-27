import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'

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
    <span
      className="inline-block relative"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, y: -28, filter: 'blur(10px)', scale: 0.95 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18 })
  const springY = useSpring(y, { stiffness: 250, damping: 18 })
  const handleMouseMove = (e) => {
    if (shouldReduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduce ? {} : { scale: 1.06, boxShadow: '0 0 60px rgba(139,92,246,0.55), 0 0 120px rgba(236,72,153,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ── Data ── */
const stats = [
  { value: '+10', label: 'Clients accompagnés' },
  { value: '100%', label: 'Satisfaction client' },
  { value: '48h', label: 'Délai de réponse max' },
]

const logos = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Framer', icon: '◈' },
  { name: 'Vercel', icon: '◭' },
  { name: 'WordPress', icon: '⊕' },
  { name: 'Figma', icon: '◉' },
  { name: 'SEO', icon: '⌖' },
  { name: 'Tailwind', icon: '✦' },
]

/* ── Stagger variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.05 }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
}

/* ── Abstract wave shape (SVG) ── */
function WaveShape() {
  return (
    <div
      className="absolute right-0 top-0 w-[55%] h-full pointer-events-none"
      aria-hidden
    >
      {/* Ambient glow behind shape */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.08) 50%, transparent 75%)',
        }}
      />

      {/* Main SVG wave */}
      <svg
        viewBox="0 0 700 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.9)" />
            <stop offset="60%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.0)" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(236,72,153,0.7)" />
            <stop offset="50%" stopColor="rgba(139,92,246,0.4)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.0)" />
          </linearGradient>
          <linearGradient id="waveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.6)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.0)" />
          </linearGradient>
          <filter id="waveBlur">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Background glow blob */}
        <ellipse cx="420" cy="310" rx="280" ry="200" fill="rgba(139,92,246,0.06)" />

        {/* Wave ribbon 1 — main */}
        <motion.path
          d="M 700 0 C 500 80, 200 120, 80 300 C -20 440, 200 540, 400 580 C 550 610, 680 550, 700 500 Z"
          fill="url(#waveGrad1)"
          opacity="0.85"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        {/* Wave ribbon 2 — mid layer */}
        <motion.path
          d="M 700 100 C 480 160, 260 180, 160 340 C 80 460, 260 560, 460 580 C 600 595, 700 530, 700 500 Z"
          fill="url(#waveGrad2)"
          opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />

        {/* Wave ribbon 3 — accent layer */}
        <motion.path
          d="M 700 200 C 560 240, 380 260, 300 370 C 220 480, 380 560, 560 570 C 650 576, 700 540, 700 500 Z"
          fill="url(#waveGrad3)"
          opacity="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.8 }}
        />

        {/* Highlight streak on top edge of wave */}
        <motion.path
          d="M 700 0 C 500 80, 200 120, 80 300"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#waveBlur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        />

        {/* Inner highlight — gleam */}
        <motion.path
          d="M 700 80 C 540 140, 300 200, 200 330 C 130 430, 260 510, 440 560"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        />
      </svg>

      {/* Floating orbs inside the wave area */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          top: '15%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          bottom: '20%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  )
}

/* ── Logo marquee ── */
function LogoMarquee() {
  const doubled = [...logos, ...logos]
  return (
    <div className="flex items-center gap-3 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <div className="flex gap-6 animate-marquee shrink-0" style={{ animationDuration: '22s' }}>
        {doubled.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
          >
            <span className="text-zinc-400 text-sm">{l.icon}</span>
            <span className="text-zinc-400 text-xs font-medium whitespace-nowrap">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background gradient noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 10% 60%, rgba(139,92,246,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Abstract wave shape — right side */}
      <WaveShape />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-16">
        <motion.div
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            variants={shouldReduce ? {} : childVariants}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Agence digitale — Sites, Identité &amp; SEO
          </motion.div>

          {/* Headline */}
          <motion.div variants={shouldReduce ? {} : childVariants}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.03] tracking-tight font-black">
              <span className="block text-white">On crée des sites</span>
              <span className="block mt-2">
                <CyclingWord />
              </span>
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            variants={shouldReduce ? {} : childVariants}
            className="mt-7 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={shouldReduce ? {} : childVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="/contact"
              onClick={(e) => {
                e.preventDefault()
                history.pushState({}, '', '/contact')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Demander un devis</span>
              <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>

            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.04, borderColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-white/15 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Voir nos services
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={shouldReduce ? {} : childVariants}
            className="mt-14 mb-5 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent max-w-xs" />
            <span className="text-zinc-600 text-xs uppercase tracking-widest font-medium">Stack &amp; Outils</span>
          </motion.div>

          {/* Logo marquee */}
          <motion.div variants={shouldReduce ? {} : childVariants}>
            <LogoMarquee />
          </motion.div>

        </motion.div>

        {/* ── Stats row — bottom left ── */}
        <motion.div
          className="mt-16 flex flex-wrap gap-8 sm:gap-14"
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col">
              <div className="text-3xl sm:text-4xl font-black text-gradient tabular-nums">
                <CountUp value={s.value} />
              </div>
              <div className="text-xs text-zinc-500 mt-1.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600 z-10"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={shouldReduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-violet-500/30 to-zinc-600" />
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
