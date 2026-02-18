import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Packages from '../components/Packages'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Home(){
  const shouldReduce = useReducedMotion()
    React.useEffect(()=>{
      document.title = 'NovaWeb — Agence digitale'
      const meta = document.querySelector('meta[name="description"]')
      if(meta) meta.setAttribute('content', 'NovaWeb crée des sites sur-mesure, performants et accessibles pour PME et indépendants. Contactez-nous pour un devis.')
      else {
        const m = document.createElement('meta')
        m.name = 'description'
        m.content = 'NovaWeb crée des sites sur-mesure, performants et accessibles pour PME et indépendants. Contactez-nous pour un devis.'
        document.head.appendChild(m)
      }
    }, [])

  function ServiceCard({ title, desc, index }){
    return (
      <motion.article
        key={title}
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { delay: (index+1) * 0.08, duration: 0.45 } } }}
        whileHover={shouldReduce ? {} : { y: -6 }}
        whileTap={shouldReduce ? {} : { scale: 0.995 }}
        className="p-5 md:p-6 bg-zinc-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
        tabIndex={0}
        role="listitem"
        aria-label={title}
      >
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <p className="text-zinc-400 text-sm">{desc}</p>
      </motion.article>
    )
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main role="main">
        <Hero />

        <section id="services" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Nos services</h2>
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
              { title: 'Site web sur-mesure', desc: 'Sur-mesure, responsive, optimisé SEO; CMS ou no-code selon besoin.' },
              { title: 'Refonte & optimisation', desc: 'Audit, optimisation UX/SEO et refonte pour améliorer les conversions.' },
              { title: 'Flyers & supports print', desc: 'Création de flyers, cartes, brochures et visuels print professionnels.' }
            ].map((s, i) => (
              <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} />
            ))}
          </motion.div>
        </section>

  <Process />

  <Testimonials />

  <FAQ />

  <Packages />

        <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}
