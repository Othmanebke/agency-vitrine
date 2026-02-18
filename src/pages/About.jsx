import React from "react";
import Nav from "../components/Nav";
import Team from "../components/Team";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const values = [
  { icon: '🎯', title: 'Pragmatisme', desc: 'Des solutions axées résultats, sans complexité inutile.' },
  { icon: '🔍', title: 'Transparence', desc: 'Budget et planning clairs dès le départ, zéro mauvaise surprise.' },
  { icon: '✨', title: 'Qualité', desc: 'Performance, accessibilité et design au cœur de chaque livrable.' },
  { icon: '🤝', title: 'Partenariat', desc: 'On travaille avec toi, pas juste pour toi — relation durable.' },
]

const services = [
  'Site vitrine & e-commerce sur-mesure',
  'Refonte UX & optimisation SEO',
  "Identité visuelle & supports imprimés",
  'Formation & transfert CMS (no-code si souhaité)',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
})

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
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main" className="pt-24">

        {/* Hero */}
        <header className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Notre histoire</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              On construit des sites<br />
              <span className="text-gradient">qui font la différence</span>
            </h1>
            <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg">
              NovaWeb aide les petites entreprises à exister en ligne avec des sites rapides, accessibles et pensés pour convertir.
            </p>
          </motion.div>
        </header>

        {/* Mission + Services */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Permettre aux entrepreneurs de se concentrer sur leur métier pendant que nous construisons une présence digitale efficace et durable. Simplicité, performance et ROI au cœur de nos choix.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/pricing"
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/pricing'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow shadow-violet-500/30 hover:scale-105 transition-transform text-sm"
              >
                Voir nos tarifs
              </a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:border-white/30 hover:text-white transition-colors text-zinc-400">
                Nous contacter
              </a>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <h2 className="text-2xl font-bold mb-4">Nos services clés</h2>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2 font-semibold">Ce qui nous guide</p>
            <h2 className="text-3xl font-black">Nos valeurs</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.08)} className="p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-violet-500/30 transition-colors">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2 font-semibold">Qui suis-je</p>
            <h2 className="text-3xl font-black">Le fondateur</h2>
          </motion.div>
          <Team />
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-3xl mx-auto px-6 py-16">
          <motion.div {...fadeUp(0)} className="mb-8">
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-2 font-semibold">On t'écoute</p>
            <h2 className="text-3xl font-black mb-2">Demander un devis</h2>
            <p className="text-zinc-400">On te répond sous 24–48 h, sans engagement.</p>
          </motion.div>
          <ContactForm />
        </section>

      </main>
      <Footer />
    </div>
  );
}
