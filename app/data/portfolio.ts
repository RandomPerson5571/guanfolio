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
  title: "Software Developer × Robotics Builder",
  bio: "I build robotics systems, intelligent developer tools, and polished software products from first prototype to production.",
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
    id: "clarity-jamhacks26",
    title: "Clarity",
    description:
      "A screen-aware AI desktop overlay for navigation, tutoring, accessibility, and on-screen guidance.",
    longDescription:
      "Built for JAMHacks 2026, Clarity combines Electron overlays with Gemini and Ollama planning, Groq-generated interactive learning widgets, local and remote RAG, OCR and Moondream localization, and accessibility tools behind a secure IPC boundary.",
    tags: [
      "Electron 35",
      "React 19",
      "Gemini",
      "Groq",
      "Ollama",
      "LanceDB",
      "Cloudflare Workers",
    ],
    category: "intelligence",
    stats: "JAMHacks26",
    year: "2026",
    status: ["Completed"],
  },
  {
    id: "sentry",
    title: "Sentry",
    description:
      "A local-first macOS execution layer that keeps developers aligned with their work and restores approved context.",
    longDescription:
      "Sentry pairs a React and Tauri desktop client with a token-authenticated FastAPI sidecar, SQLite, and Chroma. It provides focus sessions, drift detection, local corrections, explicit workspace capture, safe context restoration, and privacy-first retention controls.",
    tags: [
      "React 19",
      "TypeScript",
      "Tauri 2",
      "Rust",
      "FastAPI",
      "SQLite",
      "Chroma",
      "Ollama",
    ],
    category: "systems",
    stats: "Alpha",
    year: "2026",
    status: ["In-Progress"],
  },
  {
    id: "guanplanner",
    title: "Guanplanner",
    description:
      "A cross-platform IDE for designing VEX autonomous routines.",
    longDescription:
      "Engineered with React 19, TypeScript, Tauri 2, and SQLite. A GitHub Actions matrix pipeline produces signed macOS, Windows, and Linux releases, while Cloudflare Workers securely proxy auto-updates from private GitHub Releases.",
    tags: [
      "React 19",
      "TypeScript",
      "Tauri 2",
      "SQLite",
      "GitHub Actions",
      "Cloudflare Workers",
    ],
    category: "systems",
    stats: "Active",
    year: "2026",
    status: ["Active", "Maintained"],
  },
  {
    id: "stl-vex-platform",
    title: "STL VEX Robotics Platform",
    description:
      "A monorepo management platform supporting 200+ members across six VEX robotics sub-teams.",
    longDescription:
      "Built with Turborepo, Supabase, and Prisma; secured backend APIs with Zuplo; integrated RoboEvents schedules and rankings; and automated CAD and code notifications through a Discord bot connected to GitHub and Fusion 360 webhooks.",
    tags: [
      "Turborepo",
      "Supabase",
      "Prisma",
      "Zuplo",
      "RoboEvents API",
      "Discord",
      "GitHub",
      "Fusion 360",
    ],
    category: "systems",
    stats: "Active",
    year: "2026",
    status: ["In-Progress"],
  },
  {
    id: "roboarm",
    title: "RoboArm",
    description:
      "A vision-language-action pipeline that controls a custom 5-DOF robotic arm from natural-language commands.",
    longDescription:
      "Combined Groq Whisper, YOLOv11 with OpenVINO, Ollama Llama 3.2, and inverse kinematics. GPU acceleration reached 17.3 ms average detection latency (57.7 FPS) and 27 FPS end-to-end, with Next.js and FastAPI communicating over WebSockets for video, detections, and telemetry.",
    tags: [
      "YOLOv11",
      "OpenVINO",
      "Ollama",
      "Groq Whisper",
      "Next.js",
      "FastAPI",
      "WebSockets",
      "Inverse Kinematics",
    ],
    category: "intelligence",
    stats: "Active",
    year: "2026",
    status: ["In-Progress"],
  },
  {
    id: "ngnhacks-website",
    title: "NGNHacks Website",
    description:
      "The official hackathon website serving 342 participants.",
    longDescription:
      "Developed with Next.js, GSAP, Framer Motion, and Supabase. Also led frontend and API workshops teaching React fundamentals and REST API integration during the event.",
    tags: ["Next.js", "GSAP", "Framer Motion", "Supabase", "REST APIs"],
    category: "web",
    stats: "Live",
    year: "2026",
    status: ["Completed", "Maintained"],
  },
  {
    id: "connectus",
    title: "Connectus",
    description:
      "A cross-platform study app that synchronizes Pomodoro sessions between people anywhere in the world.",
    longDescription:
      "Connectus combines live Pomodoro synchronization with chat, community spaces, task management, and calendar planning in one collaborative study experience.",
    tags: [
      "Cross-platform",
      "Real-time Sync",
      "Pomodoro",
      "Chat",
      "Todo List",
      "Calendar",
    ],
    category: "web",
    stats: "Active",
    year: "2026",
    status: ["In-Progress"],
  },
  {
    id: "eeg-analysis-research",
    title: "EEG-Analysis Research",
    description: "Analyzed EEG patterns to diagnose Alzheimer’s Disease (AD).",
    longDescription:
      "A data science and machine learning research initiative using Python and scikit-learn to identify patterns in EEG brain-wave data associated with Alzheimer’s Disease.",
    tags: ["Python", "scikit-learn", "Machine Learning", "Research"],
    category: "intelligence",
    stats: "Research",
    year: "2026",
    status: ["Completed"],
  },
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
    id: "algorithm-alchemists-president",
    role: "President",
    organization: "Algorithm Alchemists",
    date: "September 2025 - Present",
    description:
      "Leads club operations, software projects, and curriculum planning.",
  },
  {
    id: "biology-club-president",
    role: "President",
    organization: "Biology Club, Saint Theresa of Lisieux C.H.S.",
    date: "September 2024 - Present",
    description:
      "Reached over 180 students, averaging approximately 30 attendees per meeting.",
  },
  {
    id: "stl-vex-software-education-director",
    role: "Software Education Director",
    organization: "Saint Theresa of Lisieux VEX Robotics",
    date: "September 2025 - Present",
    description:
      "Leads software education and technical training for robotics members.",
  },
  {
    id: "stl-robotics-software-developer",
    role: "Software Developer",
    organization: "Saint Theresa of Lisieux VEX Robotics",
    date: "May 2026 - Present",
    description:
      "Built a secured Turborepo, Supabase, and Prisma management platform supporting 200+ members across six robotics sub-teams, with RoboEvents data and automated GitHub and Fusion 360 notifications.",
  },
  {
    id: "gentoo-general-member",
    role: "General Member",
    organization: "Gentoo",
    date: "Present",
    description: "Contributes as a general member.",
  },
  {
    id: "yanlearn-tutor",
    role: "Tutor",
    organization: "YanLearn",
    date: "March 2026 - Present",
    description:
      "Tutors science and computer science and raised $500 for SickKids through parent donations.",
  },
  {
    id: "ngnhacks-software-developer",
    role: "Software Developer",
    organization: "NGNHacks",
    date: "June 2026 - Present",
    description:
      "Developed the official website serving 342 participants and led workshops on React fundamentals and REST API integration.",
  },
  {
    id: "eurekahacks-software-developer",
    role: "Software Developer",
    organization: "EurekaHacks",
    date: "Present",
    description: "Develops software for EurekaHacks.",
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
