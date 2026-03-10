import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

function Stars({ delay = 0 }) {
  const shouldReduce = useReducedMotion()
  return (
    <div className="flex gap-0.5 mb-4" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.5 }}
          whileInView={shouldReduce ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + i * 0.06, ease: 'backOut' }}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  )
}

function TiltCard({ children, className }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      whileHover={shouldReduce ? {} : { y: -8, boxShadow: '0 24px 80px rgba(139,92,246,0.15)' }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden cursor-default ${className}`}
    >
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  )
}

export default function Testimonials() {
  const shouldReduce = useReducedMotion()

  const items = [
    {
      name: 'Brows Creative',
      role: 'E-commerce — Pose de cils',
      quote: "J'avais une vision précise pour mon site et Othmane l'a parfaitement retranscrite. Le design est élégant, moderne, exactement ce que je voulais. Le résultat était au rendez-vous dès la livraison.",
      initial: 'B',
      gradient: 'from-pink-500 to-rose-400',
    },
    {
      name: 'Tennis Club de Bry-sur-Marne',
      role: 'Club sportif — Île-de-France',
      quote: "Un travail professionnel et créatif, à l'écoute de nos besoins dès le départ. Le nouveau site reflète vraiment l'image de notre club. On recommande sans hésiter.",
      initial: 'T',
      gradient: 'from-emerald-500 to-teal-400',
    },
    {
      name: 'AJC Ingénieur',
      role: 'Cabinet de formation — Refonte web',
      quote: 'Othmane a réalisé la refonte de notre site sur-mesure en répondant parfaitement à nos attentes. Sérieux, impliqué et force de proposition — une très bonne première collaboration.',
      initial: 'A',
      gradient: 'from-violet-600 to-indigo-400',
    },
  ]

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 16, filter: 'blur(8px)' }}
        whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ils nous font confiance</p>
        <h2 className="text-3xl md:text-4xl font-black">Ce que disent nos clients</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list" aria-label="Témoignages clients">
        {items.map((it, idx) => (
          <motion.div
            key={it.name}
            initial={shouldReduce ? {} : { opacity: 0, y: 32, filter: 'blur(6px)' }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
            role="listitem"
          >
            <TiltCard className="p-6 md:p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl h-full hover:border-violet-500/30 transition-colors">
              <Stars delay={idx * 0.14} />
              <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-6">"{it.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${it.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  aria-hidden
                >
                  {it.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm">{it.name}</div>
                  <div className="text-xs text-zinc-500">{it.role}</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
