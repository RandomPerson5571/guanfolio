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

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  github?: string;
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
