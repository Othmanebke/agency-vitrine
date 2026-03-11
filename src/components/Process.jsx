import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Analyse & Stratégie',
    text: 'On identifie tes objectifs, ta cible et les leviers de croissance avant d\'écrire une seule ligne de code.',
    accent: '#8b5cf6',
    tag: 'Découverte',
  },
  {
    num: '02',
    title: 'Design & Développement',
    text: 'Maquettes validées avec toi, puis développement sur-mesure — responsive, SEO-ready, ultra-rapide.',
    accent: '#ec4899',
    tag: 'Création',
  },
  {
    num: '03',
    title: 'Lancement & Suivi',
    text: 'Déploiement soigné, tests complets, et accompagnement post-lancement pour que ça performe dès le jour 1.',
    accent: '#10b981',
    tag: 'Livraison',
  },
]

const outcomes = [
  { value: '< 10j', label: 'délai de livraison' },
  { value: '100%', label: 'satisfaction client' },
  { value: '3×', label: 'plus de conversions' },
  { value: '0€', label: 'de frais cachés' },
]

export default function Process({ title = 'Notre méthode', titleAccent = 'simple et efficace' }) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-24">

      {/* Header */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold font-mono">Comment on travaille</p>
        <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
          {title}{' '}
          <span style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{titleAccent}</span>
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduce ? {} : { y: -6 }}
            className="group relative rounded-2xl p-7 overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Glow bg on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{ background: `radial-gradient(ellipse at 20% 20%, ${s.accent}18 0%, transparent 70%)` }}
            />

            {/* Big watermark number */}
            <span
              className="absolute -right-3 -top-5 text-[7rem] font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:opacity-[0.07]"
              style={{ color: s.accent, opacity: 0.04 }}
            >
              {s.num}
            </span>

            <div className="relative">
              {/* Tag + line */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{ color: s.accent, background: s.accent + '18', border: `1px solid ${s.accent}30` }}
                >
                  {s.tag}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${s.accent}40, transparent)` }} />
              </div>

              {/* Number */}
              <p
                className="text-5xl font-black leading-none mb-4 transition-all duration-500"
                style={{ color: s.accent, textShadow: `0 0 30px ${s.accent}50` }}
              >
                {s.num}
              </p>

              <h3 className="font-bold text-lg text-white mb-3 tracking-tight">{s.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.text}</p>
            </div>

            {/* Bottom accent border reveal */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"
              style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Outcomes strip */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.55 }}
        className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {outcomes.map((o, i) => (
          <div key={o.label} className="px-6 py-5 flex flex-col gap-1 text-center">
            <span className="text-2xl md:text-3xl font-black text-white">{o.value}</span>
            <span className="text-xs text-zinc-500 font-mono">{o.label}</span>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
