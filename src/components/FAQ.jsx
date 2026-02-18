import React, { useState } from 'react'

const faqs = [
  { q: 'Comment commencer un projet avec votre agence ?', a: 'Tu peux nous contacter via le formulaire ou booker un appel. On fera un brief rapide, puis on envoie un devis.' },
  { q: 'Combien de temps pour un site vitrine ?', a: 'Généralement 1 à 3 semaines selon le contenu et les validations.' },
  { q: 'Offrez-vous la gestion des réseaux sociaux ?', a: 'Oui — nous proposons des packs de community management et des campagnes d’influence sur demande.' },
  { q: 'Proposez-vous des options de support/maintenance ?', a: 'Oui, maintenance mensuelle, mises à jour et monitoring sont disponibles en option.' }
]

export default function FAQ(){
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((f,i)=> (
          <div key={i} className="bg-zinc-900 rounded-lg overflow-hidden">
            <button
              onClick={()=> setOpen(open===i? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between"
            >
              <span className="font-medium">{f.q}</span>
              <span className="text-zinc-400">{open===i ? '−' : '+'}</span>
            </button>

            {open===i && (
              <div className="px-5 pb-4 text-zinc-400 text-sm">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
