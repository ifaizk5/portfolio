import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '../data/content'

const channels = [
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.href, external: true },
  { label: 'GitHub', value: profile.github.label, href: profile.github.href, external: true },
  { label: 'Résumé', value: 'Download PDF', href: profile.resume, external: true },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

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
      <section id="contact" aria-labelledby="contact-title" className="contact section">
        <div className="container">
          <h2 id="contact-title" data-reveal>Need someone who reads the logs?</h2>
          <p className="lead">I am open to software engineering roles. An email reaches me directly.</p>

          <div className="contact__email" data-reveal>
            <a href={`mailto:${profile.email}`} className="link contact__address">
              {profile.email}
            </a>
            <button type="button" onClick={copy} className="btn" aria-live="polite">
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <ul className="cells channels" data-reveal>
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}>
                  <span className="small muted">{c.label}</span>
                  <span className="channels__value">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
  )
}

/** The colophon: one line under a 3px rule, after <main>. */
export function Colophon() {
  return (
    <footer className="colophon">
      <div className="container">
        <p className="small">
          © {new Date().getFullYear()} Faiz Khan, Pakistan. Set in Libre Franklin. Hand-built in React and Vite, no template.{' '}
          <a href="#top" className="link">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
