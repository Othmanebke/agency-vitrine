import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import { motion } from 'framer-motion'

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-violet-400">{title}</h2>
      <div className="text-sm text-zinc-400 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function Legal() {
  useSEO({
    title: 'Mentions légales — NovaWeb',
    description: 'Mentions légales, politique de confidentialité et gestion des cookies du site NovaWeb.',
    path: '/legal',
  })

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main role="main" className="pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-6 py-16"
        >
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Légal</p>
          <h1 className="text-4xl font-black mb-12">Mentions légales</h1>

          {/* ── 1. Éditeur ── */}
          <Section title="1. Éditeur du site">
            <p>Le site <strong className="text-white">novaweb-agence.vercel.app</strong> est édité par :</p>
            <ul className="list-none space-y-1">
              <li><span className="text-zinc-500">Nom :</span> <strong className="text-white">Othmane Bouakline</strong></li>
              <li><span className="text-zinc-500">Activité :</span> Création de sites web &amp; stratégie digitale</li>
              <li><span className="text-zinc-500">Localisation :</span> Seine-et-Marne, France</li>
              <li><span className="text-zinc-500">Email :</span> <a href="mailto:onovaweb.pro@gmail.com" className="text-violet-400 hover:underline">onovaweb.pro@gmail.com</a></li>
            </ul>
          </Section>

          {/* ── 2. Hébergeur ── */}
          <Section title="2. Hébergement">
            <p>Le site est hébergé par :</p>
            <ul className="list-none space-y-1">
              <li><span className="text-zinc-500">Société :</span> <strong className="text-white">Vercel Inc.</strong></li>
              <li><span className="text-zinc-500">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
              <li><span className="text-zinc-500">Site :</span> <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">vercel.com</a></li>
            </ul>
          </Section>

          {/* ── 3. Propriété intellectuelle ── */}
          <Section title="3. Propriété intellectuelle">
            <p>
              L'ensemble des éléments composant ce site (textes, images, graphismes, logo, code source) est la propriété exclusive
              d'Othmane Bouakline / NovaWeb, sauf mentions contraires. Toute reproduction, distribution ou utilisation sans
              autorisation écrite préalable est strictement interdite.
            </p>
          </Section>

          {/* ── 4. Données personnelles ── */}
          <Section title="4. Données personnelles (RGPD)">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés,
              vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
            </p>
            <p>
              Les seules données collectées via ce site sont celles transmises volontairement via le formulaire de contact
              (nom, email, message). Elles sont utilisées uniquement pour répondre à votre demande et ne sont jamais revendues ni
              partagées à des tiers à des fins commerciales.
            </p>
            <p>
              Pour exercer vos droits, contactez-nous à :{' '}
              <a href="mailto:onovaweb.pro@gmail.com" className="text-violet-400 hover:underline">onovaweb.pro@gmail.com</a>
            </p>
          </Section>

          {/* ── 5. Cookies ── */}
          <Section title="5. Cookies">
            <p>
              Ce site n'utilise <strong className="text-white">aucun cookie de traçage ou publicitaire</strong>. Seul un cookie
              technique est utilisé pour mémoriser vos préférences concernant la bannière de consentement (durée : 365 jours,
              stocké en <code className="text-violet-300 bg-white/5 px-1 rounded">localStorage</code>).
            </p>
            <p>
              Aucun outil de tracking tiers (Google Analytics, Facebook Pixel, etc.) n'est actuellement actif sur ce site.
            </p>
            <p>
              Vous pouvez à tout moment effacer vos préférences en vidant le stockage local de votre navigateur.
            </p>
          </Section>

          {/* ── 6. Responsabilité ── */}
          <Section title="6. Limitation de responsabilité">
            <p>
              NovaWeb s'efforce de maintenir les informations de ce site à jour et exactes. Cependant, nous ne pouvons garantir
              l'absence d'erreurs ou d'omissions. NovaWeb ne saurait être tenu responsable de tout dommage direct ou indirect
              résultant de l'utilisation de ce site ou des liens externes présents.
            </p>
          </Section>

          {/* ── 7. Droit applicable ── */}
          <Section title="7. Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents seront
              ceux de Seine-et-Marne, France.
            </p>
          </Section>

          <p className="text-xs text-zinc-600 mt-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
