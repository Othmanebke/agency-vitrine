import React from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-base font-bold text-violet-400 uppercase tracking-widest mb-3">{title}</h2>
    <div className="text-sm text-zinc-400 leading-relaxed space-y-2">{children}</div>
  </div>
)

export default function MentionsLegales() {
  useSEO({
    title: 'Mentions légales — Wexor',
    description: 'Mentions légales, politique de confidentialité et informations légales du site Wexor.',
    path: '/mentions-legales',
  })

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main role="main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto px-6 py-16"
        >
          <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Légal</p>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Mentions légales</h1>
          <p className="text-zinc-500 text-sm mb-12">Dernière mise à jour : février 2026</p>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 space-y-0">

            <Section title="1. Éditeur du site">
              <p><strong className="text-white">Nom du site :</strong> Wexor</p>
              <p><strong className="text-white">Responsable de la publication :</strong> Othman Bouakline</p>
              <p><strong className="text-white">Statut :</strong> Auto-entrepreneur</p>
              <p><strong className="text-white">Email :</strong>{' '}
                <a href="mailto:othmane.bouakline.pro@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                  othmane.bouakline.pro@gmail.com
                </a>
              </p>
              <p><strong className="text-white">Téléphone :</strong>{' '}
                <a href="tel:+33660805337" className="text-violet-400 hover:text-violet-300 transition-colors">
                  06 60 80 53 37
                </a>
              </p>
            </Section>

            <Section title="2. Hébergement">
              <p><strong className="text-white">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-white">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p><strong className="text-white">Site :</strong>{' '}
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                  vercel.com
                </a>
              </p>
            </Section>

            <Section title="3. Propriété intellectuelle">
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, code source) est la propriété exclusive de Wexor, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
              </p>
            </Section>

            <Section title="4. Données personnelles & RGPD">
              <p>
                Wexor collecte uniquement les données strictement nécessaires au traitement de vos demandes (formulaire de contact : nom, email, message). Ces données ne sont ni vendues ni transmises à des tiers.
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement (« droit à l'oubli »)</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:othmane.bouakline.pro@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                  othmane.bouakline.pro@gmail.com
                </a>
                . Nous répondons sous 30 jours ouvrés.
              </p>
            </Section>

            <Section title="5. Cookies">
              <p>Ce site utilise des cookies fonctionnels strictement nécessaires à son bon fonctionnement (préférences de session). Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement.</p>
              <p>Vous pouvez à tout moment modifier vos préférences via la bannière cookie ou les paramètres de votre navigateur.</p>
            </Section>

            <Section title="6. Limitation de responsabilité">
              <p>
                Wexor s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, Wexor ne peut garantir l'exactitude, la complétude ou l'actualité des informations.
              </p>
              <p>
                Des liens hypertextes peuvent renvoyer vers des sites tiers. NovaWeb n'est pas responsable du contenu de ces sites.
              </p>
            </Section>

            <Section title="7. Loi applicable">
              <p>
                Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </Section>

          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
