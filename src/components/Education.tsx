import { useRef } from 'react'
import { certification, education } from '../data/content'
import { BrandMark } from './BrandMark'
import { useReveal } from '../lib/motion'

export function Education() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="education" aria-labelledby="edu-title" className="section">
      <div className="shell">
        <h2 id="edu-title" data-split className="t-display">
          Education
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <article data-reveal className="lg:col-span-7">
            <BrandMark name={education.school} logo={education.logo} height={48} />
            <h3 className="t-title mt-10 max-w-[18ch]">{education.degree}</h3>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="rule pt-4">
                <dt className="t-label text-mute">Studied</dt>
                <dd className="t-mono mt-2">{education.period}</dd>
              </div>
              <div className="rule pt-4">
                <dt className="t-label text-mute">Campus</dt>
                <dd className="t-mono mt-2">{education.location}</dd>
              </div>
              <div className="rule pt-4">
                <dt className="t-label text-mute">CGPA</dt>
                <dd className="t-title mt-1">{education.cgpa}</dd>
              </div>
            </dl>
          </article>

          <article data-reveal aria-labelledby="cert-title" className="flex flex-col justify-between rounded-[10px] bg-bone p-8 sm:p-10 lg:col-span-5">
            <div>
              <p className="t-label text-mute">Certification</p>
              <h3 id="cert-title" className="t-title mt-6">
                {certification.name}
              </h3>
            </div>
            <div className="mt-12">
              <p className="flex flex-wrap gap-x-5 gap-y-1 text-xl font-semibold tracking-[-0.01em]">
                {certification.issuers.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </p>
              <p className="t-body mt-2 text-sm text-mute">{certification.issuersLong}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
