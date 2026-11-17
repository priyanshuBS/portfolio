import { about, stats } from '../data/resume'
import { CountUp, Reveal, Section } from './ui'

export default function About() {
  return (
    <Section id="about" index="01" label="About">
      <Reveal>
        <p className="display text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.025em]">
          Engineer by trade, <span className="serif text-[1.08em]">builder by habit.</span> I own work from the first idea to the
          final release.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 space-y-5 leading-relaxed text-muted sm:text-[17px]">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-6 first:pl-0 sm:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-3xl sm:text-5xl">
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dd className="mt-2 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-8 flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" />
          <span>
            <span className="font-medium text-fg">Currently</span> building and shipping new products, and looking for an internship or
            full-time role where I can do the same.
          </span>
        </p>
      </Reveal>
    </Section>
  )
}
