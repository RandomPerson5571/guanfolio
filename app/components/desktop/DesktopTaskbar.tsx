"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Terminal,
  Folder,
  User,
  Settings,
  Volume2,
  Maximize,
  Palette,
} from "lucide-react";
import { WindowType } from "../../types/types";

interface DesktopTaskbarProps {
  onOpenWindow: (id: WindowType) => void;
  onOpenLaunchMenu?: () => void;
  onOpenSettingsMenu?: () => void;
}

export default function DesktopTaskbar({
  onOpenWindow,
  onOpenLaunchMenu,
  onOpenSettingsMenu,
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
    <div
      id="desktop-taskbar"
      className="fixed bottom-0 left-0 right-0 h-16 bg-neutral-950/45 backdrop-blur-3xl border-t border-orange-200/10 flex items-center justify-between px-6 select-none z-50 text-sans font-normal"
    >
      {/* Quick Launcher Controls (Left) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenLaunchMenu}
          id="taskbar-btn-grid"
          className="w-10 h-10 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 border border-orange-200/10 hover:border-orange-200/35 flex items-center justify-center text-orange-200/70 hover:text-orange-100 transition-all cursor-pointer"
          title="App Lounge"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>

        <span className="w-px h-6 bg-orange-200/10"></span>

        <button
          onClick={() => onOpenWindow("terminal")}
          id="taskbar-btn-terminal"
          className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-rose-400/80 hover:text-rose-300 transition-all cursor-pointer"
          title="Simulated Shell Terminal"
        >
          <Terminal className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => onOpenWindow("projects")}
          id="taskbar-btn-projects"
          className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-orange-300/80 hover:text-orange-200 transition-all cursor-pointer"
          title="Projects Explorer"
        >
          <Folder className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => onOpenWindow("resume")}
          id="taskbar-btn-resume"
          className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-amber-300/80 hover:text-amber-200 transition-all cursor-pointer"
          title="Resume Profile"
        >
          <User className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => onOpenWindow("personalization")}
          id="taskbar-btn-personalization"
          className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-cyan-300/80 hover:text-cyan-200 transition-all cursor-pointer"
          title="Personalization Console"
        >
          <Palette className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={onOpenSettingsMenu}
          id="taskbar-btn-settings"
          className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-pink-400/80 hover:text-pink-300 transition-all cursor-pointer"
          title="Interactive desktop settings configuration"
        >
          <Settings className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* 
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/40 border border-orange-300/10 rounded-md text-[10px] font-mono text-orange-200/50">
        <Play className="w-3 h-3 text-orange-400 animate-pulse fill-orange-400" />
        <span>STREAM: lo-fi-beats-to-code-to.ogg (80% buffered)</span>
      </div> */}

      {/* Accessories / Clock and volume (Right) */}
      <div className="flex items-center gap-5 text-right select-none">
        {/* Sound Volume control */}
        <div className="flex items-center gap-1.5 text-orange-200/50 hover:text-orange-100 transition-colors">
          <button
            onClick={() => {
              const newVol = volume === 0 ? 80 : 0;
              setVolume(newVol);
            }}
            id="taskbar-btn-volume"
            className="p-1 rounded hover:bg-white/5 transition-all text-orange-300/80 cursor-pointer text-xs flex gap-1"
            title="Telemetric signal"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono select-none w-5">
            {volume}%
          </span>
        </div>

        {/* Maximize viewport tool */}
        <button
          onClick={handleToggleFullscreen}
          id="taskbar-btn-fullscreen"
          className="p-1 hover:bg-white/5 rounded text-orange-200/40 hover:text-orange-100 transition-all cursor-pointer"
          title="Fullscreen focus override"
        >
          <Maximize className="w-4 h-4" />
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
    </div>
  );
}
