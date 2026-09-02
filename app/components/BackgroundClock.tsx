"use client";

import { useEffect, useState } from "react";

export default function BackgroundClock() {
  // Clock ticks for large analog branding clock
  const [brandTime, setBrandTime] = useState(new Date());

  // Ticking brand clock
  useEffect(() => {
    const timer = setInterval(() => {
      setBrandTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Brand analog clock hand angles
  const brandSecs = brandTime.getSeconds();
  const brandMins = brandTime.getMinutes();
  const brandHours = brandTime.getHours();
  const brandSecDeg = brandSecs * 6;
  const brandMinDeg = brandMins * 6 + brandSecs * 0.1;
  const brandHourDeg = (brandHours % 12) * 30 + brandMins * 0.5;

  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-7 opacity-85 select-none scale-90 md:scale-100">
        {/* SVG Ticking analog clock */}
        <svg
          className="w-20 h-20 md:w-28 md:h-28 text-orange-200/95 filter drop-shadow-[0_0_15px_rgba(229,184,144,0.35)]"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />

          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${brandHourDeg} 50 50)`}
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${brandMinDeg} 50 50)`}
          />

          {/* Second Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="14"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${brandSecDeg} 50 50)`}
          />

          {/* Center pin */}
          <circle cx="50" cy="50" r="2.5" fill="currentColor" />
        </svg>

        <div className="flex flex-col">
          <strong className="text-6xl md:text-8xl font-display font-medium tracking-[0.12em] text-orange-200/90 uppercase glow-text-peach">
            EG
          </strong>
          <span className="mt-1 text-[9px] font-mono uppercase tracking-[0.34em] text-orange-200/45">
            desktop workspace
          </span>
        </div>
      </div>
    </div>
  );
}
