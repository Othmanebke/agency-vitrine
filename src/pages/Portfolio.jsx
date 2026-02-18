import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const samples = [
  { title: 'Site vitrine - La Boulangerie', desc: 'Design & intégration, CMS', img: '' },
  { title: 'Refonte - ShopEase', desc: 'Optimisation conversion & SEO', img: '' },
  { title: 'Flyer - Summer Promo', desc: 'Campagne print', img: '' }
]

export default function Portfolio(){
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main role="main">
        <header className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Portfolio — Réalisations NovaWeb</h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Voici quelques projets récents — images et détails à venir. Si tu veux que j'ajoute tes visuels, place-les dans `src/assets/portfolio/` et je les affiche ici.</p>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samples.map(s => (
              <article key={s.title} className="p-4 bg-zinc-900 rounded-lg">
                <div className="h-40 bg-zinc-800 rounded mb-4 flex items-center justify-center text-zinc-500">Image</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
