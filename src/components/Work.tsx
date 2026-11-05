import { profile, projects, type Project } from '../data/content'
import { TechIcon } from './TechIcon'
import { FairVisionVisual, SafeZoneVisual } from './ProjectVisuals'

export function Work() {
  const [fairVision, safeZone] = projects as [Project, Project]

  return (
    <section id="work" aria-labelledby="work-title">
      <div className="container section--s">
        <h2 id="work-title" data-reveal>Two projects, opened up</h2>
      </div>

      {/* Fair Vision: on paper, the chart leads across the full width */}
      <article aria-labelledby="p-fair" className="project">
        <div className="container">
          <ProjectHeader project={fairVision} id="p-fair" />
          <div className="project__figure" data-reveal>
            <FairVisionVisual />
          </div>
          <div className="project__body" data-reveal>
            <p className="project__problem">{fairVision.problem}</p>
            <ProjectBody project={fairVision} />
          </div>
        </div>
      </article>

      {/* SafeZone: the ink band, the problem set as a statement */}
      <article aria-labelledby="p-safe" className="project band-ink section" style={{ marginTop: 'var(--section-gap)' }}>
        <div className="container">
          <ProjectHeader project={safeZone} id="p-safe" />
          <div className="project__figure" data-reveal>
            <SafeZoneVisual />
          </div>
          <p className="display statement" data-reveal>A hidden button is not access control.</p>
          <div className="project__body" data-reveal>
            <p className="project__problem">{safeZone.problem}</p>
            <ProjectBody project={safeZone} />
          </div>
        </div>
      </article>

      <div className="container more-code">
        <a href={profile.github.href} target="_blank" rel="noopener" className="link">
          The rest of the code lives on GitHub
        </a>
      </div>
    </section>
  )
}

function ProjectHeader({ project, id }: { project: Project; id: string }) {
  return (
    <header className="project__header" data-reveal>
      <h3 id={id} className="display project__name">
        {project.name}
      </h3>
      <p className="lead">{project.tagline}</p>
      <dl className="project__meta">
        <div>
          <dt>{project.kind}</dt>
          <dd>{project.period}</dd>
        </div>
        {project.team && (
          <div>
            <dt>Built with</dt>
            <dd>{project.team}</dd>
          </div>
        )}
        {project.live && (
          <div>
            <dt>Live at</dt>
            <dd>
              <a href={project.live.href} target="_blank" rel="noopener" className="link">
                {project.live.label}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </header>
  )
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <div>
      <ul className="points">
        {project.contributions.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <StackList project={project} />
    </div>
  )
}

function StackList({ project }: { project: Project }) {
  return (
    <ul aria-label="Stack" className="stack-list">
      {project.stack.map((s) => (
        <li key={s}>
          <TechIcon name={s} size={16} />
          {s}
        </li>
      ))}
    </ul>
  )
}
