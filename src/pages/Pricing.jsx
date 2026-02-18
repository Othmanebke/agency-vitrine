import React from 'react'
import Packages from '../components/Packages'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Pricing(){
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main role="main">
        <header className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Tarifs & offres — NovaWeb</h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Découvrez nos offres pour les sites sur-mesure, refontes et packs réseaux sociaux. Tous les tarifs sont indicatifs et un devis personnalisé est envoyé après brief.</p>
        </header>

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
