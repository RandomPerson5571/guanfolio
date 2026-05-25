import React, { useState, useEffect } from "react";
import { LiveWallpaperType } from "@/app/types/wallpaper";
import Image from "next/image";
import {
  Image as ImageIcon,
  Palette,
  Star,
  CheckCircle,
  Terminal,
} from "lucide-react";

import DreamySunsetSetPreview from "@/public/backgroundPreviews/AnimeSkiesBGPreview.png";
import AnimeBackgroundPreview from "@/public/backgroundPreviews/AnimeBackgroundPreview.png";
import NebulaWallpaperPreview from "@/public/backgroundPreviews/NebulaWallpaperPreview.png";

import animeDesktopBg from "@/public/backgrounds/anime_desktop_bg_1779584782976.png";
import animeSunsetBg from "@/public/backgrounds/anime_sunset_1779584693233.png";
import NebulaBG from "@/public/backgrounds/NebulaWallpaper.jpg";

interface PersonalizationWindowProps {
  activeAccent: string;
  onApplyTheme: (
    accent: string,
    bgType: string,
    backgroundStyle?: string,
    name?: string,
  ) => void;
  activeBg: string;
  activeLiveWallpaper: LiveWallpaperType;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  scanlines: boolean;
  onSetScanlines: (enabled: boolean) => void;
  blurDepth: number;
  onSetBlurDepth: (val: number) => void;
  dimDepth: number;
  onSetDimDepth: (val: number) => void;
}

