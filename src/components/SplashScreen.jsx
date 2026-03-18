import { motion, useMotionValue, useMotionTemplate, animate, AnimatePresence, useReducedMotion } from 'framer-motion'
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

/* Single galaxy streak */
function GalaxyStar({ angle, delay, length, color, distance }) {
  const rad = (angle * Math.PI) / 180
  const tx = Math.sin(rad) * distance
  const ty = -Math.cos(rad) * distance
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '50%', left: '50%',
        marginTop: -(length / 2), marginLeft: -1,
        width: 2, height: length,
        rotate: `${angle}deg`,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, x: 0, y: 0, scaleY: 0 }}
      animate={{ opacity: [0, 1, 0.9, 0], x: [0, tx * 0.5, tx], y: [0, ty * 0.5, ty], scaleY: [0, 1, 0] }}
      transition={{ duration: length > 65 ? 0.9 : 0.75, delay, ease: [0.2, 0, 0.8, 1], times: [0, 0.25, 1] }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: `linear-gradient(to bottom, transparent 0%, ${color} 30%, ${color} 65%, transparent 100%)`,
        borderRadius: 2,
      }} />
    </motion.div>
  )
}

const STARS = [
  { angle: 0,   length: 80, color: 'rgba(167,139,250,0.95)', distance: 210 },
  { angle: 22,  length: 45, color: 'rgba(255,255,255,0.65)', distance: 145 },
  { angle: 45,  length: 70, color: 'rgba(236,72,153,0.9)',   distance: 175 },
  { angle: 68,  length: 42, color: 'rgba(255,255,255,0.6)',  distance: 135 },
  { angle: 90,  length: 75, color: 'rgba(99,102,241,0.95)',  distance: 190 },
  { angle: 112, length: 42, color: 'rgba(244,114,182,0.75)', distance: 138 },
  { angle: 135, length: 68, color: 'rgba(139,92,246,0.9)',   distance: 165 },
  { angle: 158, length: 42, color: 'rgba(255,255,255,0.6)',  distance: 140 },
  { angle: 180, length: 78, color: 'rgba(167,139,250,0.9)',  distance: 200 },
  { angle: 202, length: 42, color: 'rgba(236,72,153,0.75)',  distance: 142 },
  { angle: 225, length: 70, color: 'rgba(99,102,241,0.9)',   distance: 180 },
  { angle: 248, length: 40, color: 'rgba(255,255,255,0.6)',  distance: 132 },
  { angle: 270, length: 75, color: 'rgba(139,92,246,0.95)',  distance: 195 },
  { angle: 292, length: 42, color: 'rgba(244,114,182,0.8)',  distance: 145 },
  { angle: 315, length: 65, color: 'rgba(167,139,250,0.9)',  distance: 168 },
  { angle: 338, length: 40, color: 'rgba(255,255,255,0.6)',  distance: 138 },
]

function GalaxyBurst({ active }) {
  if (!active) return null
  return (
    <>
      {STARS.map((s, i) => <GalaxyStar key={i} {...s} delay={i * 0.028} />)}
    </>
  )
}

/* Per-letter config */
const LETTER_DATA = [
  { char: 'W', gradient: 'linear-gradient(135deg,#ffffff 0%,#c4b5fd 100%)', glow: 'rgba(124,58,237,' },
  { char: 'E', gradient: 'linear-gradient(135deg,#e9d5ff 0%,#a78bfa 100%)', glow: 'rgba(139,92,246,' },
  { char: 'X', gradient: 'linear-gradient(135deg,#fce7f3 0%,#ec4899 100%)', glow: 'rgba(236,72,153,' },
  { char: 'O', gradient: 'linear-gradient(135deg,#c7d2fe 0%,#818cf8 100%)', glow: 'rgba(99,102,241,'  },
  { char: 'R', gradient: 'linear-gradient(135deg,#ffffff 0%,#c4b5fd 100%)', glow: 'rgba(167,139,250,' },
]

/* X offsets per phase — W=0,E=1,X=2,O=3,R=4 */
const SPREAD = [-290, -180, 0, 180, 290]

