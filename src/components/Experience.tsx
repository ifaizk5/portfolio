import { experience } from '../data/content'
import { BrandMark } from './BrandMark'

// The stages read in the order they happened: each role a layer further from the screen.
const stageNames: Record<string, string> = {
  'Grands Digital': 'Front end',
  '10Pearls': 'Full stack',
  'ZETSOL Technologies': 'Backend',
}

export function Experience() {
  const stages = [...experience].reverse()

  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <div className="container">
        <div className="head head--split" data-reveal>
          <h2 id="exp-title">Three roles, one direction: down</h2>
          <p className="lead">I started where users click and kept digging until I reached the database.</p>
        </div>

        <ol className="stages">
          {stages.map((role) => (
            <li key={role.company} className="stage" data-reveal>
              <div>
                <h3 className="stage__name">{stageNames[role.company] ?? role.title}</h3>
                <div className="stage__role">
                  <p className="stage__title">{role.title}</p>
                  <p className="visually-hidden">{role.company}</p>
                  <p className="muted">
                    <time>{role.period}</time>, {role.location}
                  </p>
                </div>
                <BrandMark name={role.company} logo={role.logo} height={32} className="stage__logo" />
              </div>

              <div>
                <ul className="points">
                  {role.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {role.link && (
                  <a href={role.link.href} target="_blank" rel="noopener" className="link">
                    {role.link.label}
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
