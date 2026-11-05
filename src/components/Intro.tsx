import { stackLayers } from '../data/content'

/** What I build: the request's path through the stack as three boxed rows, the server row filled ink. */
export function Intro() {
  return (
    <section aria-labelledby="layers-title" className="section chapter">
      <div className="container chapter__pin">
        <div className="head head--split">
          <h2 id="layers-title">Every click makes three stops</h2>
          <p className="lead">
            It starts in React, crosses an API, and lands in a table. I have written all three, and I like the
            middle one best.
          </p>
        </div>

        <ol className="cells layers">
          {stackLayers.map((layer) => (
            <li key={layer.path} className={`layer${layer.emphasis ? ' layer--lead' : ''}`}>
              <p className="display layer__word">{layer.word.replace('.', '')}</p>
              <p className="layer__tools">{layer.tools.join(', ')}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
