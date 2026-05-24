import { WindowType } from "../types/types";

export interface AppItem {
  id: WindowType;
  title: string;
}

export const APPS: AppItem[] = [
  { id: "projects", title: "Projects" },
  { id: "resume", title: "Resume" },
  { id: "blog", title: "Journal" },
  { id: "connect", title: "Connect" },
  { id: "terminal", title: "CLI Console" },
];
