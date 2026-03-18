import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── Typewriter ── */
function useTypewriter(text, { startDelay = 0, speed = 28, enabled = true } = {}) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!enabled) return
    let i = 0
    setDisplayed('')
    const t0 = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, speed)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(t0)
  }, [text, startDelay, speed, enabled])
  return displayed
}

/* ── Counter ── */
function useCounter(to, { startDelay = 0, duration = 2800, enabled = true } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const t0 = setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setVal(Math.floor(ease * to))
        if (p < 1) requestAnimationFrame(tick)
        else setVal(to)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(t0)
  }, [to, startDelay, duration, enabled])
  return val
}

/* ── Glitch letter — starts on mount ── */
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function GlitchLetter({ letter, gradient = false }) {
  const [displayed, setDisplayed] = useState(GLITCH_CHARS[0])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    const total = 8
    const iv = setInterval(() => {
      frame++
      if (frame >= total) {
        setDisplayed(letter)
        setDone(true)
        clearInterval(iv)
      } else {
        setDisplayed(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
      }
    }, 45)
    return () => clearInterval(iv)
  }, [letter])

  const colorStyle = gradient
    ? { background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
    : { color: '#ffffff' }

  return (
    <span style={{
      display: 'inline-block', lineHeight: 1,
      filter: done ? 'blur(0px)' : 'blur(3px)',
      transition: 'filter 0.2s ease',
      ...colorStyle,
    }}>
      {displayed}
    </span>
  )
}

