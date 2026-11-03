import { useRef } from 'react'
import { useReveal } from '../lib/motion'

const facts = [
  { value: '3', label: 'Engineering roles, 2025–26' },
  { value: '3.51', label: 'CGPA, BS Software Engineering' },
  { value: '2', label: 'Featured systems' },
]

export function Intro() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} aria-label="About" className="section">
      <div className="shell">
        <p data-split className="t-statement max-w-[30ch]">
          I started on the front end, moved through the MERN stack at 10Pearls, and went fully server-side at ZETSOL.{' '}
          <span className="text-mute">I want to keep building on both sides of the API.</span>
        </p>

        <dl className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {facts.map((f) => (
            <div key={f.label} data-reveal className="rule flex flex-col pt-6">
              <dt className="t-body order-2 mt-1 text-mute">{f.label}</dt>
              <dd className="t-display">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
