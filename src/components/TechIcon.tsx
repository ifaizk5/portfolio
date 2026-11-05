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
  siScikitlearn,
  siNumpy,
  siScipy,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'

// Only tools with an official Simple Icons mark are listed; the rest render as text.
// Marks print in the ink (currentColor): the page has one colour besides it, and that one only fills.
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
  'scikit-learn': siScikitlearn,
  NumPy: siNumpy,
  SciPy: siScipy,
  Vercel: siVercel,
}

export function hasTechIcon(name: string) {
  return name in icons
}

export function TechIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const icon = icons[name]
  if (!icon) return null
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} style={{ flexShrink: 0 }}>
      <path d={icon.path} />
    </svg>
  )
}
