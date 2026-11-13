// Single source of truth for all portfolio content.
// Update this file to change what appears on the site.

export const profile = {
  name: 'Priyanshu Singh',
  firstName: 'Priyanshu',
  title: 'Full-Stack & Mobile Developer',
  location: 'Noida, India',
  email: 'dotpriyanshu@gmail.com',
  site: 'https://priyanshusingh.co.in',
  socials: {
    github: 'https://github.com/priyanshuBS',
    linkedin: 'https://www.linkedin.com/in/priyanshubs/',
    leetcode: 'https://leetcode.com/u/priyanshu1340/',
  },
}

export const about = [
  "I'm a Computer Science undergraduate at Noida Institute of Engineering and Technology who likes owning a product end to end: the schema, the API, the UI, the deploy and the test suite that keeps it honest.",
  'Lately that means shipping cross-platform apps: one TypeScript codebase that runs on the web, Android and iOS, backed by Postgres, typed APIs and the odd AI pipeline. I care about the details users feel, like instant interactions, offline support and sensible defaults.',
]

export const stats = [
  { value: 5, decimals: 0, suffix: '', label: 'Products live in production' },
  { value: 3, decimals: 0, suffix: '', label: 'Platforms shipped: web, Android, iOS' },
  { value: 8.38, decimals: 2, suffix: '', label: 'CGPA, B.Tech CSE' },
]

export type Project = {
  name: string
  tagline: string
  image: string
  live: string
  source: string
  year: string
  description: string
  tags: string[]
  featured?: boolean
  platforms?: string[]
  highlights?: string[]
  color: string // card glow
}

export const projects: Project[] = [
  {
    name: 'PaiPai',
    tagline: 'Personal finance, built for India',
    image: '/projects/paipai.webp',
    live: 'https://paipai.priyanshusingh.co.in',
    source: 'https://github.com/priyanshuBS/paipai',
    year: '2026',
    featured: true,
    platforms: ['Web', 'Android', 'iOS'],
    color: '#f97316',
    description:
      'Log an expense in two taps, see exactly where your money goes and stay inside your budgets. A Next.js website and an Expo app share one typed Hono API.',
    highlights: [
      'Turborepo monorepo: Next.js web, Expo mobile and Hono API with shared Zod schemas',
      'Budgets with alerts, recurring rules, deep analytics, CSV and PDF statements',
      'Offline queue with idempotent sync; money stored as integer paise, never floats',
      'Email OTP and Google sign-in via Better Auth; 26-step browser E2E suite',
    ],
    tags: ['Next.js', 'Expo', 'Hono', 'Drizzle', 'Neon Postgres', 'Better Auth'],
  },
  {
    name: 'Learn5',
    tagline: 'Daily micro-learning, five minutes at a time',
    image: '/projects/learn5.webp',
    live: 'https://learn5.expo.app',
    source: 'https://github.com/priyanshuBS/learn5',
    year: '2026',
    featured: true,
    platforms: ['Web', 'Android', 'iOS'],
    color: '#6366f1',
    description:
      'Fresh five-question drops twice a day in English, Reasoning, Puzzles and CS, plus a short daily read. One Expo codebase ships to Android, iOS and the web.',
    highlights: [
      'AI content pipeline on GitHub Actions: Groq writes, a second pass fact-checks',
      'Every drop is schema-validated and de-duplicated before it is ever served',
      'Passwordless email-code auth with hashed tokens and rate limits',
      'Offline-first with delta progress sync, plus streaks, levels and badges',
    ],
    tags: ['Expo', 'React Native', 'Expo Router', 'Neon Postgres', 'Groq', 'Zod'],
  },
  {
    name: 'ExplainThis',
    tagline: 'Chat with your documents',
    image: '/projects/explainthis.webp',
    live: 'https://explainthisai.priyanshusingh.co.in',
    source: 'https://github.com/priyanshuBS/ExplainThisAI',
    year: '2025',
    color: '#22d3ee',
    description:
      'A RAG pipeline that answers questions from uploaded PDFs, using Pinecone for semantic search and Redis for conversational memory.',
    tags: ['RAG', 'Pinecone', 'Redis'],
  },
  {
    name: 'GeoChat',
    tagline: 'Location-based real-time chat',
    image: '/projects/geochat.webp',
    live: 'https://geochat.pishu.in',
    source: 'https://github.com/dumbpishu/GeoChat',
    year: '2025',
    color: '#a78bfa',
    description:
      'Chat instantly with people nearby, with OTP and JWT auth, media sharing, reactions and persistent history.',
    tags: ['Node.js', 'WebSockets', 'JWT'],
  },
  {
    name: 'BazaarX',
    tagline: 'Online marketplace',
    image: '/projects/bazaarx.webp',
    live: 'https://bazaar-x.vercel.app',
    source: 'https://github.com/dumbpishu/BazaarX',
    year: '2024',
    color: '#34d399',
    description:
      'List, search and buy products, with authentication, real-time buyer–seller chat and integrated payments.',
    tags: ['React', 'Express', 'Payments'],
  },
]

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Motion', 'Recharts'] },
  { group: 'Mobile', items: ['React Native', 'Expo', 'Expo Router', 'NativeWind', 'Reanimated'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Hono', 'WebSockets', 'REST APIs', 'Better Auth'] },
  { group: 'Data', items: ['PostgreSQL', 'Drizzle ORM', 'MongoDB', 'Redis', 'Pinecone', 'Zod'] },
  { group: 'AI & DevOps', items: ['RAG', 'LLM pipelines', 'GitHub Actions', 'Docker', 'Vercel', 'Jest'] },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'Noida Institute of Engineering and Technology',
    period: '2023 – 2027',
    score: 'CGPA 8.38',
  },
  {
    degree: 'Class XII',
    school: 'Delhi Public School Jubilee, Motihari',
    period: '2022',
    score: '72.6%',
  },
  {
    degree: 'Class X',
    school: 'Rajhans Public School, Motihari',
    period: '2020',
    score: '80.8%',
  },
]

export const achievements = [
  {
    title: 'Hacknovate 7.0',
    text: 'Recognised for presenting “Unified Electoral Roll & Voter Mobility System” under the theme “One Nation One Election.”',
  },
  {
    title: '24-hour client delivery',
    text: 'Designed and shipped a client-facing lead-generation landing page within 24 hours.',
  },
  {
    title: 'Certifications',
    text: 'Full Stack Web Development training · Java and Python programs via Infosys Springboard.',
  },
]
