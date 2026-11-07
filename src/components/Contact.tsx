import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/resume'
import { Magnetic, MaskText, Reveal, socials, useClock } from './ui'

function Marquee() {
  const items = Array.from({ length: 4 })
  return (
    <div className="flex overflow-hidden border-y border-white/10 py-6 sm:py-8" aria-hidden="true">
      <div className="flex w-max shrink-0 animate-marquee items-center">
        {[...items, ...items].map((_, i) => (
          <span key={i} className="flex items-center font-display text-6xl font-bold tracking-[-0.04em] whitespace-nowrap sm:text-8xl">
            <span className={i % 2 ? 'text-stroke' : ''}>Let’s work together</span>
            <span className="mx-8 text-4xl text-violet sm:mx-12 sm:text-6xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Contact() {
  const time = useClock()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer id="contact" className="relative overflow-hidden pt-20 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[min(1100px,140%)] -translate-x-1/2 translate-y-1/3 rounded-full bg-violet/25 blur-[150px]" />

      <Marquee />

      <div className="container-x relative py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-lilac">(05) Contact</p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.92] font-bold tracking-[-0.045em]">
              <MaskText lines={['Have an idea?', <span className="gradient-text">Let’s build it.</span>]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg text-muted">
                Open to internships, full-time roles and freelance work. My inbox is always open.
              </p>
              <button
                onClick={copy}
                className="group mt-8 inline-flex max-w-full items-center gap-3 border-b border-white/20 pb-2 font-display text-xl font-medium transition-colors hover:border-white sm:text-3xl"
                aria-live="polite"
              >
                <span className="truncate">{copied ? 'Copied to clipboard!' : profile.email}</span>
                {copied ? <Check className="size-5 shrink-0 text-emerald-400" /> : <Copy className="size-5 shrink-0 text-muted group-hover:text-fg" />}
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="justify-self-center lg:justify-self-end">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${profile.email}`}
                className="group relative grid size-44 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet via-indigo-500 to-cyan-500 text-center font-display text-lg font-semibold text-white shadow-[0_20px_80px_-20px_rgb(139_92_246/0.9)] sm:size-52"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                <span className="relative flex flex-col items-center gap-1 transition-colors duration-500 group-hover:text-bg">
                  <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:rotate-45" />
                  Get in touch
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow">Socials</p>
            <ul className="mt-4 space-y-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener" className="group inline-flex items-center gap-2.5 text-fg/80 hover:text-fg">
                    <Icon className="size-4" /> {label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Local time</p>
            <p className="mt-4 text-fg/80">
              {time} · {profile.location}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end">
            <p className="text-muted sm:order-2">© {new Date().getFullYear()} {profile.name}</p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-fg/80 hover:text-fg sm:order-1"
            >
              Back to top
              <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors group-hover:bg-white group-hover:text-bg">
                <ArrowUp className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative -mb-[3vw] text-center font-display text-[19vw] leading-none font-extrabold tracking-[-0.06em] text-white/[0.04] select-none"
      >
        PRIYANSHU
      </p>
    </footer>
  )
}
