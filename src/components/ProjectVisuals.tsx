import { TechIcon } from './TechIcon'

import { fairVisionResults } from "../data/content"

/*
 * FairVision: the thesis evaluation, set as figures (real numbers from a representative hiring dataset).
 * SafeZone: an architecture sketch of what the resume describes, labelled as one.
 */

export function FairVisionVisual() {
  const { subgroups, mitigation } = fairVisionResults
  return (
    <figure className="m-0" aria-labelledby="fv-caption">
      <div className="cells fv">
        <div className="chart">
          <div className="chart__top">
            <div>
              <p className="small muted">Selection rate, gender by age group</p>
              <p className="chart__title">The gap only shows up where groups intersect</p>
            </div>
            <p className="small chart__key">
              <span className="chart__swatch chart__swatch--ink" aria-hidden="true" /> Significant, p &lt; 0.05
            </p>
          </div>
          <table className="chart__table">
            <thead>
              <tr className="small muted">
                <th scope="col">Subgroup (records)</th>
                <th scope="col" colSpan={2}>
                  Selection rate
                </th>
              </tr>
            </thead>
            <tbody>
              {subgroups.map((g) => (
                <tr key={g.label}>
                  <th scope="row" className="small">
                    {g.label}
                    <span className="muted"> ({g.count})</span>
                  </th>
                  <td aria-hidden="true">
                    <span
                      className={`chart__bar${g.significant ? "" : " chart__bar--in"}`}
                      style={{ width: `${g.rate * 100}%` }}
                    />
                  </td>
                  <td className="num chart__value">{g.rate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="fv__fix">
          {mitigation.map((m) => (
            <div key={m.metric}>
              <dt>{m.metric}</dt>
              <dd className="fv__after num">{m.after}</dd>
              <dd className="small muted">
                Before: {m.before}. {m.note}.
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption id="fv-caption" className="small muted" style={{ marginTop: "var(--space-sm)" }}>
        Evaluation results from the FairVision thesis, on a representative hiring dataset. The large figures are after
        threshold optimisation.
      </figcaption>
    </figure>
  )
}

const modules = [
  { name: 'Auth', note: 'JWT sign-in' },
  { name: 'Users', note: 'Accounts and roles' },
  { name: 'Incidents', note: 'Report and manage' },
]

export function SafeZoneVisual() {
  return (
    <figure className="m-0" aria-label="SafeZone architecture sketch: client, NestJS API, Drizzle ORM and PostgreSQL">
      <div className="arch small">
        <Node title="Client" lines={['HTTP and a Bearer token']} />
        <Wire />

        <div className="arch__api">
          <div className="arch__api-head">
            <p className="arch__api-title">
              <TechIcon name="NestJS" size={16} /> NestJS API
            </p>
            <p className="muted">Swagger docs at /docs</p>
          </div>
          <ol className="arch__guards" aria-label="Guards, in order">
            <li>1. Authenticate (JWT)</li>
            <li>2. Authorise (role)</li>
          </ol>
          <div className="arch__modules">
            {modules.map((m) => (
              <div key={m.name}>
                <p>{m.name}</p>
                <p className="muted">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        <Wire />
        <div className="arch__store">
          <Node title="Drizzle ORM" icon="Drizzle ORM" lines={['Typed queries']} />
          <Node title="PostgreSQL" icon="PostgreSQL" lines={['Relational store']} />
        </div>
      </div>
      <figcaption className="small muted" style={{ marginTop: 'var(--space-sm)' }}>
        Architecture sketch, not a screenshot
      </figcaption>
    </figure>
  )
}

function Node({ title, lines, icon }: { title: string; lines: string[]; icon?: string }) {
  return (
    <div className="arch__node">
      <p>
        {icon && <TechIcon name={icon} size={16} />}
        {title}
      </p>
      {lines.map((l) => (
        <p key={l} className="muted">
          {l}
        </p>
      ))}
    </div>
  )
}

/* A plain connector between nodes: a 3px rule, still */
function Wire() {
  return <div className="arch__wire" aria-hidden="true" />
}
