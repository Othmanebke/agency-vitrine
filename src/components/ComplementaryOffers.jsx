import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const monthlyPlans = [
  {
    name: 'Starter',
    monthlyPrice: 450,
    annualTotal: 4500,
    desc: 'Idéal pour maintenir une présence active',
    features: [
      '8 posts / mois',
      'Design visuel soigné',
      '2 réseaux sociaux',
      'Rapport mensuel basique',
      'Révisions illimitées',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 1200,
    annualTotal: 12000,
    desc: 'Pour booster ta visibilité et tes ventes',
    features: [
      '20 posts / mois',
      'Création de contenu & stories',
      '4 réseaux sociaux',
      'Stratégie & reporting avancé',
      'Community management',
      'Campagnes paid incluses',
    ],
    highlight: true,
    badge: 'Populaire',
  },
]

export default function ComplementaryOffers() {
  const [billing, setBilling] = useState('monthly')
  const shouldReduce = useReducedMotion()
  const isAnnual = billing === 'annual'

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

      {/* ─── Flyers & Réseaux Plans ─── */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-xs tracking-widest uppercase">
              Forfaits mensuels
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              Flyers &{' '}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Réseaux
              </span>
            </h3>
            <p className="text-zinc-400 max-w-md">
              Contenu visuel régulier pour alimenter tes réseaux et captiver ta communauté.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBilling(isAnnual ? 'monthly' : 'annual')}
              className="relative w-14 h-7 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: isAnnual ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)' }}
              role="switch"
              aria-checked={isAnnual}
              aria-label="Basculer entre mensuel et annuel"
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                animate={{ x: isAnnual ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
              Annuel
            </span>
            <AnimatedBadge show={isAnnual} text="2 mois offerts" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {monthlyPlans.map((plan, i) => (
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
                {plan.badge && !isAnnual && (
                  <span className="absolute -top-3 right-8 px-4 py-1 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg shadow-pink-500/40">
                    {plan.badge}
                  </span>
                )}

                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/40"
                  >
                    2 mois offerts
                  </motion.span>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-1">{plan.name}</h4>
                  <p className="text-zinc-500 text-sm font-medium">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="text-5xl font-black tracking-tighter text-white"
                    >
                      {isAnnual
                        ? plan.annualTotal.toLocaleString('fr-FR')
                        : plan.monthlyPrice.toLocaleString('fr-FR')}€
                    </motion.span>
                    <span className="text-zinc-500 font-medium">
                      {isAnnual ? '/an' : '/mois'}
                    </span>
                  </div>

                  {isAnnual && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-emerald-400 text-sm mt-1.5"
                    >
                      soit {Math.round(plan.annualTotal / 12)}€/mois — économie de{' '}
                      {(plan.monthlyPrice * 2).toLocaleString('fr-FR')}€
                    </motion.p>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-pink-400' : 'text-violet-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

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
                  Choisir le pack {plan.name}
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function AnimatedBadge({ show, text }) {
  if (!show) return null
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
    >
      {text}
    </motion.span>
  )
}
