import {
  siBootstrap,
  siCss,
  siDrizzle,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGithubcopilot,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siNestjs,
  siNodedotjs,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons'

// Only tools with an official Simple Icons mark are listed; the rest render as text.
const icons: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Python: siPython,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  Express: siExpress,
  NestJS: siNestjs,
  JWT: siJsonwebtokens,
  'Swagger / OpenAPI': siSwagger,
  Swagger: siSwagger,
  React: siReact,
  HTML5: siHtml5,
  CSS3: siCss,
  'Tailwind CSS': siTailwindcss,
  Bootstrap: siBootstrap,
  Vite: siVite,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  'Drizzle ORM': siDrizzle,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
  'GitHub Copilot': siGithubcopilot,
  Pandas: siPandas,
  FastAPI: siFastapi,
}

// Brand colours that disappear on the paper background get a readable stand-in on hover.
const hoverOverride: Record<string, string> = {
  JavaScript: '#b89c00',
  'Drizzle ORM': '#6b8f00',
  Swagger: '#4e9a06',
  'Swagger / OpenAPI': '#4e9a06',
}

// Near-black marks (Express, GitHub, OpenJDK…) would vanish on the ink sections, so they hover to paper there.
function isDark(hex: string) {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60
}

export function hasTechIcon(name: string) {
  return name in icons
}

export function TechIcon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const icon = icons[name]
  if (!icon) return null
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      style={{
        ['--brand' as string]: hoverOverride[name] ?? `#${icon.hex}`,
        ['--brand-on-dark' as string]: isDark(icon.hex) ? '#f4f2ee' : `#${icon.hex}`,
      }}
    >
      <path d={icon.path} />
    </svg>
  )
}
