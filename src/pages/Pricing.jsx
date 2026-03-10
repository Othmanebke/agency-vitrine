import React from 'react'
import Packages from '../components/Packages'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import { ScrollTextReveal, MagneticTitle } from '../components/ScrollEffects'
import { motion, useReducedMotion } from 'framer-motion'

export default function Pricing() {
  const shouldReduce = useReducedMotion()

  useSEO({
    title: 'Tarifs & Offres — Wexor | Site Vitrine, E-commerce, Réseaux Sociaux',
    description: 'Découvrez les tarifs Wexor : site vitrine dès 500 €, e-commerce, refonte, SEO et packs réseaux sociaux. Devis précis après un bref échange.',
    path: '/pricing',
  })
  return (
    <div className="min-h-screen text-white bg-[#050510]">
      <Nav />

      <main role="main">
        {/* MARKETING HEADER */}
        <header className="max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-xs md:text-sm tracking-widest uppercase"
          >
            Investissement
          </motion.div>

          <MagneticTitle>
            <ScrollTextReveal
              text="Combien vaut vraiment ton image de marque ?"
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-6 text-white tracking-tighter mx-auto max-w-4xl inline-block"
            />
          </MagneticTitle>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={shouldReduce ? {} : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            Pas de frais cachés, pas de mauvaises surprises. Juste une tarification claire basée sur la valeur qu'on apporte à ton business.
          </motion.p>
        </header>

        <Packages />

        {/* VISUAL TIMELINE "COMMENT ÇA MARCHE" */}
        <section className="max-w-6xl mx-auto px-6 py-24 mb-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent hidden md:block" />

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">La méthode Wexor</h2>
            <p className="text-zinc-400">On va à l'essentiel, sans te faire perdre de temps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { num: '01', title: 'Audit & Stratégie', desc: 'On analyse ton marché et on définit l\'arborescence idéale de ton site lors d\'un call de 30min.' },
              { num: '02', title: 'Design & Code', desc: 'On crée une maquette sur-mesure hyper premium, et on développe ton site avec une tech ultra rapide.' },
              { num: '03', title: 'Lancement', desc: 'Déploiement en ligne, optimisation SEO, et formation (si besoin) pour que tu sois autonome.' }
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#0c0716] p-8 rounded-[2rem] border border-white/5 hover:border-violet-500/40 hover:bg-white/[0.03] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-violet-500/20 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
