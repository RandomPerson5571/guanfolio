import { Folder, FileText, BookOpen, Network, Palette } from "lucide-react";
import { NavItem } from "../types/desktopIcon";

export const DesktopIcons: NavItem[] = [
  {
    id: "projects",
    label: "Projects",
    icon: Folder,
    color: "text-orange-300",
  },
  { id: "resume", label: "Resume", icon: FileText, color: "text-peach-200" },
  { id: "blog", label: "Blog", icon: BookOpen, color: "text-amber-300" },
  { id: "connect", label: "Connect", icon: Network, color: "text-pink-400" },
  {
    id: "personalization",
    label: "Personalize",
    icon: Palette,
    color: "text-cyan-300",
  },
];
