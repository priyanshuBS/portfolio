import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { Reveal, Section, socials, useCopyEmail } from './ui'

export default function Contact() {
  const { copied, copy } = useCopyEmail()

  return (
    <Section id="contact" index="05" label="Contact" last>
      <Reveal>
        <p className="display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1]">
          Have an idea?
          <br />
          <span className="serif text-[1.06em]">Let’s build it.</span>
        </p>
        <p className="mt-6 max-w-md leading-relaxed text-muted sm:text-[17px]">
          Open to internships, full-time roles and freelance work. Tell me what you’re building and I’ll reply within a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-accent group h-12 px-6">
            <Mail className="size-4" /> Say hello
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button onClick={copy} className="btn btn-ghost h-12 max-w-full px-5 text-[13px]" aria-live="polite">
            {copied ? <Check className="size-4 shrink-0" /> : <Copy className="size-4 shrink-0" />}
            <span className="truncate">{copied ? 'Copied to clipboard' : profile.email}</span>
          </button>
        </div>
      </Reveal>

      <footer className="mt-24 flex flex-col gap-6 border-t border-line pt-8 pb-14 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between lg:pb-20">
        <div className="flex items-center gap-5">
          {socials.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener" className="transition-colors hover:text-fg">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" aria-label="Back to top" className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg hover:text-bg">
            <ArrowUp className="size-4" />
          </a>
        </div>
      </footer>
    </Section>
  )
}
