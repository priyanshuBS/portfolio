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
  "I'm a Computer Science undergraduate at Noida Institute of Engineering and Technology. I enjoy owning work from the first idea to the final release: understanding the problem, designing how the pieces fit together, and shipping something people can rely on.",
  "I learn quickly, pick the right tool for the job, and care about clean, maintainable code and the small details that make software feel good to use. I'm at my best on a team that builds with ambition, ships often and keeps raising the bar.",
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
    tagline: 'Expense tracking, made for India',
    image: '/projects/paipai.webp',
    live: 'https://paipai.priyanshusingh.co.in',
    source: 'https://github.com/priyanshuBS/paipai',
    year: '2026',
    featured: true,
    platforms: ['Web', 'Android', 'iOS'],
    color: '#f97316',
    description:
      'A calm, fast ledger for everyday spending in rupees. Log an expense in two taps, see where your money goes and stay inside your budgets. A Next.js website and an Expo app for Android and iOS share one typed Hono API.',
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
      'Short daily quizzes in English, Reasoning, Puzzles and Computer Science, with a clear explanation after every answer and a short article each morning. Fresh content arrives twice a day without an app update, and one Expo codebase ships to Android, iOS and the web.',
    highlights: [
      'AI content pipeline on GitHub Actions: Groq writes each drop, a second pass fact-checks it',
      'Every drop is schema-validated and de-duplicated before it is ever served',
      'Passwordless email-code sign-in with hashed tokens and rate limits',
      'Works offline with delta progress sync, plus streaks, levels and badges',
    ],
    tags: ['Expo', 'React Native', 'Expo Router', 'Neon Postgres', 'Groq', 'Zod'],
  },
  {
    name: 'ExplainThis',
    tagline: 'Ask your PDFs anything',
    image: '/projects/explainthis.webp',
    live: 'https://explainthisai.priyanshusingh.co.in',
    source: 'https://github.com/priyanshuBS/ExplainThisAI',
    year: '2026',
    color: '#22d3ee',
    description:
      'Upload PDFs and ask questions in plain language. A retrieval pipeline parses and chunks each file, stores its embeddings in Pinecone, and answers from the most relevant passages with a Groq-hosted LLM, with every conversation saved in PostgreSQL.',
    tags: ['RAG', 'Pinecone', 'Groq', 'Prisma', 'PostgreSQL'],
  },
  {
    name: 'GeoChat',
    tagline: 'Real-time chat with people near you',
    image: '/projects/geochat.webp',
    live: 'https://geochat.pishu.in',
    source: 'https://github.com/dumbpishu/GeoChat',
    year: '2026',
    color: '#a78bfa',
    description:
      'Opens a live chat room with everyone in your area, grouped by geohash and switching automatically as you move. Socket.IO with a Redis adapter delivers messages, typing indicators, reactions, mentions and image sharing instantly, behind email OTP sign-in.',
    tags: ['Socket.IO', 'Redis', 'MongoDB', 'React', 'Zustand'],
  },
  {
    name: 'BazaarX',
    tagline: 'A marketplace to buy and sell anything',
    image: '/projects/bazaarx.webp',
    live: 'https://bazaar-x.vercel.app',
    source: 'https://github.com/dumbpishu/BazaarX',
    year: '2025',
    color: '#34d399',
    description:
      'List products with photos, browse by category, search, and check out from a cart with Razorpay payments verified on the server. Buyers and sellers chat in real time, sellers manage listings from a dashboard, and sign-in works with email or Google.',
    tags: ['React', 'Express', 'MongoDB', 'Socket.IO', 'Razorpay'],
  },
]

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'TanStack Query'] },
  { group: 'Mobile', items: ['React Native', 'Expo', 'Expo Router', 'NativeWind', 'Reanimated'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Hono', 'Socket.IO', 'REST APIs', 'JWT & OAuth'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Drizzle', 'Pinecone'] },
  { group: 'AI & DevOps', items: ['RAG', 'LLM APIs', 'GitHub Actions', 'Docker', 'Vercel', 'Jest'] },
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
