import { motion } from 'motion/react'
import { ArrowDownRight, Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/resume'
import { ease, Magnetic, socials, useClock, useCopyEmail } from './ui'

type Line = { kind: 'cmd' | 'out'; text: string; tone?: 'ok' | 'accent' | 'dim' }

const script: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'priyanshu singh · full-stack developer' },
  { kind: 'cmd', text: 'cat stack.txt' },
  { kind: 'out', tone: 'ok', text: 'frontend   react · next.js · tailwind' },
  { kind: 'out', tone: 'ok', text: 'mobile     react native · expo' },
  { kind: 'out', tone: 'ok', text: 'backend    node.js · express · java' },
  { kind: 'out', tone: 'ok', text: 'data       postgresql · mongodb · redis' },
  { kind: 'cmd', text: 'cat status.txt' },
  { kind: 'out', tone: 'accent', text: 'open to internships & full-time roles' },
]

function Terminal() {
  const reduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [shown, setShown] = useState(reduced ? script.length : 0)
  const [typed, setTyped] = useState(0)
  const time = useClock()

  useEffect(() => {
    if (shown >= script.length) return
    const line = script[shown]
    if (line.kind === 'out') {
      const t = setTimeout(() => setShown((s) => s + 1), 140)
      return () => clearTimeout(t)
    }
    if (typed < line.text.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 38 + Math.random() * 40)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1)
      setTyped(0)
    }, 320)
    return () => clearTimeout(t)
  }, [shown, typed])

  const done = shown >= script.length
  const current = script[shown]

  return (
    <div className="card overflow-hidden shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[11px] text-subtle">priyanshu@noida — zsh</span>
        <span className="ml-auto shrink-0 pl-2 font-mono text-[11px] whitespace-nowrap text-subtle tabular-nums">{time} IST</span>
      </div>
      <div className="no-scrollbar min-h-[300px] overflow-x-auto p-4 font-mono text-[11px] leading-[1.9] sm:p-5 sm:text-[13px]" aria-hidden="true">
        {script.slice(0, shown).map((l, i) => (
          <TermLine key={i} line={l} />
        ))}
        {!done && current.kind === 'cmd' && (
          <p>
            <span className="text-accent-ink">❯</span> <span className="text-subtle">~</span> {current.text.slice(0, typed)}
            <Caret />
          </p>
        )}
        {done && (
          <p>
            <span className="text-accent-ink">❯</span> <span className="text-subtle">~</span> <Caret />
          </p>
        )}
      </div>
      <p className="sr-only">
        {profile.name}, full-stack developer working across frontend, mobile, backend and data. Open to internships and
        full-time roles.
      </p>
    </div>
  )
}

const Caret = () => <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-fg/80" />

function TermLine({ line }: { line: Line }) {
  if (line.kind === 'cmd')
    return (
      <p>
        <span className="text-accent-ink">❯</span> <span className="text-subtle">~</span> {line.text}
      </p>
    )
  return (
    <p className={`whitespace-pre ${line.tone === 'accent' ? 'text-accent-ink' : line.tone === 'ok' ? 'text-fg/85' : 'text-muted'}`}>
      {line.tone === 'ok' && <span className="text-emerald-500">✓ </span>}
      {line.tone === 'accent' && <span>● </span>}
      {line.text}
    </p>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { copied, copy } = useCopyEmail()

  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(pointer: fine)').matches) return
    const on = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', on)
    return () => el.removeEventListener('pointermove', on)
  }, [])

  const up = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:min-h-svh lg:pb-24">
      {/* backgrounds */}
      <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_30%,transparent_100%)]" />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [--dot:var(--accent-ink)] [mask-image:radial-gradient(220px_circle_at_var(--mx,-999px)_var(--my,-999px),#000,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <motion.a {...up(0)} href="#contact" className="chip group gap-2 py-1.5 pr-3 pl-2 text-[11.5px] hover:border-line-strong">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="sm:hidden">Open to work</span>
            <span className="hidden sm:inline">Available for internships & full-time</span>
            <ArrowDownRight className="size-3 -rotate-90 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            <span className="sr-only">{profile.name}, </span>
            {['Full-stack developer', 'shipping to'].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1 + i * 0.08, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.26, ease }}>
                <span className="serif text-accent-ink">web</span> <span className="text-muted">&</span>{' '}
                <span className="serif text-accent-ink">mobile.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p {...up(0.35)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I’m <span className="text-fg">Priyanshu Singh</span>, a developer who turns ideas into fast, reliable products. I work
            across the whole stack, from data and APIs to the interfaces people use every day, on the web and on mobile.
          </motion.p>

          <motion.div {...up(0.45)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="btn btn-accent group h-12 px-6">
                See my work
                <ArrowDownRight className="size-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <button onClick={copy} className="btn btn-ghost h-12 px-5" aria-live="polite">
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          style={{ transformPerspective: 1200 }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-accent/20 via-transparent to-indigo-500/20 blur-3xl" />
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
