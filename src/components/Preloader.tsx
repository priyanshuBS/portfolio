import { animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ease } from './ui'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const c = animate(0, 100, {
      duration: reduced ? 0.1 : 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, reduced ? 0 : 250),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#08070d] p-6 sm:p-10"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em] text-muted uppercase">
        <span>Priyanshu Singh</span>
        <span>Portfolio ©{new Date().getFullYear()}</span>
      </div>

      <div className="overflow-hidden">
        <motion.p
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-2xl font-medium text-fg/80 sm:text-4xl"
        >
          Crafting digital experiences
        </motion.p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-white/10">
          <div className="h-px bg-gradient-to-r from-violet to-cyan" style={{ width: `${n}%` }} />
        </div>
        <span className="font-display text-7xl leading-none font-bold tabular-nums sm:text-[10rem]">
          {n}
          <span className="text-violet">%</span>
        </span>
      </div>
    </motion.div>
  )
}
