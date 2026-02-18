import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Process from '../components/Process'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main>
        <Hero />

        <section id="services" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 bg-zinc-900 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Création de sites web</h3>
              <p className="text-zinc-400 text-sm">Sites vitrines modernes, responsive et optimisés pour la conversion.</p>
            </article>

            <article className="p-6 bg-zinc-900 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Flyers & print</h3>
              <p className="text-zinc-400 text-sm">Design print : flyers, cartes, brochures et supports commerciaux.</p>
            </article>

            <article className="p-6 bg-zinc-900 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Identité visuelle & influence</h3>
              <p className="text-zinc-400 text-sm">Logo, guidelines et campagnes d'influence pour développer ta marque.</p>
            </article>
          </div>
        </section>

  <Process />

        <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}
