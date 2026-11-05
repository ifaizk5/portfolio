import type { BrandLogo } from '../data/content'

type Props = {
  name: string
  logo?: BrandLogo
  height?: number
  className?: string
}

/** Official logo as an optimised WebP, printed in greyscale, or a typographic wordmark when none exists. Never a fabricated logo. */
export function BrandMark({ name, logo, height = 32, className = '' }: Props) {
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
        className={`logo ${className}`}
        style={{ height: h }}
      />
    )
  }
  return <span className={`wordmark ${className}`}>{name}</span>
}
