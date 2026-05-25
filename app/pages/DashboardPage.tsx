"use client";

import React, { useState } from "react";
import animeSunset from "@/public/backgrounds/anime_sunset_1779584693233.png";

// Components - Desktop UI
import DesktopNavRail from "@/app/components/desktop/DesktopNavRail";
import DesktopTaskbar from "@/app/components/desktop/DesktopTaskbar";
import DesktopWindow from "@/app/components/desktop/DesktopWindow";
import DesktopTopBar from "../components/desktop/DesktopWindowTopBar";

// Components - Modals & Screens
import ShutdownScreen from "@/app/components/ShutdownScreen";
import LaunchMenu from "@/app/components/menus/LaunchMenu";
import SettingsMenu from "@/app/components/menus/SettingsMenu";

// Components - Window Content
import SysMonitor from "@/app/components/windows/SysMonitor";
import PersonalizationWindow from "@/app/components/windows/PersonalizationWindow";
import LiveWallpaperCanvas from "@/app/components/LiveWallpaperCanvas";
import BackgroundClock from "../components/BackgroundClock";
import LoginOverlay from "@/app/components/LoginOverlay";

// Types and utilities
import { WindowType, WindowState } from "../types/types";
import { LiveWallpaperType } from "@/app/types/wallpaper";
import { INITIAL_WINDOW_STATE, RESET_WINDOW_STATE } from "../data/windowConfig";
import renderWindowContent from "../data/renderWindow";
import { DesktopIcons } from "../data/desktopIcons";
import DesktopIcon from "../components/desktop/DesktopIcon";

