import { Blocks, BrainCircuit, Code2, Database, MonitorSmartphone, Server } from 'lucide-react'
import { skills } from '../data/resume'
import { Reveal, Section } from './ui'

const icons = [Code2, Blocks, MonitorSmartphone, Server, Database, BrainCircuit]

export default function Skills() {
  return (
    <Section id="stack" index="03" label="Stack">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {skills.map((g, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Reveal key={g.group} delay={(i % 2) * 0.05} className="group bg-bg p-6 transition-colors hover:bg-surface">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors group-hover:border-transparent group-hover:bg-fg group-hover:text-bg">
                  <Icon className="size-4" />
                </span>
                <h3 className="font-semibold">{g.group}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5 text-sm text-muted">
                {g.items.map((item, j) => (
                  <li key={item}>
                    {item}
                    {j < g.items.length - 1 && <span className="ml-1 text-line-strong">/</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
