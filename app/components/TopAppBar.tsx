import React from "react";
import { Terminal, Wifi, Battery, Bell } from "lucide-react";

export default function TopAppBar() {
  return (
    <div className="px-5 z-50 top-0 bg-transparent flex justify-between items-center w-full pt-4 border-0 shadow-none">
      {/* Session Title */}
      <div className="flex items-center gap-2 text-(--color-surface-tint) font-code-sm text-(--text-code-sm) cursor-default">
        <Terminal className="w-4.5 h-4.5" strokeWidth={1.5} />
        <span>GUANFOLIO</span>
      </div>

      {/* Center Label */}
      <div className="font-label-caps text-(--text-label-caps) text-(--color-on-surface) tracking-tighter absolute left-1/2 -translate-x-1/2">
        Windows
      </div>

      {/* System Status Indicators */}
      <div className="flex items-center gap-4 text-(--color-on-surface-variant)">
        <Wifi
          className="w-4.5 h-4.5 hover:text-(--color-primary) transition-colors cursor-pointer"
          strokeWidth={1.5}
        />
        <Battery
          className="w-4.5 h-4.5 hover:text-(--color-primary) transition-colors cursor-pointer"
          strokeWidth={1.5}
        />
        <Bell
          className="w-4.5 h-4.5 hover:text-(--color-primary) transition-colors cursor-pointer"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
