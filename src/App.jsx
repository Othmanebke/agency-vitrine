import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useReducedMotion } from 'framer-motion'

function ShootingStars() {
  const canvasRef = useRef(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    class Star {
      constructor(staggerDelay = 0) {
        this.staggerDelay = staggerDelay
        this.reset(true)
      }
      reset(initial = false) {
        // start from top edge or left edge randomly
        const fromTop = Math.random() > 0.4
        this.x = fromTop ? Math.random() * canvas.width * 0.75 : 0
        this.y = fromTop ? 0 : Math.random() * canvas.height * 0.4
        this.len = 90 + Math.random() * 110
        this.speed = 9 + Math.random() * 7
        this.opacity = 0.85 + Math.random() * 0.15
        this.fade = 0.008 + Math.random() * 0.006
        this.angle = (Math.PI / 180) * (28 + Math.random() * 18)
        this.startTime = performance.now() + (initial ? this.staggerDelay : 2000 + Math.random() * 5000)
        this.done = false
      }
      draw(now) {
        if (now < this.startTime) return
        if (this.done) { this.reset(); return }
        this.opacity -= this.fade
        if (this.opacity <= 0) { this.done = true; return }
        const dx = Math.cos(this.angle) * this.speed
        const dy = Math.sin(this.angle) * this.speed
        this.x += dx
        this.y += dy
        if (this.x > canvas.width || this.y > canvas.height) { this.done = true; return }
        const tx = this.x - Math.cos(this.angle) * this.len
        const ty = this.y - Math.sin(this.angle) * this.len
        const grad = ctx.createLinearGradient(tx, ty, this.x, this.y)
        grad.addColorStop(0, `rgba(167,139,250,0)`)
        grad.addColorStop(0.6, `rgba(196,181,253,${this.opacity * 0.4})`)
        grad.addColorStop(1, `rgba(255,255,255,${this.opacity})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }

    const COUNT = 7
    const stars = Array.from({ length: COUNT }, (_, i) =>
      new Star(i * (4000 / COUNT) + Math.random() * 1500)
    )

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => s.draw(now))
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [shouldReduce])

  if (shouldReduce) return null
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[0]" aria-hidden />
}

function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 18 })
  const springY = useSpring(y, { stiffness: 120, damping: 18 })
  const dotX = useSpring(x, { stiffness: 400, damping: 30 })
  const dotY = useSpring(y, { stiffness: 400, damping: 30 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <>
      {/* soft glow halo */}
      <motion.div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9998] rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 380,
          height: 380,
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      {/* small dot */}
      <motion.div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9999] rounded-full mix-blend-screen"
        style={{
          left: dotX,
          top: dotY,
          width: 8,
          height: 8,
          background: 'rgba(167,139,250,0.9)',
          boxShadow: '0 0 10px 2px rgba(139,92,246,0.7)',
        }}
        aria-hidden
      />
    </>
  )
}
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[10000] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
        boxShadow: '0 0 10px rgba(139,92,246,0.9)',
      }}
    />
  )
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const handleClick = () => {
    history.pushState({}, '', '/contact')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(139,92,246,0.55)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-[9997] flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/40 cursor-pointer"
          aria-label="Demander un devis gratuit"
        >
          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
          Devis gratuit
        </motion.button>
      )}
    </AnimatePresence>
  )
}

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Contact from './pages/Contact'

function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base */}
      <div className="absolute inset-0 bg-[#050510]" />

      {/* orb 1 — violet */}
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-700/25 blur-[120px]"
      />

      {/* orb 2 — pink */}
      <motion.div
        animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[100px]"
      />

      {/* orb 3 — indigo */}
      <motion.div
        animate={{ x: [0, 30, -60, 0], y: [0, 50, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-indigo-800/20 blur-[100px]"
      />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      {/* grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  )
}

export default function App(){
  const [path, setPath] = useState(window.location.pathname)

  useEffect(()=>{
    const onPop = ()=> setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return ()=> window.removeEventListener('popstate', onPop)
  }, [])

  const page = path === '/pricing' ? <Pricing /> :
               path === '/portfolio' ? <Portfolio /> :
               path === '/about' ? <About /> :
               path === '/contact' ? <Contact /> :
               <Home />

  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      <GlobalBackground />
      <ShootingStars />
      <FloatingCTA />
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
