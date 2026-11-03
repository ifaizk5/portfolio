import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { experience } from '../data/content'
import { BrandMark } from './BrandMark'
import { gsap, MOTION_OK, useGSAP, useReveal } from '../lib/motion'

export function Experience() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  // A progress rule that fills as the list is read — one scrubbed transform, no pinning.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-roles]', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" aria-labelledby="exp-title" className="section">
      <div className="shell">
        <h2 id="exp-title" data-split className="t-display">
          Experience
        </h2>
        <p data-reveal className="t-lead mt-6 max-w-[42ch] text-mute">
          Frontend, then full-stack, then backend — each role a layer further from the screen.
        </p>

        <ol data-roles className="relative mt-16">
          <span className="absolute top-0 bottom-0 left-0 hidden w-px bg-[var(--line-light)] lg:block" aria-hidden="true">
            <span data-progress className="block h-full w-full origin-top bg-signal" />
          </span>

          {experience.map((role) => (
            <li key={role.company} data-reveal className="role rule grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-12">
              <div className="lg:col-span-4">
                <BrandMark name={role.company} logo={role.logo} height={34} className="role-logo" />
                <p className="t-mono mt-5 text-mute">{role.period}</p>
              </div>

              <div className="lg:col-span-8">
                <h3 className="t-title">{role.title}</h3>
                <p className="sr-only">{role.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {role.points.map((p) => (
                    <li key={p} className="t-body grid grid-cols-[22px_1fr] text-mute">
                      <span className="text-ink/40" aria-hidden="true">
                        —
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {role.link && (
                  <a
                    href={role.link.href}
                    target="_blank"
                    rel="noopener"
                    className="link-line mt-5 inline-flex items-center gap-1 text-sm"
                  >
                    {role.link.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
