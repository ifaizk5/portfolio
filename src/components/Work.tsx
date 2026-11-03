import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile, projects, type Project } from '../data/content'
import { TechIcon } from './TechIcon'
import { FairVisionVisual, SafeZoneVisual } from './ProjectVisuals'
import { useReveal } from '../lib/motion'

export function Work() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const [fairVision, safeZone] = projects as [Project, Project]

  return (
    <section ref={root} id="work" aria-labelledby="work-title">
      <div className="shell">
        <h2 id="work-title" data-split className="t-display">
          Selected work
        </h2>
      </div>

      {/* 01 — Fair Vision: light, split composition */}
      <article aria-labelledby="p-fair" className="shell grid gap-14 pt-16 pb-[var(--section-y)] lg:grid-cols-12 lg:gap-16 lg:pt-24">
        <div className="lg:col-span-5">
          <ProjectHeader project={fairVision} id="p-fair" />
          <p data-reveal className="t-body mt-8 text-[1.0625rem]">
            {fairVision.problem}
          </p>
          <ProjectBody project={fairVision} />
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <div data-parallax="4">
            <div data-rise>
              <FairVisionVisual />
            </div>
          </div>
        </div>
      </article>

      {/* 02 — SafeZone: full-bleed dark band, diagram leads */}
      <article aria-labelledby="p-safe" className="on-dark section">
        <div className="shell">
          <ProjectHeader project={safeZone} id="p-safe" />
          <div data-rise className="mt-14">
            <SafeZoneVisual />
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <p data-split className="t-statement lg:col-span-6">
              {safeZone.problem}
            </p>
            <div className="lg:col-span-5 lg:col-start-8">
              <ProjectBody project={safeZone} flush />
            </div>
          </div>
        </div>
      </article>

      <div className="shell flex justify-end py-10">
        <a href={profile.github.href} target="_blank" rel="noopener" className="link-line inline-flex items-center gap-1.5 text-sm">
          More code on GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function ProjectHeader({ project, id }: { project: Project; id: string }) {
  return (
    <header>
      <p data-reveal className="t-label text-mute">
        <span className="text-signal">{project.index}</span>&ensp;{project.kind} · {project.period}
      </p>
      <h3 id={id} data-split className="t-display mt-4">
        {project.name}
      </h3>
      <p data-reveal className="t-lead mt-3 text-mute">
        {project.tagline}
      </p>
    </header>
  )
}

function ProjectBody({ project, flush }: { project: Project; flush?: boolean }) {
  return (
    <div className={flush ? '' : 'mt-10'}>
      <ul>
        {project.contributions.map((c) => (
          <li key={c} data-reveal className="t-body rule grid grid-cols-[22px_1fr] py-3.5">
            <span className="text-signal" aria-hidden="true">
              —
            </span>
            {c}
          </li>
        ))}
      </ul>
      <ul data-reveal aria-label="Stack" className="rule flex flex-wrap gap-x-6 gap-y-3 pt-5">
        {project.stack.map((s) => (
          <li key={s} className="tech flex items-center gap-2 text-sm">
            <TechIcon name={s} size={16} />
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}
