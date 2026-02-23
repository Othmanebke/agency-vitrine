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
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
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
      whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: '0 0 44px rgba(139,92,246,0.55)' }}
      whileTap={{ scale: 0.97 }}
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

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const orbX = useTransform(springX, v => v * -60)
  const orbY = useTransform(springY, v => v * -40)
  const orb2X = useTransform(springX, v => v * 40)
  const orb2Y = useTransform(springY, v => v * 30)

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
  })

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
      {/* parallax orb — main */}
      <motion.div
        aria-hidden
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/20 blur-[80px]"
      />
      {/* parallax orb — secondary (moves opposite) */}
      <motion.div
        aria-hidden
        animate={shouldReduce ? {} : { scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: orb2X, y: orb2Y }}
        className="pointer-events-none absolute right-1/4 top-1/2 w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[100px]"
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center">

          {/* badge */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0))} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Agence digitale — Sites, Identité & SEO
          </motion.div>

          {/* headline */}
          <motion.h1 {...(shouldReduce ? {} : fadeUp(0.1))} className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
            <span className="block">On crée des sites</span>
            <span className="block mt-1"><CyclingWord /></span>
          </motion.h1>

          <motion.p {...(shouldReduce ? {} : fadeUp(0.25))} className="mt-6 text-base md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Sites sur-mesure, refonte, SEO et supports print — des expériences digitales pensées pour faire grandir ta marque.
          </motion.p>

          {/* CTAs */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0.35))} className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="/contact"
              onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 transition-shadow"
            >
              Demander un devis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </MagneticButton>
            <motion.a
              href="#services"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors"
            >
              Nos services
            </motion.a>
          </motion.div>

          {/* tech badges */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0.45))} className="mt-12 flex flex-wrap justify-center gap-2">
            {badges.map((b) => (
              <span key={b} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-400">{b}</span>
            ))}
          </motion.div>

          {/* stats */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0.55))} className="mt-16 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gradient"><CountUp value={s.value} /></div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* scroll indicator */}
          <motion.div
            {...(shouldReduce ? {} : { animate: { y: [0, 8, 0] }, transition: { duration: 2, repeat: Infinity } })}
            className="mt-16 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 text-zinc-600">
              <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-600" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
