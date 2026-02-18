import React from "react";
import Team from "../components/Team";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

export default function About() {
  React.useEffect(()=>{
    document.title = 'À propos — NovaWeb'
    const meta = document.querySelector('meta[name="description"]')
    if(meta) meta.setAttribute('content', 'NovaWeb — création de sites sur-mesure, refonte, SEO et supports print pour PME.')
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = 'NovaWeb — création de sites sur-mesure, refonte, SEO et supports print pour PME.'
      document.head.appendChild(m)
    }
  }, [])

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="prose prose-lg mx-auto text-center mb-12"
        aria-labelledby="about-hero"
      >
        <h1 id="about-hero" className="text-4xl font-extrabold">
          À propos de NovaWeb
        </h1>
        <p className="mt-2 text-gray-700">
          NovaWeb aide les petites entreprises à exister en ligne avec des sites
          rapides, accessibles et pensés pour convertir. Nous allions design,
          stratégie et développement pour livrer des sites solides, faciles à
          maintenir et alignés sur vos objectifs.
        </p>
      </motion.header>

      <section className="grid gap-10 md:grid-cols-2 items-start mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Notre mission</h2>
          <p className="text-gray-700 mb-4">
            Permettre aux entrepreneurs de se concentrer sur leur métier pendant
            que nous construisons une présence digitale efficace et durable.
            Simplicité, performance et ROI au cœur de nos choix techniques et
            marketing.
          </p>

          <h3 className="text-lg font-medium mt-4 mb-2">Nos services clés</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Site vitrine & e-commerce sur‑mesure</li>
            <li>Refonte UX & optimisation SEO</li>
            <li>Création d'identité visuelle et supports imprimés</li>
            <li>Formation & transfert CMS (no‑code si souhaité)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Nos valeurs</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Pragmatisme :</strong> des solutions axées résultats.</p>
            <p><strong>Transparence :</strong> budget et planning clairs.</p>
            <p><strong>Qualité :</strong> performance, accessibilité et design.</p>
          </div>

          <div className="mt-6">
            <a
              href="/pricing"
              className="inline-block bg-primary-600 text-white px-5 py-3 rounded-md shadow hover:opacity-95"
              onClick={(e) => { e.preventDefault(); window.history.pushState({},'', '/pricing'); window.dispatchEvent(new PopStateEvent('popstate')); }}
            >
              Voir nos tarifs
            </a>
            <a
              href="#contact"
              className="ml-4 inline-block border border-gray-200 px-5 py-3 rounded-md hover:bg-gray-50"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">L'équipe</h2>
        <Team />
      </section>

      <section id="contact" className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Demander un devis</h2>
        <p className="text-gray-700 mb-4">
          Remplis le formulaire ci‑dessous et on te répond sous 24–48h.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