export default function PersonalizationWindow({
  activeAccent,
  onApplyTheme,
  activeBg,
  activeLiveWallpaper,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  scanlines,
  onSetScanlines,
  blurDepth,
  onSetBlurDepth,
  dimDepth,
  onSetDimDepth,
}: PersonalizationWindowProps) {
  const [activeTab, setActiveTab] = useState<
    "background" | "colors" | "themes"
  >("background");
  const [customColor, setCustomColor] = useState(activeAccent);

  // Terminal compiler typing preview simulation states
  const [terminalPreviewLines, setTerminalPreviewLines] = useState<string[]>(
    [],
  );
  const [isCompiling, setIsCompiling] = useState(false);

  // Set initial terminal preview text
  useEffect(() => {
    setTerminalPreviewLines([
      `root@kali:~$ apply-theme --accent="${getColorName(activeAccent)}" --bg="${getBgName(activeBg, activeLiveWallpaper)}"`,
      `[INFO] Compiling glassmorphism shaders...`,
      `[INFO] Mapping typography tokens (Inter, JetBrains Mono)...`,
      `✓ System theme updated successfully.`,
      `root@kali:~$ _`,
    ]);
  }, [activeAccent, activeBg, activeLiveWallpaper]);

  const getColorName = (hex: string) => {
    const map: Record<string, string> = {
      "#00ff41": "Cyber Lime",
      "#00a1fe": "Electric Blue",
      "#ffab91": "Sunset Peach",
      "#ff7043": "Sunset Peach",
      "#f07050": "Sunset Peach",
      "#9d00d2": "Neon Purple",
    };
    return map[hex.toLowerCase()] || hex;
  };

  const getBgName = (imgUrl: string, liveType: LiveWallpaperType) => {
    if (liveType !== "none") {
      return `Animated ${liveType.toUpperCase()}`;
    }
    if (imgUrl.includes("ADBb0ugus")) return "Dreamy Sunset";
    if (imgUrl.includes("ADBb0uim7")) return "Anime Skies";
    if (imgUrl.includes("ADBb0uhHV")) return "Midnight Neon";
    return "Custom URL Image";
  };

  const handleSelectWallpaperPreset = (presetUrl: string) => {
    setIsCompiling(true);

    // Simulate compilation steps
    const newSteps = [
      `root@kali:~$ apply-theme --bg="${getBgName(presetUrl, "none")}"`,
      `[INFO] Flashing frame buffet static memory pointers...`,
      `[INFO] Re-linking atmospheric canvas shader mapping...`,
      `✓ Wallpaper background updated successfully.`,
      `root@kali:~$ _`,
    ];
    setTerminalPreviewLines(newSteps);
    onApplyTheme(
      activeAccent,
      "none",
      `url('${presetUrl}')`,
      getBgName(presetUrl, "none"),
    );

    setTimeout(() => setIsCompiling(false), 300);
  };

  const handleSelectLiveWallpaper = (type: LiveWallpaperType) => {
    setIsCompiling(true);
    const newSteps = [
      `root@kali:~$ apply-theme --bg="Live:${type.toUpperCase()}"`,
      `[INFO] Spawning custom canvas render engine threads...`,
      `[INFO] Injecting accent-colored vector parameters (${activeAccent})...`,
      `✓ Live canvas viewport running at 60 FPS.`,
      `root@kali:~$ _`,
    ];
    setTerminalPreviewLines(newSteps);
    onApplyTheme(activeAccent, type, undefined, `Live Wallpaper: ${type}`);
    setTimeout(() => setIsCompiling(false), 300);
  };

  const handleSelectAccent = (colorHex: string) => {
    onApplyTheme(
      colorHex,
      activeLiveWallpaper !== "none" ? activeLiveWallpaper : "none",
      activeBg,
      getColorName(colorHex),
    );
  };

  const handleCustomColorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^#[0-9A-F]{6}$/i.test(customColor)) {
      handleSelectAccent(customColor);
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row overflow-hidden h-full">
      {/* SideNavBar */}
      <aside className="flex flex-col h-full py-6 bg-surface-container-low/40 backdrop-blur-[30px] border-b md:border-b-0 md:border-r border-outline-variant/10 w-full md:w-64 shrink-0">
        <div className="px-6 mb-8 text-left">
          <h1 className="font-display text-lg md:text-xl font-bold text-[#ebffe2] leading-tight mb-0.5 tracking-tight">
            Cyber-Fluent OS
          </h1>
          <p className="font-code-sm text-xs opacity-60 text-on-surface-variant">
            v2.4.0-stable
          </p>
        </div>

        {/* Tab Links */}
        <nav className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto custom-scrollbar md:overflow-x-visible px-4 md:px-0">
          <button
            onClick={() => setActiveTab("background")}
            className={`flex items-center gap-3 px-4 py-3 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-200 shrink-0 text-left cursor-pointer ${
              activeTab === "background"
                ? `text-[var(--accent-color)] bg-white/5 border-[var(--accent-color)] font-medium`
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/5 border-transparent"
            }`}
            style={{ "--accent-color": activeAccent } as React.CSSProperties}
          >
            <ImageIcon className="text-[18px]" />
            <span className="font-code-sm text-xs tracking-wider uppercase">
              Background
            </span>
          </button>

          <button
            onClick={() => setActiveTab("colors")}
            className={`flex items-center gap-3 px-4 py-3 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-200 shrink-0 text-left cursor-pointer ${
              activeTab === "colors"
                ? `text-[var(--accent-color)] bg-white/5 border-[var(--accent-color)] font-medium`
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/5 border-transparent"
            }`}
            style={{ "--accent-color": activeAccent } as React.CSSProperties}
          >
            <Palette className="text-[18px]" />
            <span className="font-code-sm text-xs tracking-wider uppercase">
              Colors & FX
            </span>
          </button>

          <button
            onClick={() => setActiveTab("themes")}
            className={`flex items-center gap-3 px-4 py-3 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-200 shrink-0 text-left cursor-pointer ${
              activeTab === "themes"
                ? `text-[var(--accent-color)] bg-white/5 border-[var(--accent-color)] font-medium`
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/5 border-transparent"
            }`}
            style={{ "--accent-color": activeAccent } as React.CSSProperties}
          >
            <Star className="text-[18px]" />
            <span className="font-code-sm text-xs tracking-wider uppercase">
              OS Themes
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto custom-scrollbar p-6 select-none bg-black/40 text-left">
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          {/* BACKGROUND TAB */}
          {activeTab === "background" && (
            <section className="space-y-6">
              <div>
                <h2 className="font-sans text-xl md:text-2xl font-semibold text-white tracking-tight mb-1.5">
                  Choose your background
                </h2>
                <p className="font-sans text-sm text-white/50">
                  Personalize your workspace with high-definition atmospheric
                  landscapes or animated live wallpaper arrays.
                </p>
              </div>

              {/* Grid Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Preset: Sunset */}
                <div
                  onClick={() => handleSelectWallpaperPreset(animeSunsetBg.src)}
                  className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.015] ${
                    activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0ugus")
                      ? `ring-2 ring-[var(--accent)] ring-offset-4 ring-offset-[#131313]`
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ "--accent": activeAccent } as React.CSSProperties}
                >
                  <Image
                    alt="Dreamy Sunset"
                    src={AnimeBackgroundPreview.src}
                    height={AnimeBackgroundPreview.height}
                    width={AnimeBackgroundPreview.width}
                    className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3">
                    {activeLiveWallpaper === "none" &&
                      activeBg.includes("ADBb0ugus") && (
                        <span
                          className="font-code-sm text-[9px] font-bold tracking-wider mb-0.5"
                          style={{ color: activeAccent }}
                        >
                          CURRENTLY ACTIVE
                        </span>
                      )}
                    <h3 className="font-code-sm text-xs font-semibold text-white">
                      Dreamy Sunset
                    </h3>
                  </div>
                  {activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0ugus") && (
                      <div
                        className="absolute top-2 right-2 rounded-full p-0.5 text-black shadow"
                        style={{ backgroundColor: activeAccent }}
                      >
                        <CheckCircle
                          className="text-[14px] block"
                          fill="currentColor"
                        />
                      </div>
                    )}
                </div>

                {/* Preset: Anime Skies */}
                <div
                  onClick={() =>
                    handleSelectWallpaperPreset(animeDesktopBg.src)
                  }
                  className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.015] ${
                    activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0uim7")
                      ? `ring-2 ring-[var(--accent)] ring-offset-4 ring-offset-[#131313]`
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ "--accent": activeAccent } as React.CSSProperties}
                >
                  <Image
                    alt="Anime Background Preview"
                    src={DreamySunsetSetPreview.src}
                    height={DreamySunsetSetPreview.height}
                    width={DreamySunsetSetPreview.width}
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3">
                    {activeLiveWallpaper === "none" &&
                      activeBg.includes("ADBb0uim7") && (
                        <span
                          className="font-code-sm text-[9px] font-bold tracking-wider mb-0.5"
                          style={{ color: activeAccent }}
                        >
                          CURRENTLY ACTIVE
                        </span>
                      )}
                    <h3 className="font-code-sm text-xs font-semibold text-white">
                      Anime Skies
                    </h3>
                  </div>
                  {activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0uim7") && (
                      <div
                        className="absolute top-2 right-2 rounded-full p-0.5 text-black shadow"
                        style={{ backgroundColor: activeAccent }}
                      >
                        <CheckCircle
                          className="text-[14px] block"
                          fill="currentColor"
                        />
                      </div>
                    )}
                </div>

                {/* Preset: Midnight Neon */}
                <div
                  onClick={() => handleSelectWallpaperPreset(NebulaBG.src)}
                  className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.015] ${
                    activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0uhHV")
                      ? `ring-2 ring-[var(--accent)] ring-offset-4 ring-offset-[#131313]`
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ "--accent": activeAccent } as React.CSSProperties}
                >
                  <Image
                    alt="Nebula Wallpaper Preview"
                    src={NebulaWallpaperPreview.src}
                    height={NebulaWallpaperPreview.height}
                    width={NebulaWallpaperPreview.width}
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3">
                    {activeLiveWallpaper === "none" &&
                      activeBg.includes("ADBb0uhHV") && (
                        <span
                          className="font-code-sm text-[9px] font-bold tracking-wider mb-0.5"
                          style={{ color: activeAccent }}
                        >
                          CURRENTLY ACTIVE
                        </span>
                      )}
                    <h3 className="font-code-sm text-xs font-semibold text-white">
                      Midnight Neon
                    </h3>
                  </div>
                  {activeLiveWallpaper === "none" &&
                    activeBg.includes("ADBb0uhHV") && (
                      <div
                        className="absolute top-2 right-2 rounded-full p-0.5 text-black shadow"
                        style={{ backgroundColor: activeAccent }}
                      >
                        <CheckCircle
                          className="text-[14px] block"
                          fill="currentColor"
                        />
                      </div>
                    )}
                </div>
              </div>

              {/* Dynamic canvas wallpapers section */}
              <div className="space-y-3 pt-2">
                <h3 className="font-code-sm text-xs uppercase font-bold tracking-wider text-white/60">
                  LIVE MATHEMATICAL WALLPAPERS
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSelectLiveWallpaper("matrix")}
                    className={`px-4 py-2 border rounded-full text-xs font-code-sm font-semibold transition-all cursor-pointer ${
                      activeLiveWallpaper === "matrix"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                        : "bg-[#1c1b1b]/80 border-outline-variant/30 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    MATRIX CASCADE
                  </button>
                  <button
                    onClick={() => handleSelectLiveWallpaper("stars")}
                    className={`px-4 py-2 border rounded-full text-xs font-code-sm font-semibold transition-all cursor-pointer ${
                      activeLiveWallpaper === "stars"
                        ? "bg-sky-500/10 text-sky-400 border-sky-400"
                        : "bg-[#1c1b1b]/80 border-outline-variant/30 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    COSMIC VOYAGE
                  </button>
                  <button
                    onClick={() => handleSelectLiveWallpaper("nebula")}
                    className={`px-4 py-2 border rounded-full text-xs font-code-sm font-semibold transition-all cursor-pointer ${
                      activeLiveWallpaper === "nebula"
                        ? "bg-violet-500/10 text-violet-400 border-violet-400"
                        : "bg-[#1c1b1b]/80 border-outline-variant/30 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    WAVE PLASMA NEBULA
                  </button>
                  <button
                    onClick={() => handleSelectLiveWallpaper("grid")}
                    className={`px-4 py-2 border rounded-full text-xs font-code-sm font-semibold transition-all cursor-pointer ${
                      activeLiveWallpaper === "grid"
                        ? "bg-pink-500/10 text-pink-400 border-pink-400"
                        : "bg-[#1c1b1b]/80 border-outline-variant/30 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    3D SYNTH GRID
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* COLORS AND FX TAB */}
          {activeTab === "colors" && (
            <section className="space-y-6">
              <div>
                <h2 className="font-sans text-xl md:text-2xl font-semibold text-white tracking-tight mb-1.5">
                  Choose your accent color
                </h2>
                <p className="font-sans text-sm text-white/50">
                  Define the core glow of your terminal interfaces and window
                  highlights.
                </p>
              </div>

              {/* Accent presets row */}
              <div className="flex flex-wrap gap-4">
                {/* Cyber Lime */}
                <button
                  onClick={() => handleSelectAccent("#00ff41")}
                  className={`flex items-center gap-3 p-2 pr-4 rounded-full border transition-all cursor-pointer ${
                    activeAccent.toLowerCase() === "#00ff41"
                      ? "bg-[#00ff41]/10 border-[#00ff41] ring-2 ring-[#00ff41]/20 font-semibold"
                      : "bg-[#1c1b1b]/50 border-outline-variant/30 text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#00ff41] shadow-[0_0_12px_rgba(0,255,65,0.45)]"></div>
                  <span className="font-code-sm text-xs">Cyber Lime</span>
                </button>

                {/* Electric Blue */}
                <button
                  onClick={() => handleSelectAccent("#00a1fe")}
                  className={`flex items-center gap-3 p-2 pr-4 rounded-full border transition-all cursor-pointer ${
                    activeAccent.toLowerCase() === "#00a1fe"
                      ? "bg-[#00a1fe]/10 border-[#00a1fe] ring-2 ring-[#00a1fe]/20 font-semibold"
                      : "bg-[#1c1b1b]/50 border-outline-variant/30 text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#00a1fe] shadow-[0_0_12px_rgba(0,161,254,0.45)]"></div>
                  <span className="font-code-sm text-xs">Electric Blue</span>
                </button>

                {/* Sunset Peach */}
                <button
                  onClick={() => handleSelectAccent("#ffab91")}
                  className={`flex items-center gap-3 p-2 pr-4 rounded-full border transition-all cursor-pointer ${
                    activeAccent.toLowerCase() === "#ffab91"
                      ? "bg-[#ffab91]/10 border-[#ffab91] ring-2 ring-[#ffab91]/20 font-semibold"
                      : "bg-[#1c1b1b]/50 border-outline-variant/30 text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#ffab91] shadow-[0_0_12px_rgba(255,171,145,0.45)]"></div>
                  <span className="font-code-sm text-xs">Sunset Peach</span>
                </button>

                {/* Neon Purple */}
                <button
                  onClick={() => handleSelectAccent("#9d00d2")}
                  className={`flex items-center gap-3 p-2 pr-4 rounded-full border transition-all cursor-pointer ${
                    activeAccent.toLowerCase() === "#9d00d2"
                      ? "bg-[#9d00d2]/10 border-[#9d00d2] ring-2 ring-[#9d00d2]/20 font-semibold"
                      : "bg-[#1c1b1b]/50 border-outline-variant/30 text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#9d00d2] shadow-[0_0_12px_rgba(157,0,210,0.45)]"></div>
                  <span className="font-code-sm text-xs">Neon Purple</span>
                </button>
              </div>

              {/* Custom hex sector */}
              <div className="bg-black/20 p-4 rounded-xl border border-outline-variant/10 space-y-4 max-w-sm">
                <h3 className="font-code-sm text-xs uppercase text-white/60 font-bold">
                  CUSTOM VECTOR PALETTES
                </h3>
                <form onSubmit={handleCustomColorSubmit} className="flex gap-2">
                  <input
                    type="color"
                    className="w-10 h-8 rounded bg-transparent border-0 outline-none cursor-pointer p-0 shrink-0"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      handleSelectAccent(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    maxLength={7}
                    pattern="^#[0-9A-Fa-f]{6}$"
                    className="flex-grow bg-[#131418] border border-white/10 rounded-lg text-xs px-3 font-mono text-white"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#HEXCOLOR"
                  />
                  <button
                    type="submit"
                    className="bg-white/5 border border-white/10 text-xs px-3 rounded-lg font-mono"
                  >
                    APPLY
                  </button>
                </form>
              </div>

              {/* FX Options: CRT scanlines, blur depth, wallpaper dimming */}
              <div className="border-t border-white/5 pt-6 space-y-6">
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
                    ATMOSPHERIC GLITCH & SHADER FX
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Scanlines toggle */}
                    <div className="flex items-center justify-between p-4 bg-black/25 rounded-xl border border-outline-variant/10">
                      <div>
                        <span className="font-code-sm text-xs text-white block">
                          CRT GRID OVERLAY SCANLINES
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          Simulate a high-frequency phosphorescent computer
                          phosphor grids.
                        </span>
                      </div>
                      <button
                        onClick={() => onSetScanlines(!scanlines)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer outline-none shrink-0 ${
                          scanlines ? "bg-emerald-500" : "bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow transform duration-200 ${
                            scanlines ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Blur depth slider */}
                    <div className="p-4 bg-black/25 rounded-xl border border-outline-variant/10 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-code-sm text-white uppercase">
                          Glass blur depth
                        </span>
                        <span className="font-mono text-[#38bdf8]">
                          {blurDepth}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                        value={blurDepth}
                        onChange={(e) =>
                          onSetBlurDepth(parseInt(e.target.value))
                        }
                      />
                    </div>

                    {/* Dimming depth slider */}
                    <div className="p-4 bg-black/25 rounded-xl border border-outline-variant/10 space-y-2 sm:col-span-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-code-sm text-white uppercase">
                          Wallpaper dimmed opacity layer
                        </span>
                        <span className="font-mono text-[#a855f7]">
                          {Math.floor(dimDepth * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="0.9"
                        step="0.05"
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#a855f7]"
                        value={dimDepth}
                        onChange={(e) =>
                          onSetDimDepth(parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* THEMES TAB */}
          {activeTab === "themes" && (
            <section className="space-y-6">
              <div>
                <h2 className="font-sans text-xl md:text-2xl font-semibold text-white tracking-tight mb-1.5">
                  Choose predefined system environment
                </h2>
                <p className="font-sans text-sm text-white/50">
                  Load complete visual configurations from kernel profiles
                  instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Theme 1: root@kali */}
                <div
                  onClick={() =>
                    onApplyTheme(
                      "#00ff41",
                      "matrix",
                      undefined,
                      "Default root@kali",
                    )
                  }
                  className="p-5 bg-black/30 border border-outline-variant/10 hover:border-[#00ff41] rounded-xl cursor-pointer transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-code-sm text-sm font-bold text-white">
                      Default root@kali
                    </h3>
                    <span className="text-[10px] bg-[#00ff41]/10 text-[#00ff41] font-mono px-2 py-0.5 rounded border border-[#00ff41]/20">
                      STABLE
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    The canonical terminal theme. Fluorescent lime green overlay
                    highlights with flowing rain cascade digital starfields.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#00ff41]"></span>
                    <span className="w-4 h-4 rounded-full bg-black border border-white/15"></span>
                  </div>
                </div>

                {/* Theme 2: Sunset Overload */}
                <div
                  onClick={() =>
                    onApplyTheme(
                      "#ff7043",
                      "nebula",
                      undefined,
                      "Sunset Overload",
                    )
                  }
                  className="p-5 bg-black/30 border border-outline-variant/10 hover:border-[#ff7043] rounded-xl cursor-pointer transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-code-sm text-sm font-bold text-white">
                      Sunset Overload
                    </h3>
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 font-mono px-2 py-0.5 rounded border border-amber-500/20">
                      VAPORWAVE
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    Hot sunset peach aesthetics. Deep cosmic nebulae layers
                    blended with subtle responsive thermal glow arrays.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#ff7043]"></span>
                    <span className="w-4 h-4 rounded-full bg-indigo-950"></span>
                  </div>
                </div>

                {/* Theme 3: Electric Grid */}
                <div
                  onClick={() =>
                    onApplyTheme(
                      "#00a1fe",
                      "grid",
                      undefined,
                      "Electric Grid Simulator",
                    )
                  }
                  className="p-5 bg-black/30 border border-outline-variant/10 hover:border-[#00a1fe] rounded-xl cursor-pointer transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-code-sm text-sm font-bold text-white">
                      Electric Grid Simulator
                    </h3>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 font-mono px-2 py-0.5 rounded border border-blue-500/20">
                      RETRO-3D
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    High grid perspective 3D synth wave terrain.
                    High-contrasting cyan blue highlighting modules and window
                    trims.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#00a1fe]"></span>
                    <span className="w-4 h-4 rounded-full bg-indigo-900"></span>
                  </div>
                </div>

                {/* Theme 4: Deep Starchain */}
                <div
                  onClick={() =>
                    onApplyTheme(
                      "#8b5cf6",
                      "stars",
                      undefined,
                      "Deep Voyage Starchain",
                    )
                  }
                  className="p-5 bg-black/30 border border-outline-variant/10 hover:border-[#8b5cf6] rounded-xl cursor-pointer transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-code-sm text-sm font-bold text-white">
                      Deep Voyage Starchain
                    </h3>
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 font-mono px-2 py-0.5 rounded border border-violet-500/20">
                      ETHER
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    Ethereal deep voyage star clusters. Star elements fly from
                    center aligned with gorgeous neon purple highlights.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#8b5cf6]"></span>
                    <span className="w-4 h-4 rounded-full bg-slate-950"></span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ADVANCED TERMINAL PREVIEW SECTION (from screen mockup) */}
          <section className="pt-2">
            <div
              className={`p-6 rounded-xl border bg-[#1c1b1b]/60 backdrop-blur-md transition-all duration-300 ${
                isCompiling
                  ? "border-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.08)]"
                  : "border-outline-variant/20"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal
                    className="text-[18px] font-medium"
                    style={{ color: activeAccent }}
                  />
                  <span className="font-code-sm text-xs text-white/60 font-semibold tracking-wider">
                    Terminal Preview
                  </span>
                </div>

                {/* Fake taskbar loading slider */}
                <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full duration-1000 transition-all rounded-full"
                    style={{
                      width: isCompiling ? "100%" : "66%",
                      backgroundColor: activeAccent,
                      animation: isCompiling ? "pulse 1.5s infinite" : "none",
                    }}
                  />
                </div>
              </div>

              {/* Console Body output mock */}
              <div
                className="bg-black/45 rounded p-4 font-mono text-xs border border-white/5 space-y-1.5 leading-relaxed overflow-hidden custom-scrollbar max-h-[160px] cursor-text"
                style={{
                  color: activeAccent,
                  textShadow: `0 0 2px ${activeAccent}44`,
                }}
              >
                {terminalPreviewLines.map((line, idx) => {
                  let textCol = "";

                  // Simple color mapping matching mockup style
                  if (line.startsWith("root@kali")) {
                    // split user/cwd highlight as in mockup: root@kali:~# command
                    const match = line.match(/(root@kali)(:)(~)(\$)(.*)/);
                    if (match) {
                      return (
                        <p key={idx}>
                          <span className="text-purple-400 font-semibold">
                            {match[1]}
                          </span>
                          <span className="text-white">{match[2]}</span>
                          <span className="text-blue-400 font-semibold">
                            {match[3]}
                          </span>
                          <span className="text-white">{match[4]}</span>
                          <span className="text-white">{match[5]}</span>
                        </p>
                      );
                    }
                  } else if (line.startsWith("[INFO]")) {
                    textCol = "text-white/45";
                  } else if (line.startsWith("✓")) {
                    textCol = ""; // uses accent direct color
                  }

                  return (
                    <p key={idx} className={textCol}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
