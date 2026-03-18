import {
  motion, useMotionValue, useMotionTemplate, animate,
  AnimatePresence, useReducedMotion,
} from 'framer-motion'
import { useState, useEffect } from 'react'

/* ─── Counter hook ─────────────────────────────────────────── */
function useCounter(to, { startDelay = 0, duration = 2600 } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setVal(Math.round(e * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(t)
  }, [])
  return val
}

/* ─── Galaxy streak ────────────────────────────────────────── */
const STARS = [
  { angle: 0,   length: 72, color: 'rgba(167,139,250,0.85)', distance: 200 },
  { angle: 22,  length: 38, color: 'rgba(255,255,255,0.5)',  distance: 140 },
  { angle: 45,  length: 62, color: 'rgba(236,72,153,0.8)',   distance: 168 },
  { angle: 68,  length: 36, color: 'rgba(255,255,255,0.45)', distance: 128 },
  { angle: 90,  length: 68, color: 'rgba(99,102,241,0.85)',  distance: 182 },
  { angle: 112, length: 36, color: 'rgba(244,114,182,0.65)', distance: 130 },
  { angle: 135, length: 60, color: 'rgba(139,92,246,0.82)',  distance: 158 },
  { angle: 158, length: 36, color: 'rgba(255,255,255,0.45)', distance: 132 },
  { angle: 180, length: 70, color: 'rgba(167,139,250,0.8)',  distance: 192 },
  { angle: 202, length: 36, color: 'rgba(236,72,153,0.65)',  distance: 135 },
  { angle: 225, length: 62, color: 'rgba(99,102,241,0.82)',  distance: 172 },
  { angle: 248, length: 34, color: 'rgba(255,255,255,0.45)', distance: 126 },
  { angle: 270, length: 68, color: 'rgba(139,92,246,0.85)',  distance: 188 },
  { angle: 292, length: 36, color: 'rgba(244,114,182,0.7)',  distance: 138 },
  { angle: 315, length: 58, color: 'rgba(167,139,250,0.82)', distance: 160 },
  { angle: 338, length: 34, color: 'rgba(255,255,255,0.45)', distance: 130 },
]

function GalaxyStar({ angle, delay, length, color, distance }) {
  const rad = (angle * Math.PI) / 180
  const tx  = Math.sin(rad) * distance
  const ty  = -Math.cos(rad) * distance
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: '50%', left: '50%',
        marginTop: -(length / 2), marginLeft: -0.75,
        width: 1.5, height: length,
        rotate: `${angle}deg`,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, x: 0, y: 0, scaleY: 0 }}
      animate={{
        opacity: [0, 0.95, 0.85, 0],
        x: [0, tx * 0.45, tx],
        y: [0, ty * 0.45, ty],
        scaleY: [0, 1, 0],
      }}
      transition={{ duration: length > 60 ? 0.88 : 0.72, delay, ease: [0.2, 0, 0.8, 1], times: [0, 0.22, 1] }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: `linear-gradient(to bottom, transparent 0%, ${color} 28%, ${color} 62%, transparent 100%)`,
        borderRadius: 2,
      }} />
    </motion.div>
  )
}

function GalaxyBurst({ active }) {
  if (!active) return null
  return <>{STARS.map((s, i) => <GalaxyStar key={i} {...s} delay={i * 0.026} />)}</>
}

/* ─── Letter config ────────────────────────────────────────── */
const LETTER_DATA = [
  { char: 'W', gradient: 'linear-gradient(150deg,#ffffff 0%,#c4b5fd 100%)', glow: 'rgba(124,58,237,' },
  { char: 'E', gradient: 'linear-gradient(150deg,#ede9fe 0%,#a78bfa 100%)', glow: 'rgba(139,92,246,' },
  { char: 'X', gradient: 'linear-gradient(150deg,#fce7f3 0%,#ec4899 100%)', glow: 'rgba(236,72,153,' },
  { char: 'O', gradient: 'linear-gradient(150deg,#e0e7ff 0%,#818cf8 100%)', glow: 'rgba(99,102,241,' },
  { char: 'R', gradient: 'linear-gradient(150deg,#ffffff 0%,#c4b5fd 100%)', glow: 'rgba(167,139,250,' },
]

