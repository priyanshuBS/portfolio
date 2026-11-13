import { animate, motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { profile } from '../data/resume'

export const ease = [0.22, 1, 0.36, 1] as const

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Text that slides up from behind a mask, line by line. */
export function MaskText({ lines, className = '', delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionHead({ index, label, title, children }: { index: string; label: string; title: ReactNode[]; children?: ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <Reveal className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-accent-ink">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="eyebrow">{label}</span>
        </Reveal>
        <h2 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
          <MaskText lines={title} />
        </h2>
      </div>
      {children && <Reveal delay={0.1} className="max-w-sm text-muted md:text-right">{children}</Reveal>}
    </div>
  )
}

/** Pulls its child toward the cursor. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}

/** Pointer handler for `.spotlight` elements: feeds the cursor position to CSS. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: setVal })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

type Theme = 'dark' | 'light'
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) || 'dark')
  useEffect(() => {
    const sync = () => setTheme((document.documentElement.dataset.theme as Theme) || 'dark')
    addEventListener('themechange', sync)
    return () => removeEventListener('themechange', sync)
  }, [])
  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f7f4' : '#09090b')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
    dispatchEvent(new Event('themechange'))
  }, [])
  return { theme, toggle }
}

export function useCopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }, [])
  return { copied, copy }
}

/* ---------- brand icons (not included in lucide) ---------- */
type IconProps = { className?: string }

export const GithubIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

export const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

export const LeetcodeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.21l-2.69 2.88a5.27 5.27 0 0 0-.07 7.28l4.33 4.36a5.25 5.25 0 0 0 7.27.21l2.55-2.28a1.38 1.38 0 0 0-1.83-2.06l-2.55 2.28a2.5 2.5 0 0 1-3.43-.11L6.37 14.4a2.5 2.5 0 0 1 .03-3.42l2.69-2.88 5.4-5.77A1.38 1.38 0 0 0 13.48 0zm-2.87 12.96a1.37 1.37 0 1 0 0 2.75h9.51a1.37 1.37 0 1 0 0-2.75h-9.5z" />
  </svg>
)

export const socials = [
  { href: profile.socials.github, label: 'GitHub', Icon: GithubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: profile.socials.leetcode, label: 'LeetCode', Icon: LeetcodeIcon },
]
