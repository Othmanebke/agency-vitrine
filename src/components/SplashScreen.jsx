import { motion, useMotionValue, useMotionTemplate, animate, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

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

/* Floating dot */
function Dot({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
      }}
      animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // in | out
  const [mounted, setMounted] = useState(true)
  const shouldReduce = useReducedMotion()

  // Iris reveal motion value (mask hole size %)
  const hole = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent 0%, transparent ${hole}%, white ${hole}%, white 100%)`

  const counter = useCounter(100, { startDelay: 300, duration: 2800 })
  const isOut = phase === 'out'

  useEffect(() => {
    // If reduced motion, skip immediately
    if (shouldReduce) {
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
      return
    }
    const t1 = setTimeout(() => setPhase('out'), 3400)
    return () => clearTimeout(t1)
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

      {/* ── Aurora blobs ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 700, height: 700, borderRadius: '50%', top: '50%', left: '50%', marginTop: -350, marginLeft: -350 }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={isOut
          ? { opacity: 0, scale: 0.2 }
          : { opacity: 1, scale: [1, 1.12, 1] }}
        transition={isOut
          ? { duration: 0.3 }
          : { delay: 0.1, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(236,72,153,0.14) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 400, height: 400, borderRadius: '50%', top: '30%', left: '25%' }}
        initial={{ opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { opacity: [0.5, 0.8, 0.5], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ delay: 0.3, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 350, height: 350, borderRadius: '50%', bottom: '25%', right: '22%' }}
        initial={{ opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { opacity: [0.4, 0.7, 0.4], x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ delay: 0.6, duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </motion.div>

      {/* ── Floating micro-particles ── */}
      <Dot x="38%" y="42%" size={5} color="rgba(139,92,246,0.9)" duration={3.2} delay={0.8} />
      <Dot x="62%" y="38%" size={3} color="rgba(236,72,153,0.85)" duration={4.1} delay={1.3} />
      <Dot x="44%" y="60%" size={4} color="rgba(167,139,250,0.8)" duration={3.7} delay={0.4} />
      <Dot x="58%" y="58%" size={3} color="rgba(99,102,241,0.9)" duration={4.5} delay={1.8} />
      <Dot x="34%" y="55%" size={2} color="rgba(236,72,153,0.7)" duration={3.0} delay={2.2} />
      <Dot x="66%" y="50%" size={3} color="rgba(139,92,246,0.75)" duration={5.0} delay={0.2} />

      {/* ── Thin ring ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280, height: 280,
          border: '1px solid rgba(139,92,246,0.18)',
          top: '50%', left: '50%',
          marginTop: -140, marginLeft: -140,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isOut ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220, height: 220,
          border: '1px solid rgba(236,72,153,0.12)',
          top: '50%', left: '50%',
          marginTop: -110, marginLeft: -110,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isOut ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Logo ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.75, filter: 'blur(24px)' }}
        animate={isOut
          ? { opacity: 0, scale: 1.15, filter: 'blur(16px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={isOut
          ? { duration: 0.25 }
          : { delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/logo.png" alt="WEXOR" className="h-20 sm:h-28 w-auto" draggable={false} />
        {/* Soft glow underneath logo */}
        <div
          className="absolute inset-0 -z-10 rounded-full"
          style={{ filter: 'blur(32px)', background: 'rgba(139,92,246,0.4)', transform: 'scale(1.4)' }}
        />
      </motion.div>

      {/* ── Tagline ── */}
      <motion.p
        className="relative z-10 mt-7 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-mono"
        style={{ color: 'rgba(161,161,170,0.55)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={isOut ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Agence Digitale · Design &amp; Développement
      </motion.p>

      {/* ── Progress ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="text-[11px] font-mono tabular-nums" style={{ color: 'rgba(139,92,246,0.8)' }}>
          {String(counter).padStart(3, '0')}<span style={{ color: 'rgba(255,255,255,0.18)' }}>%</span>
        </span>
        <div className="relative w-44 sm:w-64 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${counter}%`, background: 'linear-gradient(90deg, #7c3aed, #ec4899)' }}
          />
          {/* Shimmer on bar */}
          <motion.div
            className="absolute inset-y-0 w-10 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
            animate={{ x: ['-40px', '280px'] }}
            transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* ── Corner labels ── */}
      <motion.div
        className="absolute top-8 right-10 hidden sm:block text-[9px] font-mono tracking-[0.25em] uppercase"
        style={{ color: 'rgba(255,255,255,0.1)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        v1.0
      </motion.div>
      <motion.div
        className="absolute bottom-9 left-10 hidden sm:block text-[9px] font-mono tracking-[0.2em]"
        style={{ color: 'rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        © 2026 WEXOR
      </motion.div>

      {/* ── Horizontal accent lines ── */}
      {['top', 'bottom'].map((pos) => (
        <motion.div
          key={pos}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            [pos]: '8%',
            background: pos === 'top'
              ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(236,72,153,0.2), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={{ delay: pos === 'top' ? 0.5 : 0.65, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.div>
  )
}
