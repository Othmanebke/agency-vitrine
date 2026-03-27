import React, { useState, useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
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

/* ── Data ── */
const stats = [
  { value: '+10', label: 'Clients accompagnés' },
  { value: '100%', label: 'Satisfaction client' },
  { value: '48h', label: 'Délai de réponse max' },
]

const logos = ['React', 'Next.js', 'Vercel', 'Figma', 'Framer', 'WordPress', 'Tailwind', 'SEO']

/* ── Stagger variants ── */
const wrap = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const it = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Logo marquee ── */
function LogoStrip() {
  const doubled = [...logos, ...logos]
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
    >
      <div className="flex items-center gap-10 animate-marquee w-max" style={{ animationDuration: '26s' }}>
        {doubled.map((name, i) => (
          <span key={i} className="shrink-0 text-xs font-semibold text-zinc-600 tracking-widest uppercase whitespace-nowrap hover:text-zinc-400 transition-colors">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Purple ribbon wave — structure from maquette 1
   but with the site's violet/purple palette
   No white, no bright solid: dark > purple > pink
────────────────────────────────────────────── */
function PurpleWave() {
  const shouldReduce = useReducedMotion()
  return (
    <div
      className="absolute inset-y-0 right-0 w-1/2 pointer-events-none hidden md:block"
      aria-hidden
    >
      {/* ambient glow behind the wave */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 85% 45%, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.07) 55%, transparent 80%)',
        }}
      />

      <svg
        viewBox="0 0 600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main ribbon: dark edge → vivid purple → fades to bgnd */}
          <linearGradient id="pw1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(15,5,40,0.0)"   />
            <stop offset="25%"  stopColor="rgba(109,40,217,0.55)" />
            <stop offset="55%"  stopColor="rgba(139,92,246,0.90)" />
            <stop offset="78%"  stopColor="rgba(168,85,247,0.65)" />
            <stop offset="100%" stopColor="rgba(15,5,40,0.0)"   />
          </linearGradient>
          {/* Second ribbon: pink accent */}
          <linearGradient id="pw2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(236,72,153,0.0)"  />
            <stop offset="35%"  stopColor="rgba(219,39,119,0.45)" />
            <stop offset="65%"  stopColor="rgba(236,72,153,0.70)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.0)"  />
          </linearGradient>
          {/* Inner dark shadow (3-D valley) */}
          <linearGradient id="pw3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(5,2,20,0.0)"    />
            <stop offset="50%"  stopColor="rgba(30,10,80,0.55)" />
            <stop offset="100%" stopColor="rgba(5,2,20,0.0)"    />
          </linearGradient>
          {/* Highlight streak gradient */}
          <linearGradient id="pwH" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(200,180,255,0.0)"  />
            <stop offset="45%"  stopColor="rgba(200,180,255,0.7)"  />
            <stop offset="100%" stopColor="rgba(200,180,255,0.0)"  />
          </linearGradient>
          <filter id="fb"><feGaussianBlur stdDeviation="1.5"/></filter>
        </defs>

        {/* ── Back shadow ── */}
        <motion.path
          d="M600 -30 C460 55,180 95,55 275 C-35 410,105 568,310 618 C455 650,580 590,600 545 Z"
          fill="url(#pw3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.1 }}
        />

        {/* ── Main ribbon ── */}
        <motion.path
          d="M600 -30 C470 48,195 88,68 265 C-28 400,100 555,308 612 C452 645,588 582,600 542 Z"
          fill="url(#pw1)"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.0 }}
        />

        {/* ── Pink accent ribbon ── */}
        <motion.path
          d="M600 80 C500 150,295 192,175 322 C85 430,178 552,385 600 C515 630,600 572,600 542 Z"
          fill="url(#pw2)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />

        {/* ── Inner dark valley (3-D depth read) ── */}
        <motion.path
          d="M600 170 C530 215,358 255,268 365 C190 460,288 542,465 570 C560 582,600 548,600 530 Z"
          fill="rgba(5,2,20,0.45)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* ── Top highlight streak ── */}
        <motion.path
          d="M592 -10 C468 58,210 96,75 262"
          stroke="url(#pwH)"
          strokeWidth="2"
          fill="none"
          filter="url(#fb)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />

        {/* ── Secondary inner highlight ── */}
        <motion.path
          d="M600 110 C515 162,330 210,235 335"
          stroke="rgba(180,140,255,0.3)"
          strokeWidth="1"
          fill="none"
          filter="url(#fb)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        />
      </svg>

      {/* Floating glow orbs layered on top of the wave */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 260, height: 260,
          top: '12%', right: '8%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 65%)',
          filter: 'blur(36px)',
        }}
        animate={shouldReduce ? {} : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 180, height: 180,
          bottom: '18%', right: '18%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 65%)',
          filter: 'blur(28px)',
        }}
        animate={shouldReduce ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   HERO  — structure from mockup 1
   Left-aligned content (max 48% on desktop)
   Purple wave on the right
   Fully responsive
───────────────────────────────────────── */
export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050510]">

      {/* Left ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 0% 55%, rgba(139,92,246,0.1) 0%, transparent 65%)',
        }}
      />

      {/* Purple wave — right half, desktop only */}
      <PurpleWave />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16">

        <motion.div
          variants={shouldReduce ? {} : wrap}
          initial="hidden"
          animate="visible"
          /* on desktop: max 48% width so wave shows; on mobile: full width */
          className="flex flex-col md:max-w-[48%]"
        >

          {/* Badge — mirrors mockup "✦ AI Infrastructure Platform" */}
          <motion.div
            variants={shouldReduce ? {} : it}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] text-zinc-300 text-xs font-medium mb-8 backdrop-blur-sm"
          >
            <svg className="w-3 h-3 flex-shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Agence digitale — Sites, Identité &amp; SEO
          </motion.div>

          {/* ── Headline ── 
              Responsive: scales from mobile to desktop
              Uses clamp-like Tailwind classes — no overflow possible  */}
          <motion.h1
            variants={shouldReduce ? {} : it}
            className="font-black leading-[1.04] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
          >
            <span className="block">On crée des sites</span>
            <span className="block mt-1">
              <CyclingWord />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduce ? {} : it}
            className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-sm"
          >
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs — structure from mockup: outline left, filled right */}
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

            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            >
              Devis gratuit
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── "Powering 5000+" area — mirrors mockup bottom-left ── */}
          <motion.div
            variants={shouldReduce ? {} : it}
            className="mt-10 flex items-start gap-4"
          >
            {/* Label */}
            <div className="shrink-0 leading-snug">
              <p className="text-white text-sm font-semibold">
                <CountUp value="+10" />&nbsp;clients
              </p>
              <p className="text-zinc-500 text-xs">accompagnés avec succès</p>
            </div>
            {/* Divider */}
            <div className="w-px h-10 bg-white/10 mt-0.5" />
            {/* Micro stats */}
            <div className="flex flex-col gap-0.5">
              <p className="text-white text-sm font-semibold"><CountUp value="100%" /> satisfaction</p>
              <p className="text-zinc-500 text-xs">Réponse garantie sous&nbsp;<CountUp value="48h" /></p>
            </div>
          </motion.div>

        </motion.div>

        {/* ── Logo strip — full width, bottom (like logos in mockup) ── */}
        <motion.div
          className="mt-16 border-t border-white/[0.06] pt-8"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={shouldReduce ? {} : { opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <LogoStrip />
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
