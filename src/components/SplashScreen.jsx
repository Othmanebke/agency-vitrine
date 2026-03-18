import { motion, useMotionValue, useMotionTemplate, animate, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function useCounter(to, { startDelay = 0, duration = 2600 } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setVal(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(t)
  }, [])
  return val
}

/* Dot grid background */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 75%)',
      }}
    />
  )
}

/* Sparks burst after logo appears */
function SparkBurst({ active }) {
  const sparks = [
    { angle: 0,   dist: 140, color: '#7c3aed' },
    { angle: 45,  dist: 110, color: '#ec4899' },
    { angle: 90,  dist: 140, color: '#6366f1' },
    { angle: 135, dist: 110, color: '#7c3aed' },
    { angle: 180, dist: 140, color: '#ec4899' },
    { angle: 225, dist: 110, color: '#a78bfa' },
    { angle: 270, dist: 140, color: '#f472b6' },
    { angle: 315, dist: 110, color: '#818cf8' },
    { angle: 22,  dist: 90,  color: '#c084fc' },
    { angle: 112, dist: 90,  color: '#f9a8d4' },
    { angle: 202, dist: 90,  color: '#7c3aed' },
    { angle: 292, dist: 90,  color: '#ec4899' },
  ]

  if (!active) return null

  return (
    <>
      {sparks.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180
        const tx = Math.cos(rad) * s.dist
        const ty = Math.sin(rad) * s.dist
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              background: s.color,
              boxShadow: `0 0 8px 2px ${s.color}`,
              top: '50%',
              left: '50%',
              marginTop: -1,
              marginLeft: -1,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.015 }}
          />
        )
      })}
    </>
  )
}

