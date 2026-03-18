import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── Typewriter ── */
function useTypewriter(text, { startDelay = 0, speed = 28, enabled = true } = {}) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!enabled) return
    let i = 0; setDisplayed('')
    const t0 = setTimeout(() => {
      const iv = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) clearInterval(iv) }, speed)
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
        setVal(Math.floor((p === 1 ? 1 : 1 - Math.pow(2, -10 * p)) * to))
        if (p < 1) requestAnimationFrame(tick); else setVal(to)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(t0)
  }, [to, startDelay, duration, enabled])
  return val
}

/* ── Responsive offsets — letters start AT the X position ── */
function useXOffsets() {
  const compute = () => {
    const fs = Math.min(Math.max(window.innerWidth * 0.13, 72), 136)
    return [
       Math.round(1.52 * fs),  // W → slide left
       Math.round(0.74 * fs),  // E → slide left
       0,                       // X stays
      -Math.round(0.78 * fs),  // O → slide right
      -Math.round(1.56 * fs),  // R → slide right
    ]
  }
  const [offs, setOffs] = useState(() => [207, 101, 0, -106, -212])
  useEffect(() => {
    const upd = () => setOffs(compute())
    upd(); window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])
  return offs
}

/* ── Beautiful letter — spring + blur + rise on mount ── */
function Letter({ char, isX = false, delay = 0 }) {
  return (
    <motion.span
      initial={{
        scale:  isX ? 0    : 0.3,
        filter: isX ? 'blur(32px)' : 'blur(18px)',
        y:      isX ? 4    : 24,
      }}
      animate={{
        scale:  isX ? [0, 1.6, 1.0] : 1,
        filter: 'blur(0px)',
        y:      0,
      }}
      transition={isX ? {
        scale:  { duration: 0.9, times: [0, 0.42, 1], ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.75, ease: 'easeOut' },
        y:      { duration: 0.6,  ease: [0.22, 1, 0.36, 1] },
      } : {
        scale:  { type: 'spring', stiffness: 340, damping: 18, delay },
        filter: { duration: 0.38, ease: 'easeOut', delay },
        y:      { type: 'spring', stiffness: 340, damping: 22, delay },
      }}
      style={{
        display: 'inline-block',
        lineHeight: 1,
        color: '#ffffff',
        textShadow: isX
          ? '0 0 40px rgba(255,255,255,0.55), 0 0 80px rgba(255,255,255,0.2)'
          : '0 0 20px rgba(255,255,255,0.25)',
      }}
    >
      {char}
    </motion.span>
  )
}

/* ── Pulse rings radiating from center when X appears ── */
function XRings({ show }) {
  if (!show) return null
  return (
    <>
      {[{ size: 70, border: 'rgba(255,255,255,0.55)', delay: 0,    endScale: 3.2 },
        { size: 110, border: 'rgba(255,255,255,0.3)',  delay: 0.12, endScale: 2.6 },
        { size: 160, border: 'rgba(255,255,255,0.15)', delay: 0.24, endScale: 2.0 },
      ].map((r, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: r.size, height: r.size,
            top: '50%', left: '50%',
            marginTop: -(r.size / 2), marginLeft: -(r.size / 2),
            border: `1px solid ${r.border}`,
            zIndex: 4,
          }}
          initial={{ scale: 0.25, opacity: 0 }}
          animate={{ scale: r.endScale, opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.8, delay: r.delay, ease: 'easeOut', times: [0, 0.22, 1] }}
        />
      ))}
    </>
  )
}

/* ── Corner bracket ── */
function Corner({ pos, delay, isOut }) {
  const tl = pos === 'tl', tr = pos === 'tr', bl = pos === 'bl', br = pos === 'br'
  return (
    <motion.div
      className="absolute w-6 h-6 sm:w-8 sm:h-8 pointer-events-none hidden sm:block"
      style={{
        top: (tl || tr) ? '2rem' : undefined, bottom: (bl || br) ? '2rem' : undefined,
        left: (tl || bl) ? '2rem' : undefined, right: (tr || br) ? '2rem' : undefined,
        borderTop:    (tl || tr) ? '1px solid rgba(255,255,255,0.18)' : undefined,
        borderBottom: (bl || br) ? '1px solid rgba(255,255,255,0.18)' : undefined,
        borderLeft:   (tl || bl) ? '1px solid rgba(255,255,255,0.18)' : undefined,
        borderRight:  (tr || br) ? '1px solid rgba(255,255,255,0.18)' : undefined,
      }}
      initial={{ opacity: 0, scale: 1.6 }}
      animate={isOut ? { opacity: 0 } : { opacity: 1, scale: 1 }}
      transition={{ delay: isOut ? 0 : delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)',
    }} />
  )
}

