import React, { useRef, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Team from "../components/Team";
import Footer from "../components/Footer";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useSEO } from "../hooks/useSEO";

/* -- Inline micro-components -------------------------------------------- */

function WordReveal({ text, className = "" }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, delay: i * 0.075, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticTitle({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const shouldReduce = useReducedMotion();

  const handleMove = (e) => {
    if (!ref.current || shouldReduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.1);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.1);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.span>
  );
}

function ScrollTextReveal({ text, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

function Counter({ to, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) { setCount(Math.round(v)); },
    });
    return controls.stop;
  }, [inView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* -- Data --------------------------------------------------------------- */

const stats = [
  { value: 50,  suffix: "+", label: "Projets livrés",      desc: "Sites, refontes, landings" },
  { value: 100, suffix: "%", label: "Satisfaction client",  desc: "0 client mécontent" },
  { value: 48,  suffix: "h", label: "Délai de réponse",     desc: "Réactivité garantie" },
  { value: 5,   suffix: "",  label: "Ans d'expertise",      desc: "Bac+5 & terrain" },
];

const services = [
  "Site vitrine & e-commerce sur-mesure",
  "Refonte UX & optimisation SEO",
  "Identité visuelle & supports imprimés",
  "Formation & transfert CMS (no-code si souhaité)",
];

const timeline = [
  {
    num: "01",
    title: "Formation",
    period: "2018 — 2023",
    desc: "Bac+5 Expert Informatique Web · Mastère spécialisé en développement & architecture web. Bases solides, projets académiques concrets.",
    tagColor: "bg-violet-500/15 border-violet-500/30 text-violet-300",
    glow: "0 24px 60px rgba(139,92,246,0.22)",
    hoverBorder: "hover:border-violet-500/40",
  },
  {
    num: "02",
    title: "Expérience Pro",
    period: "2021 — 2025",
    desc: "Developer ServiceNow chez Inetum · Consultant ITSM & UX chez Fujitsu · Developer Full Stack chez AJC — 4 ans en grand compte et startups.",
    tagColor: "bg-sky-500/15 border-sky-500/30 text-sky-300",
    glow: "0 24px 60px rgba(6,182,212,0.22)",
    hoverBorder: "hover:border-sky-500/40",
  },
  {
    num: "03",
    title: "Création de Wexor",
    period: "2025 — Présent",
    desc: "Fondation de l'agence digitale pour accompagner les TPE/PME. Design premium, code sur-mesure, relation directe sans intermédiaire.",
    tagColor: "bg-pink-500/15 border-pink-500/30 text-pink-300",
    glow: "0 24px 60px rgba(244,114,182,0.22)",
    hoverBorder: "hover:border-pink-500/40",
  },
];

const values = [
  {
    title: "Pragmatisme",
    desc: "Des solutions axées sur les résultats, sans complexité inutile.",
    hoverBorder: "hover:border-violet-500/50",
    hoverGrad: "from-violet-500/15 to-violet-600/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-violet-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: "Transparence",
    desc: "Budget et planning clairs dès le départ, zéro mauvaise surprise.",
    hoverBorder: "hover:border-sky-500/50",
    hoverGrad: "from-sky-500/15 to-sky-600/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-sky-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Qualité",
    desc: "Performance, accessibilité et design au cœur de chaque livrable.",
    hoverBorder: "hover:border-pink-500/50",
    hoverGrad: "from-pink-500/15 to-pink-600/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-pink-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: "Partenariat",
    desc: "On travaille avec toi, pas juste pour toi — relation durable.",
    hoverBorder: "hover:border-emerald-500/50",
    hoverGrad: "from-emerald-500/15 to-emerald-600/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-emerald-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

const navTo = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

/* -- Page --------------------------------------------------------------- */

export default function About() {
  useSEO({
    title: "À propos — Développeur web freelance | Wexor",
    description:
      "Othmane Bouakline, développeur web freelance et fondateur de Wexor. Création de site web sur-mesure, refonte et SEO pour TPE/PME en Île-de-France et partout en France.",
    keywords: "développeur web freelance, création de site web, agence digitale, SEO local, refonte site web, freelance Île-de-France",
    path: "/about",
  });

  return (
    <div className="min-h-screen text-white">
      <Nav />

      <main role="main" className="pt-24">

        {/* 1. Hero Cinématique */}
        <header className="relative max-w-6xl mx-auto px-6 py-28 text-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[720px] h-[420px] rounded-full bg-violet-600/20 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Notre Histoire
          </motion.div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight mb-8">
            {/* ligne 1 — depuis la droite */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticTitle className="block">
                On ne crée pas des <span className="text-pink-400">sites</span>.
              </MagneticTitle>
            </motion.div>
            {/* ligne 2 — depuis la gauche */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticTitle className="block mt-2">
                On construit des <span className="text-pink-400">leviers</span>
              </MagneticTitle>
            </motion.div>
            {/* ligne 3 — depuis la droite */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticTitle className="block mt-2">
                <span className="text-gradient">de croissance.</span>
              </MagneticTitle>
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Agence digitale fondée par un expert Bac+5 — design premium,
            code sur-mesure et stratégie SEO pour faire grandir les petites entreprises.
          </motion.p>
        </header>

        {/* 2. Chiffres Clés */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(139,92,246,0.18)" }}
                className="group relative p-6 md:p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl backdrop-blur-sm hover:border-violet-500/40 transition-all cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <p className="text-3xl md:text-4xl font-black text-white mb-1">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="font-semibold text-sm mb-1">{s.label}</p>
                  <p className="text-xs text-zinc-500">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-8 md:gap-14 items-start">
            <div className="md:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Notre mission</p>
                <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
                  Permettre aux entrepreneurs<br />de briller en ligne.
                </h2>
                <p className="text-zinc-400 leading-relaxed text-base">
                  Permettre aux entrepreneurs de se concentrer sur leur métier pendant que nous
                  construisons une présence digitale efficace et durable. Simplicité, performance
                  et ROI au cœur de nos choix.
                </p>
              </motion.div>

              <motion.ul
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {services.map((s, i) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="flex items-start gap-3 text-zinc-300"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed">{s}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => navTo("/pricing")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow shadow-violet-500/30 text-sm"
                >
                  Voir nos tarifs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
                <button
                  onClick={() => navTo("/contact")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:border-white/30 hover:text-white transition-colors text-zinc-400"
                >
                  Nous contacter
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl backdrop-blur-sm overflow-hidden"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 bg-violet-600/15 rounded-full blur-2xl" />
                <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-5 relative">Notre philosophie</p>
                <blockquote className="relative text-lg md:text-xl font-bold leading-relaxed mb-6">
                  <span className="absolute -top-4 -left-2 text-6xl font-black text-violet-500/20 leading-none select-none pointer-events-none">"</span>
                  <ScrollTextReveal
                    text="Nous croyons qu’un site web n’est pas une dépense, c’est un investissement."
                    className="text-white leading-relaxed"
                  />
                </blockquote>
                <p className="text-sm text-zinc-500 italic relative">— Othmane Bouakline, fondateur</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Notre Parcours - Timeline */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Notre aventure</p>
            <h2 className="text-3xl md:text-5xl font-black">Notre parcours</h2>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute left-7 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-transparent"
            />

            <div className="space-y-12 md:space-y-16">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 border-2 border-[#050510] z-10 shadow-[0_0_14px_rgba(139,92,246,0.7)]" />

                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <motion.div
                      whileHover={{ y: -6, boxShadow: t.glow }}
                      className={`relative p-7 bg-white/[0.03] border border-white/[0.07] rounded-2xl ${t.hoverBorder} transition-all overflow-hidden cursor-default`}
                    >
                      <span className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.035] leading-none select-none pointer-events-none">
                        {t.num}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-4 ${t.tagColor}`}>
                        {t.period}
                      </span>
                      <h3 className="text-xl font-black mb-3">{t.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Valeurs - Bento Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Ce qui nous guide</p>
            <h2 className="text-3xl md:text-5xl font-black">Nos valeurs</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(139,92,246,0.18)" }}
                className={`group relative p-7 bg-white/[0.03] border border-white/[0.07] rounded-2xl ${v.hoverBorder} transition-all cursor-default overflow-hidden`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${v.hoverGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <motion.div
                    className="mb-5"
                    whileHover={{ rotate: [0, -10, 8, -4, 0], scale: 1.12 }}
                    transition={{ duration: 0.5 }}
                  >
                    {v.icon}
                  </motion.div>
                  <h3 className="font-black text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 6. Fondateur */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-widest text-violet-400 mb-3 font-semibold">Qui suis-je</p>
            <h2 className="text-3xl md:text-5xl font-black">Le fondateur</h2>
          </motion.div>
          <Team />
        </section>

        {/* 7. CTA Final */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-12 md:p-16 text-center"
          >
            <div className="pointer-events-none absolute -top-20 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-6">Prêt à passer à l’action ?</p>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                <WordReveal text="Prêt à transformer ton idée" />
                <br />
                <span className="text-gradient">
                  <WordReveal text="en réalité digitale ?" />
                </span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                On répond sous 48 h, sans engagement. Un premier échange suffit pour voir si on peut t’aider.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  onClick={() => navTo("/contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30 text-base"
                >
                  Démarrer mon projet
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
                <button
                  onClick={() => navTo("/pricing")}
                  className="px-8 py-4 rounded-full border border-white/15 font-medium text-zinc-400 hover:border-white/30 hover:text-white transition-colors text-base"
                >
                  Voir les tarifs
                </button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
