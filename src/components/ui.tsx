import { motion } from 'motion/react'
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { profile } from '../data/resume'

export const ease = [0.22, 1, 0.36, 1] as const

export const navLinks = [
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

/** Gentle fade-in when scrolled into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** A page section with a small, quiet heading. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-20 scroll-mt-10 sm:mt-24">
      <Reveal>
        <h2 id={`${id}-title`} className="mb-6 text-sm font-medium text-subtle">
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
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

/* ---------- light / dark theme ---------- */
type Theme = 'dark' | 'light'
const THEME_COLOR = { light: '#fbfbfa', dark: '#0f0f0f' }

function applyTheme(next: Theme, save: boolean) {
  document.documentElement.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next])
  if (save) {
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }
  dispatchEvent(new Event('themechange'))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) || 'light')

  useEffect(() => {
    const sync = () => setTheme((document.documentElement.dataset.theme as Theme) || 'light')
    addEventListener('themechange', sync)
    // follow the device setting until the visitor picks a theme themselves
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onSystem = () => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem('theme')
      } catch {
        /* storage unavailable */
      }
      if (!saved) applyTheme(mq.matches ? 'dark' : 'light', false)
    }
    mq.addEventListener('change', onSystem)
    return () => {
      removeEventListener('themechange', sync)
      mq.removeEventListener('change', onSystem)
    }
  }, [])

  /** Switches theme; with a click event, the new theme spreads out in a circle from the pointer. */
  const toggle = useCallback((e?: MouseEvent) => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced) return applyTheme(next, true)

    const x = e?.clientX ?? innerWidth / 2
    const y = e?.clientY ?? innerHeight / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = document.startViewTransition(() => applyTheme(next, true))
    t.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {})
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
