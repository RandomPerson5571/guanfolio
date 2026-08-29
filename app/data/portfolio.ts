import { clientInfo } from "../types/clientInfo";
import {
  Project,
  BlogPost,
  Education,
  Experience,
  ExtraSkills,
  SocialLink,
} from "../types/types";

export const CLIENT_INFO: clientInfo = {
  name: "Ethan Guan",
  alias: "root@kali",
  title: "Aspiring Mechatronics Engineer & Full-Stack Developer",
  bio: "Designing responsive high-fidelity interfaces by day, auditing kernel security and network protocols by night. Crafting modern, secure, and performant web architecture.",
  location: "Richmond Hill, ON, CA",
  email: "ethanguan5571@gmail.com",
  github: "https://github.com/RandomPerson5571",
  skills: [
    { name: "React & Next.js", level: 95 },
    { name: "TypeScript & JavaScript", level: 94 },
    { name: "PostgreSQL & Supabase", level: 94 },
    { name: "Tailwind CSS & UI Design", level: 92 },
    { name: "Python & Django", level: 88 },
    { name: "Java & C++", level: 88 },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "guanine-tracker-pro",
    title: "GuanineTrackerPro",
    description: "An all-in-one browser app to track your workouts.",
    longDescription:
      "A comprehensive fitness tracking web application built to monitor and analyze workout routines using modern React components and backend integration.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
    category: "web",
    stats: "Active",
    year: "2026",
    status: ["Completed"],
  },
  {
    id: "eeg-analysis-research",
    title: "EEG-Analysis Research",
    description: "Analyzed EEG patterns to diagnose Alzheimer’s Disease (AD).",
    longDescription:
      "A data science and machine learning research initiative leveraging scikit-learn to detect and diagnose Alzheimer's Disease through the analysis of EEG brain wave patterns.",
    tags: ["Python", "scikit-learn", "Machine Learning", "Research"],
    category: "intelligence",
    stats: "Research",
    year: "2026",
    status: ["Completed"],
  },
  {
    id: "stl-event-tracker",
    title: "STL Event Tracker",
    description: "A web-app that tracks events and awards points.",
    longDescription:
      "A full-stack application designed to monitor school events, track attendance, and manage a point-based reward system using a Django backend and React frontend.",
    tags: ["Python", "Django", "React", "PostgreSQL", "Tailwind CSS", "JWT"],
    category: "systems",
    stats: "Active",
    year: "2026",
    status: ["In-Progress"],
  },
  {
    id: "guanfolio-app",
    title: "Guanfolio",
    description: "An OS-styled Personal Portfolio",
    longDescription: "A personal portfolio",
    tags: ["Next.js"],
    category: "web",
    stats: "Active",
    year: "2026",
    link: "https://guanfolio.vercel.app/",
    github: "https://github.com/RandomPerson5571/guanfolio",
    status: ["Active", "Maintained"],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  // Keeping boilerplate blog posts since no new ones were provided
  {
    id: "securing-react-2026",
    title: "Securing Client-Side React Applications in 2026",
    date: "May 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Modern Single-Page Applications present massive security entry points. Let us talk about CSP, sandboxing, and WASM cryptography.",
    content: `Single-Page Applications (SPAs) have taken over the modern web...`,
    tags: ["Security", "React", "WASM"],
  },
];

export const SOCIALS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/RandomPerson5571",
    username: "Randomperson5571",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/bobsanborne5571/",
    username: "bobsanborne5571",
  },
  {
    platform: "Email",
    url: "mailto:ethanguan5571@gmail.com",
    username: "ethanguan5571@gmail.com",
  },
  {
    platform: "Discord",
    url: "https://discord.com",
    username: "jeremonyjones1092",
  },
];

// --- NEW RESUME SECTIONS ADDED FOR YOUR COMPONENTS ---

export const EXPERIENCE: Experience[] = [
  {
    id: "biology-club",
    role: "Biology Club President",
    organization: "Saint Theresa of Lisieux C.H.S.",
    date: "September 2024 - PRESENT",
    description:
      "Reached over 180 students, averaging ~30 attendees per meeting.",
  },
  {
    id: "algorithm-alchemists",
    role: "Vice President, Lead Web Developer",
    organization: "Algorithm Alchemists",
    date: "September 2025 - PRESENT",
    description:
      "Directed web development projects and assisted in club leadership and curriculum planning.",
  },
  {
    id: "yanlearn-tutor",
    role: "Science and Computer Science Tutor",
    organization: "Yanlearn",
    date: "March 2026 - PRESENT",
    description:
      "Raised $500 for Sick Kids through donations from the parents of students.",
  },
  {
    id: "vex-robotics",
    role: "Programming Lead",
    organization: "Vex Robotics",
    date: "September 2025 - PRESENT",
    description:
      "Led autonomous and driver-control programming initiatives for competition robotics.",
  },
  {
    id: "ngn-hacks-organizer",
    role: "Organizer, Software Developer",
    organization: "NGN Hacks",
    date: "May 2026 - PRESENT",
    description: "Handled logistics and worked on the hackathon website",
  },
];

export const EDUCATION: Education[] = [
  {
    school: "Saint Theresa of Lisieux C.H.S.",
    address: "230 Shaftsbury Ave.",
    degree: "Ontario Secondary School Diploma (OSSD)",
    date: "September 2023 - June 2027 (expected)",
    notes:
      "Relevant coursework: Grade 12 Computer science (achieved a final of 98%)",
  },
];

export const AWARDS = [
  "Canadian Biology Olympiad (CBO) Silver Medalist",
  "Canadian Computing Competition (CCC) — Junior Division: 72/75",
  "Beaver Computing Challenge (BCC) perfect score",
  "Honour roll (Grades 9-10)",
  "Math award (grade 10)",
  "French award (grade 10)",
  "Regional Chess Awards. Multiple top 3 placements in competitive tournaments",
];

export const EXTRA_SKILLS: ExtraSkills = {
  languages: [
    "English (Native Proficiency)",
    "French (Intermediate Proficiency)",
    "Chinese (Basic Proficiency)",
  ],
  tools: ["Git", "Docker", "PostgreSQL", "REST APIs", "Web Extensions"],
  interests: ["Piano", "Badminton", "Chess", "Weight Lifting"],
};

export interface PortfolioData {
  clientInfo: clientInfo;
  projects: Project[];
  blogPosts: BlogPost[];
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  awards: string[];
  extraSkills: ExtraSkills;
  resumeUrl: string;
}

export const FALLBACK_PORTFOLIO_DATA: PortfolioData = {
  clientInfo: CLIENT_INFO,
  projects: PROJECTS,
  blogPosts: BLOG_POSTS,
  socials: SOCIALS,
  experience: EXPERIENCE,
  education: EDUCATION,
  awards: AWARDS,
  extraSkills: EXTRA_SKILLS,
  resumeUrl: "/resume.pdf",
};
