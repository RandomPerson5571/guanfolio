"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const impactMetrics = [
  { value: "200+", label: "members supported" },
  { value: "342", label: "hackathon participants" },
  { value: "57.7", label: "vision FPS" },
  { value: "6", label: "robotics sub-teams" },
];

export default function SysMonitor() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="sys-monitor-widget"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        className="mt-11 w-72 rounded-xl border border-orange-200/15 p-4 text-orange-100/90 font-mono text-xs shadow-xl select-none glass-panel"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-orange-200/10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px] text-orange-200/60 font-semibold select-none">
              ⚛ IMPACT_MONITOR
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            id="sys-monitor-close-btn"
            className="text-orange-200/40 hover:text-orange-200 p-0.5 rounded transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-orange-200/10 bg-orange-200/10">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="bg-black/25 p-3">
              <strong className="block text-lg tracking-tight text-orange-200">
                {metric.value}
              </strong>
              <span className="mt-1 block text-[8px] uppercase leading-tight tracking-wider text-orange-200/45">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Telemetry diagnostics footer */}
        <div className="mt-4 pt-3 border-t border-orange-200/10 text-[9px] text-orange-200/30 flex justify-between">
          <span>PROOF: VERIFIED</span>
          <span>BUILD: 2026</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