/* Expanding pulse ring */
function PulseRing({ delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ border: `1px solid ${color}`, top: '50%', left: '50%' }}
      initial={{ width: 160, height: 160, marginTop: -80, marginLeft: -80, opacity: 0.8, scale: 1 }}
      animate={{ scale: 3.5, opacity: 0 }}
      transition={{ duration: 2.2, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.6 }}
    />
  )
}

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in')
  const [mounted, setMounted] = useState(true)
  const [glitching, setGlitching] = useState(false)
  const [sparks, setSparks] = useState(false)
  const shouldReduce = useReducedMotion()

  const hole = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent 0%, transparent ${hole}%, white ${hole}%, white 100%)`
  const counter = useCounter(100, { startDelay: 300, duration: 2800 })
  const isOut = phase === 'out'

  useEffect(() => {
    if (shouldReduce) {
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
      return
    }
    const tGlitch  = setTimeout(() => setGlitching(true),  1400)
    const tGlitchB = setTimeout(() => setGlitching(false), 1650)
    const tSparks  = setTimeout(() => setSparks(true),     1700)
    const tSparksB = setTimeout(() => setSparks(false),    2500)
    const tOut     = setTimeout(() => setPhase('out'),     3400)
    return () => [tGlitch, tGlitchB, tSparks, tSparksB, tOut].forEach(clearTimeout)
  }, [shouldReduce, onDone])

  useEffect(() => {
    if (phase !== 'out') return
    animate(hole, 160, {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        setMounted(false)
        sessionStorage.setItem('nw_loaded', '1')
        onDone()
      },
    })
  }, [phase, hole, onDone])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: '#050510', maskImage, WebkitMaskImage: maskImage }}
    >
      {/* Dot grid */}
      <DotGrid />

      {/* Aurora — deep center glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 900, height: 900, borderRadius: '50%',
          top: '50%', left: '50%', marginTop: -450, marginLeft: -450,
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={isOut
          ? { opacity: 0, scale: 0.2 }
          : { opacity: 1, scale: [1, 1.08, 1] }}
        transition={isOut
          ? { duration: 0.3 }
          : { delay: 0.1, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(236,72,153,0.1) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }} />
      </motion.div>

      {/* Aurora — side drifts */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 450, height: 450, borderRadius: '50%', top: '28%', left: '20%' }}
        initial={{ opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { opacity: [0.4, 0.75, 0.4], x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ delay: 0.4, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 380, height: 380, borderRadius: '50%', bottom: '22%', right: '18%' }}
        initial={{ opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { opacity: [0.35, 0.65, 0.35], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ delay: 0.7, duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }} />
      </motion.div>

      {/* Pulse rings expanding */}
      {!isOut && (
        <>
          <PulseRing delay={1.1} color="rgba(124,58,237,0.5)" />
          <PulseRing delay={1.9} color="rgba(236,72,153,0.4)" />
          <PulseRing delay={2.7} color="rgba(99,102,241,0.35)" />
        </>
      )}

      {/* Spark burst */}
      <SparkBurst active={sparks} />

      {/* ── LOGO ZONE ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.55, filter: 'blur(28px)' }}
        animate={isOut
          ? { opacity: 0, scale: 1.18, filter: 'blur(18px)' }
          : glitching
            ? { opacity: 1, scale: 1, filter: 'blur(0px)', x: [0, -5, 5, -3, 3, 0] }
            : { opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
        transition={isOut
          ? { duration: 0.25 }
          : glitching
            ? { x: { duration: 0.25, ease: 'easeInOut' } }
            : { delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer spinning conic ring */}
        {!isOut && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              inset: '-48px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(124,58,237,0.9) 18%, rgba(236,72,153,1) 36%, rgba(99,102,241,0.8) 54%, rgba(244,114,182,0.7) 72%, transparent 88%)',
              filter: 'blur(10px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85], rotate: 360 }}
            transition={{
              opacity: { delay: 0.9, duration: 0.6 },
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
          />
        )}

        {/* Counter-spin ring */}
        {!isOut && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              inset: '-28px',
              borderRadius: '50%',
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(236,72,153,0.5) 20%, transparent 45%, rgba(124,58,237,0.4) 65%, transparent 80%)',
              filter: 'blur(6px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8], rotate: -360 }}
            transition={{
              opacity: { delay: 1.1, duration: 0.5 },
              rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
            }}
          />
        )}

        {/* Static border rings */}
        {[{ inset: '-54px', color: 'rgba(139,92,246,0.25)', delay: 1.0 },
          { inset: '-34px', color: 'rgba(236,72,153,0.18)', delay: 1.15 }].map((r, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-full"
            style={{ inset: r.inset, border: `1px solid ${r.color}` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isOut ? { opacity: 0 } : { opacity: 1, scale: 1 }}
            transition={{ delay: r.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Logo image */}
        <div className="relative flex items-center justify-center">
          <img
            src="/logo.png"
            alt="WEXOR"
            draggable={false}
            style={{
              height: 'clamp(110px, 18vw, 200px)',
              width: 'auto',
              position: 'relative',
              zIndex: 10,
            }}
          />

          {/* Chromatic aberration overlay on glitch */}
          {glitching && (
            <>
              <img src="/logo.png" aria-hidden draggable={false} style={{
                position: 'absolute', zIndex: 9,
                height: 'clamp(110px, 18vw, 200px)', width: 'auto',
                filter: 'hue-rotate(280deg) saturate(3) brightness(1.5)',
                opacity: 0.55, transform: 'translateX(-5px) translateY(1px)',
                mixBlendMode: 'screen',
              }} />
              <img src="/logo.png" aria-hidden draggable={false} style={{
                position: 'absolute', zIndex: 9,
                height: 'clamp(110px, 18vw, 200px)', width: 'auto',
                filter: 'hue-rotate(150deg) saturate(3) brightness(1.5)',
                opacity: 0.45, transform: 'translateX(5px) translateY(-1px)',
                mixBlendMode: 'screen',
              }} />
            </>
          )}

          {/* Under-glow */}
          <div style={{
            position: 'absolute', inset: '-16px', zIndex: 1,
            borderRadius: '50%',
            background: 'rgba(124,58,237,0.55)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
          }} />

          {/* Horizontal scan line sweep */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 11 }}
          >
            <motion.div
              style={{
                position: 'absolute', left: '-10%', right: '-10%', height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.0) 80%, transparent 100%)',
              }}
              initial={{ top: '-5%', opacity: 0 }}
              animate={[
                { top: '-5%',  opacity: 0 },
                { top: '50%',  opacity: 1 },
                { top: '105%', opacity: 0 },
              ]}
              transition={{ delay: 1.0, duration: 0.65, ease: 'easeIn', times: [0, 0.4, 1] }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 mt-9 text-[10px] sm:text-[11px] tracking-[0.42em] uppercase font-mono"
        style={{ color: 'rgba(161,161,170,0.5)' }}
        initial={{ opacity: 0, y: 14 }}
        animate={isOut ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Agence Digitale · Design &amp; Développement
      </motion.p>

      {/* Progress */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="text-[11px] font-mono tabular-nums" style={{ color: 'rgba(139,92,246,0.85)' }}>
          {String(counter).padStart(3, '0')}<span style={{ color: 'rgba(255,255,255,0.18)' }}>%</span>
        </span>
        <div className="relative w-44 sm:w-64 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${counter}%`, background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
          />
          <motion.div
            className="absolute inset-y-0 w-10 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
            animate={{ x: ['-40px', '280px'] }}
            transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Corner labels */}
      <motion.div
        className="absolute top-8 right-10 hidden sm:block text-[9px] font-mono tracking-[0.25em] uppercase"
        style={{ color: 'rgba(255,255,255,0.1)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        v1.0
      </motion.div>
      <motion.div
        className="absolute bottom-9 left-10 hidden sm:block text-[9px] font-mono tracking-[0.2em]"
        style={{ color: 'rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        © 2026 WEXOR
      </motion.div>

      {/* Accent lines */}
      {['top', 'bottom'].map((pos) => (
        <motion.div
          key={pos}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            [pos]: '8%',
            background: pos === 'top'
              ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.25), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={{ delay: pos === 'top' ? 0.5 : 0.65, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.div>
  )
}
