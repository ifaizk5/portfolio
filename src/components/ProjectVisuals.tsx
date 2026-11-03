import { useRef } from 'react'
import { TechIcon } from './TechIcon'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'

/*
 * No public screenshots exist for these projects, so each gets an original diagram
 * of what the resume describes — labelled as such, never presented as a real UI capture.
 */

const groups = [
  { label: 'Group A', w: 0.86 },
  { label: 'Group B', w: 0.52 },
  { label: 'Group C', w: 0.74 },
  { label: 'Group D', w: 0.38 },
]

export function FairVisionVisual() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-bar]', {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
        gsap.from('[data-band]', {
          autoAlpha: 0,
          duration: 1,
          delay: 0.6,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <figure ref={root} className="flex flex-col">
      <div className="relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[6px] bg-bone p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="t-label text-mute">Fairness metric</p>
            <p className="mt-2 font-display text-2xl font-medium tracking-[-0.015em] sm:text-3xl">
              Outcome rate by group
            </p>
          </div>
          <p className="t-label hidden items-center gap-2 text-mute sm:flex">
            <i className="inline-block h-3 w-5 bg-signal/25" aria-hidden="true" /> parity band
          </p>
        </div>

        <div className="relative my-8 space-y-4 sm:space-y-5">
          {/* The band marks the range a balanced dataset would fall in */}
          <div data-band className="absolute inset-y-[-12px] left-[56%] w-[22%] bg-signal/20" aria-hidden="true" />
          {groups.map((g) => {
            const outside = g.w < 0.56 || g.w > 0.78
            return (
              <div key={g.label} className="relative grid grid-cols-[72px_1fr] items-center gap-4">
                <span className="t-mono text-mute">{g.label}</span>
                <span className="h-7 sm:h-9">
                  <span
                    data-bar
                    className={`block h-full ${outside ? 'bg-ink' : 'bg-ink/35'}`}
                    style={{ width: `${g.w * 100}%` }}
                  />
                </span>
              </div>
            )
          })}
        </div>

        <ol className="t-mono grid grid-cols-2 gap-x-4 gap-y-2 text-[0.72rem] text-mute sm:grid-cols-4">
          {['Dataset in', 'Pandas analysis', 'FastAPI', 'Recharts view'].map((s, i) => (
            <li key={s} className="flex gap-2 border-t border-[var(--line-light)] pt-2">
              <span className="text-signal">0{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="t-label mt-4 text-mute">Concept illustration — not a screenshot</figcaption>
    </figure>
  )
}

const modules = [
  { name: 'Auth', note: 'JWT sign-in' },
  { name: 'Users', note: 'accounts & roles' },
  { name: 'Incidents', note: 'report & manage' },
]

export function SafeZoneVisual() {
  return (
    <figure className="flex flex-col">
      <div className="t-mono relative overflow-hidden rounded-[6px] border border-[var(--line-dark)] p-5 text-[0.78rem] sm:p-8">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_2.4fr_auto_1fr] md:items-stretch">
          <Node title="Client" lines={['HTTP + Bearer token']} />
          <Wire />

          <div className="relative rounded-[4px] border border-[var(--line-dark)] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-paper">
                <TechIcon name="NestJS" size={16} /> NestJS API
              </span>
              <span className="text-mute">/docs · Swagger</span>
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-mute">
              <span className="rounded-full border border-signal/60 px-2.5 py-1 text-signal">authenticate (JWT)</span>
              <span aria-hidden="true" className="hidden sm:inline">→</span>
              <span className="rounded-full border border-signal/60 px-2.5 py-1 text-signal">authorise (role)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {modules.map((m) => (
                <div key={m.name} className="bg-paper/[0.06] p-3">
                  <p className="text-paper">{m.name}</p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-mute">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          <Wire />
          <div className="grid gap-3">
            <Node title="Drizzle ORM" icon="Drizzle ORM" lines={['typed queries']} />
            <Node title="PostgreSQL" icon="PostgreSQL" lines={['relational store']} />
          </div>
        </div>
      </div>
      <figcaption className="t-label mt-3 text-mute">Architecture sketch — not a screenshot</figcaption>
    </figure>
  )
}

function Node({ title, lines, icon }: { title: string; lines: string[]; icon?: string }) {
  return (
    <div className="flex flex-col justify-center rounded-[4px] border border-[var(--line-dark)] p-4">
      <p className="flex items-center gap-2 text-paper">
        {icon && <TechIcon name={icon} size={15} />}
        {title}
      </p>
      {lines.map((l) => (
        <p key={l} className="mt-1 text-mute">
          {l}
        </p>
      ))}
    </div>
  )
}

/* Connector with a packet travelling along it — CSS only */
function Wire() {
  return (
    <div className="relative mx-auto h-8 w-px bg-[var(--line-dark)] md:h-auto md:w-10 md:self-center md:border-t md:border-[var(--line-dark)] md:bg-transparent" aria-hidden="true">
      <span className="packet" />
    </div>
  )
}
