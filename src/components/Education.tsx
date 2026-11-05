import { education } from '../data/content'
import { BrandMark } from './BrandMark'

export function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="section">
      <div className="container">
        <div className="head head--split" data-reveal>
          <h2 id="edu-title">Four years of the fundamentals</h2>
          <p className="lead">Object-oriented design, data structures, databases. The parts that never go out of date.</p>
        </div>

        <div className="cells edu" data-reveal>
          <article className="edu__degree">
            <BrandMark name={education.school} logo={education.logo} height={48} />
            <h3>{education.degree}</h3>
          </article>

          <dl className="edu__gpa">
            <dt>CGPA</dt>
            <dd className="edu__figure num">{education.cgpa}</dd>
          </dl>

          <dl className="edu__when">
            <div>
              <dt>Studied</dt>
              <dd className="edu__fact">{education.period}</dd>
            </div>
            <div style={{ marginTop: 'var(--space-lg)' }}>
              <dt>Location</dt>
              <dd className="edu__fact">{education.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
