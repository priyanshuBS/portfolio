import { useEffect, useRef } from 'react'

/** Dot + trailing ring that grows over interactive elements. Mouse only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const trail = { ...pos }
    let hover = false
    let scale = 1
    let shown = false

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      hover = !!(e.target as Element)?.closest?.('a, button, [data-cursor]')
      if (!shown) {
        shown = true
        dot.current?.style.setProperty('opacity', '1')
        ring.current?.style.setProperty('opacity', '1')
      }
    }
    const onLeave = () => {
      shown = false
      dot.current?.style.setProperty('opacity', '0')
      ring.current?.style.setProperty('opacity', '0')
    }
    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      trail.x += (pos.x - trail.x) * 0.18
      trail.y += (pos.y - trail.y) * 0.18
      scale += ((hover ? 2.2 : 1) - scale) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hover ? 0 : 1})`
      if (ring.current) ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale})`
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] hidden size-9 rounded-full border border-white/60 opacity-0 mix-blend-difference transition-opacity duration-300 [@media(pointer:fine)]:block"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] hidden size-1.5 rounded-full bg-white opacity-0 mix-blend-difference transition-[opacity] duration-300 [@media(pointer:fine)]:block"
      />
    </>
  )
}
