import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import { MagneticTitle } from '../components/ScrollEffects'
import ServiceCarousel3D from '../components/ServiceCarousel3D'
import ComplementaryOffers from '../components/ComplementaryOffers'
import { motion, useReducedMotion } from 'framer-motion'

export default function Pricing() {
  const shouldReduce = useReducedMotion()

  useSEO({
    title: 'Tarifs & Offres — Wexor | Site Vitrine, E-commerce, Réseaux Sociaux',
    description:
      'Découvrez les tarifs Wexor : site vitrine dès 500 €, e-commerce, refonte, SEO et packs réseaux sociaux. Devis précis après un bref échange.',
    path: '/pricing',
  })

  return (
    <div className="min-h-screen text-white bg-[#050510]">
      <Nav />

      <main role="main">
        {/* ─── HEADER ─── */}
        <header className="max-w-6xl mx-auto px-6 pt-14 pb-16 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-xs md:text-sm tracking-widest uppercase"
          >
            Investissement
          </motion.div>

          <MagneticTitle>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tighter mx-auto max-w-4xl flex flex-wrap justify-center gap-x-[0.25em] gap-y-2"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                },
              }}
              initial={shouldReduce ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
            >
              {'Combien vaut vraiment ton image de marque ?'
                .split(' ')
                .map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className={
                      word.toLowerCase() === 'vraiment'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm'
                        : 'text-white'
                    }
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
          </MagneticTitle>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={shouldReduce ? {} : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            Pas de frais cachés, pas de mauvaises surprises. Juste une tarification claire
            basée sur la valeur qu&apos;on apporte à ton business.
          </motion.p>
        </header>

        {/* ─── 3D SERVICES CAROUSEL ─── */}
        <ServiceCarousel3D />

        {/* ─── COMPLEMENTARY OFFERS ─── */}
        <ComplementaryOffers />
      </main>

      <Footer />
    </div>
  )
}
