import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

// Placeholder Lottie JSON URL (public). You can replace this with your own file or import a local JSON.
const LOTTIE_URL = 'https://assets10.lottiefiles.com/packages/lf20_touohxv0.json'

const titleVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } })
}

const mockups = [
  { title: 'Automate repetitive tasks', text: 'Interfaces simples et tableaux de bord clairs.' },
  { title: 'Delegate Daily Tasks', text: "Externalise les tâches répétitives pour gagner du temps." },
  { title: 'Accelerate Sales Growth', text: 'Optimisations UX et funnels adaptés aux conversions.' }
]

export default function Hero(){
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-zinc-900 to-[#0b0226]" />

      {/* animated blob */}
      <motion.div
        aria-hidden
        initial={shouldReduce ? false : { scale: 0.95, opacity: 0.6 }}
        animate={shouldReduce ? {} : { scale: [0.95, 1.05, 0.95], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#5b21b6] via-[#7c3aed] to-[#0b0226] blur-3xl opacity-40 mix-blend-screen"
      />

      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center">
          <motion.p variants={titleVariant} initial="hidden" animate="visible" custom={0} className="text-sm uppercase tracking-widest text-zinc-400">Agence digitale</motion.p>

          <motion.h1 variants={titleVariant} initial="hidden" animate="visible" custom={1} className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">Création de sites & identité visuelle</motion.h1>

          <motion.p variants={titleVariant} initial="hidden" animate="visible" custom={2} className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">Nous créons des sites vitrines modernes, flyers et campagnes d'influence pour mettre en lumière ta marque.</motion.p>

          <motion.div initial={shouldReduce ? {} : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex justify-center gap-4">
            <motion.a
              href="#contact"
              role="button"
              aria-label="Demander un devis"
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="bg-gradient-to-r from-violet-600 to-pink-500 text-black px-6 py-3 rounded-full font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              Demander un devis
            </motion.a>

            <motion.a
              href="#services"
              role="button"
              aria-label="Voir nos services"
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              className="px-6 py-3 rounded-full border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            >
              Nos services
            </motion.a>
          </motion.div>

          {/* Lottie animation (decorative) - loads a placeholder JSON from LottieFiles
              Disabled when user requests reduced motion. Replace `LOTTIE_URL` with your own JSON or
              import local JSON and pass to the `animationData` prop. */}
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-xl hidden md:block" aria-hidden>
              {/* Lazy-load animationData from a public Lottie JSON URL */}
              {shouldReduce ? (
                <div className="h-48" />
              ) : (
                <LottieWrapper url={LOTTIE_URL} />
              )}
            </div>
          </div>

          {/* logos / trust row */}
          <motion.div initial={shouldReduce ? {} : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-14 flex items-center justify-center gap-8 opacity-80">
            <div className="text-xs text-zinc-500">Clients :</div>
            <div className="flex items-center gap-6">
              <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo1</div>
              <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo2</div>
              <div className="h-6 w-24 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">Logo3</div>
            </div>
          </motion.div>

        </div>

        {/* mockup cards */}
        <motion.div initial={shouldReduce ? {} : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockups.map((m, i) => (
            <motion.article
              key={m.title}
              whileHover={shouldReduce ? {} : { y: -6 }}
              whileTap={shouldReduce ? {} : { scale: 0.995 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="p-6 bg-zinc-900 rounded-lg shadow-lg"
            >
              <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded mb-4" aria-hidden />
              <h4 className="font-semibold">{m.title}</h4>
              <p className="text-sm text-zinc-400">{m.text}</p>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function LottieWrapper({ url }){
  const [data, setData] = useState(null)
  useEffect(()=>{
    let mounted = true
    fetch(url).then(r=>r.json()).then(json=>{
      if(mounted) setData(json)
    }).catch(err=>{
      // swallow error; animation is decorative
      console.error('Lottie load error', err)
    })
    return ()=> { mounted = false }
  }, [url])

  if(!data) return <div className="h-48" />

  return <Lottie animationData={data} autoplay loop style={{ height: 240 }} />
}
