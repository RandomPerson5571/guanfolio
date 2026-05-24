import { Folder, History, Layers } from "lucide-react";
import React from "react";

export default function ProjectsSidebar() {
  return (
    <nav className="w-48 md:w-64 border-r border-white/5 bg-surface-container-lowest/40 flex flex-col py-6 shrink-0 hidden sm:flex">
      <div className="px-4 mb-6">
        <h2 className="font-label-caps text-label-caps text-surface-tint tracking-widest opacity-60">
          WORK_TREE
        </h2>
      </div>
      <ul className="flex flex-col gap-1">
        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-on-surface-variant hover:bg-white/5 px-4 py-2 transition-all font-body-md text-body-md"
          >
            <History className="text-[20px]" size={20} />
            Recent Projects
          </a>
        </li>
        {/* Active Route Identifier */}
        <li>
          <a
            href="#"
            className="flex items-center gap-3 bg-surface-tint/10 text-surface-tint border-l-2 border-surface-tint px-4 py-2 transition-all font-body-md text-body-md shadow-[inset_0_0_8px_rgba(0,230,57,0.1)]"
          >
            <Folder className="text-[20px]" size={20} />
            Repository
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-on-surface-variant hover:bg-white/5 px-4 py-2 transition-all font-body-md text-body-md"
          >
            <Layers className="text-[20px]" size={20} />
            Tech Stack
          </a>
        </li>
      </ul>
    </nav>
  );
}
