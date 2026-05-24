import { Server } from "lucide-react";
import React from "react";

interface ProjectCardStandardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  tags: string[];
  isIconFallback?: boolean;
}

export default function ProjectCardStandard({
  title,
  description,
  imageSrc,
  imageAlt = "Project visual visualization",
  tags,
  isIconFallback = false,
}: ProjectCardStandardProps) {
  return (
    <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl border border-white/10 hover:border-surface-tint/40 transition-all duration-300 group overflow-hidden flex flex-col relative shadow-lg">
      {/* Card Header Media Window */}
      {isIconFallback || !imageSrc ? (
        <div className="h-32 relative overflow-hidden border-b border-white/5 bg-surface-container-lowest flex justify-center items-center">
          <Server
            className="text-[48px] text-surface-tint/30 group-hover:text-surface-tint/70 transition-colors"
            size={48}
          />
        </div>
      ) : (
        <div className="h-32 relative overflow-hidden border-b border-white/5">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
          />
        </div>
      )}

      {/* Content Metadata Area */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-label-caps text-label-caps text-on-surface mb-2 group-hover:text-surface-tint transition-colors">
          {title}
        </h3>
        <p className="font-body-sm text-sm text-on-surface-variant mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-xs font-code-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
