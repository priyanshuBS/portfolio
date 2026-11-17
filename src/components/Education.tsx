import { Award, BadgeCheck, Zap } from 'lucide-react'
import { achievements, education } from '../data/resume'
import { Reveal, Section } from './ui'

const icons = [Award, Zap, BadgeCheck]

export default function Education() {
  return (
    <Section id="journey" index="04" label="Journey">
      <ol className="group/list">
        {education.map((e, i) => (
          <li key={e.degree}>
            <Reveal delay={i * 0.05}>
              <div className="grid gap-1 border-t border-line py-6 transition-opacity duration-300 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 lg:group-hover/list:opacity-45 lg:hover:!opacity-100">
                <p className="font-mono text-xs tracking-[0.08em] text-subtle sm:pt-1">{e.period}</p>
                <div>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="mt-0.5 text-muted">{e.school}</p>
                  <p className="mt-2 text-sm font-medium">{e.score}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mt-14 mb-5 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Highlights</h3>
      <div className="space-y-3">
        {achievements.map((a, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface">
                <Icon className="mt-0.5 size-5 shrink-0 text-muted" />
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
