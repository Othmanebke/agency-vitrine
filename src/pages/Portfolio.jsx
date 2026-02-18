import React, { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const samples = [
  { title: 'Site vitrine - La Boulangerie', desc: 'Design & intégration, CMS', img: '/src/assets/portfolio/p1.svg' },
  { title: 'Refonte - ShopEase', desc: 'Optimisation conversion & SEO', img: '/src/assets/portfolio/p2.svg' },
  { title: 'Flyer - Summer Promo', desc: 'Campagne print', img: '/src/assets/portfolio/p3.svg' },
  { title: 'Mobile App Landing', desc: 'Landing & conversion', img: '/src/assets/portfolio/p4.svg' },
  { title: 'Branding - Café Local', desc: 'Logo & supports', img: '/src/assets/portfolio/p5.svg' },
  { title: 'Landing - Service Local', desc: 'Acquisition & SEO', img: '/src/assets/portfolio/p6.svg' }
]

function Lightbox({ src, onClose }){
  if(!src) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" role="dialog" aria-modal="true">
      <button aria-label="Fermer" onClick={onClose} className="absolute top-6 right-6 text-white text-2xl">✕</button>
      <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded">
        <img src={src} alt="Aperçu du projet" className="w-full h-auto object-contain block" />
      </div>
    </div>
  )
}

export default function Portfolio(){
  const [lightbox, setLightbox] = useState(null)
  React.useEffect(()=>{
    document.title = 'Portfolio — NovaWeb'
    const meta = document.querySelector('meta[name="description"]')
    if(meta) meta.setAttribute('content', 'Exemples de réalisations NovaWeb — sites vitrines, refontes, supports print et landing pages.')
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = 'Exemples de réalisations NovaWeb — sites vitrines, refontes, supports print et landing pages.'
      document.head.appendChild(m)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main role="main">
        <header className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Portfolio — Réalisations NovaWeb</h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Voici quelques projets récents — images et détails affichés en placeholder. Place tes visuels dans <code>src/assets/portfolio/</code> et je les afficherai ici.</p>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samples.map(s => (
              <article key={s.title} className="p-4 bg-zinc-900 rounded-lg">
                <button onClick={() => setLightbox(s.img)} className="w-full text-left">
                  <div className="h-40 bg-zinc-800 rounded mb-4 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-zinc-400">{s.desc}</p>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
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
import React, { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const samples = [
  { title: 'Site vitrine - La Boulangerie', desc: 'Design & intégration, CMS', img: '/src/assets/portfolio/p1.svg' },
  { title: 'Refonte - ShopEase', desc: 'Optimisation conversion & SEO', img: '/src/assets/portfolio/p2.svg' },
  { title: 'Flyer - Summer Promo', desc: 'Campagne print', img: '/src/assets/portfolio/p3.svg' },
  { title: 'Mobile App Landing', desc: 'Landing & conversion', img: '/src/assets/portfolio/p4.svg' },
  { title: 'Branding - Café Local', desc: 'Logo & supports', img: '/src/assets/portfolio/p5.svg' },
  { title: 'Landing - Service Local', desc: 'Acquisition & SEO', img: '/src/assets/portfolio/p6.svg' }
]

function Lightbox({ src, onClose }){
  if(!src) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" role="dialog" aria-modal="true">
      <button aria-label="Fermer" onClick={onClose} className="absolute top-6 right-6 text-white text-2xl">✕</button>
      <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded">
        <img src={src} alt="Aperçu du projet" className="w-full h-auto object-contain block" />
      </div>
    </div>
  )
}

export default function Portfolio(){
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main role="main">
        <header className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Portfolio — Réalisations NovaWeb</h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Voici quelques projets récents — images et détails affichés en placeholder. Place tes visuels dans <code>src/assets/portfolio/</code> et je les afficherai ici.</p>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samples.map(s => (
              <article key={s.title} className="p-4 bg-zinc-900 rounded-lg">
                <button onClick={() => setLightbox(s.img)} className="w-full text-left">
                  <div className="h-40 bg-zinc-800 rounded mb-4 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-zinc-400">{s.desc}</p>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
