"use client";

import React, { useState } from "react";
import { BlogPost } from "../../types/types";
import { BookOpen, Calendar, Clock, Eye } from "lucide-react";

interface BlogWindowProps {
  blogPosts: BlogPost[];
}

export default function BlogWindow({ blogPosts }: BlogWindowProps) {
  const [activePost, setActivePost] = useState<BlogPost | null>(
    blogPosts[0] ?? null,
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-sm">
      {/* List Panel */}
      <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-orange-200/10 flex flex-col h-1/2 md:h-full bg-neutral-950/20 overflow-y-auto custom-scrollbar">
        <div className="p-3 border-b border-orange-200/10 bg-neutral-950/30">
          <span className="text-[10px] font-mono uppercase tracking-widest text-orange-200/50 block">
            LOG CONTENTS
          </span>
          <h4 className="text-sm font-display font-medium text-orange-100 flex items-center gap-1.5 mt-0.5">
            <BookOpen className="w-4 h-4 text-orange-300" />
            <span>SYS_JOURNAL</span>
          </h4>
        </div>

        <div className="p-2 space-y-1">
          {blogPosts.map((post) => (
            <button
              type="button"
              key={post.id}
              onClick={() => setActivePost(post)}
              aria-pressed={activePost?.id === post.id}
              id={`blog-item-${post.id}`}
              className={`p-3 rounded-lg cursor-pointer transition-all border text-left
                ${
                  activePost?.id === post.id
                    ? "bg-orange-300/10 border-orange-300/35 text-white"
                    : "bg-neutral-950/30 border-transparent text-orange-200/70 hover:bg-neutral-950/50 hover:text-orange-100"
                }
              `}
            >
              <div className="flex justify-between items-start mb-1 text-[10px] font-mono opacity-50">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h5 className="font-semibold font-display tracking-tight text-sm text-orange-100 mb-1 leading-snug">
                {post.title}
              </h5>
              <p className="text-xs line-clamp-2 text-white/50 mb-2">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900/60 rounded border border-orange-200/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reader Panel */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5 bg-neutral-950/10">
        {activePost ? (
          <article className="space-y-4">
            {/* Header info */}
            <div className="space-y-2 border-b border-orange-200/10 pb-4">
              <span className="text-[10px] font-mono text-orange-300/80 uppercase tracking-widest block">
                JOURNAL // ID: {activePost.id}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-medium text-orange-100 leading-tight glow-text-peach">
                {activePost.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-orange-100/50 font-mono flex-wrap pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {activePost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {activePost.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Authorized Read</span>
                </span>
              </div>
            </div>

            {/* Markdown-style content */}
            <div className="text-orange-50/80 leading-relaxed text-xs md:text-sm font-sans space-y-4 select-text">
              {activePost.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("###")) {
                  return (
                    <h4
                      key={index}
                      className="text-sm font-mono font-medium text-orange-300 pt-3 border-l-2 border-orange-300/30 pl-2"
                    >
                      {paragraph.replace("###", "").trim()}
                    </h4>
                  );
                }
                if (paragraph.startsWith("1.") || paragraph.startsWith("-")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside pl-2 space-y-1 text-white/70"
                    >
                      {items.map((item, id) => {
                        return (
                          <li key={id}>{item.replace(/^(\d+\.|\-)\s*/, "")}</li>
                        );
                      })}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="font-normal">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Footer tags */}
            <div className="pt-6 border-t border-orange-200/10 flex items-center gap-2">
              <span className="text-[10px] font-mono text-orange-200/40">
                TAGS:
              </span>
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 bg-neutral-900 text-orange-200/60 rounded border border-orange-200/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-orange-200/40 text-xs gap-2 font-mono h-full">
            <BookOpen className="w-6 h-6 stroke-[1.5]" />
            <span>CHOOSE AN ARTICLE FROM THE JOURNAL TO ACCESS</span>
          </div>
        )}
      </div>
    </div>
  );
}
