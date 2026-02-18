import React, { useState } from 'react'

export default function Nav(){
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <div className="font-bold text-lg">NovaWeb</div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm opacity-80 hover:opacity-100">Services</a>
          <a href="#packages" className="text-sm opacity-80 hover:opacity-100">Tarifs</a>
          <a href="#portfolio" className="text-sm opacity-80 hover:opacity-100">Portfolio</a>
          <a href="#contact" className="text-sm opacity-80 hover:opacity-100">Contact</a>
          <a href="#contact" className="ml-4 inline-block bg-gradient-to-r from-violet-600 to-pink-500 text-black px-4 py-2 rounded-full text-sm font-semibold">Demander un devis</a>
        </nav>

        <div className="md:hidden">
          <button aria-label="Menu" onClick={()=>setOpen(o=>!o)} className="p-2 rounded bg-zinc-900">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="px-6 py-4 space-y-3">
            <a href="#services" onClick={()=>setOpen(false)} className="block">Services</a>
            <a href="#packages" onClick={()=>setOpen(false)} className="block">Tarifs</a>
            <a href="#portfolio" onClick={()=>setOpen(false)} className="block">Portfolio</a>
            <a href="#contact" onClick={()=>setOpen(false)} className="block">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}
