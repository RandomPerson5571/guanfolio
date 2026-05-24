import React from "react";
import { WindowType } from "../../types/types";
import { DesktopIcons } from "@/app/data/desktopIcons";

interface DesktopNavRailProps {
  onOpenWindow: (id: WindowType) => void;
  activeWindows: { [key in WindowType]: boolean };
}

export default function DesktopNavRail({
  onOpenWindow,
  activeWindows,
}: DesktopNavRailProps) {
  return (
    <div
      id="desktop-nav-rail"
      className="fixed left-5 top-16 bottom-21 w-24 flex flex-col justify-start gap-5 items-center z-20 select-none"
    >
      {DesktopIcons.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeWindows[item.id];

        return (
          <button
            key={item.id}
            onClick={() => onOpenWindow(item.id)}
            id={`nav-item-${item.id}`}
            className="flex flex-col items-center justify-center group focus:outline-none cursor-pointer"
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
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
