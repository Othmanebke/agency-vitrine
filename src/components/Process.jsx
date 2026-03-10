import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Analyse stratégique', text: 'Audit & définition des objectifs, cible et messages clés.', icon: '🔍' },
  { num: '02', title: 'Développement sur-mesure', text: 'Conception et intégration (responsive, SEO, CMS / no-code).', icon: '⚙️' },
  { num: '03', title: 'Intégration & déploiement', text: 'Tests, optimisation et mise en production rapide et sécurisée.', icon: '🚀' },
]

const benefits = [
  'Gains de productivité',
  'Meilleure expérience client',
  'Disponibilité & automatisation',
  'ROI mesurable',
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Process() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Comment on travaille</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black glow-title">Notre méthode simple et efficace</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        variants={shouldReduce ? {} : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            variants={shouldReduce ? {} : cardVariant}
            whileHover={shouldReduce ? {} : { y: -8, boxShadow: '0 20px 60px rgba(139,92,246,0.15)' }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            className="relative p-6 md:p-8 rounded-2xl cursor-default hover:border-violet-500/30 transition-all duration-500 group"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            tabIndex={0}
            role="article"
          >
            <span className="absolute top-5 right-5 text-xs font-black text-zinc-700 group-hover:text-violet-500/50 transition-colors">{s.num}</span>
            <div className="text-3xl mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{s.icon}</div>
            <h3 className="font-bold text-lg mb-3">{s.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{s.text}</p>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-hover:via-violet-500/60 transition-all duration-500 rounded-b-2xl" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={shouldReduce ? {} : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={shouldReduce ? {} : cardVariant}
          whileHover={shouldReduce ? {} : { y: -6, boxShadow: '0 20px 60px rgba(139,92,246,0.12)' }}
          className="p-6 md:p-8 bg-gradient-to-br from-violet-600/10 to-pink-600/5 border border-violet-500/20 rounded-2xl cursor-default hover:border-violet-500/40 transition-all duration-500"
        >
          <div className="text-2xl mb-4 transition-transform duration-500 hover:scale-110">📊</div>
          <h4 className="font-bold mb-2">Résultats concrets</h4>
          <p className="text-sm text-zinc-400">Réduction des tâches manuelles et amélioration mesurable du ROI dès les premières semaines.</p>
        </motion.div>

        <motion.div
          variants={shouldReduce ? {} : cardVariant}
          whileHover={shouldReduce ? {} : { y: -6, boxShadow: '0 20px 60px rgba(139,92,246,0.12)' }}
          className="p-6 md:p-8 rounded-2xl cursor-default hover:border-violet-500/30 transition-all duration-500"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="text-2xl mb-4 transition-transform duration-500 hover:scale-110">✨</div>
          <h4 className="font-bold mb-3">Bénéfices clés</h4>
          <ul className="space-y-2">
            {benefits.map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-zinc-400">
                <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
