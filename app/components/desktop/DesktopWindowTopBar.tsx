import React, { useState } from "react";
import { Wifi, Bell, Power, ShieldAlert, Cpu } from "lucide-react";

interface DesktopTopBarProps {
  onShutDown?: () => void;
  onOpenTerminal?: () => void;
}

export default function DesktopTopBar({
  onShutDown,
  onOpenTerminal,
}: DesktopTopBarProps) {
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  return (
    <div
      id="desktop-top-bar"
      className="h-10 px-4 flex items-center justify-between glass-topbar z-50 text-[11px] font-mono select-none"
    >
      {/* Session/User selection Tab */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSessionOpen(!isSessionOpen)}
          id="topbar-session-btn"
          className="px-3 py-1 bg-linear-to-r from-orange-400/10 to-pink-500/10 hover:from-orange-400/20 hover:to-pink-500/20 border border-orange-300/20 hover:border-orange-300/40 rounded-md text-orange-200 hover:text-white flex items-center gap-1.5 font-semibold shadow-sm transition-all cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          <span>KALI_USER_SESSION</span>
        </button>

        {isSessionOpen && (
          <div className="absolute top-11 left-4 w-48 rounded-lg border border-orange-200/15 p-2 bg-neutral-950/90 backdrop-blur-xl flex flex-col gap-1 text-orange-100/90 shadow-2xl z-50">
            <div className="px-2.5 py-1.5 border-b border-orange-200/10 flex flex-col gap-0.5">
              <span className="text-[10px] text-orange-200/40 block">
                OPERATOR
              </span>
              <span className="font-semibold text-orange-200">
                Griffin Potter
              </span>
            </div>
            <button
              onClick={() => {
                onOpenTerminal?.();
                setIsSessionOpen(false);
              }}
              id="topbar-menu-terminal"
              className="w-full text-left px-2.5 py-1.5 hover:bg-orange-300/10 rounded flex items-center gap-2 text-orange-200/80 hover:text-orange-100 transition-colors cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-orange-400/80" />
              <span>Launch Console</span>
            </button>
            <button
              onClick={() => {
                alert("Port 3000 diagnostics channel: ACTIVE.");
                setIsSessionOpen(false);
              }}
              id="topbar-menu-diag"
              className="w-full text-left px-2.5 py-1.5 hover:bg-orange-300/10 rounded flex items-center gap-2 text-orange-200/80 hover:text-orange-100 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-pink-400/80" />
              <span>Security Status</span>
            </button>
            <div className="border-t border-orange-200/10 my-1"></div>
            <button
              onClick={() => {
                onShutDown?.();
                setIsSessionOpen(false);
              }}
              id="topbar-menu-reboot"
              className="w-full text-left px-2.5 py-1.5 hover:bg-rose-500/10 hover:text-rose-300 rounded flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Reboot System</span>
            </button>
          </div>
        )}
      </div>

      {/* Center status message */}
      <div className="text-orange-200/40 tracking-widest font-semibold hover:text-orange-100 transition-colors cursor-default">
        ROOT
      </div>

      {/* Right side connection indicators */}
      <div className="flex items-center gap-4 text-orange-200/60 font-semibold text-xs">
        <button
          onClick={() => alert("WLAN Gateway: AES-256 Connected at 450Mbps.")}
          id="topbar-wifi-btn"
          className="hover:text-orange-100 p-1 rounded hover:bg-white/5 transition-all text-orange-300/85 cursor-pointer"
          title="WiFi status"
        >
          <Wifi className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            alert(
              "Diagnostic Telemetry logs: Check interactive terminal bash command neofetch!",
            )
          }
          id="topbar-bell-btn"
          className="hover:text-orange-100 p-1 rounded hover:bg-white/5 transition-all text-amber-300/85 relative cursor-pointer"
          title="Unresolved telemetry updates"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
        </button>
        <button
          onClick={onShutDown}
          id="topbar-power-btn"
          className="hover:text-rose-400 p-1 rounded hover:bg-rose-500/15 hover:border-transparent transition-all text-rose-500/85 cursor-pointer"
          title="Reboot current shell"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