export default function SplashScreen({ onDone }) {
  const [phase, setPhase]           = useState('init')
  const [mounted, setMounted]       = useState(true)
  const [cursorOn, setCursorOn]     = useState(false)
  const [clicked, setClicked]       = useState(false)
  const [galaxy, setGalaxy]         = useState(false)
  const shouldReduce                = useReducedMotion()

  const hole      = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent 0%, transparent ${hole}%, white ${hole}%, white 100%)`
  const counter   = useCounter(100, { startDelay: 300, duration: 2800 })
  const isOut     = phase === 'out'

  useEffect(() => {
    if (shouldReduce) { sessionStorage.setItem('nw_loaded', '1'); onDone(); return }
    const ts = [
      setTimeout(() => setPhase('x'),                        250),
      setTimeout(() => setCursorOn(true),                   1050),
      setTimeout(() => setClicked(true),                    1520),
      setTimeout(() => { setCursorOn(false); setClicked(false); setPhase('weor') }, 1780),
      setTimeout(() => setPhase('assemble'),                2320),
      setTimeout(() => { setPhase('complete'); setGalaxy(true) }, 2780),
      setTimeout(() => setGalaxy(false),                    3700),
      setTimeout(() => setPhase('out'),                     3820),
    ]
    return () => ts.forEach(clearTimeout)
  }, [shouldReduce, onDone])

  useEffect(() => {
    if (phase !== 'out') return
    animate(hole, 160, {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => { setMounted(false); sessionStorage.setItem('nw_loaded', '1'); onDone() },
    })
  }, [phase, hole, onDone])

  if (!mounted) return null

  /* Compute animate props per letter */
  function letterAnim(i) {
    if (phase === 'init')     return { opacity: 0, x: 0, scale: 1 }
    if (phase === 'x')        return { opacity: i === 2 ? 1 : 0, x: 0, scale: i === 2 ? 1.22 : 1 }
    if (phase === 'click')    return { opacity: i === 2 ? 1 : 0, x: 0, scale: i === 2 ? (clicked ? 0.86 : 1.22) : 1 }
    if (phase === 'weor')     return { opacity: 1, x: SPREAD[i], scale: 1 }
    if (phase === 'assemble') return { opacity: 1, x: 0, scale: 1 }
    if (phase === 'complete') return { opacity: 1, x: 0, scale: 1 }
    if (phase === 'out')      return { opacity: 0, x: 0, scale: 0.92 }
    return { opacity: 0, x: 0, scale: 1 }
  }

  function letterTrans(i) {
    if (phase === 'x')        return { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    if (phase === 'click')    return { duration: 0.14, ease: 'easeOut' }
    if (phase === 'weor')     return { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
    if (phase === 'assemble') return { duration: 0.62, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }
    if (phase === 'out')      return { duration: 0.35, ease: 'easeIn' }
    return { duration: 0.4 }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: '#050510', maskImage, WebkitMaskImage: maskImage }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.13) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 72%)',
      }} />

      {/* Deep aurora glow */}
      <div className="absolute pointer-events-none" style={{
        width: 640, height: 640, borderRadius: '50%',
        top: '50%', left: '50%', marginTop: -320, marginLeft: -320,
        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.09) 50%, transparent 70%)',
        filter: 'blur(70px)',
      }} />

      {/* Galaxy burst */}
      <GalaxyBurst active={galaxy} />

      {/* ── Mouse cursor ── */}
      <AnimatePresence>
        {cursorOn && (
          <motion.div
            key="cursor"
            className="absolute z-30 pointer-events-none"
            style={{ top: '50%', left: '50%' }}
            initial={{ x: 140, y: 110, opacity: 0, scale: 1 }}
            animate={clicked
              ? { x: 22, y: 15, opacity: 1, scale: 0.84 }
              : { x: 20, y: 12, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.18 } }}
            transition={{ duration: clicked ? 0.13 : 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Click ripple */}
            {clicked && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 32, height: 32, top: -6, left: -6,
                  border: '1.5px solid rgba(236,72,153,0.8)',
                }}
                initial={{ scale: 0.3, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            )}
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
              <path
                d="M3 2 L3 20 L8 15 L12.5 24 L15.5 22.5 L11 13.5 L18.5 13.5 Z"
                fill="white"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WEXOR letters ── */}
      <div className="relative z-10 flex items-baseline" style={{ gap: 0 }}>
        {LETTER_DATA.map(({ char, gradient, glow }, i) => (
          <motion.span
            key={char}
            animate={letterAnim(i)}
            transition={letterTrans(i)}
            style={{
              display: 'inline-block',
              filter: `drop-shadow(0 0 22px ${glow}0.75)) drop-shadow(0 0 6px ${glow}0.5))`,
            }}
          >
            <span style={{
              display: 'block',
              fontSize: 'clamp(68px, 12vw, 138px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {char}
            </span>
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 mt-6 text-[10px] sm:text-[11px] tracking-[0.42em] uppercase font-mono"
        style={{ color: 'rgba(161,161,170,0.5)' }}
        initial={{ opacity: 0, y: 14 }}
        animate={isOut ? { opacity: 0 } : phase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Agence Digitale · Design &amp; Développement
      </motion.p>

      {/* Progress bar */}
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
            style={{ width: `${counter}%`, background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}
          />
          <motion.div
            className="absolute inset-y-0 w-10 rounded-full"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)' }}
            animate={{ x: ['-40px', '280px'] }}
            transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Corner labels */}
      <motion.div className="absolute top-8 right-10 hidden sm:block text-[9px] font-mono tracking-[0.25em] uppercase"
        style={{ color: 'rgba(255,255,255,0.1)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}>
        v1.0
      </motion.div>
      <motion.div className="absolute bottom-9 left-10 hidden sm:block text-[9px] font-mono tracking-[0.2em]"
        style={{ color: 'rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}>
        © 2026 WEXOR
      </motion.div>

      {/* Accent lines */}
      {['top', 'bottom'].map((pos) => (
        <motion.div key={pos} className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            [pos]: '8%',
            background: pos === 'top'
              ? 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)'
              : 'linear-gradient(90deg,transparent,rgba(236,72,153,0.25),transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={{ delay: pos === 'top' ? 0.5 : 0.65, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.div>
  )
}
