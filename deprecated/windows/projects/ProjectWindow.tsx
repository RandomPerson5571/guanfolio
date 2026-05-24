import { Filter, Search, Sidebar } from "lucide-react";
import React from "react";
import ProjectCardFeatured from "./FeaturedProjects";
import ProjectCardStandard from "./ProjectCardStandard";

import Mycelia from "@/public/MyceliaMusicApp.jpg";
import STLEventTracker from "@/public/STLEventTracker.jpg";

// Mock data reflecting your exact layout architecture
const FEATURED_PROJECT = {
  id: "stl-event-tracker",
  title: "STL Event Tracker",
  description: "A web-app that tracks events and awards points",
  imageSrc: STLEventTracker.src,
  imageAlt: "Stl event tracker",
  tags: ["React", "Supabase", "React Query"],
};

const STANDARD_PROJECTS = [
  {
    id: "ad-eeg",
    title: "EEG-Analysis Research",
    description: "Analyzed EEG patterns to diagnose Alzheimer’s Disease (AD)",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPUArx3sHdkPAU9VYJvdSRoxE-8SkF_YDnXuF9b_TbvZdjM-yDMOQiNGs5Y0S05m124uRpUtEHaw0ox-LuvgHmbOhPgfnErm_Cau1TUwEVJj_Pt7sMZi4JT7J32v9G_x_7Pqz-S05onfQB3ARqltg2k3kjHpm5s1zpbkgPJ88R6BXgXxtUUEm6HZmODqOmVXWRwRfOlj9d68DxXg1oP5nJJEG-V5nv9FEgALPm3F5GcBWbokdUsk8cgTfYpT364njNnhSNsJVKB6o",
    imageAlt: "Alzheimers EEG Research",
    tags: ["Python", "Scikit-learn"],
  },
  {
    id: "music-app",
    title: "Mycelia",
    description:
      "Developed a social media platform for users to share songs from youtube music or spotify on an integrated platform",
    imageSrc: Mycelia.src,
    imageAlt: "Music app",
    tags: ["React", "Django"],
  },
  {
    id: "guanfolio",
    title: "Guanfolio",
    description: "A personal portfolio website based on the linux OS.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYhyJU1wbILSHm6WzpDSmNNzV11g-Jieb9tc3Ot39i8Vu11_8mJo2tPOUU_hMMqn-e6_z8geRVeduYrpK90G1JsoC6FNZ6aJ6wvaWgWcQU6PVMfQegUloH3QR7lTdVwZo2ofKaCuxKDjuwUM085l53hn3YZ2AXo6kSKAMhnadi88d6e2c_6pvOpmeqXm8vAMyxtLMtpucwUdEkxbzayr82wafo7PoKoJwagPIuv9CLkzVUuuaj1Pfg4OyVWO92K0yOqca-Kjuy-nQ",
    imageAlt: "Personal Portfolio",
    tags: ["React", "Node.js", "React Query", "Three.js", "Framer Motion"],
  },
  {
    id: "algorithm-alchemists",
    title: "Algorithm Alchemists Website",
    description:
      "Built a simple platform to help students and potential clients learn about Algorithm Alchemists.",
    imageSrc: "https://algorithmalchemists.org/assets/favicon-B1B-iI_x.png",
    imageAlt: "API icon fallback state",
    tags: ["React", "Supabase", "React Query"],
  },
];

export default function ProjectWindow() {
  return (
    <div className="flex flex-1 overflow-hidden h-full select-none">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Dashboard */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-8 bg-surface-container-low/20">
        {/* Dashboard Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Repository Matrix
            </h1>
            <p className="font-code-sm text-code-sm text-surface-tint mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse"></span>
              12 active nodes discovered
            </p>
          </div>

          {/* Action Bar: Search & Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
                size={18}
              />
              <input
                type="text"
                placeholder="Grep repositories..."
                className="bg-[#050505] border-b border-white/10 border-t-0 border-l-0 border-r-0 focus:border-surface-tint text-on-surface font-code-sm text-code-sm pl-9 pr-4 py-2 w-full sm:w-64 transition-colors focus:ring-0 placeholder:text-on-surface-variant/50"
              />
            </div>
            <button className="bg-surface-container hover:bg-surface-container-high p-2 rounded border border-white/5 transition-colors grid place-items-center">
              <Filter className="text-on-surface" size={18} />
            </button>
          </div>
        </div>

        {/* Project Dynamic Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Featured Wide Block */}
          <ProjectCardFeatured {...FEATURED_PROJECT} />

          {/* Standard Blocks */}
          {STANDARD_PROJECTS.map((project) => (
            <ProjectCardStandard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
