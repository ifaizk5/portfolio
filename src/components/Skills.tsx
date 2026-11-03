import { useRef } from 'react'
import { concepts, skills } from '../data/content'
import { TechIcon, hasTechIcon } from './TechIcon'
import { useReveal } from '../lib/motion'

export function Skills() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="on-dark section">
      <div className="shell">
        <h2 id="skills-title" data-split className="t-display">
          Toolkit
        </h2>
        <p data-reveal className="t-lead mt-6 max-w-[42ch] text-mute">
          What I have used in my roles and projects.
        </p>

        <dl className="mt-16">
          {skills.map((group) => (
            <div key={group.label} data-reveal className="rule grid gap-4 py-7 md:grid-cols-12 md:gap-8">
              <dt className="t-label text-mute md:col-span-3 md:pt-1.5">{group.label}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-x-7 gap-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="tech flex items-center gap-2.5 text-lg font-medium tracking-[-0.01em] sm:text-xl">
                      {hasTechIcon(item) ? (
                        <TechIcon name={item} size={20} className="opacity-90" />
                      ) : (
                        <span className="inline-block size-1.5 bg-paper/40" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
          <div data-reveal className="rule grid gap-5 py-8 md:grid-cols-12 md:gap-8">
            <dt className="t-label text-mute md:col-span-3 md:pt-1">Core concepts</dt>
            <dd className="t-lead md:col-span-9">{concepts.join(' · ')}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
