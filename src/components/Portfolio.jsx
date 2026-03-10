import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const projects = [
    {
        id: 1,
        title: 'Aura',
        subtitle: 'Skincare',
        category: 'E-commerce',
        desc: 'Une expérience d\'achat sensorielle. Augmentation de 45% du taux de conversion grâce à une architecture headless ultra-rapide.',
        tech: ['Next.js', 'Shopify', 'Framer'],
        color: 'from-violet-500/20 to-fuchsia-500/10',
        accent: '#a78bfa',
        image: 'https://images.unsplash.com/photo-1615397323149-5b7b6c59218c?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Nova',
        subtitle: 'SaaS Platform',
        category: 'Web App',
        desc: 'Dashboard B2B minimaliste et puissant. Traitement en temps réel de milliers de données avec une interface fluide à 60fps.',
        tech: ['React', 'Tailwind', 'tRPC'],
        color: 'from-blue-500/20 to-indigo-500/10',
        accent: '#60a5fa',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Lumens',
        subtitle: 'Studio Photo',
        category: 'Site Vitrine',
        desc: 'Direction artistique audacieuse et portfolio immersif 3D récompensé sur Awwwards. Un showcase interactif.',
        tech: ['WebGL', 'GSAP', 'Vite'],
        color: 'from-emerald-500/20 to-teal-500/10',
        accent: '#34d399',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Fintech',
        subtitle: 'Banking',
        category: 'App Mobile',
        desc: 'Application bancaire nouvelle génération. Sécurité bancaire associée à une interface utilisateur fluide et intuitive.',
        tech: ['React Native', 'Node.js', 'PostgreSQL'],
        color: 'from-rose-500/20 to-pink-500/10',
        accent: '#fb7185',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=2670&auto=format&fit=crop'
    }
]

/* --- Animated Word Reveal for Descriptions --- */
function AnimatedWords({ text }) {
    const words = text.split(" ")
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 * i }
        })
    }
    const child = {
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", damping: 16, stiffness: 200 } },
        hidden: { opacity: 0, y: 15, filter: 'blur(8px)' }
    }

    return (
        <motion.div style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.3em" }} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {words.map((word, index) => (
                <motion.span variants={child} key={index}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}

/* --- Animated Title Character by Character --- */
function AnimatedTitle({ title, subtitle, accent }) {
    const chars = title.split("")
    const child = {
        visible: { opacity: 1, scale: 1, rotateY: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
        hidden: { opacity: 0, scale: 0.8, rotateY: 90 }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col"
        >
            <div className="flex" style={{ perspective: "1000px" }}>
                {chars.map((char, index) => (
                    <motion.span variants={child} key={index} className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter" style={{ color: accent, textShadow: `0 0 30px ${accent}40` }}>
                        {char}
                    </motion.span>
                ))}
            </div>
            <motion.span
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { delay: chars.length * 0.08 } } }}
                className="text-3xl md:text-5xl lg:text-7xl font-extralight tracking-tight text-white mt-[-0.5rem]"
            >
                {subtitle}
            </motion.span>
        </motion.div>
    )
}


function PortfolioCarouselCard({ project }) {
    const shouldReduce = useReducedMotion()

    return (
        <div className="w-[85vw] md:w-[65vw] lg:w-[50vw] h-[75vh] md:h-[650px] flex-shrink-0 flex items-center justify-center px-4 md:px-6">
            <motion.div
                className={`group relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br ${project.color} border border-white/10`}
                whileHover={shouldReduce ? {} : { borderColor: project.accent + '80', boxShadow: `0 0 40px ${project.accent}20` }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Image with Hover Scale */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-black/60 to-black/20 z-10" />
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Card Content container */}
                <div className="relative z-20 h-full p-8 md:p-12 lg:p-16 flex flex-col justify-end">

                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                        <span className="text-xs font-mono tracking-widest uppercase border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md" style={{ color: project.accent, borderColor: project.accent + '40', background: project.accent + '10' }}>
                            {project.category}
                        </span>
                        <div className="h-px bg-white/20 flex-grow" />
                        <span className="text-white/40 font-mono text-sm tracking-widest hidden md:block">0{project.id}</span>
                    </div>

                    <div className="mb-8">
                        <AnimatedTitle title={project.title} subtitle={project.subtitle} accent={project.accent} />
                    </div>

                    <div className="text-zinc-300 text-sm md:text-lg mb-8 md:mb-12 max-w-lg leading-relaxed font-light">
                        <AnimatedWords text={project.desc} />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-2"
                        >
                            {project.tech.map(t => (
                                <span key={t} className="text-xs font-semibold text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                    {t}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md group-hover:border-white transition-colors"
                            aria-label="Voir le projet"
                        >
                            <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}

export default function Portfolio() {
    const containerRef = useRef(null)
    const shouldReduce = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // Horizontal scroll for the carousel. 
    // We have length items. We want to scroll enough to see the last item.
    // 4 items = we want to move from 0 to -75% (approx) to show the last one, 
    // but since we have a title section, the container needs height = items * 100vh.
    const totalItems = projects.length

    // Calculate movement. 0 to -(totalItems - 1) * 100% of the single view width, but we use xPercent for flex sliding
    const xPercent = useTransform(scrollYProgress, [0, 1], [0, -(totalItems - 1) * 100])
    const smoothX = useSpring(xPercent, { stiffness: 80, damping: 25 })

    // Title fade out when scrolling horizontally starts
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50])

    if (shouldReduce) {
        return (
            <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
                <h2 className="text-4xl font-black">Nos réalisations</h2>
                {projects.map(p => (
                    <div key={p.id} className="p-8 border border-white/10 rounded-3xl bg-white/5">
                        <h3 className="text-3xl font-bold mb-2">{p.title} <span className="text-zinc-400 font-light">{p.subtitle}</span></h3>
                        <p className="text-zinc-400 mb-6">{p.desc}</p>
                        <div className="flex gap-2">
                            {p.tech.map(t => <span key={t} className="px-3 py-1 bg-black/50 rounded-full text-xs">{t}</span>)}
                        </div>
                    </div>
                ))}
            </section>
        )
    }

    return (
        <section ref={containerRef} id="portfolio" style={{ height: `${totalItems * 100}vh` }} className="relative w-full bg-[#050510]">

            {/* Sticky container that stays in view while we scroll vertically */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

                {/* Sticky Header fixed in the background/top left */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute top-[10%] left-[8%] md:left-[10%] z-0"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                        <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold font-mono">Nos réalisations</p>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white/10 tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                        PORTFOLIO
                    </h2>
                </motion.div>

                {/* The horizontal sliding deck */}
                <motion.div
                    style={{ x: useTransform(smoothX, v => `${v / totalItems}%`) }}
                    className="flex items-center w-full z-10 pt-16 md:pt-0"
                >
                    {/* We add a left padding on the flex container so the first card isn't stuck to the screen edge.
              Using padding on the first element works better for smooth scrolling. */}
                    <div className="w-[5vw] md:w-[10vw] flex-shrink-0" />

                    {projects.map((project, i) => (
                        <PortfolioCarouselCard key={project.id} project={project} />
                    ))}

                    {/* Right padding so the last card doesn't hit the right edge perfectly */}
                    <div className="w-[10vw] md:w-[25vw] flex-shrink-0" />
                </motion.div>

            </div>
        </section>
    )
}
