import React from 'react'
import { motion } from 'framer-motion'

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

export default function Packages(){
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div className="p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Site sur-mesure</h3>
            <p className="text-3xl font-black mb-1">500 <span className="text-lg text-zinc-400">—</span> 5 000€</p>
            <p className="text-sm text-zinc-500 mb-1">selon périmètre</p>
            <p className="text-sm text-zinc-500 mb-4">Développé en code ou sous WordPress — selon tes besoins.</p>
            <ul className="space-y-2">
              {['Responsive (mobile & desktop)', 'Optimisation SEO incluse', 'Maintenance 1 an offerte', 'Révisions incluses'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                  <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Flyers & Refonte</h3>
            <p className="text-zinc-400 leading-relaxed">Supports print et refonte de site : tarifs sur devis — audit préalable pour estimer le temps et le budget.</p>
            <a href="/contact" onClick={e => { e.preventDefault(); history.pushState({},'','/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-violet-500/40 transition-colors">
              Obtenir un devis
            </a>
          </div>
        </div>

        {/* Social packs */}
        <p className="text-sm font-semibold text-zinc-300 mb-5">Packs Présence Réseaux (indicatifs)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-b from-violet-600/20 to-pink-600/10 border-violet-500/50 shadow-xl shadow-violet-500/10'
                  : 'bg-white/[0.03] border-white/[0.07] hover:border-white/20'
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
                onClick={e => { e.preventDefault(); history.pushState({},'','/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-violet-500/30 hover:scale-105'
                    : 'bg-white/5 border border-white/10 text-zinc-300 hover:border-violet-500/40'
                }`}
              >
                Choisir {plan.name}
              </a>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <p className="text-xs text-zinc-600">Les tarifs sont indicatifs et peuvent varier selon la taille du projet. Contacte-nous pour un devis précis.</p>

      <div className="mt-10 text-center">
        <a
          href="/contact"
          onClick={e => { e.preventDefault(); history.pushState({},'','/contact'); window.dispatchEvent(new PopStateEvent('popstate')) }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 hover:scale-105 hover:shadow-violet-500/50 transition-all"
        >
          Demander un devis gratuit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
    </section>
  )
}
