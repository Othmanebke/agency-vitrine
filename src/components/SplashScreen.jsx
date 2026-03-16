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
  const [step, setStep] = useState(0) // 0: init, 1: X, 2: WEXOR, 3: W., 4: flash, 5: out
  const [mounted, setMounted] = useState(true)
  const isOut = step >= 4

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500)      // Show X
    const t2 = setTimeout(() => setStep(2), 1700)     // Show WE OR
    const t3 = setTimeout(() => setStep(3), 3500)     // EXOR into W, show W.
    const t4 = setTimeout(() => setStep(4), 5200)     // Flash pulse
    const t5 = setTimeout(() => setStep(5), 5400)     // Out
    const t6 = setTimeout(() => {
      setMounted(false)
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
    }, 6200)                                          // Unmount
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6) }
  }, [onDone])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', {
    startDelay: 2500, speed: 28, enabled: !isOut,
  })
  const counter = useCounter(100, { startDelay: 1000, duration: 4000, enabled: !isOut })

  const Glow = ({ letter }) => (
    <motion.span
      className="absolute inset-0 text-violet-500/20 blur-lg select-none pointer-events-none"
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
    >
      {letter}
    </motion.span>
  )

  return (
    <AnimatePresence>
      {mounted && (
        <>
          {/* Flash pulse on exit */}
          {step === 4 && (
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

            {/* Letters with AnimatePresence layout logic */}
            <div
              className="relative z-[3] flex items-end justify-center w-full"
              style={{ fontFamily: "'Etna', sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem,15vw,9rem)', letterSpacing: '-0.02em', height: 'clamp(5rem, 18vw, 12rem)' }}
            >
              <AnimatePresence mode="popLayout">
                {/* W */}
                {(step === 2 || step === 3) && (
                  <motion.span
                    key="W"
                    layoutId="W"
                    initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white relative"
                  >
                    W
                    <Glow letter="W" />
                  </motion.span>
                )}

                {/* E */}
                {step === 2 && (
                  <motion.span
                    key="E"
                    layoutId="E"
                    initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white relative"
                  >
                    E
                    <Glow letter="E" />
                  </motion.span>
                )}

                {/* X */}
                {(step === 1 || step === 2) && (
                  <motion.span
                    key="X"
                    layoutId="X"
                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                    animate={{ 
                      opacity: 1, 
                      scale: step === 1 ? 1.2 : 1, 
                      filter: 'blur(0px)' 
                    }}
                    exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white relative mx-1 sm:mx-2"
                  >
                    X
                    <Glow letter="X" />
                  </motion.span>
                )}

                {/* O */}
                {step === 2 && (
                  <motion.span
                    key="O"
                    layoutId="O"
                    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -150, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white relative"
                  >
                    O
                    <Glow letter="O" />
                  </motion.span>
                )}

                {/* R */}
                {step === 2 && (
                  <motion.span
                    key="R"
                    layoutId="R"
                    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -200, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white relative"
                  >
                    R
                    <Glow letter="R" />
                  </motion.span>
                )}

                {/* DOT */}
                {step === 3 && (
                  <motion.span
                    key="dot"
                    layoutId="dot"
                    initial={{ opacity: 0, scale: 0, rotate: -90, x: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                    transition={{ duration: 0.5, ease: 'backOut', delay: 0.4 }}
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: 'clamp(12px,1.5vw,24px)', height: 'clamp(12px,1.5vw,24px)',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      boxShadow: '0 0 20px rgba(139,92,246,0.9)',
                      alignSelf: 'flex-end',
                      marginBottom: 'clamp(1rem,3vw,2rem)',
                      marginLeft: '0.2rem',
                    }}
                  />
                )}
              </AnimatePresence>
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
