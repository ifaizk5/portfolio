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
  team?: string
  live?: { label: string; href: string }
}

// FairVision facts come from the FYP thesis: "FairVision: Bias Detection and Audit Intelligence System"
// (SZABIST Hyderabad, 2026, supervised by Ms. Laviza Asif), chapters 3 to 5.
export const projects: Project[] = [
  {
    index: '01',
    name: 'FairVision',
    tagline: 'A bias audit for datasets, from CSV upload to a PDF governance report.',
    kind: 'Final Year Project',
    period: 'Oct 2025 to May 2026',
    team: 'Areeb Ahmed Shaikh',
    live: { label: 'fairvision.live', href: 'https://fairvision.live' },
    problem:
      'A model learns whatever imbalance its data already carries. FairVision audits the data first: it measures fairness across groups and where they intersect, explains each gap in plain language, and shows what a fix would cost.',
    contributions: [
      'A FastAPI and MongoDB backend with six routers: auth, datasets, analysis, mitigation, audit intelligence and reports.',
      'Four fairness metrics (statistical parity, disparate impact, equalized odds, false positive rate gap) across every value of several sensitive attributes, on a scikit-learn logistic regression.',
      'Intersectional analysis with chi-square tests and 250-sample bootstrap confidence intervals; subgroups under 30 records are flagged, never ranked.',
      'Threshold-optimisation mitigation, a weighted compliance score with three risk levels, and ReportLab PDF reports with Matplotlib charts.',
      'JWT sign-in, bcrypt hashing, email verification, and per-user dataset ownership that answers anyone else with a 404.',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Python', 'MongoDB', 'Pandas', 'scikit-learn', 'SciPy'],
  },
  {
    index: '02',
    name: 'SafeZone',
    tagline: 'Incident reporting where the server decides who sees what.',
    kind: 'Backend System',
    period: 'Jun to Jul 2026',
    problem:
      'Incident reports carry sensitive details. Who can file, view and act on one is enforced in the API, never left to the interface.',
    contributions: [
      'Designed and developed secure REST APIs with NestJS and PostgreSQL, following clean-code and OOP principles.',
      'Implemented authentication, role-based access control, incident reporting and user management modules.',
      'Debugged backend issues, optimised SQL queries, documented the API with Swagger and collaborated through Git.',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Drizzle ORM', 'Swagger'],
  },
]

// FairVision evaluation on a representative hiring dataset (thesis, tables 5.3 and 5.5).
export const fairVisionResults = {
  // Gender x age group: selection rate per subgroup; "significant" is chi-square p < 0.05.
  subgroups: [
    { label: "Male, 25 to 40", count: 312, rate: 0.71, significant: false },
    { label: "Male, 40 to 55", count: 248, rate: 0.66, significant: false },
    { label: "Male, 55+", count: 187, rate: 0.59, significant: true },
    { label: "Female, 25 to 40", count: 278, rate: 0.58, significant: true },
    { label: "Female, 40 to 55", count: 210, rate: 0.46, significant: true },
    { label: "Female, 55+", count: 143, rate: 0.38, significant: true },
  ],
  mitigation: [
    { metric: "Disparate impact ratio", before: "0.765", after: "0.949", note: "The four-fifths rule asks for 0.80" },
    { metric: "Statistical parity gap", before: "0.160", after: "0.035", note: "The target is 0.10 or less" },
    { metric: "Overall accuracy", before: "81.0%", after: "79.3%", note: "The price: 1.7 points" },
  ],
}

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
    title: 'Software Trainee Engineer (Backend)',
    period: 'Jun 2026 to Jul 2026',
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
    period: 'Apr 2026 to Jun 2026',
    start: '2026',
    location: 'Remote, Pakistan',
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
    period: 'Jun 2025 to Aug 2025',
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
  { label: 'Backend', items: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'REST APIs', 'JWT', 'RBAC', 'Swagger / OpenAPI'] },
  { label: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Vite'] },
  { label: 'Data and ML', items: ['Pandas', 'NumPy', 'scikit-learn', 'SciPy', 'Matplotlib', 'ReportLab'] },
  { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Drizzle ORM'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Postman', 'VS Code', 'GitHub Copilot', 'ChatGPT'] },
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
  period: 'Aug 2022 to Jun 2026',
  location: 'Pakistan',
  cgpa: '3.51 / 4.00',
}
