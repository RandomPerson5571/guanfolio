import { LucideIcon } from "lucide-react";
import { WindowType } from "./types";

export interface NavItem {
  id: WindowType;
  label: string;
  icon: LucideIcon;
  color: string;
}
