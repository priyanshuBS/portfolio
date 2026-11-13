const items = [
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Expo',
  'Node.js',
  'Hono',
  'PostgreSQL',
  'Drizzle',
  'Redis',
  'Tailwind CSS',
  'Docker',
  'RAG',
  'GitHub Actions',
]

export default function Marquee() {
  return (
    <div
      className="relative flex overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden="true"
    >
      <div className="flex w-max shrink-0 animate-marquee items-center hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center font-mono text-sm whitespace-nowrap text-muted">
            <span className="px-6">{t}</span>
            <span className="text-accent-ink">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
