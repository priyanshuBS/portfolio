import { MapPin, Sparkles } from 'lucide-react'
import { about, profile, projects, stats } from '../data/resume'
import { CountUp, Reveal, SectionHead, trackSpotlight, useClock } from './ui'

export default function About() {
  const time = useClock()
  const latest = projects.filter((p) => p.featured)

  return (
    <section id="about" aria-label="About" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="02" label="About" title={['Engineer by trade,', <span className="serif text-accent-ink">builder by habit.</span>]} />

        <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-6">
          {/* bio */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <div onPointerMove={trackSpotlight} className="spotlight card flex h-full flex-col p-7 sm:p-10">
              <p className="eyebrow">Hello there</p>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted sm:text-xl">
                {about.map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-fg' : ''}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-10">
                {['Product-minded', 'Type-safe', 'Offline-first', 'Tested', 'Detail-obsessed'].map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* location */}
          <Reveal delay={0.08} className="md:col-span-2">
            <div className="card relative h-full overflow-hidden p-7">
              <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(circle_at_70%_40%,#000,transparent_70%)]" />
              <div aria-hidden="true" className="absolute top-[38%] left-[68%] grid size-4 place-items-center">
                <span className="absolute size-10 animate-ping rounded-full bg-accent/30" />
                <span className="size-3 rounded-full border-2 border-bg bg-accent-ink" />
              </div>
              <div className="relative">
                <MapPin className="size-5 text-muted" />
                <p className="mt-16 text-2xl font-semibold tracking-tight">{profile.location}</p>
                <p className="mt-1 font-mono text-xs text-subtle tabular-nums">{time} · IST (UTC+5:30)</p>
              </div>
            </div>
          </Reveal>

          {/* now */}
          <Reveal delay={0.12} className="md:col-span-2">
            <div className="card h-full bg-accent p-7 text-on-accent">
              <Sparkles className="size-5" />
              <p className="mt-6 font-mono text-[11px] tracking-[0.16em] uppercase opacity-70">Currently</p>
              <p className="mt-2 text-xl leading-snug font-semibold tracking-tight">
                Polishing {latest.map((p) => p.name).join(' & ')} for the app stores, and looking for my next team.
              </p>
            </div>
          </Reveal>

          {/* stats */}
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i} className="md:col-span-2">
              <div onPointerMove={trackSpotlight} className="spotlight card h-full p-7">
                <p className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                  <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
