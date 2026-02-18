import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Process(){
  const shouldReduce = useReducedMotion()

  const cards = [
    {title: 'Analyse stratégique', text: "Audit & définition des objectifs, cible et messages clés."},
    {title: 'Développement sur-mesure', text: "Conception et intégration (responsive, SEO, CMS / no-code)."},
    {title: 'Intégration & déploiement', text: "Tests, optimisation et mise en production rapide et sécurisée."}
  ]

  return (
    <section id="process" className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">Notre méthode simple et efficace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            className="p-5 md:p-6 bg-zinc-900 rounded-lg"
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={shouldReduce ? {} : { y: -6 }}
            whileTap={shouldReduce ? {} : { scale: 0.995 }}
            tabIndex={0}
            role="article"
            aria-label={c.title}
          >
            <h3 className="font-semibold mb-2 text-lg md:text-base">{c.title}</h3>
            <p className="text-sm md:text-sm text-zinc-400">{c.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-lg"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={shouldReduce ? {} : { y: -6 }}
          tabIndex={0}
          role="article"
          aria-label="Étude de cas"
        >
          <h4 className="font-semibold mb-2">Étude de cas : automation & ROI</h4>
          <p className="text-sm text-zinc-400">Retours concrets : réduction des tâches manuelles et amélioration du ROI.</p>
        </motion.div>

        <motion.div className="bg-zinc-900 p-6 rounded-lg"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          whileHover={shouldReduce ? {} : { y: -6 }}
          tabIndex={0}
          role="article"
          aria-label="Bénéfices clés"
        >
          <h4 className="font-semibold mb-2">Bénéfices clés pour votre activité</h4>
          <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
            <li>Gains de productivité</li>
            <li>Meilleure expérience client</li>
            <li>Disponibilité & automatisation</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
