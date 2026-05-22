"use client";

import React from "react";
import { FolderOpen, FileText, SquareTerminal, Share2 } from "lucide-react";
import DesktopIcon from "../components/DesktopIcon";
import TopAppBar from "../components/TopAppBar";
import Taskbar from "../components/taskbar/Taskbar";
import { WindowLayout } from "../components/windowHandler/WindowLayout";
import WindowHandler from "../components/windowHandler/WindowHandler";
import { useWindowStore } from "../stores/windowStore";
import TerminalWindowBody from "../components/windows/TerminalWindow";
import BackgroundCanvas from "../components/BackgroundCanvas";
import ProjectExplorer from "../components/windows/projects/ProjectWindow";
import { ResumeWindow } from "../components/windows/resume/ResumeWindow";

export default function DashboardPage() {
  const openWindow = useWindowStore((s) => s.openWindow);

  const windows = useWindowStore((s) => s.windows);

  return (
    <WindowLayout>
      <div className="bg-(--color-background) text-(--color-on-surface) h-screen w-screen overflow-hidden flex flex-col font-(--font-body-md) relative">
        {/* Canvas Wallpaper Element */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80 pointer-events-none"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4gjM5j2mdHBL8VyEp9GiqF4QP_RxV1rYYv7Seod-jJ2Jh-CSK06hKHMmndUuGC9cedNNgptA8V1uEbjcJWHVO-xLCgjE2gv6DhxIY2-P6Fy4g30YTKeekl92h-Zs-2SPcTkBKoV0gKbP8jiuLGkqwC6Ou9gwKVfKf4_O19dt7036w_s55H78h6uNyPyrYHaloLu1xa142J0FdMDMp_K354HmaM0VitkP7ruGIMij0cGWFH2OlVrvChqkT-aUKPJVkcHlXgUQCT94")`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-linear-to-br from-(--color-background)/90 via-(--color-background)/60 to-(--color-surface-container-lowest)/90 pointer-events-none" />

        {/* Top Application Bar */}
        <TopAppBar />

        {/* Main Desktop Space Matrix */}
        <main className="flex-1 relative z-10 p-(--spacing-margin-desktop) grid grid-cols-12 gap-(--spacing-gutter) h-full pb-[calc(var(--spacing-taskbar-height)+var(--spacing-margin-desktop))]">
          {/* Left Side: Desktop Shortcuts */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6 pt-8 relative z-20">
            <DesktopIcon
              icon={FolderOpen}
              label="Projects"
              onClick={() =>
                openWindow({
                  id: "project-window",
                  title: "projects",
                  body: <ProjectExplorer />,
                })
              }
            />
            <DesktopIcon
              icon={FileText}
              label="Resume"
              onClick={() =>
                openWindow({
                  id: "resume-window",
                  title: "resume",
                  body: <ResumeWindow />,
                })
              }
            />
            <DesktopIcon
              icon={SquareTerminal}
              label="Blog"
              onClick={() =>
                openWindow({
                  id: "terminal-window",
                  title: "terminal",
                  body: <TerminalWindowBody />,
                })
              }
            />
            <DesktopIcon icon={Share2} label="Connect" />
          </div>

          {/* Backgruond Canvas */}
          <BackgroundCanvas />

          {/* Right Side Widget Canvas Panel Column */}
          <WindowHandler />
        </main>

        {/* Docked Base Desktop Taskbar */}
        <Taskbar />
      </div>
    </WindowLayout>
  );
}
