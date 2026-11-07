import { motion, useScroll, useSpring } from 'motion/react'
import { Award, BadgeCheck, Zap } from 'lucide-react'
import { useRef } from 'react'
import { achievements, education } from '../data/resume'
import { MaskText, Reveal, SectionLabel } from './ui'

const icons = [Award, Zap, BadgeCheck]

export default function Education() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.75', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="journey" aria-label="Journey" className="relative py-28 sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 size-[500px] rounded-full bg-cyan/[0.07] blur-[140px]" />
      <div className="container-x relative">
        <SectionLabel index="04">Journey</SectionLabel>
        <h2 className="mt-8 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.045em]">
          <MaskText lines={['Always learning,', <span className="text-stroke">always building.</span>]} />
        </h2>

        {/* timeline */}
        <ol ref={list} className="relative mt-20 sm:mt-24">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[11px] w-px bg-white/10 md:left-1/2">
            <motion.div style={{ scaleY: draw }} className="h-full w-px origin-top bg-gradient-to-b from-violet via-lilac to-cyan" />
          </div>

          {education.map((e, i) => {
            const right = i % 2 === 1
            return (
              <li key={e.degree} className="relative pb-14 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-0 grid size-6 place-items-center rounded-full border border-white/20 bg-bg md:left-1/2 md:-translate-x-1/2"
                >
                  <span className={`size-2 rounded-full ${i === 0 ? 'bg-violet shadow-[0_0_14px_3px] shadow-violet/70' : 'bg-white/50'}`} />
                </span>

                <Reveal className={right ? 'md:col-start-2' : 'md:text-right'}>
                  <p className="font-mono text-xs tracking-[0.18em] text-lilac uppercase">{e.period}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{e.degree}</h3>
                  <p className="mt-2 text-muted">{e.school}</p>
                  <p className="pill mt-4">{e.score}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>

        {/* achievements */}
        <div className="mt-24 grid gap-4 md:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={a.title} delay={i * 0.08} className="h-full">
                <div className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -bottom-10 size-40 rounded-full bg-violet/0 blur-3xl transition-colors duration-700 group-hover:bg-violet/25"
                  />
                  <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-lilac">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-8 font-display text-xl font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
