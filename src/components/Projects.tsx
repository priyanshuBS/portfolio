import { ArrowUpRight, Globe, Smartphone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { profile, projects, type Project } from '../data/resume'
import { GithubIcon, Reveal, SectionHead, trackSpotlight } from './ui'

const host = (url: string) => new URL(url).host

function BrowserShot({ p, className = '' }: { p: Project; className?: string }) {
  return (
    <a
      href={p.live}
      target="_blank"
      rel="noopener"
      aria-label={`Open ${p.name} live site`}
      className={`group/shot block min-w-0 overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_20px_60px_-25px_rgb(0_0_0/0.55)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md bg-bg/60 px-3 py-0.5 font-mono text-[10.5px] text-subtle">
          <Globe className="size-2.5 shrink-0" />
          {host(p.live)}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          width={1440}
          height={900}
          className="size-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.04]"
        />
        <span className="absolute right-3 bottom-3 flex translate-y-2 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-on-accent opacity-0 transition-all duration-300 group-hover/shot:translate-y-0 group-hover/shot:opacity-100">
          Visit live <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </a>
  )
}

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={p.live} target="_blank" rel="noopener" className="btn btn-accent h-10 px-4 text-[13px]">
        Live site <ArrowUpRight className="size-4" />
      </a>
      <a href={p.source} target="_blank" rel="noopener" className="btn btn-ghost h-10 px-4 text-[13px]">
        <GithubIcon className="size-4" /> Source
      </a>
    </div>
  )
}

function Featured({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1

  return (
    <Reveal>
      <article
        onPointerMove={trackSpotlight}
        style={{ '--glow': p.color } as CSSProperties}
        className="spotlight card grid grid-cols-[minmax(0,1fr)] gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            className={`absolute -top-24 size-80 rounded-full opacity-20 blur-[100px] ${flip ? '-left-20' : '-right-20'}`}
            style={{ background: p.color }}
          />
        </div>

        <div className={`relative lg:sticky lg:top-28 lg:self-start ${flip ? 'lg:order-2' : ''}`}>
          <BrowserShot p={p} />
        </div>

        <div className="relative flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-subtle">0{i + 1} — {p.year}</span>
            <span className="chip ml-auto">
              <span className="size-1.5 rounded-full" style={{ background: p.color }} />
              {p.platforms?.includes('Android') ? <Smartphone className="size-3" /> : <Globe className="size-3" />}
              {p.platforms?.join(' · ')}
            </span>
          </div>

          <h3 className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{p.name}</h3>
          <p className="serif mt-1 text-2xl text-muted">{p.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{p.description}</p>

          {p.highlights && (
            <ul className="mt-6 space-y-2.5 text-[14.5px]">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[9px] h-px w-3 shrink-0" style={{ background: p.color }} />
                  <span className="text-fg/85">{h}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Links p={p} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Compact({ p, i, wide }: { p: Project; i: number; wide?: boolean }) {
  return (
    <Reveal delay={i * 0.08} className={`h-full ${wide ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <article
        onPointerMove={trackSpotlight}
        style={{ '--glow': p.color } as CSSProperties}
        className={`spotlight card flex h-full flex-col p-4 transition-transform duration-500 hover:-translate-y-1 ${wide ? 'md:flex-row md:gap-6 lg:flex-col lg:gap-0' : ''}`}
      >
        <BrowserShot p={p} className={wide ? 'md:w-1/2 md:shrink-0 md:self-start lg:w-auto' : ''} />
        <div className={`flex flex-1 flex-col px-1 pt-5 pb-1 ${wide ? 'md:pt-2 lg:pt-5' : ''}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">{p.name}</h3>
            <span className="font-mono text-xs text-subtle">{p.year}</span>
          </div>
          <p className="serif text-lg text-muted">{p.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-2 pt-4 text-sm">
            <a href={p.live} target="_blank" rel="noopener" className="group -ml-2 inline-flex items-center gap-1 rounded-lg px-2 py-2.5 font-medium hover:text-accent-ink">
              Live <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={p.source} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-muted hover:text-fg">
              <GithubIcon className="size-3.5" /> Source
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" aria-label="Selected work" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="01" label="Selected work" title={['Things I’ve', <span className="serif text-accent-ink">shipped.</span>]}>
          Real products, live in production, built end to end from the database to the pixel.
        </SectionHead>

        <div className="mt-14 space-y-6 sm:mt-20">
          {featured.map((p, i) => (
            <Featured key={p.name} p={p} i={i} />
          ))}
        </div>

        <Reveal className="mt-20 mb-8 flex items-center gap-4">
          <span className="eyebrow">More projects</span>
          <span className="h-px flex-1 bg-line" />
          <a href={profile.socials.github} target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 py-2.5 text-sm text-muted hover:text-fg">
            <GithubIcon className="size-4" /> All on GitHub
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Compact key={p.name} p={p} i={i} wide={rest.length % 2 === 1 && i === rest.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
