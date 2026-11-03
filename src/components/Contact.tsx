import { useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../data/content'
import { useReveal } from '../lib/motion'

const channels = [
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.href, external: true },
  { label: 'GitHub', value: profile.github.label, href: profile.github.href, external: true },
  { label: 'Résumé', value: 'Download PDF', href: profile.resume, external: true },
]

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  useReveal(root)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="on-dark">
      <div className="shell pt-[var(--section-y)] pb-10">
        <p data-reveal className="pill">
          <span className="status-dot" aria-hidden="true" /> Available for software engineering roles
        </p>
        <h2 id="contact-title" data-split className="t-display mt-8 max-w-[14ch]">
          Hiring an engineer for your team? <span className="text-mute">Let’s talk.</span>
        </h2>

        <div data-reveal className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="link-line font-display text-[clamp(1.6rem,5.6vw,5rem)] leading-tight font-medium tracking-[-0.02em] break-all transition-colors duration-300 hover:text-signal"
          >
            {profile.email}
          </a>
          <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>

        <ul className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <li key={c.label} data-reveal className="rule">
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="group flex items-center justify-between gap-4 py-6 pr-4"
              >
                <span>
                  <span className="t-label block text-mute">{c.label}</span>
                  <span className="mt-1.5 block text-[1.05rem]">{c.value}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                />
              </a>
            </li>
          ))}
        </ul>

        <footer className="rule mt-24 flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="t-label text-mute">© {new Date().getFullYear()} Faiz Khan · Pakistan</p>
          <a href="#top" className="t-label inline-flex items-center gap-1.5 text-mute hover:text-paper">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  )
}
