import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
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
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  // Move the highlight under the active link by writing CSS variables — transform/width transition, no re-render.
  useLayoutEffect(() => {
    const place = () => {
      const indicator = indicatorRef.current
      const link = active ? listRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null
      if (!indicator) return
      if (!link) {
        indicator.style.setProperty('--o', '0')
        return
      }
      // Measure the <li>: it is the link's offsetParent, so the link's own offsetLeft is always 0.
      const item = link.parentElement ?? link
      indicator.style.setProperty('--x', `${item.offsetLeft}px`)
      indicator.style.setProperty('--w', `${link.offsetWidth}px`)
      indicator.style.setProperty('--o', '1')
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [active])

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
      <div className="scroll-progress" aria-hidden="true" />

      <header
        data-hidden={hidden && !open}
        onFocusCapture={() => setHidden(false)}
        className="nav-bar fixed inset-x-0 top-3 z-50 sm:top-4"
      >
        <nav aria-label="Primary" className="shell">
          <div className="nav-pill mx-auto flex h-14 max-w-max items-center gap-1 rounded-full p-1.5 pl-5 text-paper max-md:max-w-none max-md:justify-between">
            <a href="#top" className="mr-3 font-display text-[1.1rem] font-medium tracking-[-0.01em]">
              Faiz Khan
            </a>

            <ul ref={listRef} className="relative hidden items-center md:flex">
              <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
              {links.map((l) => (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? 'true' : undefined}
                    onClick={pauseHiding}
                    className={`block rounded-full px-4 py-2.5 text-sm transition-colors duration-300 ${
                      active === l.id ? 'text-ink' : 'text-paper/70 hover:text-paper'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="ml-2 hidden h-11 items-center gap-1.5 rounded-full bg-signal px-4 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-px md:inline-flex"
            >
              Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <button
              type="button"
              className="h-11 rounded-full bg-paper/10 px-5 text-sm md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="on-dark fixed inset-0 z-[80] overflow-y-auto md:hidden"
      >
        <div className="shell flex h-20 items-center justify-between">
          <span className="font-display text-[1.1rem] font-medium">Faiz Khan</span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-paper/10"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            autoFocus
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <ul className="shell mt-6 flex flex-col">
          {links.map((l, i) => (
            <li key={l.id} className="rule">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="t-display flex items-baseline justify-between py-4 !text-[2.6rem]"
              >
                {l.label}
                <span className="t-label text-mute">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className="rule pt-8">
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-primary">
              Download résumé <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
