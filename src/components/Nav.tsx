import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { profile } from '../data/content'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/** Section currently crossing the middle of the viewport, via one IntersectionObserver (no scroll math). */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)))
        setActive(links.find((l) => visible.has(l.id))?.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

/** Hide while reading downwards, return on any upward scroll. rAF-throttled, passive listener. */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)
  // While the page is scrolling because a nav link was used, keep the nav in view.
  const pausedUntil = useRef(0)
  const pause = () => {
    pausedUntil.current = performance.now() + 1500
    setHidden(false)
  }
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - last) > 8) {
          if (performance.now() > pausedUntil.current) setHidden(y > last && y > 160)
          last = y
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return [hidden, setHidden, pause] as const
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden, pauseHiding] = useHideOnScroll()
  const active = useActiveSection()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header data-hidden={hidden && !open} onFocusCapture={() => setHidden(false)} className="slab">
        <nav aria-label="Primary" className="container slab__bar">
          <a href="#top" className="wordmark">
            Faiz Khan
          </a>

          <ul className="slab__links">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined} onClick={pauseHiding}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href={profile.resume} target="_blank" rel="noopener" className="btn slab__resume">
            Résumé (PDF)
          </a>

          <button
            type="button"
            className="btn slab__menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </nav>
      </header>

      <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open} className="menu">
        <div className="container menu__bar">
          <span className="wordmark">Faiz Khan</span>
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus>
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <ul className="container menu__list">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="display">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn--ink">
              Download résumé
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
