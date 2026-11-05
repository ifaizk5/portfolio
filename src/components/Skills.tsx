import { concepts, skills } from '../data/content'
import { TechIcon, hasTechIcon } from './TechIcon'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="band-paper section--s">
      <div className="container">
        <div className="head head--split" data-reveal>
          <h2 id="skills-title">What I reach for</h2>
          <p className="lead">Every tool here was used on real work, in a role or a project.</p>
        </div>

        <dl className="toolkit" data-reveal>
          {skills.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>
                <ul className="stack-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      {hasTechIcon(item) && <TechIcon name={item} size={20} />}
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
          <div>
            <dt>Core concepts</dt>
            <dd>
              <ul className="stack-list">
                {concepts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
