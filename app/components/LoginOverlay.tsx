"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, ArrowRight, Fingerprint, Key } from "lucide-react";
import { PROFILE_PICTURE } from "../data/avatar";

interface LoginOverlayProps {
  onLogin: () => void;
}

export default function LoginOverlay({ onLogin }: LoginOverlayProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-black/60 backdrop-blur-[20px]" />
      </div>

      <div className="relative z-10 w-full max-w-[360px] p-8 rounded-xl mica-surface">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 avatar-glow mb-4">
            <Image
              src={PROFILE_PICTURE.src}
              alt="Avatar"
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-white mb-2 tracking-tight">
            Ethan Guan
          </h1>
          <p className="text-white/60 text-sm">KALI_USER_SESSION</p>
        </div>

        <div className="w-full max-w-[320px] mx-auto space-y-4">
          <div className="flex items-center gap-2 group">
            <div className="glass-input flex-grow h-10 px-4 flex items-center rounded-lg">
              <input
                className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-white placeholder-white/50 text-body-md"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onLogin();
                }}
                value={password}
              />
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors ml-2"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={onLogin}
              aria-label="Sign in"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 transition-all active:scale-95 duration-100"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 pt-4">
            <a
              className="text-white/60 hover:text-white font-body-md text-sm transition-colors underline-offset-4"
              href="#"
            >
              I forgot my PIN
            </a>
            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-white/40 font-label-caps text-[10px] uppercase tracking-widest">
                Sign-in options
              </span>
              <div className="flex gap-4">
                <button className="p-2 rounded hover:bg-white/10 transition-colors">
                  <Fingerprint className="w-5 h-5 text-white/70" />
                </button>
                <button className="p-2 rounded hover:bg-white/10 transition-colors">
                  <Key className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
