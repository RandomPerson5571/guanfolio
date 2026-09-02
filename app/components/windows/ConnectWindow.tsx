"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import type { clientInfo } from "@/app/types/clientInfo";
import type { SocialLink } from "@/app/types/types";

interface ConnectWindowProps {
  clientInfo: clientInfo;
  socials: SocialLink[];
}

export default function ConnectWindow({
  clientInfo,
  socials,
}: ConnectWindowProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Portfolio note from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:${clientInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-sm">
      {/* Visual coordinates and socials panel (left) */}
      <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-orange-200/10 p-5 flex flex-col justify-between bg-neutral-950/20 overflow-y-auto custom-scrollbar">
        <div className="space-y-5">
          <div>
            <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-300/20 uppercase tracking-widest block w-fit mb-2">
              Say hello
            </span>
            <h3 className="text-xl font-display font-medium text-orange-50 select-none">
              Let&apos;s connect
            </h3>
            <p className="text-xs text-orange-200/60 font-sans mt-1.5 leading-relaxed">
              Have a role, project, or idea in mind? Send me a note or find me
              on one of these platforms.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-orange-200/10 text-xs">
            <span className="text-[10px] font-mono text-orange-200/30 uppercase block select-none">
              CONTACT
            </span>
            <div className="space-y-2 font-mono text-orange-200/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-300/70" />
                <span>LOC: {clientInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-300/70" />
                <a
                  href={`mailto:${clientInfo.email}`}
                  className="hover:text-orange-200 hover:underline"
                >
                  {clientInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Connected Handle Grid */}
          <div className="space-y-3 pt-3 border-t border-orange-200/10">
            <span className="text-[10px] font-mono text-orange-200/30 uppercase block select-none">
              ELSEWHERE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {socials.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  id={`connect-social-${soc.platform.toLowerCase()}`}
                  className="px-3 py-2 bg-black/40 border border-orange-200/10 hover:border-orange-200/30 hover:bg-black/60 rounded-lg flex flex-col gap-1 transition-all group"
                >
                  <span className="text-[10px] font-mono text-orange-300/70 group-hover:text-orange-200 transition-colors">
                    {soc.platform}
                  </span>
                  <span className="text-[11px] font-mono text-orange-100/50 group-hover:text-orange-100 truncate transition-colors">
                    {soc.username}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-4 text-[10px] font-mono text-orange-200/35">Usually replies within a few days.</p>
      </div>

      {/* Interactive Form Panel (right) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-6 bg-neutral-950/10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="text-[10px] font-mono text-orange-300/80 uppercase tracking-widest block">
              OPEN IN YOUR EMAIL APP
            </span>

            <div className="space-y-1">
              <label htmlFor="connect-input-name" className="text-[11px] font-mono text-orange-200/50">
                NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                id="connect-input-name"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs font-mono outline-none transition-all placeholder:text-neutral-700 placeholder:font-mono"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="connect-input-email" className="text-[11px] font-mono text-orange-200/50">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                id="connect-input-email"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs font-mono outline-none transition-all placeholder:text-neutral-700"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="connect-input-message" className="text-[11px] font-mono text-orange-200/50">
                MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to talk about?"
                id="connect-input-message"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs outline-none transition-all placeholder:text-neutral-700 resize-none"
              />
            </div>

            <button
              type="submit"
              id="connect-submit-btn"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-orange-400/20 to-pink-500/20 hover:brightness-110 border border-orange-300/30 rounded-lg text-xs font-mono text-orange-100 transition-all cursor-pointer"
            >
              <Send aria-hidden="true" className="w-3.5 h-3.5" />
              <span>COMPOSE EMAIL</span>
            </button>
          </form>
      </div>
    </div>
  );
}
