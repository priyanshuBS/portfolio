import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { profile, projects, type Project } from '../data/resume'
import { GithubIcon, MaskText, Reveal, SectionLabel, useMedia } from './ui'

const glows = ['bg-indigo-500/30', 'bg-violet-500/30', 'bg-cyan-500/25']

function ProjectCard({ p, i, wide }: { p: Project; i: number; wide?: boolean }) {
  return (
    <article
      className={`glass group relative flex shrink-0 flex-col overflow-hidden rounded-[28px] ${
        wide ? 'h-[min(72vh,640px)] w-[min(78vw,1100px)] lg:flex-row' : 'w-full'
      }`}
    >
      <div aria-hidden="true" className={`pointer-events-none absolute -top-32 -left-32 size-96 rounded-full blur-[110px] ${glows[i % glows.length]}`} />

      {/* screenshot */}
      <a
        href={p.live}
        target="_blank"
        rel="noopener"
        aria-label={`Open ${p.name}`}
        data-cursor
        className={`relative m-3 overflow-hidden rounded-[20px] border border-white/10 bg-black sm:m-4 ${
          wide ? 'aspect-[16/10] lg:w-[60%] lg:shrink-0 lg:self-center' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          loading="lazy"
          width={1440}
          height={900}
          className="size-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute right-4 bottom-4 grid size-12 translate-y-2 place-items-center rounded-full bg-white text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </a>

      {/* info */}
      <div className="relative flex flex-1 flex-col p-6 pt-3 sm:p-8 sm:pt-4 lg:pt-8">
        <div className="flex items-center justify-between font-mono text-xs text-muted">
          <span>({String(i + 1).padStart(2, '0')})</span>
          <span>{new URL(p.live).host}</span>
        </div>
        <h3 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{p.name}</h3>
        <p className="gradient-text mt-2 font-medium">{p.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="pill">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a href={p.live} target="_blank" rel="noopener" className="btn btn-light h-11 px-5">
            Visit site <ArrowUpRight className="size-4" />
          </a>
          <a href={p.source} target="_blank" rel="noopener" className="btn btn-glass h-11 px-5">
            <GithubIcon className="size-4" /> Code
          </a>
        </div>
      </div>
    </article>
  )
}

function Intro() {
  return (
    <div className="flex shrink-0 flex-col justify-between lg:h-[min(72vh,640px)] lg:w-[min(34vw,460px)]">
      <div>
        <SectionLabel index="02">Selected work</SectionLabel>
        <h2 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.045em]">
          <MaskText lines={['Things', 'I’ve', <span className="text-stroke">shipped.</span>]} />
        </h2>
      </div>
      <Reveal className="mt-8 max-w-xs lg:mt-0">
        <p className="text-muted">Real products, live in production — built end-to-end from database to UI.</p>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium"
        >
          <GithubIcon className="size-4" /> More on GitHub
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </div>
  )
}

/** Desktop: vertical scroll drives a horizontal track. */
function HorizontalGallery() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  return (
    <section
      ref={section}
      id="projects"
      aria-label="Selected work"
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 size-[600px] rounded-full bg-cyan/10 blur-[150px]" />
        <motion.div ref={track} style={{ x }} className="flex items-center gap-8 pr-[8vw] pl-12 xl:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} wide />
          ))}
        </motion.div>

        {/* progress */}
        <div className="absolute right-36 bottom-8 left-12 flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          <span>Scroll</span>
          <div className="h-px flex-1 bg-white/10">
            <motion.div style={{ scaleX: smooth }} className="h-px origin-left bg-gradient-to-r from-violet to-cyan" />
          </div>
          <span>{String(projects.length).padStart(2, '0')} projects</span>
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  const desktop = useMedia('(min-width: 1024px)')
  if (desktop) return <HorizontalGallery />

  return (
    <section id="projects" aria-label="Selected work" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Intro />
        <div className="mt-14 space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.name}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
