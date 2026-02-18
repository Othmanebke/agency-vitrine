import React, { useState } from 'react'

export default function ContactForm(){
  const [values, setValues] = useState({name:'', email:'', message:''})
  const [status, setStatus] = useState('')

  function handleChange(e){
    setValues(v=>({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')

    // Placeholder: replace `YOUR_FORMSPREE_ENDPOINT` with your Formspree form endpoint
    const endpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT'

    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
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

      <p className="text-xs text-zinc-500 mt-2">Remarque : pour recevoir réellement les messages, remplace l'endpoint par Formspree ou implémente une serverless function connectée à SendGrid. Nous configurerons ça au déploiement sur Vercel si tu veux.</p>
    </form>
  )
}
