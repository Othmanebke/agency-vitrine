import React, { useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Packages from '../components/Packages'
import Footer from '../components/Footer'

export default function Home() {
  const shouldReduce = useReducedMotion()
  useSEO({
    title: 'Wexor — Agence Digitale | Création de Sites Web Sur-Mesure',
    description: 'Wexor crée des sites web sur-mesure, rapides et accessibles pour PME et indépendants. Refonte, SEO, identité visuelle — devis gratuit en 48 h.',
    path: '/',
  })

  function ServiceCard({ title, desc, index, icon }) {
    const ref = useRef(null)
    const rotX = useMotionValue(0)
    const rotY = useMotionValue(0)
    const springRX = useSpring(rotX, { stiffness: 300, damping: 25 })
    const springRY = useSpring(rotY, { stiffness: 300, damping: 25 })
    const handleMove = (e) => {
      if (!ref.current || shouldReduce) return
      const r = ref.current.getBoundingClientRect()
      rotY.set(((e.clientX - r.left) / r.width - 0.5) * 14)
      rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
    }
    const handleLeave = () => { rotX.set(0); rotY.set(0) }
    return (
      <motion.article
        ref={ref}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: (index + 1) * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
        whileHover={shouldReduce ? {} : { y: -6, boxShadow: '0 24px 60px rgba(139,92,246,0.18)' }}
        whileTap={shouldReduce ? {} : { scale: 0.98 }}
        style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="p-6 md:p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl shadow-xl backdrop-blur-sm hover:border-violet-500/30 transition-colors cursor-default"
        tabIndex={0}
        role="listitem"
        aria-label={title}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="font-bold mb-3 text-lg">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
      </motion.article>
    )
  }
  return (
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main">
        <Hero />

        <section id="services" className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ce qu'on fait</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Nos services</h2>
            <p className="text-zinc-400 max-w-xl mb-12">Tout ce dont tu as besoin pour exister et performer en ligne.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            role="list"
            aria-label="Nos services"
          >
            {[
              { title: 'Site web sur-mesure', desc: 'Responsive, optimisé SEO — CMS ou no-code selon tes besoins.', icon: '🌐' },
              { title: 'Refonte & optimisation', desc: 'Audit, optimisation UX/SEO et refonte pour améliorer les conversions.', icon: '⚡' },
              { title: 'Flyers & supports print', desc: 'Création de flyers, cartes, brochures et visuels print professionnels.', icon: '🎨' }
            ].map((s, i) => (
              <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} icon={s.icon} />
            ))}
          </motion.div>
        </section>

        <Process />

        <Testimonials />

        <FAQ />

        <Packages />

      </main>

      <Footer />
    </div>
  )
}
