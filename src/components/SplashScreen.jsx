import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── Typewriter hook ── */
function useTypewriter(text, { startDelay = 0, speed = 60, enabled = true } = {}) {
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

/* ── Counter hook ── */
function useCounter(to, { startDelay = 0, duration = 1800, enabled = true } = {}) {
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



/* ── Corner bracket ── */
function Corner({ pos, delay, isOut }) {
  const tl = pos === 'tl', tr = pos === 'tr', bl = pos === 'bl', br = pos === 'br'
  return (
    <motion.div
      className="absolute w-6 h-6 sm:w-8 sm:h-8 pointer-events-none hidden sm:block"
      style={{
        top: (tl || tr) ? '2rem' : undefined,
        bottom: (bl || br) ? '2rem' : undefined,
        left: (tl || bl) ? '2rem' : undefined,
        right: (tr || br) ? '2rem' : undefined,
        borderTop: (tl || tr) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderBottom: (bl || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderLeft: (tl || bl) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderRight: (tr || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
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
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
    }} />
  )
}

// Remove unused constants

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'flash' | 'out'
  const [mounted, setMounted] = useState(true)
  const isOut = phase !== 'in'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'), 1800)
    const t2 = setTimeout(() => setPhase('out'), 1950)
    const t3 = setTimeout(() => {
      setMounted(false)
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
    }, 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', {
    startDelay: 500, speed: 28, enabled: !isOut,
  })
  const counter = useCounter(100, { startDelay: 200, duration: 950, enabled: !isOut })

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {/* Flash pulse on exit */}
          {phase === 'flash' && (
            <motion.div
              className="fixed inset-0 z-[100001] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
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
            <Corner pos="tl" delay={0.9} isOut={isOut} />
            <Corner pos="tr" delay={1.0} isOut={isOut} />
            <Corner pos="bl" delay={1.1} isOut={isOut} />
            <Corner pos="br" delay={1.2} isOut={isOut} />

            {/* Ambient glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none z-[2]"
              style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)', filter: 'blur(60px)' }}
              animate={isOut ? { scale: 3, opacity: 0 } : { scale: [1, 1.12, 1], opacity: 1 }}
              transition={isOut ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Horizontal accent lines */}
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ top: '10%', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.div className="absolute left-0 right-0 h-px z-[2]"
              style={{ bottom: '10%', background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isOut ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* Letters */}
            <div
              className="relative z-[3] flex items-end gap-1 sm:gap-2"
              style={{ fontFamily: "'Etna', sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem,15vw,9rem)', letterSpacing: '-0.02em' }}
            >
              {"WEXOR".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5, y: 20, filter: 'blur(20px)' }}
                  animate={isOut
                    ? { opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { delay: idx * 0.05 } }
                    : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                  }
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-white relative"
                >
                  {letter}
                  {/* Subtle letter glow */}
                  <motion.span
                    className="absolute inset-0 text-violet-500/20 blur-lg select-none pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}

              {/* dot */}
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={isOut ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: isOut ? 0 : 1.2, duration: 0.45, ease: 'backOut' }}
                className="rounded-full flex-shrink-0"
                style={{
                  width: 'clamp(8px,1vw,14px)', height: 'clamp(8px,1vw,14px)',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.9)',
                  alignSelf: 'flex-end',
                  marginBottom: '1rem',
                  marginLeft: '0.1rem',
                }}
              />
            </div>

            {/* Light Sweep Effect */}
            <motion.div
              className="absolute inset-0 z-[4] pointer-events-none"
              initial={{ x: '-100%' }}
              animate={isOut ? {} : { x: '200%' }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                width: '50%',
                skewX: '-20deg'
              }}
            />

            {/* Typewriter tagline */}
            <motion.div
              className="relative z-[3] mt-8 h-5 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isOut ? 0 : 1, y: isOut ? -10 : 0 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                style={{ color: 'rgba(161,161,170,0.65)', fontFamily: 'Inter, monospace' }}>
                {tagline}
              </span>
              <motion.span
                className="inline-block w-[2px] h-[13px] ml-[2px] rounded-full"
                style={{ background: 'rgba(139,92,246,0.9)' }}
                animate={isOut ? { opacity: 0 } : { opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity }}
              />
            </motion.div>


            {/* Bottom: counter + progress */}
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
                  style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', width: `${counter}%` }} />
                <motion.div
                  className="absolute inset-y-0 w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
                  animate={{ x: ['-100%', '220px'] }}
                  transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Top-right label */}
            <motion.div className="absolute top-8 right-8 sm:right-16 z-[3] text-[10px] font-mono tracking-widest uppercase hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.14)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >v1.0</motion.div>

            {/* Bottom-left copyright */}
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
