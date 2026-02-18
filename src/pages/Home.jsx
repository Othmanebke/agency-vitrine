import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Home(){
  const shouldReduce = useReducedMotion()

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
              { title: 'Création de sites web', desc: 'Sites vitrines modernes, responsive et optimisés pour la conversion.' },
              { title: 'Flyers & print', desc: 'Design print : flyers, cartes, brochures et supports commerciaux.' },
              { title: 'Identité visuelle & influence', desc: 'Logo, guidelines et campagnes d\'influence pour développer ta marque.' }
            ].map((s, i) => (
              <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} />
            ))}
          </motion.div>
        </section>

  <Process />

  <Testimonials />

  <FAQ />

        <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}
