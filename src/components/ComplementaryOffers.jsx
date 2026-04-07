import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const brandingPlans = [
  {
    name: 'Identité Essentielle',
    price: '400 – 800€',
    desc: 'Pour lancer ton identité visuelle',
    features: [
      'Logo principal + variantes',
      'Charte couleurs & typographies',
      '2 supports print (flyer, carte)',
      'Fichiers HD livrés (PNG, SVG, PDF)',
      'Révisions illimitées',
    ],
    highlight: false,
    tools: 'Canva Pro / Adobe Express',
  },
  {
    name: 'Pack Branding Complet',
    price: '1 200 – 2 000€',
    desc: 'Identité complète & supports professionnels',
    features: [
      'Logo complet (principal, icône, noir/blanc)',
      'Charte graphique complète',
      "Jusqu'à 5 supports print sur-mesure",
      'Templates réseaux sociaux',
      "Guide d'utilisation de la marque",
      'Révisions illimitées',
    ],
    highlight: true,
    badge: 'Populaire',
    tools: 'Suite Adobe CC (Illustrator, Photoshop, InDesign)',
  },
]

export default function ComplementaryOffers() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      {/* ─── Refonte Banner ─── */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <div className="group relative rounded-3xl overflow-hidden p-[1px]">
          {/* Aurora border */}
          <motion.div
            className="absolute -inset-[1px] rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899, #6366f1, #7c3aed)',
              backgroundSize: '300% 300%',
            }}
            animate={shouldReduce ? {} : { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative bg-[#0c0716] rounded-[calc(1.5rem-1px)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold shadow-lg shadow-violet-500/40 mb-5 uppercase tracking-widest">
                Service Spécial
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                Refonte de site<br />
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  existant
                </span>
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                Ton site vieilli freine ta croissance ? On le modernise de fond en comble :
                design, performances, SEO et conversion. Résultat garanti.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-5 flex-shrink-0">
              <div className="text-center md:text-right">
                <p className="text-sm text-zinc-500 mb-1">Tarification</p>
                <p className="text-5xl font-black text-white tracking-tighter">Sur devis</p>
                <p className="text-zinc-500 text-sm mt-1">Après un bref échange gratuit</p>
              </div>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  history.pushState({}, '', '/contact')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}
                className="group/btn relative flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 bg-white/5 border border-white/10 hover:border-violet-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Demander un devis
                  <svg
                    className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

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

