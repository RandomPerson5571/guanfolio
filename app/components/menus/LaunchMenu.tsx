"use client";

import React, { useEffect } from "react";
import { WindowType } from "../../types/types";
import { APPS } from "../../data/apps";
import { BookOpenText, FileText, FolderKanban, Mail, Terminal } from "lucide-react";

const appIcons = {
  terminal: Terminal,
  projects: FolderKanban,
  resume: FileText,
  connect: Mail,
  blog: BookOpenText,
};

interface LaunchMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowType) => void;
}

export default function LaunchMenu({
  isOpen,
  onClose,
  onOpenWindow,
}: LaunchMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div id="desktop-launch-menu" role="menu" aria-label="Applications" className="fixed z-30 bottom-17 left-3 w-[calc(100vw-1.5rem)] max-w-72 bg-neutral-950/95 border border-orange-200/15 rounded-xl p-4 shadow-2xl animate-fade-in backdrop-blur-xl sm:left-6">
      <div className="pb-2 border-b border-orange-200/10 mb-2 flex justify-between items-center">
        <span className="text-[10px] font-mono text-orange-200/40 uppercase">
          App Lounge
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close applications menu"
          id="launch-menu-close"
          className="text-[10px] font-mono text-rose-400 hover:text-rose-300"
        >
          DISMISS
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {APPS.map((app) => {
          const AppIcon = appIcons[app.id as keyof typeof appIcons] ?? FolderKanban;
          return <button
            key={app.id}
            type="button"
            role="menuitem"
            onClick={() => {
              onOpenWindow(app.id as WindowType);
              onClose();
            }}
            id={`launch-app-${app.id}`}
            className="p-3 bg-black/40 border border-orange-200/5 hover:border-orange-200/25 rounded-lg text-orange-200 hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <AppIcon aria-hidden="true" className="h-4 w-4" />
            <span>{app.title}</span>
          </button>;
        })}
      </div>
    </div>
  );
}
