"use client";

import React from "react";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface ShutdownScreenProps {
  onReboot: () => void;
}

export default function ShutdownScreen({ onReboot }: ShutdownScreenProps) {
  return (
    <div className="absolute inset-0 z-[999] bg-zinc-950 flex flex-col items-center justify-center text-center font-mono p-6 select-none animate-fade-in">
      <div className="space-y-5 max-w-sm">
        <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-orange-50 uppercase tracking-widest leading-tight">
            SYSTEM_SHUTDOWN_HALT
          </h2>
          <p className="text-xs text-orange-200/50">
            Socket links severed. Diagnostics telemetry suspended. Reboot
            operational channels to reconnect to KALI kernel context.
          </p>
        </div>
        <button
          onClick={onReboot}
          id="reboot-trigger-btn"
          className="px-6 py-2 bg-gradient-to-r from-orange-400/20 to-pink-500/20 border border-orange-300/30 hover:border-orange-300/60 rounded-lg text-xs font-mono font-bold text-orange-100 flex items-center gap-2 mx-auto transition-all cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>REBOOT_SYSTEM</span>
        </button>
      </div>
    </div>
  );
}
