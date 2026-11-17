import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import About from './components/About'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Education from './components/Education'
import Projects from './components/Projects'
import Sidebar from './components/Sidebar'
import Skills from './components/Skills'

export default function App() {
  const glow = useRef<HTMLDivElement>(null)

  // smooth scrolling (skipped for reduced-motion users)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  // soft light that follows the cursor (mouse and trackpad only)
  useEffect(() => {
    const el = glow.current
    if (!el || !matchMedia('(pointer: fine)').matches) return
    const on = (e: PointerEvent) => {
      el.style.setProperty('--gx', `${e.clientX}px`)
      el.style.setProperty('--gy', `${e.clientY}px`)
    }
    addEventListener('pointermove', on, { passive: true })
    return () => removeEventListener('pointermove', on)
  }, [])

  return (
    <>
      <a
        href="#content"
        className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div ref={glow} aria-hidden="true" className="cursor-glow pointer-events-none fixed inset-0 z-30" />
      <CommandPalette />

      <div className="container-x lg:flex lg:justify-between lg:gap-16 xl:gap-24">
        <Sidebar />
        <main id="content" className="min-w-0 lg:w-[58%] lg:py-20">
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
    </>
  )
}
