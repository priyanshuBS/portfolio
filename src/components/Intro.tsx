import { motion } from 'motion/react'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { about, profile, stats } from '../data/resume'
import { ease, socials, useTheme } from './ui'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      onClick={(e) => toggle(e)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

export default function Intro() {
  const links = [{ href: `mailto:${profile.email}`, label: 'Email' }, ...socials.map(({ href, label }) => ({ href, label }))]

  return (
    <>
      <motion.header {...fade(0)} className="flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-fg text-sm font-bold text-bg">PS</span>
          <span className="leading-tight">
            <span className="block font-medium">{profile.name}</span>
            <span className="block text-sm text-subtle">{profile.title}</span>
          </span>
        </a>
        <ThemeToggle />
      </motion.header>

      <section id="top" className="mt-16 sm:mt-24">
        <motion.p {...fade(0.05)} className="flex items-center gap-2 text-sm text-muted">
          <span className="size-2 rounded-full bg-emerald-500" /> Open to internships and full-time roles
        </motion.p>
        <motion.h1 {...fade(0.1)} className="mt-5 text-[clamp(2rem,6vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
          I build fast, reliable products for the web and mobile.
        </motion.h1>
        <motion.div {...fade(0.15)} className="mt-6 space-y-4 leading-relaxed text-muted">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.ul {...fade(0.2)} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener" className="link group inline-flex items-center gap-0.5 font-medium">
                {l.label}
                <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.dl {...fade(0.25)} className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{s.value.toFixed(s.decimals)}</dd>
              <dd className="mt-1 text-xs leading-snug text-subtle sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </section>
    </>
  )
}
