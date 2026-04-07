import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const brandingPlans = [
  {
    name: 'Pack Canva Pro',
    price: '150 – 350€',
    desc: 'Création rapide, rendu propre & moderne',
    features: [
      'Logo principal + 2 variantes',
      'Palette couleurs & typographies',
      "Jusqu'à 3 supports print (flyer, carte, affiche)",
      'Templates réseaux sociaux inclus',
      'Fichiers HD livrés (PNG, PDF)',
      'Révisions illimitées',
    ],
    highlight: false,
    tools: 'Canva Pro',
  },
  {
    name: 'Pack Adobe CC',
    price: '600 – 1 200€',
    desc: 'Identité vectorielle pro, fichiers sources inclus',
    features: [
      'Logo vectoriel complet (principal, icône, N&B)',
      'Charte graphique complète',
      "Jusqu'à 5 supports print sur-mesure",
      'Templates réseaux sociaux',
      "Guide d'utilisation de la marque",
      'Fichiers sources livrés (AI, PSD, INDD)',
    ],
    highlight: true,
    badge: 'Recommandé',
    tools: 'Adobe Illustrator · Photoshop · InDesign',
  },
]

export default function ComplementaryOffers() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      {/* ─── Pack Branding, Logos & Print ─── */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-xs tracking-widest uppercase">
            Création visuelle
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            Branding, Logos &{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Print
            </span>
          </h3>
          <p className="text-zinc-400 max-w-md">
            Identité visuelle forte, supports print impeccables et assets pour tes réseaux — créés sur Canva Pro ou la suite Adobe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {brandingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
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
                        boxShadow: plan.highlight
                          ? '0 24px 80px rgba(236,72,153,0.15)'
                          : '0 24px 80px rgba(139,92,246,0.1)',
                      }
                }
                transition={{ duration: 0.3 }}
                className={`relative flex flex-col h-full rounded-[2rem] p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-pink-600/10 to-violet-600/10 border-pink-500/30 hover:border-pink-500/50'
                    : 'bg-[#0c0716] border-white/5 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-8 px-4 py-1 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg shadow-pink-500/40">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-1">{plan.name}</h4>
                  <p className="text-zinc-500 text-sm font-medium">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-black tracking-tighter text-white">{plan.price}</span>
                </div>

                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-pink-400' : 'text-violet-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-zinc-600 font-mono mb-6">{plan.tools}</p>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    history.pushState({}, '', '/contact')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }}
                  className={`w-full py-4 rounded-xl text-sm font-bold text-center transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg hover:shadow-xl hover:shadow-pink-500/20'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Démarrer ce projet
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

