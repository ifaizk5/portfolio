// Single source of truth for page copy. Everything here is taken from the resume
// (Faiz Khan - Software Engineer.pdf) or the public GitHub profile it links to.

export const profile = {
  name: 'Faiz Khan',
  role: 'Software Engineer',
  location: 'Pakistan',
  email: 'faizedu3@gmail.com',
  phone: '+92 318 8199421',
  phoneHref: 'tel:+923188199421',
  linkedin: { label: 'linkedin.com/in/faizk5', href: 'https://www.linkedin.com/in/faizk5' },
  github: { label: 'github.com/ifaizk5', href: 'https://github.com/ifaizk5' },
  resume: '/Faiz-Khan-Resume.pdf',
} as const

export type StackLayer = {
  path: string
  word: string
  tools: string[]
  emphasis?: boolean
}

// The hero reads top-to-bottom like a request travelling through a system.
export const stackLayers: StackLayer[] = [
  { path: '/client', word: 'Interfaces.', tools: ['React', 'TypeScript', 'Tailwind CSS'] },
  { path: '/server', word: 'APIs.', tools: ['NestJS', 'Express', 'JWT', 'RBAC'], emphasis: true },
  { path: '/store', word: 'Data.', tools: ['PostgreSQL', 'Drizzle ORM', 'MongoDB'] },
]

// Official logos, converted to WebP at 96px tall (sharp, q90) from the companies' own PNG/SVG files.
// `scale` evens out optical size between marks drawn with very different proportions.
export type BrandLogo = { src: string; width: number; height: number; scale?: number }

export type Project = {
  index: string
  name: string
  tagline: string
  kind: string
  period: string
  problem: string
  contributions: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'Fair Vision',
    tagline: 'Dataset bias detection & mitigation dashboard',
    kind: 'Final Year Project',
    period: 'Oct 2025 – May 2026',
    problem:
      'A model learns whatever imbalance is already in its training data. Fair Vision puts fairness metrics in front of the people preparing a dataset, so bias can be found and addressed before it is trained on.',
    contributions: [
      'Developed a full-stack dashboard for dataset bias detection with React, MongoDB and Pandas.',
      'Built FastAPI REST APIs and interactive visualisations to analyse fairness metrics and improve dataset transparency.',
      'Compared outcomes between privileged and non-privileged groups using linear regression, and mitigated bias through threshold optimisation.',
      'Structured the codebase as modular, reusable components to keep it maintainable.',
    ],
    stack: ['React', 'Python', 'FastAPI', 'Pandas', 'MongoDB', 'Recharts'],
  },
  {
    index: '02',
    name: 'SafeZone',
    tagline: 'Smart incident reporting platform — backend system',
    kind: 'Backend System',
    period: 'Jun – Jul 2026',
    problem:
      'Incident reports carry sensitive information, so who can file, view and act on a report has to be enforced by the server — not by the interface.',
    contributions: [
      'Designed and developed secure REST APIs with NestJS and PostgreSQL, following clean-code and OOP principles.',
      'Implemented authentication, role-based access control, incident reporting and user management modules.',
      'Debugged backend issues, optimised SQL queries, documented the API with Swagger and collaborated through Git.',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Drizzle ORM', 'Swagger'],
  },
]

export type Role = {
  company: string
  logo?: BrandLogo
  title: string
  period: string
  start: string
  location: string
  points: string[]
  link?: { label: string; href: string }
}

export const experience: Role[] = [
  {
    company: 'ZETSOL Technologies',
    logo: { src: '/logos/zetsol.webp', width: 309, height: 96, scale: 1.3 },
    title: 'Software Trainee Engineer — Backend',
    period: 'Jun 2026 – Jul 2026',
    start: '2026',
    location: 'Pakistan',
    points: [
      'Designed, developed, tested and maintained secure backend modules and REST APIs with NestJS, PostgreSQL and Drizzle ORM.',
      'Implemented authentication, authorisation and incident management following software engineering best practices.',
      'Debugged backend issues, tested APIs with Postman, optimised SQL queries and worked in Git within an Agile team.',
    ],
  },
  {
    company: '10Pearls',
    logo: { src: '/logos/10pearls.webp', width: 296, height: 90 },
    title: 'MERN Stack Intern',
    period: 'Apr 2026 – Jun 2026',
    start: '2026',
    location: 'Remote · Pakistan',
    points: [
      'Developed full-stack web applications and REST APIs on the MERN stack, following clean coding practices.',
      'Worked with mentors to debug issues, integrate frontend and backend components and deliver production-ready features.',
      'Used Git for version control within a collaborative development workflow.',
    ],
    link: {
      label: 'Internship repository',
      href: 'https://github.com/ifaizk5/faiz-khan-mern-10pshine',
    },
  },
  {
    company: 'Grands Digital',
    logo: { src: '/logos/grands-digital.webp', width: 185, height: 94, scale: 1.2 },
    title: 'Web Development Intern',
    period: 'Jun 2025 – Aug 2025',
    start: '2025',
    location: 'Pakistan',
    points: [
      'Developed responsive web applications with HTML, CSS, JavaScript, Bootstrap and the Google Books REST API.',
      'Implemented search, filtering, responsive layouts and UI improvements.',
      'Debugged frontend issues and collaborated with the team on maintainable solutions.',
    ],
  },
]

export type SkillGroup = { label: string; items: string[] }

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'JWT', 'RBAC', 'Swagger / OpenAPI'] },
  { label: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Vite'] },
  { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Drizzle ORM'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'GitHub Copilot', 'ChatGPT'] },
]

export const concepts = [
  'Object-Oriented Programming',
  'Data Structures & Algorithms',
  'RESTful API Design',
  'Database Design',
  'Clean Code',
  'Debugging',
  'Software Engineering Principles',
  'Agile Development',
]

export const education = {
  school: 'SZABIST University',
  logo: { src: '/logos/szabist.webp', width: 282, height: 82 },
  degree: 'Bachelor of Science in Software Engineering',
  period: 'Aug 2022 – Jun 2026',
  location: 'Pakistan',
  cgpa: '3.51 / 4.00',
}

export const certification = {
  name: 'National Skills Competency Test (NSCT)',
  issuers: ['HEC', 'P@SHA', 'PSEB'],
  issuersLong: 'Higher Education Commission · Pakistan Software Houses Association · Pakistan Software Export Board',
}
