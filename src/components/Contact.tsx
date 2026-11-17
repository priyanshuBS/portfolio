import { Check, Copy } from 'lucide-react'
import { profile } from '../data/resume'
import { Section, useClock, useCopyEmail } from './ui'

export default function Contact() {
  const time = useClock()
  const { copied, copy } = useCopyEmail()

  return (
    <>
      <Section id="contact" title="Contact">
        <p className="text-[clamp(1.4rem,4vw,1.75rem)] leading-snug font-bold tracking-[-0.02em] text-balance">
          Have an idea or a role in mind? I’d love to hear about it.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            Email me
          </a>
          <button onClick={copy} className="btn btn-outline" aria-live="polite">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Copied' : profile.email}
          </button>
        </div>
      </Section>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-subtle">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="tabular-nums">
          {profile.location} · {time}
        </p>
      </footer>
    </>
  )
}
