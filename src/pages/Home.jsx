import React from 'react'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'

export default function Home(){
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-bold">AGENCE</div>
        <nav className="space-x-6 hidden md:block">
          <a href="#services" className="text-sm opacity-80">Services</a>
          <a href="#about" className="text-sm opacity-80">À propos</a>
          <a href="#contact" className="text-sm opacity-80">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />

        <section id="services" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Nos services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900 rounded-lg">Création de sites web</div>
            <div className="p-6 bg-zinc-900 rounded-lg">Flyers & print</div>
            <div className="p-6 bg-zinc-900 rounded-lg">Identité visuelle & influence</div>
          </div>
        </section>

        <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm opacity-70">© {new Date().getFullYear()} Agence. Tous droits réservés.</div>
      </footer>
    </div>
  )
}
