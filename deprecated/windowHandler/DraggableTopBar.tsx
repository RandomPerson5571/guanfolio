"use client";

import { useWindowStore } from "@/deprecated/stores/windowStore";
import { Minus, Square, Terminal, X } from "lucide-react";
import React, { createElement, ReactNode } from "react";

type Props = {
  id: string;
  title?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;

  onPointerDown?: (e: React.PointerEvent) => void;
};

export default function DraggableTopBar({
  id,
  title,
  icon,
  onPointerDown,
}: Props) {
  const windowIcon: ReactNode = icon ? (
    createElement(icon)
  ) : (
    <Terminal size={14} stroke="white" />
  );

  const onMinimize = useWindowStore((s) => s.minimizeWindow);
  const onFullScreen = useWindowStore((s) => s.focusWindow);
  const onClose = useWindowStore((s) => s.closeWindow);

  return (
    <div
      onPointerDown={onPointerDown}
      style={{ touchAction: "none", cursor: "grab" }}
      className="bg-(--color-surface-container-highest) backdrop-blur-md px-4 py-2 flex items-center justify-between border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        {windowIcon}
        {/* Fixed text color class */}
        <span className="select-none font-code-sm text-[11px] text-color-on-surface-variant">
          {title ?? "root@kali:~"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* Minimize - Fixed background class */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize(id);
          }}
          className="w-3 h-3 rounded-full bg-color-surface-container-low border border-white/10 hover:bg-white/20 cursor-pointer flex items-center justify-center group transition-colors"
        >
          <Minus className="w-2 h-2 text-white/70 transition-opacity" />
        </button>

        {/* Fullscreen - Fixed background class */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFullScreen(id);
          }}
          className="w-3 h-3 rounded-full bg-color-surface-container-low border border-white/10 hover:bg-white/20 cursor-pointer flex items-center justify-center group transition-colors"
        >
          <Square className="w-1.5 h-1.5 text-white/70 transition-opacity" />
        </button>

        {/* Close - Fixed background, border, and text classes */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="w-3 h-3 rounded-full color-error/20 border border-color-error/50 hover:bg-color-error/40 cursor-pointer flex items-center justify-center group transition-colors"
        >
          <X className="w-2 h-2 color-error transition-opacity" />
        </button>
      </div>
    </div>
  );
}
