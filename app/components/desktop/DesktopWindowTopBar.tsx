import React from "react";
import { ArrowLeft, Circle, Power, Terminal, Wifi } from "lucide-react";

interface DesktopTopBarProps {
  onExitDesktop?: () => void;
  onShutDown?: () => void;
  onOpenTerminal?: () => void;
}

export default function DesktopTopBar({
  onExitDesktop,
  onShutDown,
  onOpenTerminal,
}: DesktopTopBarProps) {
  return (
    <header
      id="desktop-top-bar"
      className="desktop-topbar h-12 px-3 md:px-4 flex items-center justify-between glass-topbar z-50 text-[11px] font-mono select-none"
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={onExitDesktop}
          id="topbar-exit-btn"
          aria-label="Return to portfolio"
          className="desktop-control h-9 px-3 flex items-center gap-2 rounded-lg border border-white/15 bg-black/35 text-stone-100 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Portfolio</span>
        </button>
        <div className="hidden md:flex items-center gap-2 min-w-0 text-stone-300/75">
          <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" aria-hidden="true" />
          <span className="truncate">Ethan Guan · Desktop workspace</span>
        </div>
      </div>

      <div className="desktop-mode-label absolute left-1/2 -translate-x-1/2 text-stone-200/70 tracking-[.14em] font-semibold uppercase pointer-events-none">
        Desktop mode
      </div>

      <div className="flex items-center gap-1 text-stone-200/70 font-semibold text-xs">
        <span className="hidden sm:inline-flex h-9 w-9 items-center justify-center" aria-label="Network connected" title="Network connected">
          <Wifi className="w-4 h-4" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={onOpenTerminal}
          id="topbar-terminal-btn"
          className="desktop-control h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open terminal"
        >
          <Terminal className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onShutDown}
          id="topbar-power-btn"
          className="desktop-control h-9 w-9 flex items-center justify-center rounded-lg text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer"
          aria-label="Shut down desktop mode"
        >
          <Power className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
