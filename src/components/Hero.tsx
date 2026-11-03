import { Fragment, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile, stackLayers } from '../data/content'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
        tl.from('[data-hero="pill"]', { autoAlpha: 0, y: 12, duration: 0.8 })
          .from('[data-hero="kicker"]', { autoAlpha: 0, y: 20 }, '<0.1')
          .from('[data-hero="word"]', { yPercent: 110, duration: 1.4, stagger: 0.11 }, '<0.1')
          .from('[data-hero="trace"]', { scaleY: 0, transformOrigin: 'top', duration: 1.6 }, '<')
          .from('[data-hero="tools"]', { autoAlpha: 0, x: -10, stagger: 0.11 }, '<0.35')
          .from('[data-hero="lead"]', { autoAlpha: 0, y: 18, stagger: 0.08 }, '<0.1')

        // Words separate slightly as the hero scrolls away: one scrubbed tween per row, transforms only.
        gsap.utils.toArray<HTMLElement>('[data-hero="row"]').forEach((row, i) => {
          gsap.to(row, {
            xPercent: (i - 1) * 4,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-12 sm:pt-32"
    >
      <div className="shell flex flex-1 flex-col justify-between gap-12">
        <div>
          <p data-hero="pill" className="pill">
            <span className="status-dot" aria-hidden="true" />
            Open to software engineering roles
            <span className="hidden text-mute sm:inline">· {profile.location}</span>
          </p>

          <h1 id="hero-title" data-hero="kicker" className="t-title mt-8 max-w-[30ch] text-mute">
            <span className="text-paper">Faiz Khan</span>, software engineer, working across three layers of a system.
          </h1>
        </div>

        {/* The stack — read top to bottom like a request travelling through it */}
        <div className="relative pl-6 sm:pl-10">
          <span data-hero="trace" className="hero-trace" aria-hidden="true" />
          <ol>
            {stackLayers.map((layer) => (
              <li
                key={layer.path}
                data-hero="row"
                className="flex flex-col gap-x-8 sm:flex-row sm:items-end"
              >
                <span className="sr-only">{`${layer.word.replace('.', '')}: ${layer.tools.join(', ')}`}</span>
                <span aria-hidden="true" className="hero-word t-hero">
                  <span data-hero="word" className={layer.emphasis ? 'text-paper' : 'text-paper/35'}>
                    {layer.word}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  data-hero="tools"
                  className={`t-mono pb-3 sm:max-w-[24ch] sm:pb-[1.1em] ${layer.emphasis ? 'text-signal' : 'text-mute'}`}
                >
                  {layer.tools.map((t, i) => (
                    <Fragment key={t}>
                      <span className="whitespace-nowrap">{t}</span>
                      {i < layer.tools.length - 1 && ' · '}
                    </Fragment>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <p data-hero="lead" className="t-lead text-mute lg:col-span-6">
            <span className="text-paper">Software Engineering graduate, SZABIST 2026.</span> Most recently building
            authentication, access control and incident management in NestJS and PostgreSQL at ZETSOL Technologies.
          </p>
          <div data-hero="lead" className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <a href="#work" className="btn btn-primary btn-down">
              See selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Get in touch <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
