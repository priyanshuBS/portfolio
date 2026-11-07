// Single source of truth for all portfolio content.
// Update this file to change what appears on the site.

export const profile = {
  name: 'Priyanshu Singh',
  firstName: 'Priyanshu',
  title: 'Full-Stack Developer',
  headline: 'I build real-time, AI-powered web products — from the database to the pixel.',
  location: 'Noida, India',
  email: 'dotpriyanshu@gmail.com',
  summary:
    'Computer Science undergraduate building real-time, AI-powered web applications with React, Node.js and TypeScript.',
  socials: {
    github: 'https://github.com/dumbpishu',
    linkedin: 'https://www.linkedin.com/in/priyanshubs/',
    leetcode: 'https://leetcode.com/u/priyanshu1340/',
  },
}

export const about = [
  "I'm a Computer Science undergraduate at Noida Institute of Engineering and Technology with a strong foundation in Java, JavaScript, TypeScript, React.js, Node.js and database systems.",
  'I enjoy building full-stack products end-to-end, from location-based real-time chat to RAG-powered AI assistants and online marketplaces.',
]

export const stats = [
  { value: 8.38, decimals: 2, suffix: '', label: 'CGPA' },
  { value: 3, decimals: 0, suffix: '', label: 'Live projects' },
  { value: 15, decimals: 0, suffix: '+', label: 'Technologies' },
]

export type Project = {
  name: string
  tagline: string
  image: string
  live: string
  source: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    name: 'GeoChat',
    tagline: 'Location-based real-time chat',
    image: '/projects/geochat.webp',
    live: 'https://geochat.pishu.in',
    source: 'https://github.com/dumbpishu/GeoChat',
    description:
      'Connects you with people nearby for instant messaging, with OTP + JWT auth, media sharing, reactions and persistent history.',
    tags: ['Node.js', 'WebSockets', 'JWT'],
  },
  {
    name: 'ExplainThis',
    tagline: 'Chat with your documents',
    image: '/projects/explainthis.webp',
    live: 'https://explainthisai.priyanshusingh.co.in',
    source: 'https://github.com/priyanshuBS/ExplainThisAI',
    description:
      'A RAG pipeline that answers questions from uploaded PDFs, using Pinecone for semantic search and Redis for conversational memory.',
    tags: ['RAG', 'Pinecone', 'Redis'],
  },
  {
    name: 'BazaarX',
    tagline: 'Online marketplace',
    image: '/projects/bazaarx.webp',
    live: 'https://bazaar-x.vercel.app',
    source: 'https://github.com/dumbpishu/BazaarX',
    description:
      'List, search and buy products, with authentication, real-time buyer–seller chat and integrated payments.',
    tags: ['React', 'Express', 'Payments'],
  },
]

export const skills = [
  { group: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python'] },
  { group: 'Web', items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS'] },
  { group: 'Databases', items: ['MongoDB', 'PostgreSQL', 'Redis'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Postman'] },
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
