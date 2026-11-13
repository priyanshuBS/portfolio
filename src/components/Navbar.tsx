import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ease, navLinks, useTheme } from './ui'

export const openPalette = () => dispatchEvent(new Event('open-palette'))

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`relative grid size-9 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const update = () => {
      const line = innerHeight * 0.45
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      const current = atBottom ? els[els.length - 1] : [...els].reverse().find((el) => el.getBoundingClientRect().top <= line)
      setActive(current?.id ?? '')
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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-accent" />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-3 z-[80] px-3 sm:top-4"
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pr-2 pl-4 transition-all duration-500 ${
            scrolled || open ? 'border-line bg-bg/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Priyanshu Singh, back to top">
            <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg transition-transform group-hover:-rotate-6">
              PS
            </span>
            <span className="hidden text-sm font-medium sm:block md:hidden lg:block">Priyanshu Singh</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === l.id ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-2" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={openPalette}
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <Command className="size-3.5" />
              <span className="kbd">K</span>
            </button>
            <ThemeToggle />
            <a href="#contact" className="btn btn-accent ml-1 hidden h-9 px-4 text-[13px] sm:inline-flex">
              Hire me
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid size-9 place-items-center rounded-full text-fg hover:bg-surface-2 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="card mx-auto mt-2 max-w-6xl overflow-hidden p-2 shadow-2xl md:hidden"
              aria-label="Mobile"
            >
              {navLinks.map((l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium hover:bg-surface-2"
                >
                  {l.label}
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  openPalette()
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm text-muted hover:bg-surface-2"
              >
                <Command className="size-4" /> Command menu
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
