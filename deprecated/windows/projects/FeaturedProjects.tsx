"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FeaturedProjectProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
}

export default function ProjectCardFeatured({
  title,
  description,
  imageSrc,
  imageAlt,
  tags,
}: FeaturedProjectProps) {
  return (
    <div className="xl:col-span-2 bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl border border-white/10 hover:border-surface-tint/40 transition-all duration-300 group overflow-hidden flex flex-col sm:flex-row shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative">
      {/* Dynamic Hover Matrix Glow */}
      <div className="absolute inset-0 bg-surface-tint/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      {/* Decorative Branding Frame */}
      <div className="sm:w-1/2 h-48 sm:h-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a]/80 to-transparent z-10 sm:bg-linear-to-r"></div>
        <Image
          height={40}
          width={40}
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
        />
      </div>

      {/* Primary Detail Column */}
      <div className="p-6 sm:w-1/2 flex flex-col justify-between z-20 relative">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-label-caps text-label-caps text-surface-tint text-lg">
              {title}
            </h3>
            <ArrowUpRight
              className="text-on-surface-variant group-hover:text-surface-tint transition-colors cursor-pointer"
              size={20}
            />
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-tint/10 text-surface-tint px-2 py-1 rounded text-xs font-code-sm border border-surface-tint/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
