import React from "react";

interface DesktopIconProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick?: () => void;
}

export default function DesktopIcon({
  icon: Icon,
  label,
  onClick,
}: DesktopIconProps) {
  return (
    <button
      className="flex flex-col items-center gap-2 group w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-xl bg-color-surface-container/50 border border-white/5 flex items-center justify-center group-hover:bg-(--color-surface-tint)/10 group-hover:border-(--color-surface-tint)/30 transition-all">
        <Icon
          className="w-5 h-5 text-(--color-on-surface-variant) group-hover:text-(--color-surface-tint) transition-colors"
          strokeWidth={1.5}
        />
      </div>
      <span className="font-code-sm text-[11px] text-(--color-on-surface-variant) group-hover:text-(--color-on-surface) transition-colors">
        {label}
      </span>
    </button>
  );
}
