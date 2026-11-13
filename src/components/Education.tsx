import { motion, useScroll, useSpring } from 'motion/react'
import { Award, BadgeCheck, GraduationCap, Zap } from 'lucide-react'
import { useRef } from 'react'
import { achievements, education } from '../data/resume'
import { Reveal, SectionHead } from './ui'

const icons = [Award, Zap, BadgeCheck]

export default function Education() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.8', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="journey" aria-label="Journey" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="04" label="Journey" title={['Always learning,', <span className="serif text-accent-ink">always building.</span>]} />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* education timeline */}
          <div>
            <p className="eyebrow flex items-center gap-2">
              <GraduationCap className="size-4" /> Education
            </p>
            <ol ref={list} className="relative mt-8">
              <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-line">
                <motion.div style={{ scaleY: draw }} className="h-full w-px origin-top bg-accent-ink" />
              </div>
              {education.map((e, i) => (
                <li key={e.degree} className="relative pb-10 pl-10 last:pb-0">
                  <span aria-hidden="true" className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-line-strong bg-bg">
                    <span className={`size-[7px] rounded-full ${i === 0 ? 'bg-accent-ink' : 'bg-subtle'}`} />
                  </span>
                  <Reveal delay={i * 0.06}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{e.degree}</h3>
                      <span className="font-mono text-xs text-subtle">{e.period}</span>
                    </div>
                    <p className="mt-1.5 text-muted">{e.school}</p>
                    <span className="chip mt-3 text-fg/80">{e.score}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* achievements */}
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Award className="size-4" /> Highlights
            </p>
            <div className="mt-8 space-y-3">
              {achievements.map((a, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <Reveal key={a.title} delay={i * 0.08}>
                    <div className="card group flex gap-4 p-5 transition-colors hover:border-line-strong">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-colors group-hover:text-accent-ink">
                        <Icon className="size-[18px]" />
                      </span>
                      <div>
                        <h3 className="font-semibold">{a.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
