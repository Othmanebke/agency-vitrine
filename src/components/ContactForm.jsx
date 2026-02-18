import React, { useState } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_ENDPOINT = import.meta.env.VITE_FORMSPREE || 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT'
const USE_SERVERLESS = import.meta.env.VITE_USE_SERVERLESS === 'true'

export default function ContactForm(){
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  function handleChange(e){
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')
    const endpoint = USE_SERVERLESS ? '/api/contact' : DEFAULT_ENDPOINT
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) { setStatus('success'); setValues({ name: '', email: '', phone: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch(err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputClass = 'w-full mt-1.5 px-4 py-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-5" role="form" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="sr-only">Formulaire de contact</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Nom</span>
          <input name="name" id="contact-name" value={values.name} onChange={handleChange} required placeholder="Jean Dupont" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Email</span>
          <input name="email" id="contact-email" value={values.email} onChange={handleChange} required type="email" placeholder="jean@exemple.com" className={inputClass} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Téléphone <span className="text-zinc-600 normal-case font-normal">(optionnel)</span></span>
          <input name="phone" id="contact-phone" value={values.phone} onChange={handleChange} type="tel" placeholder="06 XX XX XX XX" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Type de projet</span>
          <select name="subject" id="contact-subject" value={values.subject} onChange={handleChange} required className={inputClass + ' cursor-pointer'} style={{ colorScheme: 'dark' }}>
            <option value="" disabled className="bg-zinc-900 text-white">Choisir...</option>
            <option value="Site sur-mesure" className="bg-zinc-900 text-white">Site sur-mesure</option>
            <option value="Refonte de site" className="bg-zinc-900 text-white">Refonte de site</option>
            <option value="Présence réseaux sociaux" className="bg-zinc-900 text-white">Présence réseaux sociaux</option>
            <option value="SEO & visibilité" className="bg-zinc-900 text-white">SEO &amp; visibilité</option>
            <option value="Flyers & print" className="bg-zinc-900 text-white">Flyers &amp; print</option>
            <option value="Intelligence artificielle" className="bg-zinc-900 text-white">Intelligence artificielle</option>
            <option value="Autre" className="bg-zinc-900 text-white">Autre</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Message</span>
        <textarea name="message" id="contact-message" value={values.message} onChange={handleChange} required rows={5} placeholder="Décris ton projet en quelques lignes..." className={inputClass} />
      </label>

      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          aria-live="polite"
        >
          {status === 'sending' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
              Envoi...
            </>
          ) : 'Envoyer le message →'}
        </motion.button>

        {status === 'success' && (
          <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-emerald-400 flex items-center gap-1.5" role="status">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            Message envoyé !
          </motion.span>
        )}
        {status === 'error' && (
          <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-rose-400" role="alert">
            Erreur, réessaye.
          </motion.span>
        )}
      </div>
    </form>
  )
}
