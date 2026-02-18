import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const NOVA = ['N', 'O', 'V', 'A']
const WEB  = ['W', 'E', 'B']

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'out'
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    // Start exit at 2.6s
    const t1 = setTimeout(() => setPhase('out'), 2600)
    // Unmount after exit animation (0.85s slide-up)
    const t2 = setTimeout(() => {
      setMounted(false)
      sessionStorage.setItem('nw_loaded', '1')
      onDone()
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const isOut = phase === 'out'

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          animate={{ y: isOut ? '-100%' : 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: '#050510' }}
        >
          {/* --- Ambient glow behind text --- */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)',
              filter: 'blur(60px)',
            }}
            animate={isOut
              ? { scale: 2.5, opacity: 0 }
              : { scale: [1, 1.15, 1] }
            }
            transition={isOut
              ? { duration: 0.5 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* --- Letters row --- */}
          <div className="flex items-end gap-0 relative z-10">
            {/* NOVA — drop from top */}
            {NOVA.map((letter, i) => (
              <motion.span
                key={`n${i}`}
                initial={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
                animate={isOut
                  ? { opacity: 0, y: -80, filter: 'blur(14px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                transition={{
                  delay: isOut ? i * 0.035 : 0.25 + i * 0.09,
                  duration: isOut ? 0.4 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(4rem,14vw,8rem)] font-black leading-none tracking-tighter text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Center dot separator */}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={isOut
                ? { opacity: 0, scale: 0 }
                : { opacity: 1, scale: 1 }
              }
              transition={{ delay: isOut ? 0 : 0.72, duration: 0.3, ease: 'backOut' }}
              className="rounded-full mx-1 mb-3 flex-shrink-0"
              style={{
                width: 'clamp(6px, 1vw, 10px)',
                height: 'clamp(6px, 1vw, 10px)',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                alignSelf: 'flex-end',
              }}
            />

            {/* WEB — rise from bottom */}
            {WEB.map((letter, i) => (
              <motion.span
                key={`w${i}`}
                initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                animate={isOut
                  ? { opacity: 0, y: 80, filter: 'blur(14px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                transition={{
                  delay: isOut ? i * 0.035 : 0.8 + i * 0.09,
                  duration: isOut ? 0.4 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(4rem,14vw,8rem)] font-black leading-none tracking-tighter"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* --- Tagline --- */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isOut
              ? { opacity: 0 }
              : { opacity: 1, letterSpacing: '0.3em' }
            }
            transition={{ delay: isOut ? 0 : 1.3, duration: 0.6 }}
            className="mt-5 text-xs text-zinc-500 uppercase relative z-10"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Agence Digitale
          </motion.p>

          {/* --- Progress bar --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOut ? 0 : 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-[1px] relative z-10 overflow-hidden bg-white/10 rounded-full"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* --- Curtain overlay that slides up on exit (extra polish) --- */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 60%, rgba(5,5,16,0.6) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
