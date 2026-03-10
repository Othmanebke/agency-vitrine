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
      whileHover={shouldReduce ? {} : { scale: 1.02, zIndex: 10 }}
      transition={{ duration: 0.2 }}
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
  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ce que ça coûte</p>
        <h2 className="text-3xl md:text-4xl font-black mb-10">Tarifs & offres</h2>

        {/* Site packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* ⭐ Featured card: Site sur-mesure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TiltCard
              highlight
              className="relative p-7 bg-gradient-to-b from-violet-600/25 via-violet-900/10 to-pink-600/10 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 h-full"
            >
              {/* Badge */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold shadow-lg shadow-violet-500/40 whitespace-nowrap">
                ⭐ Notre offre phare
              </span>

              <h3 className="font-black text-xl mb-2 text-white">Site sur-mesure</h3>
              <p className="text-4xl font-black mb-1 bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                500 <span className="text-xl text-zinc-400 font-normal">—</span> 5 000€
              </p>
              <p className="text-sm text-zinc-400 mb-1">selon périmètre</p>
              <p className="text-sm text-zinc-400 mb-5">Développé en code ou sous WordPress — selon tes besoins.</p>

              <ul className="space-y-2.5 mb-7">
                {['Responsive (mobile & desktop)', 'Optimisation SEO incluse', 'Maintenance 1 an offerte', 'Révisions incluses'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 hover:scale-105 hover:shadow-violet-500/50 transition-all duration-200"
              >
                Démarrer mon projet
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </TiltCard>
          </motion.div>

          {/* Regular card: Flyers & Refonte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TiltCard className="p-7 bg-white/[0.03] border border-white/[0.07] rounded-2xl h-full flex flex-col">
              <h3 className="font-bold text-lg mb-2">Flyers & Refonte</h3>
              <p className="text-zinc-400 leading-relaxed flex-1">Supports print et refonte de site : tarifs sur devis — audit préalable pour estimer le temps et le budget.</p>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-violet-500/40 hover:text-white transition-colors"
              >
                Obtenir un devis
              </a>
            </TiltCard>
          </motion.div>
        </div>

        {/* Social packs */}
        <p className="text-sm font-semibold text-zinc-300 mb-5">Packs Présence Réseaux (indicatifs)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TiltCard
                highlight={plan.highlight}
                className={`relative p-6 rounded-2xl border h-full ${plan.highlight
                  ? 'bg-gradient-to-b from-violet-600/20 to-pink-600/10 border-violet-500/50 shadow-xl shadow-violet-500/10'
                  : 'bg-white/[0.03] border-white/[0.07]'
                  }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold shadow">
                    {plan.badge}
                  </span>
                )}
                <div className="text-lg font-bold mb-1">{plan.name}</div>
                <div className="text-zinc-500 text-sm mb-4">{plan.desc}</div>
                <div className="text-3xl font-black mb-5">
                  {plan.price}<span className="text-sm text-zinc-500 font-normal">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <svg className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.highlight
                    ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-violet-500/30 hover:scale-105'
                    : 'bg-white/5 border border-white/10 text-zinc-300 hover:border-violet-500/40'
                    }`}
                >
                  Choisir {plan.name}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <p className="text-xs text-zinc-600">Les tarifs sont indicatifs et peuvent varier selon la taille du projet. Contacte-nous pour un devis précis.</p>

      <div className="mt-10 text-center">
        <a
          href="/contact"
          onClick={e => { e.preventDefault(); history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 hover:scale-105 hover:shadow-violet-500/50 transition-all"
        >
          Demander un devis gratuit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
    </section>
  )
}
