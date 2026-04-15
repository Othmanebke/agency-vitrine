import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const services = [
  {
    name: 'Flyer & supports print',
    desc: 'Création de flyers, affiches, cartes de visite et supports print professionnels pour ta marque.',
    highlight: false,
  },
  {
    name: 'Identité visuelle',
    desc: 'Logo, charte graphique complète et guide de marque pour une image forte et mémorable.',
    highlight: true,
  },
  {
    name: 'Site web sur mesure',
    desc: 'Besoin spécifique hors packs ? On étudie ton projet et te propose une solution totalement adaptée.',
    highlight: false,
  },
]

export default function ComplementaryOffers() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-xs tracking-widest uppercase">
            Sur devis
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            Prestations{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              à la demande
            </span>
          </h3>
          <p className="text-zinc-400 max-w-md">
            Ces prestations sont disponibles en dehors des packs, sur devis uniquement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <motion.div
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -8,
                        boxShadow: svc.highlight
                          ? '0 24px 80px rgba(236,72,153,0.15)'
                          : '0 24px 80px rgba(139,92,246,0.1)',
                      }
                }
                transition={{ duration: 0.3 }}
                className={`relative flex flex-col h-full rounded-[2rem] p-8 border transition-all duration-300 ${
                  svc.highlight
                    ? 'bg-gradient-to-br from-pink-600/10 to-violet-600/10 border-pink-500/30 hover:border-pink-500/50'
                    : 'bg-[#0c0716] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="mb-4">
                  <h4 className="text-2xl font-black text-white mb-1">{svc.name}</h4>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-black tracking-tighter text-white">Sur devis</span>
                </div>

                <p className="flex-1 text-sm text-zinc-400 leading-relaxed mb-8">{svc.desc}</p>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    history.pushState({}, '', '/contact')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }}
                  className={`w-full py-4 rounded-xl text-sm font-bold text-center transition-all ${
                    svc.highlight
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl hover:shadow-pink-500/20'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Demander un devis
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
