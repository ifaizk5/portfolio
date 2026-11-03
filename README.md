# Faiz Khan — Portfolio

Static, single-page portfolio built with React 18, TypeScript, Vite, Tailwind CSS v4 and GSAP (ScrollTrigger via `@gsap/react`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve dist/ locally
```

## Where things live

- `src/data/content.ts` — all copy (from the résumé). Edit this to update the site.
- `src/components/` — one component per section; `ProjectVisuals.tsx` holds the two project diagrams.
- `src/styles/index.css` — design tokens (`@theme`), type scale, and CSS-only interactions.
- `src/lib/motion.ts` — GSAP setup and the shared reveal hook (SplitText headings, batched reveals, desktop-only parallax). All motion is gated behind `prefers-reduced-motion: no-preference` and animates only transform/opacity.
- `public/logos/` — official ZETSOL, 10Pearls, Grands Digital and SZABIST logos, converted to WebP (96px tall, 3–13 KB each).
- `public/og.png` — Open Graph card, `public/Faiz-Khan-Resume.pdf` — downloadable résumé.

## Display font

Headings use Fraunces (OFL, self-hosted via `@fontsource-variable/fraunces`, latin subset ~62 KB) with its SOFT axis at
100, set once on `body` in `index.css`. Body text is Inter; labels are JetBrains Mono.

## Deploying on Vercel

Live at [faizkhan.tech](https://faizkhan.tech). The GitHub repo is connected to Vercel: every push to `main` deploys to
production, and every pull request gets its own preview URL. `vercel.json` sets long-term caching for hashed assets.
Canonical / Open Graph URLs, `robots.txt` and `sitemap.xml` use `https://faizkhan.tech` unless `SITE_URL` overrides it.
