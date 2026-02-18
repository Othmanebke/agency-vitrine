import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold mb-2">NovaWeb</div>
          <p className="text-sm text-zinc-400">Création de sites sur-mesure, identité visuelle et stratégies digitales.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Liens</h4>
          <ul className="text-sm text-zinc-400 space-y-1">
            <li><a href="#services" className="text-zinc-400 hover:underline">Services</a></li>
            <li><a href="#packages" className="text-zinc-400 hover:underline">Tarifs</a></li>
            <li><a href="#portfolio" className="text-zinc-400 hover:underline">Portfolio</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-zinc-400">contact@novaweb.example</p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
  <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-zinc-500">© {new Date().getFullYear()} NovaWeb. Tous droits réservés.</div>
      </div>
    </footer>
  )
}
