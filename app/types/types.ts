export type WindowType =
  | "projects"
  | "resume"
  | "blog"
  | "connect"
  | "personalization"
  | "terminal";

export interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number; // percentage or pixels
  y: number;
  zIndex: number;
  width?: number; // width in pixels or arbitrary units
  height?: number;
}

export type ProjectStatus =
  | "In-Progress" // Replaces "Active" / "Work-In-Progress" (actively being built)
  | "Maintained" // Done, but actively getting bug fixes/updates
  | "Active"
  | "Completed" // Replaces "Finished" (done, stable, no further work needed)
  | "Deprecated" // Replaces "Unmaintained" (legacy, no longer supported)
  | "Paused"; // A healthy alternative for abandoned but not dead projects

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  github?: string;
  status: ProjectStatus[];
  category: "web" | "security" | "intelligence" | "systems";
  stats: string;
  year: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  date: string;
  description: string;
}

export interface Education {
  school: string;
  address: string;
  degree: string;
  date: string;
  notes: string;
}

export interface ExtraSkills {
  languages: string[];
  tools: string[];
  interests: string[];
}
