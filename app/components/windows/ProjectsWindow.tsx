"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/app/data/portfolio";
import { Project } from "../../types/types";
import { ExternalLink, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Category = "all" | "web" | "security" | "systems" | "intelligence";

export default function ProjectsWindow() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(
    PROJECTS[0],
  );

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-sm">
      {/* Sidebar: Projects List */}
      <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-orange-200/10 flex flex-col h-1/2 md:h-full bg-neutral-950/20">
        {/* Category Tabs */}
        <div className="p-3 border-b border-orange-200/10 flex flex-nowrap overflow-x-auto gap-1">
          {["all", "web", "security", "systems", "intelligence"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as Category)}
              id={`project-tab-${cat}`}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded transition-colors whitespace-nowrap
                ${
                  selectedCategory === cat
                    ? "bg-orange-300/15 text-orange-200 border border-orange-300/30"
                    : "text-orange-200/50 hover:text-orange-100 hover:bg-white/5 border border-transparent"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List scroll */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              id={`project-item-${project.id}`}
              className={`p-3 rounded-lg cursor-pointer transition-all border text-left
                ${
                  activeProject?.id === project.id
                    ? "bg-orange-300/10 border-orange-300/35 text-white"
                    : "bg-neutral-950/30 border-transparent text-orange-200/70 hover:bg-neutral-900/40 hover:text-orange-100"
                }
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold font-display tracking-tight text-sm select-none">
                  {project.title}
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  {project.year}
                </span>
              </div>
              <p className="text-xs line-clamp-2 text-white/50 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900/60 rounded border border-orange-200/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel: Active Project Details */}
      <div className="flex-1 h-1/2 md:h-full overflow-y-auto custom-scrollbar p-5 flex flex-col justify-between bg-neutral-950/10">
        {activeProject ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-orange-300/80 uppercase tracking-widest block mb-1">
                  PATH: ~/projects/{activeProject.id}
                </span>
                <h3 className="text-xl font-display font-medium text-orange-100 glow-text-peach">
                  {activeProject.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-rose-500/10 text-rose-300 rounded-full border border-rose-500/20 shadow-sm shadow-rose-950/50">
                {activeProject.stats}
              </span>
            </div>

            <p className="text-xs text-orange-50/80 leading-relaxed font-sans border-l-2 border-orange-300/25 pl-3 py-1 bg-white/5 rounded-r">
              {activeProject.longDescription || activeProject.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono text-orange-200/50 block">
                STACK OVERVIEW
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 bg-neutral-900/80 text-orange-200/90 rounded border border-orange-200/10 shadow-inner"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs Indicator Box */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-black/40 border border-orange-200/10 rounded-lg">
              <div>
                <span className="text-[10px] font-mono text-orange-200/40 uppercase block">
                  Category
                </span>
                <span className="text-xs font-semibold text-orange-200/80 capitalize">
                  {activeProject.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-orange-200/40 uppercase block">
                  Status
                </span>
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Completed / Maintained
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-4 border-t border-orange-200/10 mt-auto">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                id={`project-btn-git-${activeProject.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 border border-orange-200/25 hover:border-orange-200/50 rounded-lg text-xs font-mono text-orange-100 hover:bg-neutral-800 transition-colors"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>GITHUB_REPO</span>
              </a>
              <a
                href={activeProject.link}
                onClick={(e) => {
                  e.preventDefault();
                }} // Local mock link
                id={`project-btn-live-${activeProject.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-linear-to-r from-orange-400/20 to-pink-500/20 border border-orange-300/30 hover:border-orange-300/60 rounded-lg text-xs font-mono text-orange-100 font-medium hover:brightness-110 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LAUNCH_APP</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-orange-200/40 text-xs gap-2 font-mono">
            <Terminal className="w-6 h-6 stroke-[1.5]" />
            <span>SELECT A PROJECTS TARGET TO QUERY</span>
          </div>
        )}
      </div>
    </div>
  );
}
