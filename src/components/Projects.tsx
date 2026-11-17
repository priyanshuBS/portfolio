import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile, projects, type Project } from '../data/resume'
import { GithubIcon, Reveal, Section } from './ui'

function Row({ p }: { p: Project }) {
  return (
    // on desktop, hovering one project lifts it and dims the others
    <article className="group relative grid gap-5 rounded-2xl transition-all duration-300 sm:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] sm:gap-7 lg:-mx-5 lg:p-5 lg:group-hover/list:opacity-45 lg:hover:!opacity-100 lg:hover:bg-surface-2/70 lg:hover:shadow-[inset_0_1px_0_0_var(--line)]">
      <div className="order-2 sm:order-1">
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          width={1440}
          height={900}
          className="aspect-[16/10] w-full max-w-72 rounded-lg border border-line object-cover object-top transition-all duration-300 group-hover:border-line-strong sm:max-w-none sm:translate-y-1"
        />
      </div>

      <div className="order-1 min-w-0 sm:order-2">
        <p className="font-mono text-[11px] tracking-[0.12em] text-subtle uppercase">
          {p.year} · {(p.platforms ?? ['Web']).join(' / ')}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold">
          <a href={p.live} target="_blank" rel="noopener" className="inline-flex items-baseline gap-1">
            {/* stretches the link over the whole row */}
            <span aria-hidden="true" className="absolute inset-0 z-0 rounded-2xl" />
            <span>{p.name}</span>
            <ArrowUpRight className="size-4 shrink-0 translate-y-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0" />
          </a>
        </h3>
        <p className="serif text-[17px] text-muted">{p.tagline}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-fg/80">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={p.source}
          target="_blank"
          rel="noopener"
          className="relative z-10 mt-4 inline-flex items-center gap-1.5 py-1 text-sm text-muted transition-colors hover:text-fg"
        >
          <GithubIcon className="size-3.5" /> Source code
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="work" index="02" label="Work">
      <ol className="group/list space-y-14 lg:space-y-4">
        {projects.map((p) => (
          <li key={p.name}>
            <Reveal>
              <Row p={p} />
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal className="mt-12">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 font-medium transition-colors hover:border-fg"
        >
          More on GitHub <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Reveal>
    </Section>
  )
}
