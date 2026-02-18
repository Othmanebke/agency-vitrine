import React from 'react'
import Packages from '../components/Packages'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

export default function Pricing(){
  useSEO({
    title: 'Tarifs & Offres — NovaWeb | Site Vitrine, E-commerce, Réseaux Sociaux',
    description: 'Découvrez les tarifs NovaWeb : site vitrine dès 500 €, e-commerce, refonte, SEO et packs réseaux sociaux. Devis précis après un bref échange.',
    path: '/pricing',
  })
  return (
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main" className="pt-24">
        <header className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Transparent & sans surprise</p>
          <h1 className="text-4xl md:text-5xl font-black">Tarifs & offres</h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Des fourchettes claires — on te fournit un devis précis après un bref échange.</p>
        </header>

        <script dangerouslySetInnerHTML={{__html: "" }} />

        <Packages />

        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold mb-4">Comment ça marche</h2>
          <ol className="list-decimal list-inside text-zinc-400 space-y-2">
            <li>Brief & cahier des charges</li>
            <li>Devis détaillé (délai & coûts)</li>
            <li>Livraison & formation CMS si nécessaire</li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  )
}
