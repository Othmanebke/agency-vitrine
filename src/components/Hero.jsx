import React, { useState, useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion'

/* ─────────────────────────────────────────
   Cycling boxed word  (adapté from maquette)
───────────────────────────────────────── */
const WORDS = ['performants', 'mémorables', 'visibles', 'convertissent']

function BoxedWord() {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 px-3 inline-block text-white"
        >
          {WORDS[index]}
          {/* The box border — like the mockup */}
          <motion.span
            layoutId="box-border"
            className="absolute inset-0 rounded-md border-2 border-violet-400/70"
            style={{ boxShadow: '0 0 18px rgba(139,92,246,0.35), inset 0 0 12px rgba(139,92,246,0.08)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ─────────────────────────────────────────
   Floating client bubbles  (like the mockup)
───────────────────────────────────────── */
const bubbles = [
  { name: 'Antoine',  initial: { x: -260, y: -80  }, delay: 0.6  },
  { name: 'Camille',  initial: { x:  200, y: -100 }, delay: 0.8  },
  { name: 'Thomas',   initial: { x: -320, y:  80  }, delay: 1.0  },
  { name: 'Léa',      initial: { x:  280, y:  60  }, delay: 1.2  },
  { name: 'Maxime',   initial: { x: -100, y:  140 }, delay: 1.4  },
  { name: 'Sophie',   initial: { x:  140, y:  150 }, delay: 1.6  },
]

function FloatingBubble({ name, position, delay, shouldReduce }) {
  return (
    <motion.div
      className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md text-white text-xs font-medium whitespace-nowrap shadow-lg"
      style={{ left: `calc(50% + ${position.x}px)`, top: `calc(50% + ${position.y}px)`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {/* small avatar dot */}
      <span
        className="w-4 h-4 rounded-full flex-shrink-0"
        style={{
          background: `hsl(${(name.charCodeAt(0) * 47) % 360}, 70%, 60%)`,
        }}
      />
      {name}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Count-up
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Magnetic CTA
───────────────────────────────────────── */
function MagneticButton({ href, className, children, onClick }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })
  return (
    <motion.a
      ref={ref}
      href={href}
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

/* ─────────────────────────────────────────
   Logo marquee
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Stats
───────────────────────────────────────── */
const stats = [
  { value: '+10', label: 'Clients accompagnés' },
  { value: '100%', label: 'Satisfaction client' },
  { value: '48h', label: 'Délai de réponse max' },
]

/* ─────────────────────────────────────────
   stagger variants
───────────────────────────────────────── */
const wrap = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050510]">

      {/* ── Central radial glow (like the mockup background) ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.08) 45%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Floating client bubbles ── */}
      {!shouldReduce && bubbles.map(b => (
        <FloatingBubble
          key={b.name}
          name={b.name}
          position={b.initial}
          delay={b.delay}
          shouldReduce={shouldReduce}
        />
      ))}

      {/* Grid dot pattern overlay — subtle like the mockup */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center pt-32 pb-20">
        <motion.div
          variants={shouldReduce ? {} : wrap}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Badge */}
          <motion.div
            variants={shouldReduce ? {} : item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/12 bg-white/[0.05] text-zinc-300 text-xs font-medium mb-10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Agence digitale — Sites, Identité &amp; SEO
          </motion.div>

          {/* ── Big headline — centered, like "Ship faster. Build smarter." ── */}
          <motion.h1
            variants={shouldReduce ? {} : item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black leading-[1.04] tracking-tight text-white"
          >
            <span className="block">On crée des sites</span>
            <span className="block mt-2">
              vraiment&nbsp;<BoxedWord />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduce ? {} : item}
            className="mt-8 text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg"
          >
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTA buttons — like the mockup: two solid pills */}
          <motion.div
            variants={shouldReduce ? {} : item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              href="/contact"
              onClick={e => {
                e.preventDefault()
                history.pushState({}, '', '/contact')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-100 shadow-lg shadow-black/30 overflow-hidden transition-all duration-300"
            >
              {/* shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="relative">Demander un devis</span>
            </MagneticButton>

            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:border-white/35 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Nos services
            </motion.a>
          </motion.div>

          {/* Version/meta line — like "v1.3.7 · macOS 13+ · Windows 11+" in the mockup */}
          <motion.p
            variants={shouldReduce ? {} : item}
            className="mt-5 text-xs text-zinc-600 tracking-wide"
          >
            +10 clients accompagnés&nbsp;·&nbsp;100% satisfaction&nbsp;·&nbsp;Réponse sous 48h
          </motion.p>

        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 flex flex-wrap gap-10 justify-center"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-gradient">
                <CountUp value={s.value} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          className="mt-14 w-full"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={shouldReduce ? {} : { opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <LogoStrip />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-zinc-600"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={shouldReduce ? {} : { opacity: 1 }}
        transition={{ delay: 2 }}
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
