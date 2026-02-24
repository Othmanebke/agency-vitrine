import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Arbre de décision ───────────────────────────────────────────────────────
const TREE = {
  start: {
    bot: "Salut ! 👋 Bienvenue chez Wexor. Pour mieux t'orienter, quel est ton projet aujourd'hui ?",
    options: [
      { label: '🌐 Création de site web', next: 'creation' },
      { label: '🔄 Refonte de site existant', next: 'refonte' },
      { label: '🎨 Graphisme / Print', next: 'print' },
      { label: '📱 Réseaux sociaux / Visibilité', next: 'social' },
    ],
  },

  creation: {
    bot: 'Top ! Quel type de site imagines-tu ?',
    options: [
      { label: '📋 Site vitrine (présentation)', next: 'urgence', params: { projet: 'Site sur-mesure', type: 'Site vitrine' } },
      { label: '🛒 E-commerce (boutique en ligne)', next: 'urgence', params: { projet: 'Site sur-mesure', type: 'E-commerce' } },
      { label: '⚙️ Sur-mesure (fonctionnalités avancées)', next: 'urgence', params: { projet: 'Site sur-mesure', type: 'Application sur-mesure' } },
    ],
  },

  refonte: {
    bot: "Ça marche. As-tu déjà un cahier des charges ou faut-il faire un audit ?",
    options: [
      { label: "📄 J'ai un cahier des charges", next: 'urgence', params: { projet: 'Refonte de site', type: 'Avec cahier des charges' } },
      { label: "🔍 J'ai besoin d'un audit", next: 'urgence', params: { projet: 'Refonte de site', type: 'Audit préalable' } },
      { label: '✨ Juste moderniser le design', next: 'urgence', params: { projet: 'Refonte de site', type: 'Modernisation design' } },
    ],
  },

  print: {
    bot: 'Pour quel type de support ?',
    options: [
      { label: '📄 Flyers / Affiches', next: 'urgence', params: { projet: 'Flyers & print', type: 'Flyers & affiches' } },
      { label: '📇 Carte de visite / Brochure', next: 'urgence', params: { projet: 'Flyers & print', type: 'Carte de visite / Brochure' } },
      { label: '🎨 Identité visuelle complète', next: 'urgence', params: { projet: 'Flyers & print', type: 'Branding & identité visuelle' } },
    ],
  },

  social: {
    bot: "Parfait. Qu'est-ce qui t'intéresse en priorité ?",
    options: [
      { label: '📲 Gestion des réseaux sociaux', next: 'urgence', params: { projet: 'Présence réseaux sociaux', type: 'Community management' } },
      { label: '🔎 Référencement naturel (SEO)', next: 'urgence', params: { projet: 'SEO & visibilité', type: 'SEO & visibilité' } },
      { label: '💰 Publicité / Campagnes paid', next: 'urgence', params: { projet: 'Présence réseaux sociaux', type: 'Publicité payante' } },
    ],
  },

  urgence: {
    bot: "Dernière petite chose pour préparer ton devis : quelle est ton urgence ?",
    options: [
      { label: "🔥 C'est urgent !", next: 'end', params: { urgence: 'Urgent' } },
      { label: '📅 Dans le mois', next: 'end', params: { urgence: 'Dans le mois' } },
      { label: '🔍 Je me renseigne', next: 'end', params: { urgence: 'En exploration' } },
    ],
  },

  end: {
    bot: "Parfait, j'ai tout ce qu'il faut ! 🎉 Je prépare ton formulaire pré-rempli…",
    redirect: true,
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildURL(params) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => sp.set(k, v))
  return `/contact?${sp.toString()}`
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])   // { id, role: 'bot'|'user', text }
  const [node, setNode] = useState('start')
  const [params, setParams] = useState({})
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [pulsed, setPulsed] = useState(false)
  const bottomRef = useRef(null)
  const msgId = useRef(0)

  // pulse d'attention après 4 secondes si pas encore ouvert
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // Premier message quand on ouvre
  useEffect(() => {
    if (!open || messages.length > 0) return
    pushBot(TREE.start.bot)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function pushBot(text, delay = 600) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { id: ++msgId.current, role: 'bot', text }])
    }, delay)
  }

  function handleOption(option) {
    // Message "utilisateur"
    const labelClean = option.label.replace(/^\S+\s/, '') // retire l'emoji
    setMessages(m => [...m, { id: ++msgId.current, role: 'user', text: option.label }])

    // Fusion des params
    const nextParams = { ...params, ...(option.params || {}) }
    setParams(nextParams)

    const nextNode = TREE[option.next]
    setNode(option.next)

    // Message bot suivant
    pushBot(nextNode.bot, 700)

    // Redirect si fin
    if (nextNode.redirect) {
      setDone(true)
      setTimeout(() => {
        const url = buildURL(nextParams)
        window.history.pushState({}, '', url)
        window.dispatchEvent(new PopStateEvent('popstate'))
        setOpen(false)
        // reset
        setTimeout(() => {
          setMessages([]); setParams({}); setNode('start'); setDone(false)
        }, 400)
      }, 1800)
    }
  }

  function handleOpen() {
    setOpen(true)
    setPulsed(false)
  }

  function handleClose() {
    setOpen(false)
    // reset complet au prochain open
    setMessages([]); setParams({}); setNode('start'); setDone(false)
  }

  const currentNode = TREE[node]
  const showOptions = !typing && !done && messages.length > 0 && messages[messages.length - 1]?.role === 'bot'

  return (
    <>
      {/* ── Panel ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-[360px] flex flex-col rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl shadow-2xl shadow-violet-900/30 overflow-hidden"
            style={{ maxHeight: '520px' }}
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-gradient-to-r from-violet-600/20 to-pink-600/10 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">W</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm leading-tight">Wexor</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  En ligne — répond en &lt; 48 h
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Fermer le chat"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth" style={{ overflowY: 'auto' }}>
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {msg.role === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mb-0.5">W</div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'bot'
                          ? 'bg-white/[0.06] border border-white/[0.08] text-zinc-200 rounded-bl-sm'
                          : 'bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-br-sm'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* typing indicator */}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">W</div>
                    <div className="px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-sm flex items-center gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* options */}
            <AnimatePresence>
              {showOptions && currentNode?.options && (
                <motion.div
                  key={node + '-opts'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 pt-2 flex flex-col gap-2 border-t border-white/[0.06] flex-shrink-0"
                >
                  {currentNode.options.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.06 }}
                      onClick={() => handleOption(opt)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white transition-all"
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton flottant ───────────────────────────────────────────────── */}
      <motion.button
        onClick={open ? handleClose : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat Wexor'}
        className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[9991] w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg shadow-violet-500/40 flex items-center justify-center text-white transition-shadow hover:shadow-violet-500/60"
      >
        {/* badge pulsating */}
        {pulsed && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#050510] flex items-center justify-center"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
          </motion.span>
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
