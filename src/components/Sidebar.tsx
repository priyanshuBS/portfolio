import { AnimatePresence, motion } from 'motion/react'
import { Command, Mail, MapPin, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import { ease, navLinks, socials, useClock, useTheme } from './ui'

export const openPalette = () => dispatchEvent(new Event('open-palette'))

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.22 }}
        >
          {theme === 'dark' ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/** Which section is currently in view, for the desktop nav. */
function useActiveSection() {
  const [active, setActive] = useState(navLinks[0].id)
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const update = () => {
      const line = innerHeight * 0.4
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      const current = atBottom ? els[els.length - 1] : [...els].reverse().find((el) => el.getBoundingClientRect().top <= line)
      setActive(current?.id ?? navLinks[0].id)
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  }, [])
  return active
}

export default function Sidebar() {
  const active = useActiveSection()
  const time = useClock()

  const up = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <header
      id="top"
      className="pt-16 pb-14 sm:pt-24 no-scrollbar lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-[42%] lg:shrink-0 lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-16"
    >
      <div>
        <motion.div {...up(0)} className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-fg font-display text-sm font-bold tracking-tight text-bg">PS</span>
          <a href="#contact" className="chip gap-2 py-1.5 pr-3 pl-2.5 transition-colors hover:border-line-strong hover:text-fg">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to work
          </a>
        </motion.div>

        <motion.h1 {...up(0.06)} className="display mt-8 text-[clamp(3rem,6.2vw,4.6rem)] leading-[0.95]">
          Priyanshu
          <br />
          Singh
        </motion.h1>
        <motion.p {...up(0.12)} className="mt-5 text-lg font-medium sm:text-xl">
          Full-stack & mobile developer
        </motion.p>
        <motion.p {...up(0.18)} className="mt-4 max-w-sm leading-relaxed text-muted">
          I build fast, reliable products for the <span className="serif text-[1.15em] text-fg">web</span> and{' '}
          <span className="serif text-[1.15em] text-fg">mobile</span>, from data and APIs to the interfaces people use every day.
        </motion.p>

        <motion.nav {...up(0.24)} className="mt-14 hidden lg:block" aria-label="Sections">
          <ul>
            {navLinks.map((l, i) => {
              const on = active === l.id
              return (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group flex items-center gap-4 py-2.5" aria-current={on ? 'true' : undefined}>
                    <span className={`font-mono text-[11px] transition-colors ${on ? 'text-fg' : 'text-subtle'}`}>0{i + 1}</span>
                    <span
                      className={`h-px transition-all duration-300 ${on ? 'w-16 bg-fg' : 'w-8 bg-line-strong group-hover:w-16 group-hover:bg-fg'}`}
                    />
                    <span
                      className={`font-mono text-xs tracking-[0.16em] uppercase transition-colors ${
                        on ? 'text-fg' : 'text-subtle group-hover:text-fg'
                      }`}
                    >
                      {l.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      </div>

      <motion.div {...up(0.3)} className="mt-10">
        <div className="flex flex-wrap items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Mail className="size-[18px]" />
          </a>
          <span className="mx-1.5 h-5 w-px bg-line-strong" />
          <ThemeToggle />
          <button
            onClick={openPalette}
            aria-label="Open command menu"
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-muted transition-colors hover:bg-surface-2 hover:text-fg [@media(pointer:fine)]:flex"
          >
            <Command className="size-3.5" />
            <span className="kbd">K</span>
          </button>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-subtle">
          <MapPin className="size-3.5" /> {profile.location} · <span className="tabular-nums">{time}</span> IST
        </p>
      </motion.div>
    </header>
  )
}
