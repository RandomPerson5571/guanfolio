import React, { ReactNode } from "react";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
}

export default function DesktopIcon({ icon, label }: DesktopIconProps) {
  return (
    <button className="flex flex-col items-center gap-2 group w-full">
      <div className="w-12 h-12 rounded-xl bg-surface-container/50 border border-white/5 flex items-center justify-center group-hover:bg-surface-tint/10 group-hover:border-surface-tint/30 transition-all">
        <span className="text-on-surface-variant group-hover:text-surface-tint text-2xl">
          {icon}
        </span>
      </div>
      <span className="font-code-sm text-[11px] text-on-surface-variant group-hover:text-on-surface">
        {label}
      </span>
    </button>
  );
}
