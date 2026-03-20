import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

/* ── tokens cohérents avec le site ── */
const VIOLET = '#7c3aed'
const PURPLE = '#a78bfa'
const PINK   = '#f472b6'
const BG     = '#050510'

const GRAD_TEXT = 'linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)'
const GRAD_LINE = 'linear-gradient(90deg,transparent 0%,#a78bfa 35%,#f472b6 65%,transparent 100%)'

/* coin HUD */
function Corner({ pos }) {
  const s = {
    position: 'absolute',
    width: 20, height: 20,
    ...(pos.includes('top')    ? { top:    24 } : { bottom: 24 }),
    ...(pos.includes('left')   ? { left:   28 } : { right:  28 }),
  }
  const line = { position: 'absolute', background: 'rgba(167,139,250,0.55)' }
  return (
    <motion.div
      style={{ ...s, position: 'absolute' }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16,1,0.3,1] }}
    >
      <div style={{ ...line, width: 20, height: 1, top: 0, left: 0 }} />
      <div style={{ ...line, width: 1,  height: 20, top: 0, left: 0,
        ...(pos.includes('right') ? { left: 19 } : {}) }} />
    </motion.div>
  )
}

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState('intro')   // intro | scan | content | exit
  const [show, setShow]         = useState(true)
  const rafRef  = useRef(null)
  const startRef = useRef(null)

  /* ── progress RAF ── */
  useEffect(() => {
    const DUR = 3600
    startRef.current = performance.now()

    const tick = now => {
      const t = Math.min((now - startRef.current) / DUR, 1)
      setProgress(Math.round((1 - Math.pow(1 - t, 2.4)) * 100))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => { setShow(false); sessionStorage.setItem('nw_loaded','1'); onDone?.() }, 900)
        }, 180)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  /* ── séquence de phases ── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scan'),    200)
    const t2 = setTimeout(() => setPhase('content'), 950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

  const exiting = phase === 'exit'

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: BG,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
      animate={exiting ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >

      {/* ── grille de fond très subtile ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* ── halo ambiant violet ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── coins HUD ── */}
      <Corner pos="top-left"     />
      <Corner pos="top-right"    />
      <Corner pos="bottom-left"  />
      <Corner pos="bottom-right" />

      {/* ── label coin haut gauche ── */}
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: phase === 'content' || phase === 'exit' ? 0.35 : 0, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: 26, left: 56,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400, fontSize: '0.55rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: PURPLE, userSelect: 'none',
        }}
      >
        WEXOR / 2025
      </motion.span>

      {/* ── compteur progress haut droite ── */}
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 0.45, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          position: 'absolute', top: 24, right: 56,
          fontFamily: "'Inter', monospace",
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 300, fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: PURPLE, userSelect: 'none',
        }}
      >
        {String(progress).padStart(3, '0')}
      </motion.span>

      {/* ── ligne scanner qui sweep de haut en bas ── */}
      <AnimatePresence>
        {(phase === 'scan' || phase === 'content') && (
          <motion.div
            key="scanner"
            initial={{ top: '-2px', opacity: 1 }}
            animate={{ top: '102%', opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.4, 0, 0.6, 1], opacity: { times: [0, 0.85, 1] } }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1, zIndex: 10,
              background: GRAD_LINE,
              boxShadow: `0 0 18px 3px rgba(167,139,250,0.45), 0 0 2px rgba(244,114,182,0.5)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── contenu central ── */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 24px' }}>

        {/* WEXOR — révélé par clip-path de gauche à droite */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <motion.h1
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: phase === 'content' || phase === 'exit' ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0,
              fontFamily: "'Etna', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: GRAD_TEXT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            WEXOR
          </motion.h1>

          {/* reflet flou sous le mot */}
          <motion.h1
            aria-hidden
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{
              clipPath: phase === 'content' || phase === 'exit' ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              opacity:  phase === 'content' || phase === 'exit' ? 0.18 : 0,
            }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0, position: 'absolute', left: 0, right: 0, top: '72%',
              fontFamily: "'Etna', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: GRAD_TEXT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: 'scaleY(-1)',
              filter: 'blur(6px)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
            }}
          >
            WEXOR
          </motion.h1>
        </div>

        {/* séparateur */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX:  phase === 'content' || phase === 'exit' ? 1 : 0,
            opacity: phase === 'content' || phase === 'exit' ? 1 : 0,
          }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, marginTop: 22,
            background: GRAD_LINE,
            transformOrigin: 'left',
          }}
        />

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase === 'content' || phase === 'exit' ? 1 : 0,
            y:       phase === 'content' || phase === 'exit' ? 0  : 10,
          }}
          transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
          style={{
            margin: '16px 0 0',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.55rem, 1.5vw, 0.68rem)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(200,180,255,0.45)',
            userSelect: 'none',
          }}
        >
          Digital Agency · Paris
        </motion.p>
      </div>

      {/* ── barre de progression bas — trait fin ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 1, zIndex: 6,
        background: 'rgba(167,139,250,0.08)',
      }}>
        <motion.div
          style={{ height: '100%', width: `${progress}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.06, ease: 'linear' }}
          initial={false}
        >
          <div style={{
            height: '100%', width: '100%',
            background: `linear-gradient(90deg, ${VIOLET}, ${PURPLE} 50%, ${PINK})`,
            boxShadow: '0 0 12px rgba(124,58,237,0.9), 0 0 28px rgba(244,114,182,0.4)',
          }} />
        </motion.div>
      </div>

      {/* ── compteur % centré bas ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Inter', monospace",
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 200, fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: PURPLE, userSelect: 'none',
        }}
      >
        {String(progress).padStart(3, '0')} %
      </motion.div>

    </motion.div>
  )
}
