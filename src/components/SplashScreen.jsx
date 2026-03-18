import { useEffect, useRef, useState } from 'react'

// ── CSS injected once ──────────────────────────────────────────────────────
const INJECTED_CSS = `
@keyframes splashGrain {
  0%,100% { transform:translate(0,0) }
  10%  { transform:translate(-2%,-3%) }
  20%  { transform:translate(3%,1%) }
  30%  { transform:translate(-1%,4%) }
  40%  { transform:translate(2%,-2%) }
  50%  { transform:translate(-3%,3%) }
  60%  { transform:translate(1%,-1%) }
  70%  { transform:translate(-2%,2%) }
  80%  { transform:translate(3%,-3%) }
  90%  { transform:translate(-1%,1%) }
}
@keyframes splashScan {
  from { top:-2px }
  to   { top:100vh }
}
`

const SHOOT_COLORS = [
  'rgba(255,255,255,',
  'rgba(200,180,255,',
  'rgba(255,180,220,',
]

const LETTER_GRAD =
  'linear-gradient(135deg,#ffffff 0%,#a78bfa 45%,#ec4899 85%,#f9a8d4 100%)'

const PHASE_ORDER = ['init','x','expand','flash','glow','divider','tagline','out']
function atOrAfter(current, ref) {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(ref)
}

