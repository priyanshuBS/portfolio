import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { openPalette } from './Navbar'
import { Magnetic, MaskText, Reveal, socials, useClock, useCopyEmail } from './ui'

export default function Contact() {
  const time = useClock()
  const { copied, copy } = useCopyEmail()

  return (
    <footer id="contact" className="relative overflow-hidden pt-16 sm:pt-24">
      <div className="container-x">
        <div className="card relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent)]" />
          <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-80 w-[700px] max-w-[160%] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />

          <div className="relative">
            <Reveal className="flex justify-center">
              <span className="chip gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Replies within a day
              </span>
            </Reveal>
            <h2 className="mx-auto mt-7 max-w-3xl text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
              <MaskText lines={['Have an idea?', <span className="serif text-accent-ink">Let’s build it.</span>]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-md text-lg text-muted">
                Open to internships, full-time roles and freelance work. Tell me what you’re building.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a href={`mailto:${profile.email}`} className="btn btn-accent group h-13 px-7 text-[15px]">
                    <Mail className="size-4" /> Say hello
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <button onClick={copy} className="btn btn-ghost h-13 px-6 font-mono text-[13px]" aria-live="polite">
                  {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  {copied ? 'Copied to clipboard' : profile.email}
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 pb-10 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener" className="group inline-flex items-center gap-2.5 py-2 text-muted hover:text-fg">
                    <Icon className="size-4" /> {label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Local time</p>
            <p className="mt-4 text-muted tabular-nums">
              {time} · {profile.location}
            </p>
            <button onClick={openPalette} className="mt-1 hidden items-center gap-2 py-2 text-muted hover:text-fg sm:inline-flex">
              Press <span className="kbd">{/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘' : 'Ctrl'}</span>
              <span className="kbd">K</span> to explore
            </button>
          </div>
          <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end">
            <p className="text-subtle sm:order-2">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <a href="#top" className="group inline-flex items-center gap-2 text-muted hover:text-fg sm:order-1">
              Back to top
              <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-transparent group-hover:bg-accent group-hover:text-on-accent">
                <ArrowUp className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[2.5vw] bg-gradient-to-b from-fg/[0.07] to-transparent bg-clip-text text-center text-[18vw] leading-none font-bold tracking-[-0.06em] text-transparent select-none"
      >
        PRIYANSHU
      </p>
    </footer>
  )
}
