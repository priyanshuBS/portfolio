import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { about, profile, stats } from '../data/resume'
import { socials, useTheme } from './ui'

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

// CSS fade-in (see .fade-up in index.css) so the pre-rendered HTML stays visible to crawlers without JavaScript
const fade = (delay: number) => ({ style: { animationDelay: `${delay}s` } })

export default function Intro() {
  const links = [{ href: `mailto:${profile.email}`, label: 'Email' }, ...socials.map(({ href, label }) => ({ href, label }))]

  return (
    <>
      <header {...fade(0)} className="fade-up flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-fg text-sm font-bold text-bg">PS</span>
          <span className="leading-tight">
            <span className="block font-medium">{profile.name}</span>
            <span className="block text-sm text-subtle">{profile.title}</span>
          </span>
        </a>
        <ThemeToggle />
      </header>

      <section id="top" className="mt-16 sm:mt-24">
        <p {...fade(0.05)} className="fade-up flex items-center gap-2 text-sm text-muted">
          <span className="size-2 rounded-full bg-emerald-500" /> Open to internships and full-time roles
        </p>
        <h1 {...fade(0.1)} className="fade-up mt-5 text-[clamp(2rem,6vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
          I’m {profile.name}, a software engineer building fast, reliable products for the web and mobile.
        </h1>
        <div {...fade(0.15)} className="fade-up mt-6 space-y-4 leading-relaxed text-muted">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <ul {...fade(0.2)} className="fade-up mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener" className="link group inline-flex items-center gap-0.5 font-medium">
                {l.label}
                <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <dl {...fade(0.25)} className="fade-up mt-12 grid grid-cols-3 gap-4 border-y border-line py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{s.value.toFixed(s.decimals)}</dd>
              <dd className="mt-1 text-xs leading-snug text-subtle sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
