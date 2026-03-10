import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────
   1) MODERN MARQUEE — pills/tags scrolling continuously like SaaS sites
   ───────────────────────────────────────────────────────── */

const marqueeItems = [
    { text: 'Design UI/UX', color: 'violet' },
    { text: 'Développement', color: 'pink' },
    { text: 'SEO', color: 'indigo' },
    { text: 'Stratégie Digitale', color: 'violet' },
    { text: 'Branding', color: 'pink' },
    { text: 'Performance', color: 'emerald' },
    { text: 'React & Next.js', color: 'indigo' },
    { text: 'WordPress', color: 'violet' },
    { text: 'IA & Automation', color: 'pink' },
    { text: 'Community Management', color: 'emerald' },
    { text: 'Identité Visuelle', color: 'violet' },
    { text: 'E-commerce', color: 'indigo' },
]

const colorMap = {
    violet: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', text: 'rgb(196,181,253)', glow: 'rgba(139,92,246,0.4)' },
    pink: { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.25)', text: 'rgb(249,168,212)', glow: 'rgba(236,72,153,0.4)' },
    indigo: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', text: 'rgb(165,180,252)', glow: 'rgba(99,102,241,0.4)' },
    emerald: { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.25)', text: 'rgb(110,231,183)', glow: 'rgba(52,211,153,0.4)' },
}

