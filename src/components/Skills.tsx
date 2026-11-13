import { Blocks, BrainCircuit, Code2, Database, MonitorSmartphone, Server } from 'lucide-react'
import { skills } from '../data/resume'
import { Reveal, SectionHead, trackSpotlight } from './ui'

const icons = [Code2, Blocks, MonitorSmartphone, Server, Database, BrainCircuit]

export default function Skills() {
  return (
    <section id="stack" aria-label="Tech stack" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="03" label="Stack" title={['A toolkit for', <span className="serif text-accent-ink">every layer.</span>]}>
          The tools I reach for to take an idea from schema to App Store.
        </SectionHead>

        <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={g.group} delay={(i % 3) * 0.08} className="h-full">
                <div onPointerMove={trackSpotlight} className="spotlight card group h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-surface-2/50 px-2.5 py-1 text-[13px] text-fg/85 transition-colors hover:border-line-strong hover:text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
