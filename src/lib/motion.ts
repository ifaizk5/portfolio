import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
// Mobile address-bar show/hide resizes the viewport; don't recompute every trigger for it.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, SplitText, useGSAP }

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const DESKTOP_MOTION = '(prefers-reduced-motion: no-preference) and (min-width: 1024px)'

/**
 * Section motion, all transform/opacity only and all one-shot unless noted:
 *  - `[data-split]`   headings rise line by line out of a mask (SplitText; re-splits on resize/font load)
 *  - `[data-reveal]`  blocks fade and lift in, batched into one ScrollTrigger per section
 *  - `[data-rise]`    larger media scale up slightly as they arrive
 *  - `[data-parallax]` drifts against the scroll on desktop only (scrubbed)
 * With reduced motion requested nothing is touched, so content is simply there.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })

        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: 28 })
          ScrollTrigger.batch(items, {
            start: 'top 90%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07, overwrite: true }),
          })
        }

        gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
          gsap.from(el, {
            scale: 0.94,
            autoAlpha: 0,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })

      mm.add(DESKTOP_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8
          gsap.fromTo(
            el,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope },
  )
}