export default function SplashScreen({ onDone }) {
  const canvasRef   = useRef(null)
  const loopRaf     = useRef(null)
  const spawnTimer  = useRef(null)
  const progressRaf = useRef(null)
  const starsRef    = useRef([])
  const shootRef    = useRef([])

  const [phase,    setPhase]    = useState('init')
  const [progress, setProgress] = useState(0)
  const [mounted,  setMounted]  = useState(true)

  // ── Canvas: static stars + shooting stars ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.6 + 0.2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnStar = () => {
      const n = Math.random() < 0.25 ? 2 : 1
      for (let i = 0; i < n; i++) {
        const col   = SHOOT_COLORS[Math.floor(Math.random() * SHOOT_COLORS.length)]
        const spd   = 3 + Math.random() * 4
        const angle = Math.PI / 6 + Math.random() * (Math.PI / 6)
        shootRef.current.push({
          x:     Math.random() * canvas.width * 0.6,
          y:     Math.random() * canvas.height * 0.35,
          vx:    Math.cos(angle) * spd,
          vy:    Math.sin(angle) * spd,
          trail: 70 + Math.random() * 90,
          alpha: 1,
          col,
        })
      }
      spawnTimer.current = setTimeout(spawnStar, 600 + Math.random() * 800)
    }
    spawnStar()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Static stars
      for (const s of starsRef.current) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.a})`
        ctx.fill()
      }

      // Shooting stars
      shootRef.current = shootRef.current.filter(s => s.alpha > 0)
      for (const s of shootRef.current) {
        s.x += s.vx; s.y += s.vy; s.alpha -= 0.016
        if (s.alpha <= 0 || s.x > canvas.width + 50 || s.y > canvas.height + 50) {
          s.alpha = 0; continue
        }
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        const nx = s.vx / spd, ny = s.vy / spd
        const tailX = s.x - nx * s.trail, tailY = s.y - ny * s.trail
        const g = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        g.addColorStop(0,    `${s.col}0)`)
        g.addColorStop(0.65, `${s.col}${(s.alpha * 0.5).toFixed(2)})`)
        g.addColorStop(1,    `${s.col}${s.alpha.toFixed(2)})`)
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke()
        // Bright head dot
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `${s.col}${s.alpha.toFixed(2)})`
        ctx.fill()
      }

      loopRaf.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      clearTimeout(spawnTimer.current)
      cancelAnimationFrame(loopRaf.current)
    }
  }, [])

  // ── Phase sequence ────────────────────────────────────────────────────────
  useEffect(() => {
    const ids = []
    const t = (fn, ms) => { const id = setTimeout(fn, ms); ids.push(id) }
    t(() => setPhase('x'),       500)
    t(() => setPhase('expand'),  1600)
    t(() => setPhase('flash'),   2500)
    t(() => setPhase('glow'),    2600)
    t(() => setPhase('divider'), 2900)
    t(() => setPhase('tagline'), 3200)
    return () => ids.forEach(clearTimeout)
  }, [])

  // ── Progress bar: 5 s cubic-out ───────────────────────────────────────────
  useEffect(() => {
    const start = performance.now()
    const dur = 5000
    const ease = v => 1 - Math.pow(1 - v, 3)

    const tick = now => {
      const p = ease(Math.min((now - start) / dur, 1)) * 100
      setProgress(p)
      if (p < 100) {
        progressRaf.current = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setTimeout(() => {
          setPhase('out')
          setTimeout(() => {
            setMounted(false)
            sessionStorage.setItem('nw_loaded', '1')
            onDone?.()
          }, 900)
        }, 200)
      }
    }
    progressRaf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRaf.current)
  }, [onDone])

  if (!mounted) return null

  // ── Phase flags ───────────────────────────────────────────────────────────
  const isX       = atOrAfter(phase, 'x')
  const isExp     = atOrAfter(phase, 'expand')
  const isFlash   = phase === 'flash'
  const isGlow    = atOrAfter(phase, 'glow')
  const isDivider = atOrAfter(phase, 'divider')
  const isTagline = atOrAfter(phase, 'tagline')
  const isOut     = phase === 'out'

  // ── Shared letter style ───────────────────────────────────────────────────
  const ls = {
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(3.2rem, 11vw, 7rem)',
    lineHeight: 1,
    display: 'inline-block',
    letterSpacing: '0.04em',
    background: LETTER_GRAD,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const corners = [
    { top:20,    left:20,  borderTop:'1.5px solid rgba(167,139,250,0.45)', borderLeft:'1.5px solid rgba(167,139,250,0.45)' },
    { top:20,    right:20, borderTop:'1.5px solid rgba(167,139,250,0.45)', borderRight:'1.5px solid rgba(167,139,250,0.45)' },
    { bottom:20, left:20,  borderBottom:'1.5px solid rgba(167,139,250,0.45)', borderLeft:'1.5px solid rgba(167,139,250,0.45)' },
    { bottom:20, right:20, borderBottom:'1.5px solid rgba(167,139,250,0.45)', borderRight:'1.5px solid rgba(167,139,250,0.45)' },
  ]

  return (
    <>
      <style>{INJECTED_CSS}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: isOut ? 0 : 1,
        transition: isOut ? 'opacity 0.9s ease' : undefined,
        overflow: 'hidden',
      }}>

        {/* Stars canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        }} />

        {/* Radial violet glow center */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(100,50,200,0.22) 0%, transparent 70%)',
        }} />

        {/* Animated grain */}
        <div style={{
          position: 'absolute', inset: '-50%', zIndex: 2, pointerEvents: 'none', opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
          animation: 'splashGrain 0.35s steps(1) infinite',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', top: -2, left: 0, right: 0, height: 1,
          zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.7) 50%, transparent 100%)',
          animation: 'splashScan 2.4s ease-in-out 0.15s forwards',
        }} />

        {/* Corner brackets */}
        {corners.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', width: 22, height: 22,
            zIndex: 3, pointerEvents: 'none',
            opacity: isX ? 1 : 0,
            transition: 'opacity 1.2s ease 0.4s',
            ...s,
          }} />
        ))}

        {/* WX mark top-left */}
        <div style={{
          position: 'absolute', top: 22, left: 22, zIndex: 4, pointerEvents: 'none',
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 10,
          letterSpacing: '0.2em', color: 'rgba(167,139,250,0.28)',
          opacity: isExp ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}>WX</div>

        {/* ── WEXOR word ── */}
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', userSelect: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* WE — slides in from left */}
            <div style={{
              display: 'flex',
              transform: isExp ? 'translateX(0)' : 'translateX(-90px)',
              opacity:   isExp ? 1 : 0,
              transition: isExp
                ? 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease'
                : 'none',
            }}>
              {['W', 'E'].map(c => <span key={c} style={ls}>{c}</span>)}
            </div>

            {/* X — pop bounce entry */}
            <div style={{
              transform: isX ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-20deg)',
              opacity:   isX ? 1 : 0,
              filter: isFlash
                ? 'brightness(4) drop-shadow(0 0 28px #fff) drop-shadow(0 0 60px rgba(167,139,250,0.9))'
                : isGlow
                  ? 'drop-shadow(0 0 18px rgba(167,139,250,0.75)) drop-shadow(0 0 8px rgba(236,72,153,0.55))'
                  : 'none',
              transition: isX
                ? 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease, filter 0.45s ease'
                : 'none',
            }}>
              <span style={ls}>X</span>
            </div>

            {/* OR — slides in from right */}
            <div style={{
              display: 'flex',
              transform: isExp ? 'translateX(0)' : 'translateX(90px)',
              opacity:   isExp ? 1 : 0,
              transition: isExp
                ? 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease'
                : 'none',
            }}>
              {['O', 'R'].map(c => <span key={c} style={ls}>{c}</span>)}
            </div>

          </div>

          {/* Divider line */}
          <div style={{
            height: 1, marginTop: 14,
            background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.65), rgba(236,72,153,0.45), transparent)',
            width:   isDivider ? '100%' : '0%',
            opacity: isDivider ? 1 : 0,
            transition: isDivider ? 'width 0.7s ease, opacity 0.5s ease' : 'none',
          }} />

          {/* Tagline */}
          <div style={{
            marginTop: 12,
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: 'clamp(0.62rem, 1.8vw, 0.8rem)',
            letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'rgba(200,180,255,0.65)',
            opacity:   isTagline ? 1 : 0,
            transform: isTagline ? 'translateY(0)' : 'translateY(8px)',
            transition: isTagline ? 'opacity 0.9s ease, transform 0.9s ease' : 'none',
          }}>
            Digital Agency · Paris
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 6,
          background: 'rgba(255,255,255,0.04)',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
            boxShadow: '0 0 10px rgba(124,58,237,0.9), 0 0 24px rgba(236,72,153,0.5)',
          }} />
        </div>

        {/* % counter */}
        <div style={{
          position: 'absolute', bottom: 8, right: 16, zIndex: 6,
          fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.67rem',
          letterSpacing: '0.08em', color: 'rgba(167,139,250,0.45)',
        }}>
          {Math.floor(progress)}%
        </div>

      </div>
    </>
  )
}