function MarqueeRow({ items, direction = 'left', speed = 35 }) {
    const doubled = [...items, ...items, ...items]

    return (
        <div className="flex overflow-hidden py-2">
            <motion.div
                className="flex gap-3 md:gap-4"
                animate={{ x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                {doubled.map((item, i) => {
                    const c = colorMap[item.color]
                    return (
                        <div
                            key={i}
                            className="flex-shrink-0 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 hover:scale-110"
                            style={{
                                background: c.bg,
                                border: `1px solid ${c.border}`,
                                color: c.text,
                                backdropFilter: 'blur(8px)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 20px ${c.glow}`
                                e.currentTarget.style.borderColor = c.text
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.borderColor = c.border
                            }}
                        >
                            {item.text}
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export function MarqueeBand() {
    const row1 = marqueeItems.slice(0, 6)
    const row2 = marqueeItems.slice(6, 12)

    return (
        <div className="relative py-12 md:py-16 overflow-hidden select-none" aria-hidden>
            <MarqueeRow items={row1} direction="left" speed={30} />
            <MarqueeRow items={row2} direction="right" speed={35} />
        </div>
    )
}

/* ─────────────────────────────────────────────────────────
   2) SCROLL-DRIVEN CHARACTER REVEAL — text appears char by char
   ───────────────────────────────────────────────────────── */
export function ScrollTextReveal({ text, className = '' }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.3']
    })

    const words = text.split(' ')

    if (shouldReduce) {
        return <p ref={ref} className={className}>{text}</p>
    }

    return (
        <p ref={ref} className={`${className} flex flex-wrap`}>
            {words.map((word, wi) => (
                <span key={wi} className="mr-[0.3em] inline-flex">
                    {word.split('').map((char, ci) => {
                        const totalChars = text.replace(/ /g, '').length
                        const charIndex = text.replace(/ /g, '').indexOf(word.replace(/ /g, '')) + ci
                        const start = charIndex / totalChars
                        const end = Math.min(start + 0.05, 1)

                        return (
                            <ScrollChar
                                key={`${wi}-${ci}`}
                                char={char}
                                progress={scrollYProgress}
                                start={start}
                                end={end}
                            />
                        )
                    })}
                </span>
            ))}
        </p>
    )
}

function ScrollChar({ char, progress, start, end }) {
    const opacity = useTransform(progress, [start, end], [0.1, 1])
    const y = useTransform(progress, [start, end], [8, 0])

    return (
        <motion.span style={{ opacity, y }} className="inline-block">
            {char}
        </motion.span>
    )
}

/* ─────────────────────────────────────────────────────────
   3) HORIZONTAL SCROLL SECTION — vertical scroll → horizontal movement
   FIXED: proper width calculation using % of total children width
   ───────────────────────────────────────────────────────── */
export function HorizontalScroll({ children, itemCount = 4 }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })

    // Move from 0 to -(100% * (items - 1)) for the flex container
    const xPercent = useTransform(scrollYProgress, [0, 1], [0, -(itemCount - 1) * 100])
    const smoothX = useSpring(xPercent, { stiffness: 80, damping: 25 })

    if (shouldReduce) {
        return (
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
            </section>
        )
    }

    return (
        <section ref={ref} style={{ height: `${itemCount * 100}vh` }} className="relative">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x: useTransform(smoothX, v => `${v / itemCount}%`) }}
                    className="flex pl-[10vw]"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    )
}

export function HorizontalSlide({ children, className = '' }) {
    return (
        <div className={`w-[85vw] md:w-[45vw] h-auto flex-shrink-0 flex items-center justify-center px-3 md:px-5 ${className}`}>
            {children}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────
   4) SCROLL VELOCITY SKEW — elements skew based on scroll speed
   ───────────────────────────────────────────────────────── */
export function ScrollSkewWrapper({ children, className = '' }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const rawSkew = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3])
    const skewY = useSpring(rawSkew, { stiffness: 100, damping: 20 })
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    return (
        <motion.div
            ref={ref}
            style={shouldReduce ? {} : { skewY, scale }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────
   5) 3D PERSPECTIVE SCROLL — cards rotate in 3D as you scroll past
   ───────────────────────────────────────────────────────── */
export function Scroll3DCard({ children, className = '', index = 0 }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15])
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -8 : 8, 0, index % 2 === 0 ? 8 : -8])
    const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

    return (
        <motion.div
            ref={ref}
            style={shouldReduce ? {} : {
                rotateX,
                rotateY,
                z,
                opacity,
                transformPerspective: 1200,
                transformStyle: 'preserve-3d',
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────
   6) PARALLAX DEPTH LAYERS — multi-speed parallax section
   ───────────────────────────────────────────────────────── */
export function ParallaxSection({ children, className = '' }) {
    const ref = useRef(null)

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {/* Floating shapes at different parallax speeds */}
            <ParallaxLayer speed={-0.3} className="absolute top-20 left-[10%]">
                <div className="w-24 h-24 rounded-full border border-violet-500/20 animate-float" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.2} className="absolute top-40 right-[15%]">
                <div className="w-16 h-16 rounded-lg border border-pink-500/15 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
            </ParallaxLayer>
            <ParallaxLayer speed={-0.15} className="absolute bottom-32 left-[20%]">
                <div className="w-3 h-3 rounded-full bg-violet-500/30" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.25} className="absolute top-1/3 right-[8%]">
                <div className="w-2 h-2 rounded-full bg-pink-500/40" />
            </ParallaxLayer>
            <ParallaxLayer speed={-0.4} className="absolute bottom-20 right-[30%]">
                <div className="w-20 h-20 rounded-full border border-indigo-500/10" />
            </ParallaxLayer>

            {/* Actual content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

function ParallaxLayer({ children, speed = 0, className = '' }) {
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        offset: ['start end', 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], [speed * -200, speed * 200])

    return (
        <motion.div
            style={shouldReduce ? {} : { y }}
            className={`pointer-events-none ${className}`}
            aria-hidden
        >
            {children}
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────
   7) MAGNETIC SECTION TITLE — title that follows cursor slightly
   ───────────────────────────────────────────────────────── */
export function MagneticTitle({ children, className = '' }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const x = useSpring(0, { stiffness: 150, damping: 15 })
    const y = useSpring(0, { stiffness: 150, damping: 15 })

    const handleMove = (e) => {
        if (shouldReduce || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.08)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.08)
    }

    const handleLeave = () => { x.set(0); y.set(0) }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
