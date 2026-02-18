import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Inetum',
    role: 'Developer ServiceNow',
    period: 'Sept 2025 — Présent',
    desc: 'Développement et personnalisation de la plateforme ServiceNow : workflows, portails, intégrations API et automatisations ITSM.',
    current: true,
    color: 'from-violet-600 to-pink-500',
  },
  {
    company: 'Fujitsu France',
    role: 'Consultant ITSM & UX Designer',
    period: '2023 — 2025 · 2 ans',
    desc: 'Pilotage de projets ITSM, conception d\'interfaces utilisateur et amélioration des processus IT en environnement grand compte.',
    current: false,
    color: 'from-sky-500 to-indigo-600',
  },
  {
    company: 'AJC Ingénieur',
    role: 'Développeur Full Stack',
    period: '2021 — 2023 · 1 an 5 mois',
    desc: 'Conception et développement d\'applications web full stack (front-end React / back-end Node.js), intégrations API et déploiement.',
    current: false,
    color: 'from-emerald-500 to-teal-600',
  },
]

const skills = [
  'React / Next.js', 'Node.js', 'Intelligence Artificielle', 'ServiceNow', 'TypeScript',
  'Tailwind CSS', 'HTML / CSS', 'WordPress', 'UX Design', 'ITSM', 'SEO', 'Figma', 'Vercel',
]

export default function Team() {
  return (
    <div className="grid md:grid-cols-5 gap-10 items-start">

      {/* Left — profile card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-2 p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl flex flex-col items-center text-center gap-5"
      >
        {/* avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-violet-500/30">
            O
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#050510]" title="Disponible" />
        </div>

        <div>
          <h3 className="text-xl font-black">Othmane</h3>
          <p className="text-sm text-violet-400 font-medium mt-0.5">Fondateur & Développeur</p>
        </div>

        {/* formation */}
        <div className="w-full p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-left">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-1">Formation</p>
          <p className="font-bold text-sm">Bac+5 — Expert Informatique Web</p>
          <p className="text-xs text-zinc-500 mt-0.5">Mastère spécialisé · Développement & Architecture Web</p>
        </div>

        {/* skills */}
        <div className="w-full text-left">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Stack & compétences</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <span key={s} className="px-2.5 py-1 text-xs rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right — experience timeline */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-3 space-y-4"
      >
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-6">Parcours professionnel</p>

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(139,92,246,0.12)' }}
            className={`relative p-6 rounded-2xl border transition-colors cursor-default ${
              exp.current
                ? 'bg-white/[0.05] border-violet-500/40'
                : 'bg-white/[0.03] border-white/[0.07] hover:border-white/20'
            }`}
          >
            {exp.current && (
              <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Poste actuel
              </span>
            )}

            <div className="flex items-start gap-4">
              {/* color dot */}
              <div className={`mt-1 w-3 h-3 rounded-full bg-gradient-to-br ${exp.color} flex-shrink-0 shadow-sm`} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                  <h4 className="font-black text-base">{exp.role}</h4>
                  <span className="text-violet-400 font-semibold text-sm">{exp.company}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">{exp.period}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
