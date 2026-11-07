import { useEffect, useRef } from 'react'
import { skills } from '../data/resume'
import { MaskText, Reveal, SectionLabel } from './ui'

const extra = ['WebSockets', 'JWT', 'Pinecone', 'RAG', 'REST APIs', 'Vercel']
const all = [...skills.flatMap((g) => g.items), ...extra]

/** A 3D sphere of words that spins toward the cursor. */
function TagSphere() {
  const box = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = box.current
    if (!el) return
    const n = all.length
    const pts = all.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.sqrt(n * Math.PI) * phi
      return { x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) }
    })
    let vx = 0.003
    let vy = 0.002
    let tx = vx
    let ty = vy
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.02
      ty = -((e.clientY - r.top) / r.height - 0.5) * 0.02
    }
    const onLeave = () => {
      tx = 0.003
      ty = 0.002
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      vx += (tx - vx) * 0.05
      vy += (ty - vy) * 0.05
      const cy = Math.cos(vx), sy = Math.sin(vx)
      const cx = Math.cos(vy), sx = Math.sin(vy)
      const R = el.clientWidth * 0.38
      pts.forEach((p, i) => {
        // rotate around Y then X
        const x1 = p.x * cy + p.z * sy
        const z1 = -p.x * sy + p.z * cy
        const y2 = p.y * cx - z1 * sx
        const z2 = p.y * sx + z1 * cx
        p.x = x1
        p.y = y2
        p.z = z2
        const s = (z2 + 2) / 3
        const node = items.current[i]
        if (node) {
          node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${s})`
          node.style.opacity = String(0.15 + ((z2 + 1) / 2) * 0.85)
          node.style.zIndex = String(Math.round(z2 * 100) + 100)
        }
      })
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={box} className="relative mx-auto aspect-square w-full max-w-[520px] select-none" aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-violet/20 blur-[80px]" />
      <div className="absolute inset-[12%] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[30%] rounded-full border border-white/[0.04]" />
      {all.map((t, i) => (
        <span
          key={t}
          ref={(n) => {
            items.current[i] = n
          }}
          className={`absolute top-1/2 left-1/2 font-display font-semibold whitespace-nowrap will-change-transform ${
            i % 4 === 0 ? 'gradient-text text-xl sm:text-2xl' : 'text-base text-fg sm:text-lg'
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative overflow-hidden py-28 sm:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel index="03">Toolkit</SectionLabel>
          <h2 className="mt-8 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.045em]">
            <MaskText lines={['A stack for', <span className="gradient-text">every layer.</span>]} />
          </h2>

          <div className="mt-12 space-y-7">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.06}>
                <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[140px_1fr]">
                  <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{g.group}</p>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/60 hover:bg-violet/15"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <TagSphere />
        </Reveal>
      </div>
    </section>
  )
}
