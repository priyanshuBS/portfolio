import Lenis from 'lenis'
import { useEffect } from 'react'
import About from './components/About'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Education from './components/Education'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  // smooth scrolling (skipped for reduced-motion users)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } })
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

  return (
    <>
      <a
        href="#work"
        className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Skills />
        <Education />
      </main>
      <Contact />
    </>
  )
}
