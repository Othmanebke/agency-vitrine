import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const projects = [
    {
        id: 1,
        title: 'Aura Skincare',
        category: 'E-commerce & Branding',
        desc: 'Boutique en ligne ultra-rapide avec une expérience d\'achat immersive. Augmentation du taux de conversion de 45% post-refonte.',
        tech: ['Next.js', 'Shopify Plus', 'Framer Motion'],
        color: '#0D0E15',
        image: 'https://images.unsplash.com/photo-1615397323149-5b7b6c59218c?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Nova SaaS',
        category: 'Web App & Dashboard',
        desc: 'Plateforme B2B complète avec dashboard analytique en temps réel. Focus absolu sur l\'UX et les performances d\'affichage.',
        tech: ['React', 'Tailwind', 'Recharts'],
        color: '#150D12',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Studio Lumens',
        category: 'Site Vitrine Awwwards',
        desc: 'Portfolio d\'un studio photo parisien récompensé pour ses animations fluides et sa direction artistique minimaliste.',
        tech: ['WebGL', 'GSAP', 'Vite'],
        color: '#101511',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop'
    }
]

function PortfolioCard({ project, index, totalCards }) {
    const cardRef = useRef(null)
    const shouldReduce = useReducedMotion()

    // Track scroll progress of THIS specific card
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'start top']
    })

    // Hook to track the OVERALL scroll progress of the container to animate stacked cards
    const { scrollYProgress: stickyProgress } = useScroll({
        target: cardRef,
        offset: ['start top', 'end top']
    })

    // Reveal animation: card slides up and fades in
    const y = useTransform(scrollYProgress, [0, 1], [100, 0])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

    // Stacking animation: when card sticks, it scales down and gets darker as next cards overlap it
    // We only want this effect if it's NOT the last card
    const isLast = index === totalCards - 1
    const scale = useTransform(stickyProgress, [0, 1], [1, isLast ? 1 : 0.9])
    const brightness = useTransform(stickyProgress, [0, 1], [1, isLast ? 1 : 0.4])

    // Image internal parallax
    const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '0%'])

    return (
        <div className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div
                ref={cardRef}
                style={shouldReduce ? {} : {
                    y,
                    opacity,
                    scale,
                    filter: `brightness(${brightness})`,
                    transformOrigin: 'top center'
                }}
                className="relative w-[90vw] md:w-[80vw] lg:w-[1000px] h-[75vh] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-end"
            >
                {/* Background color placeholder & border */}
                <div className="absolute inset-0" style={{ backgroundColor: project.color, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'inherit' }} />

                {/* Parallax Image */}
                <motion.div
                    className="absolute inset-0 z-0 origin-bottom"
                    style={shouldReduce ? {} : { y: imgY }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[120%] object-cover object-center grayscale-[0.2]"
                    />
                </motion.div>

                {/* Content Overlay */}
                <div className="relative z-20 p-8 md:p-12 w-full md:w-3/4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="text-pink-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 block">
                            {project.category}
                        </span>
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                            {project.desc}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                            {project.tech.map(t => (
                                <span key={t} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/90 backdrop-blur-md border border-white/10">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Glowing CTA Button */}
                        <button className="group relative px-6 py-3 rounded-full font-bold text-sm bg-white text-black overflow-hidden hover:scale-105 transition-transform duration-300">
                            <span className="relative z-10 flex items-center gap-2">
                                Voir le projet
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </button>
                    </motion.div>
                </div>

                {/* Project Number (Top Right) */}
                <div className="absolute top-8 right-8 z-20 text-white/20 font-black text-6xl md:text-8xl select-none">
                    0{index + 1}
                </div>
            </motion.div>
        </div>
    )
}

export default function Portfolio() {
    const shouldReduce = useReducedMotion()

    return (
        <section id="portfolio" className="relative w-full py-24 mb-32">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div
                    initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                    whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs uppercase tracking-widest text-pink-400 mb-3 font-semibold">Nos réalisations</p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black glow-title text-white">Créations récentes</h2>
                </motion.div>
            </div>

            {/* Stacking Cards Container */}
            <div className="relative w-full">
                {projects.map((project, i) => (
                    <PortfolioCard
                        key={project.id}
                        project={project}
                        index={i}
                        totalCards={projects.length}
                    />
                ))}
            </div>
        </section>
    )
}
