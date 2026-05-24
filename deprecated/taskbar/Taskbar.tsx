"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Terminal,
  FolderOpen,
  User,
  Settings,
  Volume2,
  Maximize2,
} from "lucide-react";
import TaskbarButton from "./TaskbarButton";

export default function Taskbar() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial date immediately on mounting client-side
    setDate(new Date());

    // Update the clock state loop reliably every second
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Structural hydration shield: don't render string clocks until client execution matches
  if (!date) {
    return (
      <div className="fixed bottom-0 w-full h-[--spacing-taskbar-height] z-50 bg-[--color-surface-container]/65 backdrop-blur-[30px] border-t border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex justify-between items-center px-[--spacing-margin-desktop] max-w-none" />
    );
  }

  // Format clean human-readable text strings
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed bottom-0 w-full h-[--spacing-taskbar-height] z-50 bg-[--color-surface-container]/65 backdrop-blur-[30px] border-t border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex justify-between items-center px-[--spacing-margin-desktop] max-w-none">
      <div className="flex items-center gap-2 h-full">
        {/* Taskbar Button Items */}
        <TaskbarButton Icon={LayoutGrid} isActive />
        <TaskbarButton Icon={Terminal} />
        <TaskbarButton Icon={FolderOpen} />
        <TaskbarButton Icon={User} />
        <TaskbarButton Icon={Settings} />
      </div>

      <div className="flex items-center gap-4 text-on-surface-variant font-code-sm text-[12px] h-full pr-2">
        <Volume2
          className="w-4 h-4 hover:text-surface-tint cursor-pointer"
          strokeWidth={1.5}
        />

        {/* DATE */}
        <div className="flex flex-col items-end px-3 leading-tight text-right opacity-80 cursor-default font-code-sm">
          <span>{timeString}</span>
          <span className="text-[10px]">{dateString}</span>
        </div>
        <Maximize2
          className="w-4.5 h-4.5 ml-2 hover:text-surface-tint cursor-pointer"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
