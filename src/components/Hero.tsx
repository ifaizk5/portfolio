import { profile } from '../data/content'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero">
      <div className="container">
        <div className="hero__col">
          <h1 id="hero-title">I build the part you don’t see.</h1>
          <p className="lead">
            Faiz Khan. Backend-leaning software engineer: NestJS, PostgreSQL, and the React on top.
          </p>
          <div className="actions">
            <a href={`mailto:${profile.email}`} className="btn btn--ink">
              Email me
            </a>
            <a href="#work" className="btn">
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
