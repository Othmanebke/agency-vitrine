import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const faqs = [
  { q: 'Comment commencer un projet avec votre agence ?', a: 'Tu peux nous contacter via le formulaire ou booker un appel. On fera un brief rapide, puis on envoie un devis.' },
  { q: 'Combien de temps pour un site vitrine ?', a: 'Généralement 1 à 3 semaines selon le contenu et les validations.' },
  { q: 'Offrez-vous la gestion des réseaux sociaux ?', a: 'Oui — nous proposons des packs de community management et des campagnes d’influence sur demande.' },
  { q: 'Proposez-vous des options de support/maintenance ?', a: 'Oui, maintenance mensuelle, mises à jour et monitoring sont disponibles en option.' },
]

export default function FAQ(){
  const [open, setOpen] = useState(null)
  const shouldReduce = useReducedMotion()

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Tu te poses des questions ?</p>
        <h2 className="text-3xl md:text-4xl font-black">FAQ</h2>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`bg-white/[0.03] border rounded-2xl overflow-hidden transition-colors ${
              open === i ? 'border-violet-500/40' : 'border-white/[0.07] hover:border-white/20'
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-sm md:text-base">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-violet-500/40 group-hover:text-violet-400 transition-colors flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
