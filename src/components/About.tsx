import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { about, stats } from '../data/resume'
import { CountUp, Reveal, SectionLabel } from './ui'

const statement =
  'I turn ideas into fast, thoughtful products — from real-time chat that connects neighbours to AI that actually reads your documents.'

const highlight = new Set(['fast,', 'thoughtful', 'real-time', 'AI'])

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className={`inline-block ${highlight.has(word) ? 'gradient-text' : ''}`}>
        {word}
      </motion.span>
    </span>
  )
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = statement.split(' ')

  return (
    <section id="about" className="relative py-28 sm:py-40" aria-label="About">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -left-40 size-[500px] rounded-full bg-violet/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionLabel index="01">About me</SectionLabel>

        <p
          ref={ref}
          className="mt-12 max-w-6xl font-display text-[clamp(2rem,5.2vw,4.8rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-5">
            {about.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-fg/85' : ''}>
                {p}
              </p>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3 lg:col-span-7">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-colors hover:border-white/20 sm:p-7">
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 size-40 rounded-full bg-violet/0 blur-3xl transition-colors duration-700 group-hover:bg-violet/30"
                  />
                  <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">0{i + 1}</p>
                  <p className="mt-10 font-display text-5xl font-bold tracking-tight sm:text-6xl">
                    <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
