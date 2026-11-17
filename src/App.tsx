import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <CommandPalette />
      <div className="mx-auto max-w-[680px] px-5 pt-10 pb-12 sm:px-6 sm:pt-16">
        <Intro />
        <main>
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  )
}
