"use client";

import React, { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  crtEnabled: boolean;
  onCrtToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export default function SettingsMenu({
  isOpen,
  onClose,
  crtEnabled,
  onCrtToggle,
  soundEnabled,
  onSoundToggle,
}: SettingsMenuProps) {
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
    <div id="desktop-settings-menu" role="dialog" aria-modal="false" aria-label="Desktop preferences" className="fixed bottom-16 left-3 w-[calc(100vw-1.5rem)] max-w-80 bg-neutral-950/95 border border-orange-200/15 rounded-xl p-4 shadow-2xl z-40 animate-fade-in backdrop-blur-xl sm:left-20">
      <div className="pb-2 border-b border-orange-200/10 mb-3 flex justify-between items-center text-[10px] font-mono text-orange-200/40 uppercase">
        <span>DESKTOP_SETTING_PANEL</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close desktop preferences"
          id="settings-menu-close"
          className="text-rose-400 hover:text-rose-300"
        >
          CLOSE
        </button>
      </div>

      <div className="space-y-4 text-xs font-mono">
        {/* CRT Toggle button */}
        <div className="flex justify-between items-center">
          <span className="text-orange-200/80">CRT SCANLINE EFFECT</span>
          <button
            type="button"
            onClick={onCrtToggle}
            aria-pressed={crtEnabled}
            id="settings-btn-crt"
            className={`px-2.5 py-1 text-[10px] border rounded transition-all cursor-pointer
              ${
                crtEnabled
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/40 text-rose-300"
              }
            `}
          >
            {crtEnabled ? "ENABLED" : "DISABLED"}
          </button>
        </div>

        {/* Sound telemetry oscillator click feedback toggle */}
        <div className="flex justify-between items-center">
          <span className="text-orange-200/80">SPEAKER FEEDBACK</span>
          <button
            type="button"
            onClick={onSoundToggle}
            aria-pressed={soundEnabled}
            id="settings-btn-sound"
            className="p-1 rounded hover:bg-white/5 transition-all text-orange-200 flex items-center gap-1.5 cursor-pointer border border-orange-200/10 px-2.5 py-1 text-[10px]"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SYNTH ACTIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>SYNTH MUTED</span>
              </>
            )}
          </button>
        </div>

        {/* Informative info */}
        <div className="p-2.5 bg-black/40 border border-orange-200/5 rounded-lg space-y-1 text-[10px] text-orange-200/50">
          <div className="flex justify-between">
            <span>ENVIRONMENT:</span>
            <span>PORTFOLIO DESKTOP</span>
          </div>
          <div className="flex justify-between">
            <span>THEME:</span>
            <span>WARM NIGHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
