"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Terminal,
  Folder,
  User,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  Palette,
} from "lucide-react";
import { WindowType } from "../../types/types";

interface DesktopTaskbarProps {
  activeWindows: Record<WindowType, boolean>;
  launchMenuOpen?: boolean;
  onOpenWindow: (id: WindowType) => void;
  onOpenLaunchMenu?: () => void;
  onOpenSettingsMenu?: () => void;
  settingsMenuOpen?: boolean;
}

export default function DesktopTaskbar({
  activeWindows,
  launchMenuOpen = false,
  onOpenWindow,
  onOpenLaunchMenu,
  onOpenSettingsMenu,
  settingsMenuOpen = false,
}: DesktopTaskbarProps) {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [volume, setVolume] = useState(80);

  // Dynamic real-time sync clock
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format: 09:29 PM
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 12 instead of 0
      const minutes = String(now.getMinutes()).padStart(2, "0");
      // const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes} ${ampm}`);

      // Format: May 21, 2026
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();
      setDateStr(`${month} ${day}, ${year}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <nav
      id="desktop-taskbar"
      aria-label="Desktop dock"
      className="desktop-taskbar fixed bottom-0 left-0 right-0 h-16 bg-neutral-950/70 backdrop-blur-3xl border-t border-white/10 flex items-center justify-between px-3 md:px-5 select-none z-50 text-sans font-normal"
    >
      {/* Quick Launcher Controls (Left) */}
      <div className="desktop-taskbar-launchers flex min-w-0 items-center gap-2 overflow-x-auto md:gap-3">
        <button
          type="button"
          onClick={onOpenLaunchMenu}
          id="taskbar-btn-grid"
          className="w-11 h-11 shrink-0 rounded-lg bg-white/8 hover:bg-white/14 border border-white/10 flex items-center justify-center text-stone-100 transition-colors cursor-pointer"
          aria-label="Open application menu"
          aria-expanded={launchMenuOpen}
          aria-controls="desktop-launch-menu"
        >
          <LayoutGrid className="w-4 h-4" aria-hidden="true" />
        </button>

        <span className="w-px h-6 bg-orange-200/10"></span>

        <button
          type="button"
          onClick={() => onOpenWindow("terminal")}
          id="taskbar-btn-terminal"
          className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${activeWindows.terminal ? "bg-white/14 text-white" : "text-stone-300 hover:bg-white/8 hover:text-white"}`}
          aria-label="Open terminal"
          aria-pressed={activeWindows.terminal}
        >
          <Terminal className="w-4.5 h-4.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onOpenWindow("projects")}
          id="taskbar-btn-projects"
          className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${activeWindows.projects ? "bg-white/14 text-white" : "text-stone-300 hover:bg-white/8 hover:text-white"}`}
          aria-label="Open projects"
          aria-pressed={activeWindows.projects}
        >
          <Folder className="w-4.5 h-4.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onOpenWindow("resume")}
          id="taskbar-btn-resume"
          className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${activeWindows.resume ? "bg-white/14 text-white" : "text-stone-300 hover:bg-white/8 hover:text-white"}`}
          aria-label="Open resume"
          aria-pressed={activeWindows.resume}
        >
          <User className="w-4.5 h-4.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onOpenWindow("personalization")}
          id="taskbar-btn-personalization"
          className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${activeWindows.personalization ? "bg-white/14 text-white" : "text-stone-300 hover:bg-white/8 hover:text-white"}`}
          aria-label="Open personalization"
          aria-pressed={activeWindows.personalization}
        >
          <Palette className="w-4.5 h-4.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onOpenSettingsMenu}
          id="taskbar-btn-settings"
          className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${settingsMenuOpen ? "bg-white/14 text-white" : "text-stone-300 hover:bg-white/8 hover:text-white"}`}
          aria-label="Open desktop settings"
          aria-expanded={settingsMenuOpen}
          aria-controls="desktop-settings-menu"
        >
          <Settings className="w-4.5 h-4.5" aria-hidden="true" />
        </button>
      </div>

      {/* 
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/40 border border-orange-300/10 rounded-md text-[10px] font-mono text-orange-200/50">
        <Play className="w-3 h-3 text-orange-400 animate-pulse fill-orange-400" />
        <span>STREAM: lo-fi-beats-to-code-to.ogg (80% buffered)</span>
      </div> */}

      {/* Accessories / Clock and volume (Right) */}
      <div className="desktop-taskbar-accessories flex items-center gap-5 text-right select-none">
        {/* Sound Volume control */}
        <div className="flex items-center gap-1.5 text-orange-200/50 hover:text-orange-100 transition-colors">
          <button
            type="button"
            onClick={() => {
              const newVol = volume === 0 ? 80 : 0;
              setVolume(newVol);
            }}
            id="taskbar-btn-volume"
            className="p-1 rounded hover:bg-white/5 transition-all text-orange-300/80 cursor-pointer text-xs flex gap-1"
            aria-label={volume === 0 ? "Unmute interface sounds" : "Mute interface sounds"}
            aria-pressed={volume === 0}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
          </button>
          <span className="text-[10px] font-mono select-none w-5">
            {volume}%
          </span>
        </div>

        {/* Maximize viewport tool */}
        <button
          type="button"
          onClick={handleToggleFullscreen}
          id="taskbar-btn-fullscreen"
          className="p-1 hover:bg-white/5 rounded text-orange-200/40 hover:text-orange-100 transition-all cursor-pointer"
          aria-label="Toggle fullscreen"
        >
          <Maximize className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Vertical divider */}
        <span className="w-px h-6 bg-orange-200/10"></span>

        {/* Custom Clock / Dynamic Date visualizer panel */}
        <div className="flex flex-col items-end leading-none font-mono">
          <span className="text-[12px] font-bold text-orange-50 select-none">
            {timeStr || "09:29 PM"}
          </span>
          <span className="text-[9px] font-mono text-orange-200/40 mt-1 uppercase select-none">
            {dateStr || "May 21, 2026"}
          </span>
        </div>
      </div>
    </nav>
  );
}