const SPREAD = [-285, -175, 0, 175, 285]

/* ─── Main component ───────────────────────────────────────── */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase]       = useState('init')
  const [mounted, setMounted]   = useState(true)
  const [cursorOn, setCursorOn] = useState(false)
  const [clicked, setClicked]   = useState(false)
  const [galaxy, setGalaxy]     = useState(false)
  const [shimmer, setShimmer]   = useState(false)
  const shouldReduce            = useReducedMotion()

  const hole      = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent 0%, transparent ${hole}%, white ${hole}%, white 100%)`
  const counter   = useCounter(100, { startDelay: 300, duration: 2800 })
  const isOut     = phase === 'out'

  useEffect(() => {
    if (shouldReduce) { sessionStorage.setItem('nw_loaded', '1'); onDone(); return }
    const ts = [
      setTimeout(() => setPhase('x'),                               260),
      setTimeout(() => setCursorOn(true),                          1060),
      setTimeout(() => setClicked(true),                           1530),
      setTimeout(() => { setCursorOn(false); setClicked(false); setPhase('weor') }, 1790),
      setTimeout(() => setPhase('assemble'),                       2340),
      setTimeout(() => { setPhase('complete'); setGalaxy(true); setShimmer(true) }, 2800),
      setTimeout(() => setShimmer(false),                          3100),
      setTimeout(() => setGalaxy(false),                           3720),
      setTimeout(() => setPhase('out'),                            3840),
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

  /* Letter animation state */
  function letterAnim(i) {
    if (phase === 'init')     return { opacity: 0, x: 0, scale: 1 }
    if (phase === 'x')        return { opacity: i === 2 ? 1 : 0, x: 0, scale: i === 2 ? 1.18 : 1 }
    if (phase === 'click')    return { opacity: i === 2 ? 1 : 0, x: 0, scale: i === 2 ? (clicked ? 0.88 : 1.18) : 1 }
    if (phase === 'weor')     return { opacity: 1, x: SPREAD[i], scale: 1 }
    if (phase === 'assemble') return { opacity: 1, x: 0, scale: 1 }
    if (phase === 'complete') return { opacity: 1, x: 0, scale: 1 }
    if (phase === 'out')      return { opacity: 0, x: 0, scale: 0.94 }
    return { opacity: 0, x: 0, scale: 1 }
  }

  function letterTrans(i) {
    if (phase === 'x')        return { duration: 0.8,  ease: [0.22, 1, 0.36, 1] }
    if (phase === 'click')    return { duration: 0.12, ease: 'easeOut' }
    if (phase === 'weor')     return { duration: 0.5,  ease: [0.22, 1, 0.36, 1] }
    if (phase === 'assemble') return { duration: 0.58, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }
    if (phase === 'out')      return { duration: 0.3,  ease: 'easeIn' }
    return { duration: 0.35 }
  }

  const wordVisible = ['assemble', 'complete', 'out'].includes(phase)

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: '#050510', maskImage, WebkitMaskImage: maskImage }}
    >

      {/* ── Ambient aurora ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 580, height: 580, borderRadius: '50%',
          top: '50%', left: '50%', marginTop: -290, marginLeft: -290,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(219,39,119,0.08) 52%, transparent 72%)',
          filter: 'blur(72px)',
        }} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 360, height: 360, borderRadius: '50%', top: '28%', left: '22%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : [0.3, 0.55, 0.3], x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.28) 0%, transparent 68%)',
          filter: 'blur(55px)',
        }} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 300, height: 300, borderRadius: '50%', bottom: '24%', right: '20%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : [0.25, 0.48, 0.25], x: [0, -22, 0], y: [0, 22, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,39,119,0.22) 0%, transparent 68%)',
          filter: 'blur(50px)',
        }} />
      </motion.div>

      {/* ── Galaxy burst ── */}
      <GalaxyBurst active={galaxy} />

      {/* ── Cursor ── */}
      <AnimatePresence>
        {cursorOn && (
          <motion.div
            key="cursor"
            className="absolute z-30 pointer-events-none"
            style={{ top: '50%', left: '50%' }}
            initial={{ x: 148, y: 108, opacity: 0 }}
            animate={clicked
              ? { x: 21, y: 14, opacity: 1, scale: 0.82 }
              : { x: 19, y: 11, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ duration: clicked ? 0.11 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tap ripple */}
            {clicked && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  width: 28, height: 28,
                  top: -4, left: -4,
                  borderRadius: '50%',
                  border: '1px solid rgba(236,72,153,0.75)',
                  boxShadow: '0 0 8px rgba(236,72,153,0.4)',
                }}
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {/* Clean arrow cursor */}
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path
                d="M3.5 2.5 L3.5 19 L7.5 14.5 L11.5 22.5 L14 21.5 L10 13.5 L16.5 13.5 Z"
                fill="white"
                stroke="rgba(15,15,30,0.6)"
                strokeWidth="0.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WEXOR word ── */}
      <div className="relative z-10 flex items-baseline" style={{ gap: 0 }}>

        {/* Word shimmer sweep on complete */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
            style={{ borderRadius: 4 }}
          >
            <motion.div
              style={{
                position: 'absolute', top: 0, bottom: 0, width: '55%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
              }}
              initial={{ left: '-55%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}

        {LETTER_DATA.map(({ char, gradient, glow }, i) => (
          <motion.span
            key={char}
            animate={letterAnim(i)}
            transition={letterTrans(i)}
            style={{
              display: 'inline-block',
              filter: `drop-shadow(0 0 18px ${glow}0.68))`,
            }}
          >
            <span style={{
              display: 'block',
              fontSize: 'clamp(64px, 11.5vw, 134px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
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

      {/* ── Tagline ── */}
      <motion.p
        className="relative z-10 mt-5"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(161,161,170,0.45)',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={isOut ? { opacity: 0 } : phase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        Agence Digitale&ensp;·&ensp;Design &amp; Développement
      </motion.p>

      {/* ── Progress — iOS glass pill ── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isOut ? 0 : 1, y: isOut ? 6 : 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '9px',
          padding: '12px 22px 14px',
          borderRadius: '100px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.3)',
          minWidth: '180px',
        }}
      >
        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
          <span style={{
            fontFamily: '"SF Mono", "Fira Code", ui-monospace, monospace',
            fontSize: '13px',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1,
          }}>
            {String(counter).padStart(3, '0')}
          </span>
          <span style={{
            fontFamily: '"SF Mono", ui-monospace, monospace',
            fontSize: '9px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.12em',
            marginLeft: '1px',
          }}>
            %
          </span>
        </div>

        {/* Track */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '150px',
            height: '2px',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.09)',
          }}
        >
          <motion.div
            style={{
              position: 'absolute', inset: 0, left: 0,
              width: `${counter}%`,
              borderRadius: '100px',
              background: 'linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)',
            }}
          />
          {/* Shimmer on bar */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, width: '40px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              borderRadius: '100px',
            }}
            animate={{ x: ['-40px', '190px'] }}
            transition={{ duration: 1.7, delay: 0.7, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* ── Copyright — ultra subtle ── */}
      <motion.div
        className="absolute bottom-[18px] left-1/2 -translate-x-1/2"
        style={{
          fontFamily: '"SF Mono", ui-monospace, monospace',
          fontSize: '8px',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOut ? 0 : 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        © 2026 Wexor Studio
      </motion.div>

      {/* ── Top accent hairline ── */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: '6%',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.22), rgba(236,72,153,0.16), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Bottom accent hairline ── */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          bottom: '6%',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.18), rgba(139,92,246,0.13), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

    </motion.div>
  )
}
