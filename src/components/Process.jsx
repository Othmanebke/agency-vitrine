import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Process(){
  const shouldReduce = useReducedMotion()

  const cards = [
    {title: 'Smart Analyzing', text: "Analyse des besoins et définition d'une stratégie claire et mesurable."},
    {title: 'AI Development', text: "Développement d'automatisations et d'interfaces simples pour l'utilisateur."},
    {title: 'Seamless Integration', text: "Intégration fluide avec les outils existants et mise en production rapide."}
  ]

  return (
    <section id="process" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Our Simple, Smart, and Scalable Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            className="p-6 bg-zinc-900 rounded-lg"
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
            <h3 className="font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-zinc-400">{c.text}</p>
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
          aria-label="Case study"
        >
          <h4 className="font-semibold mb-2">See How Smart AI Automation Transforms Businesses</h4>
          <p className="text-sm text-zinc-400">Étude de cas et retours concrets sur la réduction du temps de traitement et l'amélioration du ROI.</p>
        </motion.div>

        <motion.div className="bg-zinc-900 p-6 rounded-lg"
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          whileHover={shouldReduce ? {} : { y: -6 }}
          tabIndex={0}
          role="article"
          aria-label="Key benefits"
        >
          <h4 className="font-semibold mb-2">The Key Benefits of AI for Your Business Growth</h4>
          <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
            <li>Increased Productivity</li>
            <li>Better Customer Experience</li>
            <li>24/7 Availability</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
