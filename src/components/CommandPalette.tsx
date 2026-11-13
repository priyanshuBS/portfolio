import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, AtSign, Copy, CornerDownLeft, ExternalLink, Hash, Search, SunMoon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { profile, projects } from '../data/resume'
import { navLinks, socials, useTheme } from './ui'

type Item = { id: string; label: string; group: string; hint?: string; Icon: ComponentType<{ className?: string }>; run: () => void }

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const open = (url: string) => window.open(url, '_blank', 'noopener')

export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const { toggle } = useTheme()

  const items = useMemo<Item[]>(
    () => [
      ...navLinks.map((l) => ({ id: `nav-${l.id}`, label: l.label, group: 'Navigate', Icon: Hash, run: () => go(l.id) })),
      ...projects.map((p) => ({
        id: `p-${p.name}`,
        label: `Open ${p.name}`,
        hint: new URL(p.live).host,
        group: 'Projects',
        Icon: ExternalLink,
        run: () => open(p.live),
      })),
      {
        id: 'copy',
        label: 'Copy email address',
        hint: profile.email,
        group: 'Actions',
        Icon: Copy,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      { id: 'mail', label: 'Send an email', group: 'Actions', Icon: AtSign, run: () => (location.href = `mailto:${profile.email}`) },
      { id: 'theme', label: 'Toggle light / dark theme', group: 'Actions', Icon: SunMoon, run: toggle },
      ...socials.map((s) => ({ id: `s-${s.label}`, label: s.label, group: 'Socials', Icon: s.Icon, run: () => open(s.href) })),
    ],
    [toggle],
  )

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ''}`.toLowerCase().includes(t)) : items
  }, [q, items])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    addEventListener('keydown', onKey)
    addEventListener('open-palette', onOpen)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener('open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    setQ('')
    setSel(0)
    const t = setTimeout(() => input.current?.focus(), 30)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => setSel(0), [q])
  useEffect(() => {
    list.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const run = (item?: Item) => {
    if (!item) return
    setOpen(false)
    setTimeout(item.run, 120)
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => (s + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[sel])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="card w-full max-w-lg overflow-hidden shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-subtle" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type a command or search…"
                className="h-13 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[sel] ? `cmd-${filtered[sel].id}` : undefined}
              />
              <span className="kbd">esc</span>
            </div>

            <ul ref={list} id="cmd-list" role="listbox" className="no-scrollbar max-h-[min(380px,55vh)] overflow-y-auto p-2" data-lenis-prevent>
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-subtle">No results for “{q}”</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup
                lastGroup = item.group
                return (
                  <li key={item.id} role="presentation">
                    {header && <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.14em] text-subtle uppercase">{item.group}</p>}
                    <button
                      id={`cmd-${item.id}`}
                      data-i={i}
                      role="option"
                      aria-selected={i === sel}
                      onMouseMove={() => setSel(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === sel ? 'bg-surface-2 text-fg' : 'text-muted'
                      }`}
                    >
                      <item.Icon className="size-4 shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && <span className="hidden truncate font-mono text-[11px] text-subtle sm:block">{item.hint}</span>}
                      {i === sel && <CornerDownLeft className="size-3.5 shrink-0 text-subtle" />}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
              <span className="flex items-center gap-1.5">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span> navigate
                <span className="kbd ml-2">↵</span> select
              </span>
              <span className="flex items-center gap-1">
                <ArrowRight className="size-3" /> priyanshusingh.co.in
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
