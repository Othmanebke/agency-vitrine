import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────
   1) INFINITE MARQUEE BAND — giant text scrolling between sections
   ───────────────────────────────────────────────────────── */
export function MarqueeBand() {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
    const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])

    const words = 'DESIGN · DÉVELOPPEMENT · SEO · STRATÉGIE · BRANDING · PERFORMANCE · '

    return (
        <div ref={ref} className="relative py-16 md:py-24 overflow-hidden select-none" aria-hidden>
            {/* Gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050510] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050510] to-transparent" />

            {/* Row 1 — moves left on scroll */}
            <motion.div
                style={shouldReduce ? {} : { x: x1 }}
                className="flex whitespace-nowrap mb-4"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white/[0.04] tracking-tight mr-4" style={{ WebkitTextStroke: '1px rgba(139,92,246,0.15)' }}>
                        {words}
                    </span>
                ))}
            </motion.div>

            {/* Row 2 — moves right on scroll */}
            <motion.div
                style={shouldReduce ? {} : { x: x2 }}
                className="flex whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white/[0.04] tracking-tight mr-4" style={{ WebkitTextStroke: '1px rgba(236,72,153,0.12)' }}>
                        {words}
                    </span>
                ))}
            </motion.div>
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
   ───────────────────────────────────────────────────────── */
export function HorizontalScroll({ children, itemCount = 4 }) {
    const ref = useRef(null)
    const shouldReduce = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(itemCount - 1) * 100 / itemCount}%`])
    const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

    return (
        <section ref={ref} style={{ height: `${itemCount * 100}vh` }} className="relative">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={shouldReduce ? {} : { x: smoothX }}
                    className="flex"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    )
}

export function HorizontalSlide({ children, className = '' }) {
    return (
        <div className={`w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16 ${className}`}>
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
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

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
    const ref = useRef(null)
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
