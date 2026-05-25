import React from "react";
import { WindowType } from "../../types/types";
import { NavItem } from "@/app/types/desktopIcon";

interface DesktopNavRailProps {
  desktopIcon: NavItem;
  onOpenWindow: (id: WindowType) => void;
  windowActive: boolean;
}

export default function DesktopIcon({
  desktopIcon,
  onOpenWindow,
  windowActive,
}: DesktopNavRailProps) {
  const IconComponent = desktopIcon.icon;
  const isActive = windowActive;
  return (
    <button
      key={desktopIcon.id}
      onClick={() => onOpenWindow(desktopIcon.id)}
      id={`nav-item-${desktopIcon.id}`}
      className="pointer-events-auto flex flex-col items-center justify-center group focus:outline-none cursor-pointer"
    >
      {/* Visual Icon Outer Container */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 relative
                ${
                  isActive
                    ? "bg-orange-300/15 border-orange-300/40 shadow-orange-950/20 shadow-inner"
                    : "bg-neutral-950/30 border-orange-200/10 group-hover:bg-orange-300/10 group-hover:border-orange-300/30"
                }
              `}
      >
        <IconComponent
          className={`w-6 h-6 stroke-[1.5] transition-transform duration-300 group-hover:scale-115
                  ${isActive ? "text-orange-200 glow-text-peach" : "text-orange-200/60 group-hover:text-orange-200"}
                `}
        />

        {/* Active Status indicator overlay dots */}
        {isActive && (
          <span className="absolute bottom-1 right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-300"></span>
          </span>
        )}
      </div>

      {/* Display labels */}
      <span
        className={`text-[10px] uppercase font-mono tracking-wider mt-1.5 select-none transition-colors duration-200
                ${isActive ? "text-orange-100 font-semibold" : "text-orange-200/55 group-hover:text-orange-100"}
              `}
      >
        {desktopIcon.label}
      </span>
    </button>
  );
}
