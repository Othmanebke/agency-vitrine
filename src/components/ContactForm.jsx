import React, { useState } from 'react'

// Use Vite env var VITE_FORMSPREE for the Formspree endpoint (e.g. https://formspree.io/f/xxxxx)
const DEFAULT_ENDPOINT = import.meta.env.VITE_FORMSPREE || 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT'
// If VITE_USE_SERVERLESS is 'true', the form will POST to the serverless function at /api/contact
const USE_SERVERLESS = import.meta.env.VITE_USE_SERVERLESS === 'true'

export default function ContactForm(){
  const [values, setValues] = useState({name:'', email:'', message:''})
  const [status, setStatus] = useState('')

  function handleChange(e){
    setValues(v=>({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')

  const endpoint = USE_SERVERLESS ? '/api/contact' : DEFAULT_ENDPOINT

    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message
        })
      })

      if(res.ok){
        setStatus('success')
        setValues({name:'', email:'', message:''})
      } else {
        setStatus('error')
      }
    }catch(err){
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-lg">
      <label className="block">
        <span className="text-sm text-zinc-300">Nom</span>
        <input name="name" value={values.name} onChange={handleChange} required className="w-full mt-1 p-3 bg-black border border-zinc-800 rounded" />
      </label>

      <label className="block">
        <span className="text-sm text-zinc-300">Email</span>
        <input name="email" value={values.email} onChange={handleChange} required type="email" className="w-full mt-1 p-3 bg-black border border-zinc-800 rounded" />
      </label>

      <label className="block">
        <span className="text-sm text-zinc-300">Message</span>
        <textarea name="message" value={values.message} onChange={handleChange} required rows="5" className="w-full mt-1 p-3 bg-black border border-zinc-800 rounded" />
      </label>

      <div className="flex items-center gap-4">
        <button type="submit" className="bg-violet-600 px-5 py-3 rounded font-semibold">{status==='sending' ? 'Envoi...' : 'Envoyer'}</button>
        {status==='success' && <span className="text-sm text-emerald-400">Merci, message envoyé !</span>}
        {status==='error' && <span className="text-sm text-rose-400">Erreur, réessaye.</span>}
      </div>

      <p className="text-xs text-zinc-500 mt-2">Remarque : pour recevoir réellement les messages, remplace l'endpoint Vite (VITE_FORMSPREE) par ton endpoint Formspree ou configure une serverless function sur Vercel pour envoyer via SendGrid.</p>
    </form>
  )
}
