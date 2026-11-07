import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import { ease, Magnetic, navLinks, socials } from './ui'

export default function Navbar({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)
  const [atContact, setAtContact] = useState(false)

  useEffect(() => {
    const el = document.getElementById("contact")
    if (!el) return
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        className="pointer-events-none fixed inset-x-0 top-0 z-[79] h-24 bg-gradient-to-b from-bg via-bg/75 to-transparent"
      />
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-[80] mix-blend-difference"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white" aria-label="Back to top">
            PS<span className="text-white/50">©</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="group relative text-sm font-medium text-white">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 text-sm font-medium text-white md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            Menu
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-6 bg-white" />
              <span className="h-px w-6 bg-white" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] flex flex-col bg-[#0b0a12]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div aria-hidden="true" className="absolute -top-40 -right-40 size-[500px] rounded-full bg-violet/25 blur-[120px]" />
            <div className="container-x relative flex h-20 items-center justify-between">
              <span className="font-display text-lg font-bold">PS©</span>
              <button onClick={() => setOpen(false)} className="flex items-center gap-3 text-sm font-medium" aria-label="Close menu">
                Close
                <span className="relative size-6">
                  <span className="absolute top-1/2 left-0 h-px w-6 rotate-45 bg-white" />
                  <span className="absolute top-1/2 left-0 h-px w-6 -rotate-45 bg-white" />
                </span>
              </button>
            </div>

            <nav className="container-x relative flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <div key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease }}
                    className="flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight sm:text-7xl"
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            <div className="container-x relative flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
              <a href={`mailto:${profile.email}`} className="text-fg">
                {profile.email}
              </a>
              <div className="flex gap-5">
                {socials.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener" className="hover:text-fg">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating contact button on desktop */}
      <motion.div
        initial={{ scale: 0 }}
        animate={ready && !atContact ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.6, ease }}
        className="fixed right-6 bottom-6 z-[70] hidden lg:block"
      >
        <Magnetic>
          <a
            href="#contact"
            className="grid size-20 place-items-center rounded-full bg-fg text-xs font-semibold text-bg shadow-[0_10px_40px_-10px_rgb(139_92_246/0.9)] transition-transform hover:scale-105"
          >
            Let’s talk
          </a>
        </Magnetic>
      </motion.div>
    </>
  )
}
