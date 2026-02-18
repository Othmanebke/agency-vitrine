import React from 'react'

export default function Packages(){
  return (
    <section id="packages" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Tarifs & offres</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-zinc-900 rounded-lg">
          <h3 className="font-semibold mb-2">Offre de lancement — Site sur-mesure</h3>
          <p className="text-zinc-400 mb-3">Offre de lancement pour site vitrine sur-mesure : <strong>500€ — 2 500€</strong> selon périmètre (nombre de pages, intégrations CMS, fonctionnalités sur-mesure).</p>
          <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
            <li>Responsive (mobile & desktop)</li>
            <li>Optimisation SEO de base</li>
            <li>Choix CMS / no-code (si demandé)</li>
            <li>Révisions incluses selon offre</li>
          </ul>
        </div>

        <div className="p-6 bg-zinc-900 rounded-lg">
          <h3 className="font-semibold mb-2">Flyers & Refonte</h3>
          <p className="text-zinc-400">Flyers, supports print et refonte de site : tarifs sur devis — nous proposons un audit préalable pour estimer le temps et le budget.</p>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Packs Présence Réseaux (tarifs indicatifs)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="p-5 bg-zinc-900 rounded-lg">
          <div className="text-xl font-semibold mb-2">Starter</div>
          <div className="text-zinc-400 mb-3">Idéal pour démarrer</div>
          <div className="font-bold mb-3">300€/mois</div>
          <ul className="text-sm text-zinc-400 list-disc ml-5">
            <li>8 posts / mois</li>
            <li>Design visuel & publications</li>
            <li>Rapport basique mensuel</li>
          </ul>
        </article>

        <article className="p-5 bg-zinc-900 rounded-lg">
          <div className="text-xl font-semibold mb-2">Growth</div>
          <div className="text-zinc-400 mb-3">Pour gagner en visibilité</div>
          <div className="font-bold mb-3">700€/mois</div>
          <ul className="text-sm text-zinc-400 list-disc ml-5">
            <li>12–16 posts / mois</li>
            <li>Création de contenu & stories</li>
            <li>Stratégie & reporting mensuel</li>
          </ul>
        </article>

        <article className="p-5 bg-zinc-900 rounded-lg">
          <div className="text-xl font-semibold mb-2">Pro</div>
          <div className="text-zinc-400 mb-3">Campagnes & influence</div>
          <div className="font-bold mb-3">1 500€/mois</div>
          <ul className="text-sm text-zinc-400 list-disc ml-5">
            <li>Contenu quotidien & community mgmt</li>
            <li>Campagnes paid & micro-influence</li>
            <li>KPI et optimisation continue</li>
          </ul>
        </article>
      </div>

      <p className="text-xs text-zinc-500 mt-6">Les tarifs sont indicatifs et peuvent varier selon la taille du projet. Contacte-nous pour un devis précis.</p>
    </section>
  )
}
