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
    <span className="inline-block relative" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18 })
  const springY = useSpring(y, { stiffness: 250, damping: 18 })
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (shouldReduce || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={shouldReduce ? {} : { scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
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
  'React', 'Next.js', 'Vercel', 'Figma', 'Framer', 'WordPress', 'Tailwind', 'SEO',
]

/* ── Stagger variants ── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const child = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

/* ── 3D-look Wave Shape (SVG + CSS) ── */
function WaveShape() {
  const shouldReduce = useReducedMotion()
  return (
    <div className="absolute inset-y-0 right-0 w-[52%] pointer-events-none overflow-hidden" aria-hidden>
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 85% 50%, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.06) 50%, transparent 75%)',
        }}
      />

      {/* Main sculptured wave — mimics the 3D smooth ribbon from the mockup */}
      <svg
        viewBox="0 0 620 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main wave gradient — light center like a lit 3D surface */}
          <linearGradient id="wg1" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="rgba(200,180,255,0.0)" />
            <stop offset="30%" stopColor="rgba(160,130,255,0.55)" />
            <stop offset="55%" stopColor="rgba(220,210,255,0.85)" />
            <stop offset="75%" stopColor="rgba(160,130,255,0.50)" />
            <stop offset="100%" stopColor="rgba(100,70,200,0.08)" />
          </linearGradient>
          {/* Shadow edge gradient */}
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(80,40,160,0.0)" />
            <stop offset="40%" stopColor="rgba(120,60,200,0.4)" />
            <stop offset="100%" stopColor="rgba(60,20,120,0.7)" />
          </linearGradient>
          {/* Highlight streak */}
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          {/* Soft blur filter for the glow layers */}
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="tinyBlur">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* ── Layer 1: Back shadow face ── */}
        <motion.path
          d="M 620 -20
             C 480 60, 200 100, 60 280
             C -30 410, 100 560, 300 620
             C 440 660, 580 600, 620 550
             Z"
          fill="url(#wg2)"
          opacity={0.5}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {/* ── Layer 2: Main lit face ── */}
        <motion.path
          d="M 620 -20
             C 500 50, 220 90, 90 260
             C -10 400, 110 550, 320 610
             C 460 645, 590 580, 620 530
             Z"
          fill="url(#wg1)"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        {/* ── Layer 3: Second wave ribbon (like the maquette has 2-3 layered ridges) ── */}
        <motion.path
          d="M 620 80
             C 520 140, 300 180, 180 320
             C 90 430, 180 550, 380 600
             C 510 630, 620 570, 620 530
             Z"
          fill="rgba(140, 100, 255, 0.30)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
        />

        {/* ── Layer 4: Darker inner valley (3D depth) ── */}
        <motion.path
          d="M 620 160
             C 540 210, 360 250, 280 360
             C 200 460, 290 540, 460 570
             C 560 583, 620 545, 620 520
             Z"
          fill="rgba(60, 20, 120, 0.45)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.6 }}
        />

        {/* ── Highlight streak — bright ridge on the lit edge ── */}
        <motion.path
          d="M 610 0
             C 490 70, 230 110, 95 275"
          stroke="url(#wg3)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#tinyBlur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />

        {/* ── Inner secondary highlight ── */}
        <motion.path
          d="M 620 120
             C 530 170, 340 220, 250 340"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.2"
          fill="none"
          filter="url(#tinyBlur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
        />

        {/* ── Bottom edge fade ── */}
        <motion.path
          d="M 150 580
             C 260 620, 450 640, 620 620"
          stroke="rgba(160,120,255,0.3)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        />
      </svg>

      {/* Subtle floating glow orbs inside wave area */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320, height: 320,
          top: '10%', right: '5%',
          background: 'radial-gradient(circle, rgba(180,140,255,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        animate={shouldReduce ? {} : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200,
          bottom: '15%', right: '15%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
        animate={shouldReduce ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  )
}

/* ── Logo marquee ── */
function LogoStrip() {
  const doubled = [...logos, ...logos]
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div className="flex items-center gap-10 animate-marquee shrink-0 w-max" style={{ animationDuration: '24s' }}>
        {doubled.map((name, i) => (
          <span
            key={i}
            className="shrink-0 text-sm font-semibold text-zinc-500 tracking-wide whitespace-nowrap hover:text-zinc-300 transition-colors duration-300"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Hero ─── */
export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050510]">

      {/* Subtle left ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 5% 55%, rgba(139,92,246,0.1) 0%, transparent 65%)',
        }}
      />

      {/* 3D Wave — right side */}
      <WaveShape />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-24">
        <motion.div
          variants={shouldReduce ? {} : container}
          initial="hidden"
          animate="visible"
          className="flex flex-col max-w-[52%]"
        >
          {/* Badge */}
          <motion.div
            variants={shouldReduce ? {} : child}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-zinc-300 text-xs font-medium mb-10 backdrop-blur-sm"
          >
            <svg className="w-3 h-3 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Agence digitale — Sites, Identité &amp; SEO
          </motion.div>

          {/* Headline — massive, white, like the mockup */}
          <motion.h1
            variants={shouldReduce ? {} : child}
            className="text-[4rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black leading-[1.0] tracking-tight text-white"
          >
            <span className="block">On crée des</span>
            <span className="block">sites&nbsp;<CyclingWord /></span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduce ? {} : child}
            className="mt-8 text-base md:text-lg text-zinc-400 leading-relaxed max-w-md"
          >
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs — style maquette: outline + filled */}
          <motion.div
            variants={shouldReduce ? {} : child}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="/contact"
              onClick={(e) => {
                e.preventDefault()
                history.pushState({}, '', '/contact')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300 overflow-hidden"
            >
              <span className="relative">Demander un devis</span>
              <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>

            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            >
              Voir nos services
            </motion.a>
          </motion.div>

          {/* Divider + stats + label — like "Powering 5000+ AI teams" in the mockup */}
          <motion.div
            variants={shouldReduce ? {} : child}
            className="mt-14 pt-10 border-t border-white/8"
          >
            <div className="flex items-start gap-10">
              {/* Left label */}
              <div className="shrink-0">
                <p className="text-zinc-500 text-xs leading-snug">
                  Faisant confiance<br />à nos clients
                </p>
              </div>
              {/* Stats */}
              <div className="flex gap-8 flex-wrap">
                {stats.map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-white tabular-nums">
                      <CountUp value={s.value} />
                    </div>
                    <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Logo strip — full width, at the bottom like the mockup */}
        <motion.div
          className="mt-16"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={shouldReduce ? {} : { opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <LogoStrip />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-zinc-600"
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={shouldReduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.8 }}
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
