import type { BrandLogo } from '../data/content'

type Props = {
  name: string
  logo?: BrandLogo
  height?: number
  className?: string
}

/** Official logo as an optimised WebP, or a typographic wordmark when none exists. Never a fabricated logo. */
export function BrandMark({ name, logo, height = 28, className = '' }: Props) {
  if (logo) {
    const h = Math.round(height * (logo.scale ?? 1))
    return (
      <img
        src={logo.src}
        alt={`${name} logo`}
        width={Math.round((h * logo.width) / logo.height)}
        height={h}
        loading="lazy"
        decoding="async"
        className={`block w-auto ${className}`}
        style={{ height: h }}
      />
    )
  }
  return (
    <span className={`t-title leading-none ${className}`} style={{ fontSize: height * 0.8 }}>
      {name}
    </span>
  )
}
