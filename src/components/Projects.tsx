import { ArrowUpRight } from 'lucide-react'
import { profile, projects } from '../data/resume'
import { Section } from './ui'

export default function Projects() {
  return (
    <Section id="work" title="Projects">
      <ul className="-mx-3 space-y-1">
        {projects.map((p) => (
          <li key={p.name}>
            <div className="group relative flex gap-5 rounded-xl p-3 transition-colors hover:bg-surface">
              <img
                src={p.image}
                alt={`${p.name}: ${p.tagline}`}
                loading="lazy"
                width={1440}
                height={900}
                className="mt-1 hidden aspect-[16/10] w-32 shrink-0 rounded-md border border-line object-cover object-top sm:block"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">
                    <a href={p.live} target="_blank" rel="noopener" className="inline-flex items-center gap-1">
                      {/* the whole row opens the live site */}
                      <span aria-hidden="true" className="absolute inset-0 rounded-xl" />
                      {p.name}
                      <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                    </a>
                  </h3>
                  <span className="shrink-0 text-sm text-subtle tabular-nums">{p.year}</span>
                </div>
                <p className="mt-0.5 text-[15px] text-fg/80">{p.tagline}</p>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <p className="text-[13px] text-subtle">{p.tags.join(' · ')}</p>
                  <a href={p.source} target="_blank" rel="noopener" className="link relative z-10 text-[13px] text-subtle hover:text-fg">
                    Source
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        More on{' '}
        <a href={profile.socials.github} target="_blank" rel="noopener" className="link font-medium text-fg">
          GitHub
        </a>
        .
      </p>
    </Section>
  )
}
