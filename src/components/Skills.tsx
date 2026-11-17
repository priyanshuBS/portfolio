import { skills } from '../data/resume'
import { Section } from './ui'

export default function Skills() {
  return (
    <Section id="stack" title="Stack">
      <dl className="space-y-3">
        {skills.map((g) => (
          <div key={g.group} className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-sm text-subtle sm:pt-px">{g.group}</dt>
            <dd className="text-[15px]">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
