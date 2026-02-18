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

/* ── Glitch letter ── */
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
function GlitchLetter({ letter, delay, isOut, gradient = false }) {
  const [displayed, setDisplayed] = useState(GLITCH_CHARS[0])
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show letter (trigger CSS fade-in) after delay
    const t0 = setTimeout(() => setVisible(true), delay)
    // Glitch frames
    let frame = 0
    const totalFrames = 7
    const t1 = setTimeout(() => {
      const iv = setInterval(() => {
        frame++
        if (frame >= totalFrames) {
          setDisplayed(letter)
          setReady(true)
          clearInterval(iv)
        } else {
          setDisplayed(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
        }
      }, 45)
      return () => clearInterval(iv)
    }, delay)
    return () => { clearTimeout(t0); clearTimeout(t1) }
  }, [letter, delay])

  const baseStyle = {
    display: 'inline-block',
    lineHeight: 1,
    opacity: isOut ? 0 : (visible ? 1 : 0),
    transform: isOut
      ? `translateY(${gradient ? '60px' : '-60px'})`
      : visible ? 'translateY(0px)' : `translateY(${gradient ? '40px' : '-40px'})`,
    filter: isOut ? 'blur(12px)' : (ready ? 'blur(0px)' : 'blur(4px)'),
    transition: isOut
      ? 'opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease'
      : 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease',
  }

  const colorStyle = gradient ? {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : { color: '#ffffff' }

  return (
    <span style={{ ...baseStyle, ...colorStyle }}>
      {displayed}
    </span>
  )
}

/* ── Corner bracket ── */
function Corner({ pos, delay, isOut }) {
  const tl = pos === 'tl', tr = pos === 'tr', bl = pos === 'bl', br = pos === 'br'
  return (
    <motion.div
      className="absolute w-8 h-8 pointer-events-none"
      style={{
        top:    (tl || tr) ? '2rem' : undefined,
        bottom: (bl || br) ? '2rem' : undefined,
        left:   (tl || bl) ? '2rem' : undefined,
        right:  (tr || br) ? '2rem' : undefined,
        borderTop:    (tl || tr) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderBottom: (bl || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderLeft:   (tl || bl) ? '1px solid rgba(139,92,246,0.5)' : undefined,
        borderRight:  (tr || br) ? '1px solid rgba(139,92,246,0.5)' : undefined,
      }}
      initial={{ opacity: 0, scale: 1.6 }}
      animate={isOut ? { opacity: 0 } : { opacity: 1, scale: 1 }}
      transition={{ delay: isOut ? 0 : delay, duration: 0.5, ease: [0.22,1,0.36,1] }}
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

const NOVA = ['N', 'O', 'V', 'A']
const WEB  = ['W', 'E', 'B']

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'flash' | 'out'
  const [mounted, setMounted] = useState(true)
  const isOut = phase !== 'in'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'), 2900)
    const t2 = setTimeout(() => setPhase('out'), 3050)
    const t3 = setTimeout(() => {
      setMounted(false)
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
    }, 3950)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const tagline = useTypewriter('Agence Digitale · Design & Développement', {
    startDelay: 1450, speed: 40, enabled: !isOut,
  })
  const counter = useCounter(100, { startDelay: 400, duration: 2300, enabled: !isOut })

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
            <Corner pos="tl" delay={0.9}  isOut={isOut} />
            <Corner pos="tr" delay={1.0}  isOut={isOut} />
            <Corner pos="bl" delay={1.1}  isOut={isOut} />
            <Corner pos="br" delay={1.2}  isOut={isOut} />

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
              className="relative z-[3] flex items-end"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(4.5rem,13vw,8.5rem)', letterSpacing: '-0.03em' }}
            >
              {NOVA.map((l, i) => (
                <GlitchLetter key={`n${i}`} letter={l} delay={200 + i * 110} isOut={isOut} gradient={false} />
              ))}

              {/* dot */}
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={isOut ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: isOut ? 0 : 0.85, duration: 0.35, ease: 'backOut' }}
                className="rounded-full flex-shrink-0"
                style={{
                  width: 'clamp(5px,0.8vw,9px)', height: 'clamp(5px,0.8vw,9px)',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  boxShadow: '0 0 14px rgba(139,92,246,0.9)',
                  alignSelf: 'flex-end',
                  marginBottom: '0.36em',
                  marginLeft: '0.18em',
                  marginRight: '0.18em',
                }}
              />

              {WEB.map((l, i) => (
                <GlitchLetter key={`w${i}`} letter={l} delay={700 + i * 110} isOut={isOut} gradient={true} />
              ))}
            </div>

            {/* Typewriter tagline */}
            <motion.div
              className="relative z-[3] mt-5 h-5 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOut ? 0 : 1 }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              <span className="text-xs tracking-[0.28em] uppercase"
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
            <motion.div className="absolute top-8 right-16 z-[3] text-[10px] font-mono tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.14)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >v1.0</motion.div>

            {/* Bottom-left copyright */}
            <motion.div className="absolute bottom-9 left-16 z-[3] text-[10px] font-mono tracking-widest"
              style={{ color: 'rgba(255,255,255,0.11)' }}
              initial={{ opacity: 0 }} animate={isOut ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >© 2026 NOVAWEB</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
