import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold mb-2">AGENCE</div>
          <p className="text-sm text-zinc-400">Création de sites, identité visuelle et campagnes d'influence.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Liens</h4>
          <ul className="text-sm text-zinc-400 space-y-1">
            <li>Services</li>
            <li>À propos</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-zinc-400">hello@tonagence.com</p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-zinc-500">© {new Date().getFullYear()} Agence. Tous droits réservés.</div>
      </div>
    </footer>
  )
}
