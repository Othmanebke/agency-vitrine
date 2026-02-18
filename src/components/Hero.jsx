import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-zinc-900 to-[#0b0226]" />

      import React from 'react'
      import { motion } from 'framer-motion'

      const titleVariant = {
        hidden: { opacity: 0, y: 12 },
        visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } })
      }

      export default function Hero(){
        return (
          <section className="relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-zinc-900 to-[#0b0226]" />

            {/* animated blob */}
            <motion.div
              aria-hidden
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#5b21b6] via-[#7c3aed] to-[#0b0226] blur-3xl opacity-40 mix-blend-screen"
            />

            <div className="max-w-6xl mx-auto px-6 py-28">
              <div className="text-center">
                <motion.p variants={titleVariant} initial="hidden" animate="visible" custom={0} className="text-sm uppercase tracking-widest text-zinc-400">Agence digitale</motion.p>

                <motion.h1 variants={titleVariant} initial="hidden" animate="visible" custom={1} className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">Création de sites & identité visuelle</motion.h1>

                <motion.p variants={titleVariant} initial="hidden" animate="visible" custom={2} className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">Nous créons des sites vitrines modernes, flyers et campagnes d'influence pour mettre en lumière ta marque.</motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex justify-center gap-4">
                  <a className="bg-gradient-to-r from-violet-600 to-pink-500 text-black px-6 py-3 rounded-full font-semibold" href="#contact">Demander un devis</a>
                  <a className="px-6 py-3 rounded-full border border-zinc-700" href="#services">Nos services</a>
                </motion.div>

                {/* logos / trust row */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-14 flex items-center justify-center gap-8 opacity-80">
                  <div className="text-xs text-zinc-500">Clients :</div>
                  <div className="flex items-center gap-6">
                    <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo1</div>
                    <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo2</div>
                    <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo3</div>
                  </div>
                </motion.div>

              </div>

              {/* mockup cards */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900 rounded-lg shadow-lg">
                  <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded mb-4" />
                  <h4 className="font-semibold">Automate repetitive tasks</h4>
                  <p className="text-sm text-zinc-400">Interfaces simples et tableaux de bord clairs.</p>
                </div>

                <div className="p-6 bg-zinc-900 rounded-lg shadow-lg">
                  <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded mb-4" />
                  <h4 className="font-semibold">Delegate Daily Tasks</h4>
                  <p className="text-sm text-zinc-400">Externalise les tâches répétitives pour gagner du temps.</p>
                </div>

                <div className="p-6 bg-zinc-900 rounded-lg shadow-lg">
                  <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded mb-4" />
                  <h4 className="font-semibold">Accelerate Sales Growth</h4>
                  <p className="text-sm text-zinc-400">Optimisations UX et funnels adaptés aux conversions.</p>
                </div>
              </motion.div>

            </div>
          </section>
        )
      }
