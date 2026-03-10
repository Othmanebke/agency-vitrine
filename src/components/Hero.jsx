import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion'

const WORDS = ['convertissent', 'sur-mesure', 'performants', 'mémorables', 'visibles']

function CyclingWord() {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  if (shouldReduce) {
    return <span className="text-gradient">{WORDS[0]}</span>
  }

  return (
    <span
      className="inline-block relative"
      style={{ minWidth: '0' }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, y: -24, filter: 'blur(8px)', scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

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
      whileHover={shouldReduce ? {} : { scale: 1.06, boxShadow: '0 0 60px rgba(139,92,246,0.6), 0 0 120px rgba(236,72,153,0.25)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.a>
  )
}

const stats = [
  { value: '+10', label: 'Clients accompagnés' },
  { value: '100%', label: 'Satisfaction client' },
  { value: '48h', label: 'Délai de réponse max' },
]

const badges = ['React', 'Next.js', 'SEO', 'Tailwind', 'Framer', 'Vercel', 'WordPress', 'IA']

/* ─── Stagger variants for cascading reveal ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const orbX = useTransform(springX, v => v * -80)
  const orbY = useTransform(springY, v => v * -50)
  const orb2X = useTransform(springX, v => v * 50)
  const orb2Y = useTransform(springY, v => v * 40)
  const orb3X = useTransform(springX, v => v * -30)
  const orb3Y = useTransform(springY, v => v * 60)

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pb-20"
      onMouseMove={(e) => {
        if (shouldReduce) return
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = (e.clientX - rect.left) / rect.width - 0.5
        const cy = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(cx)
        mouseY.set(cy)
      }}
    >
      {/* parallax orb — main (enhanced) */}
      <motion.div
        aria-hidden
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/25 blur-[100px]"
      />
      {/* parallax orb — secondary (enhanced) */}
      <motion.div
        aria-hidden
        animate={shouldReduce ? {} : { scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: orb2X, y: orb2Y }}
        className="pointer-events-none absolute right-1/4 top-1/2 w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[120px]"
      />
      {/* parallax orb — tertiary */}
      <motion.div
        aria-hidden
        animate={shouldReduce ? {} : { scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{ x: orb3X, y: orb3Y }}
        className="pointer-events-none absolute left-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[100px]"
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* ─── Stagger Container ─── */}
        <motion.div
          className="text-center"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* badge */}
          <motion.div variants={shouldReduce ? {} : childVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-10">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Agence digitale — Sites, Identité & SEO
          </motion.div>

          {/* ─── Hero Headline with Mixed Weights + Glow ─── */}
          <motion.div variants={shouldReduce ? {} : childVariants} className="relative">
            {/* Glow spot behind title */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)',
              }}
              aria-hidden
            />
            <h1 className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[1.05] tracking-tight">
              <span className="block font-extralight text-zinc-300">On crée des</span>
              <span className="block mt-2 font-black">
                sites <CyclingWord />
              </span>
            </h1>
          </motion.div>

          <motion.p variants={shouldReduce ? {} : childVariants} className="mt-8 text-base md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={shouldReduce ? {} : childVariants} className="mt-12 flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="/contact"
              onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Demander un devis</span>
              <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </MagneticButton>
            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              Nos services
            </motion.a>
          </motion.div>

          {/* tech badges */}
          <motion.div variants={shouldReduce ? {} : childVariants} className="mt-14 flex flex-wrap justify-center gap-2">
            {badges.map((b, i) => (
              <motion.span
                key={b}
                whileHover={{ scale: 1.1, borderColor: 'rgba(139,92,246,0.5)' }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-zinc-400 backdrop-blur-sm transition-colors hover:text-violet-300"
              >
                {b}
              </motion.span>
            ))}
          </motion.div>

          {/* stats */}
          <motion.div variants={shouldReduce ? {} : childVariants} className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gradient"><CountUp value={s.value} /></div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* scroll indicator */}
          <motion.div
            variants={shouldReduce ? {} : childVariants}
            className="mt-20 flex justify-center"
          >
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1.5 text-zinc-600"
            >
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-violet-500/30 to-zinc-600" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
