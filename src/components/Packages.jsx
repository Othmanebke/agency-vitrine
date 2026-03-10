import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: '150€',
    period: '/mois',
    desc: 'Idéal pour démarrer',
    features: ['8 posts / mois', 'Design visuel & publications', 'Rapport basique mensuel'],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '450€',
    period: '/mois',
    desc: 'Pour gagner en visibilité',
    features: ['12–16 posts / mois', 'Création de contenu & stories', 'Stratégie & reporting mensuel'],
    highlight: true,
    badge: 'Populaire',
  },
  {
    name: 'Pro',
    price: '1 500€',
    period: '/mois',
    desc: 'Campagnes & influence',
    features: ['Contenu quotidien & community mgmt', 'Campagnes paid & micro-influence', 'KPI et optimisation continue'],
    highlight: false,
  },
]

function TiltCard({ children, className, highlight }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      whileHover={shouldReduce ? {} : { y: -8, boxShadow: '0 24px 80px rgba(139,92,246,0.15)' }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden cursor-default ${className}`}
    >
      {/* aurora animated border for highlight card */}
      {highlight && !shouldReduce && (
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl z-0"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #ec4899, #7c3aed)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-[1px] rounded-2xl bg-[#0c0716]" />
        </motion.div>
      )}

      <div className="relative z-[1]">{children}</div>
    </motion.div>
  )
}

export default function Packages() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 pb-20">

      {/* ─── MAIN HERO PRICING CARD ─── */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="group relative w-full rounded-[2.5rem] p-1 bg-[#0c0716] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(139,92,246,0.2)]">
          {/* Animated Aurora BG */}
          <motion.div
            className="absolute -inset-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000 z-0"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #ec4899, #6366f1, #7c3aed)',
              backgroundSize: '300% 300%',
            }}
            animate={shouldReduce ? {} : { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10 bg-[#0c0716] h-full w-full rounded-[2.3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between">

            {/* Left side: Context */}
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold shadow-lg shadow-violet-500/40 mb-6 uppercase tracking-widest">
                L'Offre Phare
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">Le Site Web<br /><span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Sur-Mesure</span></h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-md">
                Un site rapide, performant et optimisé pour Google. Pensé comme ton meilleur commercial automatisé.
              </p>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-2">Technologies</p>
                <div className="flex gap-3 text-sm text-zinc-300 font-mono">
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10">React</span>
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10">WordPress</span>
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Next.js</span>
                </div>
              </div>
            </div>

            {/* Right side: Mechanics & Pricing */}
            <div className="flex-[1.2] flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-zinc-500 font-medium">À partir de</span>
                  <span className="text-5xl lg:text-6xl font-black tracking-tighter text-white">500€</span>
                  <span className="text-lg text-zinc-500">— 5k€</span>
                </div>
                <p className="text-xs text-zinc-500 mb-8">*Tarif exact via devis, selon la complexité et le volume de pages.</p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {['Design Ultra-Premium', 'Code très rapide', 'Optimisé SEO On-Page', 'Accessible Mobile First', 'Copywriting inclus*', 'Formation CMS / Admin'].map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-zinc-300 font-medium">
                      <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/contact"
                onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                className="w-full relative group/btn flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-bold text-white bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-violet-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Démarrer mon projet
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </a>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ─── SOCIAL PACKS BENTO GRID ─── */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-black mb-2">Packs Présence Réseaux</h3>
              <p className="text-zinc-400">Pour développer une communauté soudée et accroître tes ventes organiques.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <motion.div
                whileHover={shouldReduce ? {} : { y: -8, boxShadow: plan.highlight ? '0 24px 80px rgba(236,72,153,0.15)' : '0 24px 80px rgba(139,92,246,0.1)' }}
                className={`relative flex flex-col h-full rounded-[2rem] p-8 border hover:border-white/20 transition-all duration-300 ${plan.highlight
                  ? 'bg-gradient-to-br from-pink-600/10 to-violet-600/10 border-pink-500/30'
                  : 'bg-[#0c0716] border-white/5'
                  }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-8 px-4 py-1 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg shadow-pink-500/40">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black mb-1">{plan.name}</h4>
                  <p className="text-zinc-500 text-sm font-medium">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-zinc-500 font-medium">{plan.period}</span>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-pink-400' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                  className={`w-full py-4 rounded-xl text-sm font-bold text-center transition-all ${plan.highlight
                    ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                >
                  Choisir le pack {plan.name}
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