export default function DashboardPage() {
  // Sound controls
  const [soundEnabled, setSoundEnabled] = useState(true);

  // CRT Scanlines state
  const [crtEnabled, setCrtEnabled] = useState(false);

  // System power state
  const [isShutDown, setIsShutDown] = useState(false);

  // Menu States
  const [showLaunchMenu, setShowLaunchMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Window Manager states
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [windows, setWindows] =
    useState<{ [key in WindowType]: WindowState }>(INITIAL_WINDOW_STATE);

  // Personalization theme state
  const defaultBackground = `url(${animeSunset.src})`;
  const [activeAccent, setActiveAccent] = useState("#00ff41");
  const [activeBg, setActiveBg] = useState(defaultBackground);
  const [activeLiveWallpaper, setActiveLiveWallpaper] =
    useState<LiveWallpaperType>("none");
  const [scanlines, setScanlines] = useState(false);
  const [blurDepth, setBlurDepth] = useState(0);
  const [dimDepth, setDimDepth] = useState(0.08);
  // Login overlay (no password required)
  const [showLogin, setShowLogin] = useState(true);

  const handleApplyTheme = (
    accent: string,
    bgType: string,
    backgroundStyle?: string,
  ) => {
    setActiveAccent(accent);
    setActiveLiveWallpaper((bgType as LiveWallpaperType) || "none");
    if (backgroundStyle) {
      setActiveBg(backgroundStyle);
    }
  };

  const showScanlines = crtEnabled || scanlines;

  // Web Audio API Synthesizer Feedback
  const triggerAudioFeedback = (
    freq = 550,
    duration = 0.06,
    type: OscillatorType = "sine",
  ) => {
    if (!soundEnabled) return;
    try {
      type WebkitAudioContextWindow = Window & {
        webkitAudioContext?: typeof AudioContext;
      };

      const audioContextConstructor =
        window.AudioContext ||
        (window as WebkitAudioContextWindow).webkitAudioContext;
      if (!audioContextConstructor) return;

      const audioCtx = new audioContextConstructor();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + duration,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      // Ignored if user hasn't interacted yet
      console.error(err);
    }
  };

  // Focus Window State Callback
  const handleFocusWindow = (id: WindowType) => {
    setWindows((prev) => {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: nextZ,
          isMinimized: false,
        },
      };
    });
  };

  // Launch/Open Window Callback
  const handleOpenWindow = (id: WindowType) => {
    triggerAudioFeedback(650, 0.08);
    setWindows((prev) => {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
  };

  // Close Window Callback
  const handleCloseWindow = (id: WindowType) => {
    triggerAudioFeedback(400, 0.08);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
  };

  // Minimize Window Callback
  const handleMinimizeWindow = (id: WindowType) => {
    triggerAudioFeedback(450, 0.06);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
  };

  // Maximize Window Callback
  const handleMaximizeWindow = (id: WindowType) => {
    triggerAudioFeedback(520, 0.08);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  // Reboot System
  const handleSystemReboot = () => {
    setIsShutDown(false);
    triggerAudioFeedback(900, 0.25, "triangle");
    // Reload only terminal
    setWindows(RESET_WINDOW_STATE);
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-neutral-900 select-none flex flex-col text-orange-200/90
        ${showScanlines ? "scanline-effect" : ""}
      `}
    >
      {showLogin && <LoginOverlay onLogin={() => setShowLogin(false)} />}
      {isShutDown ? (
        <ShutdownScreen onReboot={handleSystemReboot} />
      ) : (
        /* Standard Running Desktop Environment */
        <>
          {/* Background Wallpaper image frame */}
          <div
            style={{
              backgroundImage:
                activeLiveWallpaper === "none" ? activeBg : undefined,
              filter:
                activeLiveWallpaper === "none"
                  ? `blur(${blurDepth}px)`
                  : undefined,
              opacity: activeLiveWallpaper === "none" ? 1 - dimDepth : 1,
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none select-none z-0"
          />

          {activeLiveWallpaper !== "none" && (
            <LiveWallpaperCanvas
              type={activeLiveWallpaper}
              accentColor={activeAccent}
            />
          )}

          {/* Top Bar Status Gateway */}
          <div className="fixed top-0 w-full block">
            <DesktopTopBar
              onShutDown={() => {
                triggerAudioFeedback(300, 0.4, "sawtooth");
                setIsShutDown(true);
              }}
              onOpenTerminal={() => handleOpenWindow("terminal")}
            />
          </div>

          <div className="flex flex-col md:flex-row relative h-screen w-full overflow-hidden z-10">
            {/* Left Vertical App Shelf */}
            {/* <DesktopNavRail
              onOpenWindow={handleOpenWindow}
              activeWindows={{
                projects: windows.projects.isOpen,
                resume: windows.resume.isOpen,
                blog: windows.blog.isOpen,
                connect: windows.connect.isOpen,
                personalization: windows.personalization.isOpen,
                terminal: windows.terminal.isOpen,
              }}
            /> */}
            {/* {DesktopIcons.map((icon) => (
              <div key={icon.id} className="pointer-events-auto">
                <DesktopIcon
                  desktopIcon={icon}
                  onOpenWindow={handleOpenWindow}
                  windowActive={windows[icon.id].isOpen}
                />
              </div>
            ))} */}

            {/* Main Desktop Central Interactive Canvas Stage */}
            <main className="flex-1 w-full relative z-10 px-5 pt-8 pb-21 overflow-hidden">
              {/* DESKTOP ICONS LAYER (Responsive, Behind Windows, Clickable) */}
              <div className="pt-20 absolute inset-0 p-4 flex flex-col flex-wrap gap-4 content-start z-0 pointer-events-none">
                {DesktopIcons.map((icon) => (
                  <div
                    key={icon.id}
                    className="pointer-events-auto w-20 h-24 flex items-start justify-center"
                  >
                    <DesktopIcon
                      desktopIcon={icon}
                      onOpenWindow={handleOpenWindow}
                      windowActive={windows[icon.id].isOpen}
                    />
                  </div>
                ))}
              </div>

              {/* Center Atmospheric Branding analog clock */}
              <BackgroundClock />

              {/* Float Static System Monitor (top right, customizable) */}
              <div className="absolute right-6 top-6 z-20 hidden md:block">
                <SysMonitor />
              </div>
              {/* Draggable/Movable Windows Layer Stack */}
              {(Object.keys(windows) as WindowType[]).map((winId) => {
                const win = windows[winId];
                const windowContent =
                  winId === "personalization" ? (
                    <PersonalizationWindow
                      activeAccent={activeAccent}
                      onApplyTheme={handleApplyTheme}
                      activeBg={activeBg}
                      activeLiveWallpaper={activeLiveWallpaper}
                      onClose={() => handleCloseWindow("personalization")}
                      onMinimize={() => handleMinimizeWindow("personalization")}
                      onMaximize={() => handleMaximizeWindow("personalization")}
                      isMaximized={win.isMaximized}
                      scanlines={scanlines}
                      onSetScanlines={setScanlines}
                      blurDepth={blurDepth}
                      onSetBlurDepth={setBlurDepth}
                      dimDepth={dimDepth}
                      onSetDimDepth={setDimDepth}
                    />
                  ) : (
                    renderWindowContent(winId, handleOpenWindow)
                  );

                return (
                  <DesktopWindow
                    key={winId}
                    windowState={win}
                    onClose={() => handleCloseWindow(winId)}
                    onMinimize={() => handleMinimizeWindow(winId)}
                    onMaximize={() => handleMaximizeWindow(winId)}
                    onFocus={() => handleFocusWindow(winId)}
                  >
                    {windowContent}
                  </DesktopWindow>
                );
              })}
            </main>
          </div>

          {/* Bottom Taskbar Navigation Accessories Dock */}
          <div className="shrink-0 relative z-50">
            <LaunchMenu
              isOpen={showLaunchMenu}
              onClose={() => setShowLaunchMenu(false)}
              onOpenWindow={handleOpenWindow}
            />

            <SettingsMenu
              isOpen={showSettingsMenu}
              onClose={() => setShowSettingsMenu(false)}
              crtEnabled={crtEnabled}
              onCrtToggle={() => {
                triggerAudioFeedback(480, 0.08);
                setCrtEnabled(!crtEnabled);
              }}
              soundEnabled={soundEnabled}
              onSoundToggle={() => {
                setSoundEnabled(!soundEnabled);
                // Beep once if enabled to confirm
                if (!soundEnabled) {
                  setTimeout(() => {
                    try {
                      type WebkitAudioContextWindow = Window & {
                        webkitAudioContext?: typeof AudioContext;
                      };
                      const audioContextConstructor =
                        window.AudioContext ||
                        (window as WebkitAudioContextWindow).webkitAudioContext;
                      if (!audioContextConstructor) return;

                      const audioCtx = new audioContextConstructor();
                      const osc = audioCtx.createOscillator();
                      const gain = audioCtx.createGain();
                      osc.connect(gain);
                      gain.connect(audioCtx.destination);
                      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                      osc.start();
                      osc.stop(audioCtx.currentTime + 0.08);
                    } catch (err) {
                      console.error(err);
                    }
                  }, 100);
                }
              }}
            />

            <DesktopTaskbar
              onOpenWindow={handleOpenWindow}
              onOpenLaunchMenu={() => {
                triggerAudioFeedback(580, 0.05);
                setShowLaunchMenu(!showLaunchMenu);
                setShowSettingsMenu(false);
              }}
              onOpenSettingsMenu={() => {
                triggerAudioFeedback(580, 0.05);
                setShowSettingsMenu(!showSettingsMenu);
                setShowLaunchMenu(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
