import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const card = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } })
}

export default function Testimonials(){
  const items = [
    { name: 'Amélie Durand', role: 'CMO, StartupX', quote: 'L’équipe a transformé notre présence en ligne — +40% leads en 3 mois.' },
    { name: 'Jérôme Petit', role: 'CEO, ShopEase', quote: 'Design propre, process réactif et résultat au rendez-vous.' },
    { name: 'Leila Haddad', role: 'Head of Marketing, BrightCo', quote: 'Professionnels et créatifs — nous recommandons fortement.' }
  ]

  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Why Businesses Love Our Solutions</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } }
        }}
        role="list"
        aria-label="Témoignages clients"
      >
        {items.map((it, idx) => (
          <motion.blockquote
            key={it.name}
            variants={card}
            custom={idx + 1}
            className="p-6 bg-zinc-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
            whileHover={useReducedMotion() ? {} : { y: -6 }}
            whileTap={useReducedMotion() ? {} : { scale: 0.995 }}
            tabIndex={0}
            role="listitem"
            aria-label={`Témoignage de ${it.name}, ${it.role}`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-sm" aria-hidden>{it.name.split(' ')[0].charAt(0)}</div>
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-xs text-zinc-400">{it.role}</div>
              </div>
            </div>
            <p className="text-zinc-300">“{it.quote}”</p>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  )
}
