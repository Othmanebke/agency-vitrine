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

/* ── Responsive x-offsets — each letter starts AT the X position ── */
function useXOffsets() {
  const compute = () => {
    const vw  = window.innerWidth
    // font-size mirrors clamp(4.5rem, 13vw, 8.5rem)
    const fs  = Math.min(Math.max(vw * 0.13, 72), 136)
    return [
       Math.round(1.52 * fs),  // W  → slides left
       Math.round(0.74 * fs),  // E  → slides left
       0,                       // X  → stays
      -Math.round(0.78 * fs),  // O  → slides right
      -Math.round(1.56 * fs),  // R  → slides right
    ]
  }
  const [offs, setOffs] = useState(() => [207, 100, 0, -106, -212])
  useEffect(() => {
    const upd = () => setOffs(compute())
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])
  return offs
}

/* ── Glitch letter — triggers on mount ── */
const GLITCH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function GlitchLetter({ letter }) {
  const [char, setChar] = useState(GLITCH[0])
  const [done, setDone] = useState(false)
  useEffect(() => {
    let f = 0
    const iv = setInterval(() => {
      f++
      if (f >= 8) { setChar(letter); setDone(true); clearInterval(iv) }
      else setChar(GLITCH[Math.floor(Math.random() * GLITCH.length)])
    }, 45)
    return () => clearInterval(iv)
  }, [letter])
  return (
    <span style={{
      display: 'inline-block', lineHeight: 1, color: '#ffffff',
      filter: done ? 'blur(0px)' : 'blur(3px)',
      transition: 'filter 0.2s ease',
    }}>{char}</span>
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
        borderTop:    (tl || tr) ? '1px solid rgba(255,255,255,0.2)' : undefined,
        borderBottom: (bl || br) ? '1px solid rgba(255,255,255,0.2)' : undefined,
        borderLeft:   (tl || bl) ? '1px solid rgba(255,255,255,0.2)' : undefined,
        borderRight:  (tr || br) ? '1px solid rgba(255,255,255,0.2)' : undefined,
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

const LETTERS = ['W', 'E', 'X', 'O', 'R']

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('init')
  const [mounted, setMounted]   = useState(true)
  const xOffsets = useXOffsets()  // responsive — each letter's offset to appear AT X
  const isOut = ['flash', 'out'].includes(phase)

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase('x'),       280),  // X appears
      setTimeout(() => setPhase('expand'),  1100),  // WEOR burst from X
      setTimeout(() => setPhase('done'),    1750),  // word settled
      setTimeout(() => setPhase('flash'),   3100),
      setTimeout(() => setPhase('out'),     3260),
      setTimeout(() => {
        setMounted(false)
        sessionStorage.setItem('nw_loaded', '1')
        onDone()
      }, 4050),
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', {
    startDelay: 500, speed: 28, enabled: !isOut,
  })
  const counter = useCounter(100, { startDelay: 200, duration: 2800, enabled: !isOut })

  /* ─ Per-letter animation values ─────────────────────────── */
  const getAnim = (i) => {
    // In 'x' phase  : only X visible, others invisible but positioned AT X
    // In 'expand'   : all visible, x returns to 0 (slides out from X)
    // In 'done'/out : settled
    const atX = xOffsets[i]          // offset to appear stacked on X
    const natural = 0                 // natural flex position = no offset

    if (phase === 'init')   return { opacity: 0, x: atX,    scale: 1    }
    if (phase === 'x')      return { opacity: i === 2 ? 1 : 0, x: atX, scale: i === 2 ? 1.18 : 1 }
    if (phase === 'expand') return { opacity: 1, x: natural, scale: 1    }
    if (phase === 'done')   return { opacity: 1, x: natural, scale: 1    }
    if (phase === 'flash')  return { opacity: 1, x: natural, scale: 1    }
    if (phase === 'out')    return { opacity: 0, x: natural, scale: 0.94 }
    return { opacity: 0, x: atX, scale: 1 }
  }

  const getTrans = (i) => {
    if (phase === 'x')      return { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    if (phase === 'expand') return {
      opacity: { duration: 0.18, delay: 0 },
      x:       { duration: 0.62, delay: 0.04 * Math.abs(i - 2), ease: [0.22, 1, 0.36, 1] },
      scale:   { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }
    if (phase === 'out')    return { duration: 0.3, ease: 'easeIn' }
    return { duration: 0.4 }
  }

  /* visible = letter has entered its first visible phase */
  const isVisible = (i) => !['init'].includes(phase) && (i === 2 || phase !== 'x')

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {/* Flash */}
          {phase === 'flash' && (
            <motion.div
              className="fixed inset-0 z-[100001] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}
            />
          )}

          {/* Panel */}
          <motion.div
            key="splash"
            initial={{ y: 0 }}
            animate={{ y: isOut ? '-100%' : 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden select-none"
            style={{ backgroundColor: '#050510' }}
          >
            <Scanlines />
            <Corner pos="tl" delay={0.9} isOut={isOut} />
            <Corner pos="tr" delay={1.0} isOut={isOut} />
            <Corner pos="bl" delay={1.1} isOut={isOut} />
            <Corner pos="br" delay={1.2} isOut={isOut} />

            {/* Glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none z-[2]"
              style={{ width: 800, height: 800, background: 'radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 65%)', filter: 'blur(60px)' }}
              animate={isOut ? { scale: 3, opacity: 0 } : { scale: [1, 1.1, 1], opacity: 1 }}
              transition={isOut ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Accent lines */}
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ top: '10%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ bottom: '10%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* ── WEXOR ── */}
            <div
              className="relative z-[3] flex items-end"
              style={{
                fontFamily: "'Etna', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(4.5rem,13vw,8.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {LETTERS.map((char, i) => {
                const vis = isVisible(i)
                const anim = getAnim(i)
                const trans = getTrans(i)
                return (
                  <motion.span
                    key={char}
                    style={{ display: 'inline-block' }}
                    animate={anim}
                    transition={trans}
                  >
                    {vis
                      ? <GlitchLetter key={`${char}-${vis ? '1' : '0'}`} letter={char} />
                      : <span style={{ color: 'transparent', display: 'inline-block' }}>{char}</span>
                    }
                  </motion.span>
                )
              })}
            </div>

            {/* Tagline */}
            <motion.div
              className="relative z-[3] mt-5 h-5 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 1.4, duration: 0.35 }}
            >
              <span className="text-xs tracking-[0.28em] uppercase"
                style={{ color: 'rgba(161,161,170,0.65)', fontFamily: 'Inter,monospace' }}>
                {tagline}
              </span>
              <motion.span
                className="inline-block w-[2px] h-[13px] ml-[2px] rounded-full"
                style={{ background: 'rgba(255,255,255,0.6)' }}
                animate={isOut ? { opacity: 0 } : { opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity }}
              />
            </motion.div>

            {/* Counter + bar */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {String(counter).padStart(3, '0')}<span style={{ color: 'rgba(255,255,255,0.15)' }}>%</span>
              </span>
              <div className="w-40 sm:w-48 h-px bg-white/10 rounded-full overflow-hidden relative">
                <motion.div className="h-full rounded-full bg-white/50"
                  style={{ width: `${counter}%` }} />
                <motion.div
                  className="absolute inset-y-0 w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)' }}
                  animate={{ x: ['-100%', '210px'] }}
                  transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* v1.0 */}
            <motion.div className="absolute top-8 right-8 sm:right-16 z-[3] text-[10px] font-mono tracking-widest uppercase hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.12)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >v1.0</motion.div>

            {/* Copyright */}
            <motion.div className="absolute bottom-9 left-8 sm:left-16 z-[3] text-[10px] font-mono tracking-widest hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >© 2026 WEXOR</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
