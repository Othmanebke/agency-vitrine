import React from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Contact(){
  React.useEffect(()=>{
    document.title = 'Contact — NovaWeb'
    const meta = document.querySelector('meta[name="description"]')
    if(meta) meta.setAttribute('content', 'Contactez NovaWeb pour un devis gratuit — réponse en moins de 48h.')
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = 'Contactez NovaWeb pour un devis gratuit — réponse en moins de 48h.'
      document.head.appendChild(m)
    }
  }, [])

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main role="main" className="pt-24">
        <section className="max-w-5xl mx-auto px-6 py-20">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">On t'écoute</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Parlons de <span className="text-gradient">ton projet</span>
            </h1>
            <p className="text-zinc-400 max-w-lg">
              Devis gratuit &amp; sans engagement — réponse sous 48&thinsp;h.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-8"
            >
              {[
                { icon: '📩', label: 'Email', value: '<a href="mailto:onovaweb.pro@gmail.com" class="hover:text-violet-400 transition-colors">onovaweb.pro@gmail.com</a>' },
                { icon: '📞', label: 'Téléphone', value: '<a href="tel:+33660805337" class="hover:text-violet-400 transition-colors">06 60 80 53 37</a>' },
                { icon: '📍', label: 'Disponibilité', value: 'France &amp; remote' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div
                      className="font-semibold"
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    />
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="pt-4 border-t border-white/[0.07] space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Suivez-nous</p>
                {[
                  { label: 'TikTok — @n0vaweb', href: 'https://tiktok.com/@n0vaweb' },
                  { label: 'Instagram — novaaa.web', href: 'https://instagram.com/novaaa.web' },
                  { label: 'LinkedIn — Othmane Bouakline', href: 'https://linkedin.com/in/othmanebouakline' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </motion.div>

            {/* form card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
