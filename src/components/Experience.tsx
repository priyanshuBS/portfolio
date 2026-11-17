import { achievements, education } from '../data/resume'
import { Section } from './ui'

export default function Experience() {
  return (
    <Section id="experience" title="Education & highlights">
      <ul className="divide-y divide-line border-y border-line">
        {education.map((e) => (
          <li key={e.degree} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div>
              <p className="font-medium">{e.degree}</p>
              <p className="text-sm text-muted">
                {e.school} · {e.score}
              </p>
            </div>
            <p className="shrink-0 text-sm text-subtle tabular-nums">{e.period}</p>
          </li>
        ))}
      </ul>

      <ul className="mt-8 space-y-4">
        {achievements.map((a) => (
          <li key={a.title} className="text-[15px] leading-relaxed">
            <span className="font-medium">{a.title}.</span> <span className="text-muted">{a.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
