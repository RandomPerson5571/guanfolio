"use client";

import React from "react";
import { WindowType } from "../../types/types";
import { APPS } from "../../data/apps";

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
  if (!isOpen) return null;

  return (
    <div className="fixed z-30 bottom-17 left-6 w-72 bg-neutral-950/90 border border-orange-200/15 rounded-xl p-4 shadow-2xl animate-fade-in backdrop-blur-xl">
      <div className="pb-2 border-b border-orange-200/10 mb-2 flex justify-between items-center">
        <span className="text-[10px] font-mono text-orange-200/40 uppercase">
          App Lounge
        </span>
        <button
          onClick={onClose}
          id="launch-menu-close"
          className="text-[10px] font-mono text-rose-400 hover:text-rose-300"
        >
          DISMISS
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              onOpenWindow(app.id as WindowType);
              onClose();
            }}
            id={`launch-app-${app.id}`}
            className="p-3 bg-black/40 border border-orange-200/5 hover:border-orange-200/25 rounded-lg text-orange-200 hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <span className="text-[14px]">📁</span>
            <span>{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
