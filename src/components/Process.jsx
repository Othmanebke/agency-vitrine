import React from 'react'

export default function Process(){
  return (
    <section id="process" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Our Simple, Smart, and Scalable Process</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-zinc-900 rounded-lg">
          <h3 className="font-semibold mb-2">Smart Analyzing</h3>
          <p className="text-sm text-zinc-400">Analyse des besoins et définition d'une stratégie claire et mesurable.</p>
        </div>

        <div className="p-6 bg-zinc-900 rounded-lg">
          <h3 className="font-semibold mb-2">AI Development</h3>
          <p className="text-sm text-zinc-400">Développement d'automatisations et d'interfaces simples pour l'utilisateur.</p>
        </div>

        <div className="p-6 bg-zinc-900 rounded-lg">
          <h3 className="font-semibold mb-2">Seamless Integration</h3>
          <p className="text-sm text-zinc-400">Intégration fluide avec les outils existants et mise en production rapide.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-lg">
          <h4 className="font-semibold mb-2">See How Smart AI Automation Transforms Businesses</h4>
          <p className="text-sm text-zinc-400">Étude de cas et retours concrets sur la réduction du temps de traitement et l'amélioration du ROI.</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg">
          <h4 className="font-semibold mb-2">The Key Benefits of AI for Your Business Growth</h4>
          <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
            <li>Increased Productivity</li>
            <li>Better Customer Experience</li>
            <li>24/7 Availability</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