/* ── Phase data ── */
const OPAC = {
  init:   [0, 0, 0, 0, 0],
  x:      [0, 0, 1, 0, 0],
  expand: [1, 1, 1, 1, 1],
  done:   [1, 1, 1, 1, 1],
  flash:  [1, 1, 1, 1, 1],
  out:    [1, 1, 1, 1, 1],
}

// Entry delay per letter for the spring animation  [W,    E,    X,  O,    R   ]
const ENTRY_DELAYS =                               [0.03, 0.09, 0,  0.03, 0.09]

export default function SplashScreen({ onDone }) {
  const [phase, setPhase]   = useState('init')
  const [mounted, setMounted] = useState(true)
  const xOffsets  = useXOffsets()
  const isOut     = ['flash', 'out'].includes(phase)

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase('x'),       280),
      setTimeout(() => setPhase('expand'),  1100),
      setTimeout(() => setPhase('done'),    1780),
      setTimeout(() => setPhase('flash'),   3120),
      setTimeout(() => setPhase('out'),     3280),
      setTimeout(() => { setMounted(false); sessionStorage.setItem('nw_loaded', '1'); onDone() }, 4100),
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', { startDelay: 500, speed: 28, enabled: !isOut })
  const counter = useCounter(100, { startDelay: 200, duration: 2800, enabled: !isOut })

  const opacs = OPAC[phase] ?? OPAC.done
  // x offset: letters positioned at X in 'x' phase, natural position in expand+
  const getX = (i) => ['init', 'x'].includes(phase) ? xOffsets[i] : 0

  const isLetterVisible = (i) => phase !== 'init' && (i === 2 || phase !== 'x')

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {phase === 'flash' && (
            <motion.div className="fixed inset-0 z-[100001] pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.32, 0] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}
            />
          )}

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

            {/* Ambient glow */}
            <motion.div className="absolute rounded-full pointer-events-none z-[2]"
              style={{ width: 700, height: 700, background: 'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 65%)', filter: 'blur(70px)' }}
              animate={isOut ? { scale: 3, opacity: 0 } : { scale: [1, 1.1, 1], opacity: 1 }}
              transition={isOut ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Accent lines */}
            {['top', 'bottom'].map((pos) => (
              <motion.div key={pos} className="absolute left-0 right-0 h-px z-[2]"
                style={{
                  [pos]: '10%',
                  background: `linear-gradient(90deg,transparent,rgba(255,255,255,${pos === 'top' ? '0.1' : '0.07'}),transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
                transition={{ delay: pos === 'top' ? 0.6 : 0.75, duration: 0.9 }}
              />
            ))}

            {/* Pulse rings when X is solo */}
            <XRings show={phase === 'x'} />

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
              {['W','E','X','O','R'].map((char, i) => {
                const vis = isLetterVisible(i)
                return (
                  <motion.span
                    key={char}
                    style={{ display: 'inline-block' }}
                    animate={{
                      x:       getX(i),
                      opacity: isOut ? 0 : opacs[i],
                    }}
                    transition={{
                      x:       { duration: 0.68, delay: phase === 'expand' ? 0.03 * Math.abs(i - 2) : 0, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.15 },
                    }}
                  >
                    {vis
                      ? <Letter char={char} isX={i === 2} delay={ENTRY_DELAYS[i]} />
                      : <span style={{ color: 'transparent', display: 'inline-block' }}>{char}</span>
                    }
                  </motion.span>
                )
              })}
            </div>

            {/* Tagline */}
            <motion.div className="relative z-[3] mt-5 h-5 flex items-center"
              initial={{ opacity: 0 }} animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              <span className="text-xs tracking-[0.28em] uppercase"
                style={{ color: 'rgba(161,161,170,0.6)', fontFamily: 'Inter,monospace' }}>
                {tagline}
              </span>
              <motion.span className="inline-block w-[2px] h-[13px] ml-[2px] rounded-full"
                style={{ background: 'rgba(255,255,255,0.5)' }}
                animate={isOut ? { opacity: 0 } : { opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity }}
              />
            </motion.div>

            {/* Counter + bar */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {String(counter).padStart(3, '0')}<span style={{ color: 'rgba(255,255,255,0.13)' }}>%</span>
              </span>
              <div className="w-40 sm:w-48 h-px bg-white/10 rounded-full overflow-hidden relative">
                <div className="h-full rounded-full bg-white/40" style={{ width: `${counter}%` }} />
                <motion.div className="absolute inset-y-0 w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)' }}
                  animate={{ x: ['-100%', '210px'] }}
                  transition={{ duration: 1.7, delay: 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Labels */}
            <motion.div className="absolute top-8 right-8 sm:right-16 z-[3] text-[10px] font-mono tracking-widest uppercase hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >v1.0</motion.div>
            <motion.div className="absolute bottom-9 left-8 sm:left-16 z-[3] text-[10px] font-mono tracking-widest hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >© 2026 WEXOR</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
