import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-zinc-900 to-[#0b0226]" />

      {/* animated blob */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.6 }}
        animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#5b21b6] via-[#7c3aed] to-[#111827] blur-3xl opacity-40 mix-blend-screen"
      />

      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-zinc-400">Agence digitale</p>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">Création de sites & identité visuelle</h1>
          <p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">Nous créons des sites vitrines modernes, flyers et campagnes d'influence pour mettre en lumière ta marque.</p>

          <div className="mt-8 flex justify-center gap-4">
            <a className="bg-gradient-to-r from-violet-600 to-pink-500 text-black px-6 py-3 rounded-full font-semibold" href="#contact">Demander un devis</a>
            <a className="px-6 py-3 rounded-full border border-zinc-700" href="#services">Nos services</a>
          </div>
        </div>
      </div>
    </section>
  )
}