/* ── Corner bracket ── */
function Corner({ pos, delay, isOut }) {
  const tl = pos === 'tl', tr = pos === 'tr', bl = pos === 'bl', br = pos === 'br'
  return (
    <motion.div
      className="absolute w-6 h-6 sm:w-8 sm:h-8 pointer-events-none hidden sm:block"
      style={{
        top:    (tl || tr) ? '2rem' : undefined, bottom: (bl || br) ? '2rem' : undefined,
        left:   (tl || bl) ? '2rem' : undefined, right:  (tr || br) ? '2rem' : undefined,
        borderTop:    (tl || tr) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderBottom: (bl || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderLeft:   (tl || bl) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderRight:  (tr || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
      }}
      initial={{ opacity: 0, scale: 1.6 }}
      animate={isOut ? { opacity: 0 } : { opacity: 1, scale: 1 }}
      transition={{ delay: isOut ? 0 : delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

/* ── Scanlines ── */
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
    }} />
  )
}

/* ── Letter config ── */
const LETTERS = [
  { char: 'W', gradient: false }, // 0
  { char: 'E', gradient: false }, // 1
  { char: 'X', gradient: false }, // 2 — appears first
  { char: 'O', gradient: true  }, // 3
  { char: 'R', gradient: true  }, // 4
]

// x offset added on top of natural flex position  [W,    E,    X,  O,    R   ]
const OFFSETS = {
  init:     [   0,    0,   0,    0,    0],
  x:        [   0,    0,   0,    0,    0],   // only X visible, others invisible
  spread:   [-155,  -95,   0,   95,  155],   // WE from left · OR from right
  assemble: [   0,    0,   0,    0,    0],   // converge to WEXOR
  complete: [   0,    0,   0,    0,    0],
  flash:    [   0,    0,   0,    0,    0],
  out:      [   0,    0,   0,    0,    0],
}

// opacity per letter per phase
const OPAC = {
  init:     [0, 0, 0, 0, 0],
  x:        [0, 0, 1, 0, 0],  // X only
  spread:   [1, 1, 1, 1, 1],
  assemble: [1, 1, 1, 1, 1],
  complete: [1, 1, 1, 1, 1],
  flash:    [1, 1, 1, 1, 1],
  out:      [1, 1, 1, 1, 1],
}

// scale (X gets spotlight in 'x' phase)
const SCALES = {
  init:     [1, 1, 1,    1, 1],
  x:        [1, 1, 1.2,  1, 1],
  spread:   [1, 1, 1,    1, 1],
  assemble: [1, 1, 1,    1, 1],
  complete: [1, 1, 1,    1, 1],
  flash:    [1, 1, 1,    1, 1],
  out:      [1, 1, 1,    1, 1],
}

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('init')
  const [mounted, setMounted] = useState(true)
  const isOut = ['flash', 'out'].includes(phase)

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase('x'),        250),   // X apparaît
      setTimeout(() => setPhase('spread'),   1050),  // WE gauche, OR droite
      setTimeout(() => setPhase('assemble'), 1700),  // EXOR glisse dans le W
      setTimeout(() => setPhase('complete'), 2200),
      setTimeout(() => setPhase('flash'),    3100),
      setTimeout(() => setPhase('out'),      3250),
      setTimeout(() => {
        setMounted(false)
        sessionStorage.setItem('nw_loaded', '1')
        onDone()
      }, 4000),
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', {
    startDelay: 500, speed: 28, enabled: !isOut,
  })
  const counter = useCounter(100, { startDelay: 200, duration: 2800, enabled: !isOut })

  const offsets = OFFSETS[phase] ?? OFFSETS.complete
  const opacs   = OPAC[phase]    ?? OPAC.complete
  const scales  = SCALES[phase]  ?? SCALES.complete

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {/* Flash on exit */}
          {phase === 'flash' && (
            <motion.div
              className="fixed inset-0 z-[100001] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}
            />
          )}

          {/* Main panel */}
          <motion.div
            key="splash"
            initial={{ y: 0 }}
            animate={{ y: isOut ? '-100%' : 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden select-none"
            style={{ backgroundColor: '#050510' }}
          >
            <Scanlines />
            <Corner pos="tl" delay={0.9}  isOut={isOut} />
            <Corner pos="tr" delay={1.0}  isOut={isOut} />
            <Corner pos="bl" delay={1.1}  isOut={isOut} />
            <Corner pos="br" delay={1.2}  isOut={isOut} />

            {/* Ambient glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none z-[2]"
              style={{ width: 800, height: 800, background: 'radial-gradient(circle,rgba(139,92,246,0.16) 0%,transparent 65%)', filter: 'blur(60px)' }}
              animate={isOut ? { scale: 3, opacity: 0 } : { scale: [1, 1.12, 1], opacity: 1 }}
              transition={isOut ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Accent lines */}
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ top: '10%', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ bottom: '10%', background: 'linear-gradient(90deg,transparent,rgba(236,72,153,0.3),transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* ── WEXOR letters ── */}
            <div
              className="relative z-[3] flex items-end"
              style={{
                fontFamily: "'Etna', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(4.5rem,13vw,8.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {LETTERS.map(({ char, gradient }, i) => {
                const vis = opacs[i]
                return (
                  <motion.span
                    key={char}
                    style={{
                      display: 'inline-block',
                      // Pink spotlight glow on X when it's solo
                      filter: i === 2 && phase === 'x'
                        ? 'drop-shadow(0 0 24px rgba(236,72,153,0.85)) drop-shadow(0 0 8px rgba(236,72,153,0.6))'
                        : 'none',
                    }}
                    animate={{
                      x:       offsets[i],
                      scale:   scales[i],
                      opacity: isOut ? 0 : vis,
                    }}
                    transition={{
                      duration: phase === 'assemble' ? 0.62
                              : phase === 'spread'   ? 0.48
                              : 0.38,
                      delay:    phase === 'assemble' ? i * 0.05 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Mount GlitchLetter only when visible → triggers glitch on first appear */}
                    {vis
                      ? <GlitchLetter letter={char} gradient={gradient} />
                      : <span style={{ color: 'transparent', display: 'inline-block' }}>{char}</span>
                    }
                  </motion.span>
                )
              })}
            </div>

            {/* Typewriter tagline */}
            <motion.div
              className="relative z-[3] mt-5 h-5 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              <span className="text-xs tracking-[0.28em] uppercase"
                style={{ color: 'rgba(161,161,170,0.65)', fontFamily: 'Inter,monospace' }}>
                {tagline}
              </span>
              <motion.span
                className="inline-block w-[2px] h-[13px] ml-[2px] rounded-full"
                style={{ background: 'rgba(139,92,246,0.9)' }}
                animate={isOut ? { opacity: 0 } : { opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity }}
              />
            </motion.div>

            {/* Counter + progress bar */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-xs font-mono" style={{ color: 'rgba(139,92,246,0.75)' }}>
                {String(counter).padStart(3, '0')}<span style={{ color: 'rgba(255,255,255,0.2)' }}>%</span>
              </span>
              <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden relative">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#8b5cf6,#ec4899)', width: `${counter}%` }} />
                <motion.div
                  className="absolute inset-y-0 w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)' }}
                  animate={{ x: ['-100%', '220px'] }}
                  transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* v1.0 */}
            <motion.div className="absolute top-8 right-8 sm:right-16 z-[3] text-[10px] font-mono tracking-widest uppercase hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.14)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >v1.0</motion.div>

            {/* Copyright */}
            <motion.div className="absolute bottom-9 left-8 sm:left-16 z-[3] text-[10px] font-mono tracking-widest hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.11)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >© 2026 WEXOR</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
