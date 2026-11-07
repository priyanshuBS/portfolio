import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { lazy, Suspense, useRef } from 'react'
import { profile } from '../data/resume'
const ParticleSphere = lazy(() => import('./ParticleSphere'))
import { ease, useClock } from './ui'

function SplitWord({ word, delay, ready, className = '' }: { word: string; delay: number; ready: boolean; className?: string }) {
  return (
    <span className={`flex overflow-hidden ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', rotate: 8 }}
          animate={ready ? { y: '0%', rotate: 0 } : {}}
          transition={{ duration: 1.1, delay: delay + i * 0.035, ease }}
          className="inline-block origin-bottom-left"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RotatingBadge() {
  const text = 'SCROLL TO EXPLORE • SCROLL TO EXPLORE • '
  return (
    <a href="#about" aria-label="Scroll to about" className="group relative grid size-28 place-items-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-white/60 font-mono text-[8.2px] tracking-[0.18em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur transition-colors group-hover:bg-white group-hover:text-bg">
        <ArrowDown className="size-4" />
      </span>
    </a>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const time = useClock()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease },
  })

  return (
    <section ref={ref} id="top" className="relative h-svh min-h-[640px] overflow-hidden">
      {/* 3D background */}
      <motion.div style={{ scale: sphereScale, opacity: sphereOpacity }} className="absolute inset-0">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            <ParticleSphere />
          </Suspense>
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <motion.div style={{ y: textY }} className="container-x relative flex h-full flex-col justify-between pt-24 pb-8 sm:pb-10">
        {/* top meta */}
        <div className="flex items-start justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          <motion.div {...fadeUp(0.6)} className="space-y-1">
            <p className="flex items-center gap-2 text-fg">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </p>
            <p>Internships · Full-time</p>
          </motion.div>
          <motion.div {...fadeUp(0.7)} className="space-y-1 text-right">
            <p className="text-fg">{profile.location}</p>
            <p>{time} IST</p>
          </motion.div>
        </div>

        {/* name */}
        <div>
          <h1 className="sr-only">
            {profile.name}, {profile.title}
          </h1>
          <div className="font-display leading-[0.82] font-extrabold tracking-[-0.05em] select-none">
            <SplitWord word="PRIYANSHU" delay={0.1} ready={ready} className="text-[clamp(3.6rem,15.5vw,15rem)]" />
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
              <SplitWord
                word="SINGH"
                delay={0.3}
                ready={ready}
                className="text-[clamp(3.6rem,15.5vw,15rem)] [&>span]:bg-gradient-to-b [&>span]:from-white [&>span]:to-white/30 [&>span]:bg-clip-text [&>span]:text-transparent"
              />
              <motion.p
                {...fadeUp(0.9)}
                className="max-w-sm pb-[2.5vw] font-sans text-base leading-relaxed font-normal tracking-normal text-fg/75 sm:text-lg"
              >
                Full-stack developer crafting <span className="text-fg">real-time</span> and{' '}
                <span className="gradient-text font-medium">AI-powered</span> web experiences with React, Node.js &
                TypeScript.
              </motion.p>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between gap-6">
          <motion.div {...fadeUp(1.1)} className="hidden font-mono text-[11px] tracking-[0.18em] text-muted uppercase sm:block">
            <p>(Scroll)</p>
            <p className="mt-1 text-fg">Selected work 2024 — {new Date().getFullYear()}</p>
          </motion.div>
          <motion.div {...fadeUp(1.2)} className="ml-auto">
            <RotatingBadge />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
