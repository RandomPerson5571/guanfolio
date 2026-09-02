"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Activity, X } from "lucide-react";

const impactMetrics = [
  { value: "200+", label: "members supported" },
  { value: "342", label: "hackathon participants" },
  { value: "57.7", label: "vision FPS" },
  { value: "6", label: "robotics sub-teams" },
];

export default function SysMonitor() {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  if (!isVisible) return null;

  return (
      <motion.div
        id="sys-monitor-widget"
        initial={reduceMotion ? false : { x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        className="mt-11 w-72 rounded-xl border border-orange-200/15 p-4 text-orange-100/90 font-mono text-xs shadow-xl select-none glass-panel"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-2 mb-3 border-b border-orange-200/10">
          <div className="flex items-center gap-2">
            <Activity aria-hidden="true" className="h-3.5 w-3.5 text-orange-300" />
            <span className="tracking-wider uppercase text-[10px] text-orange-200/60 font-semibold select-none">
              IMPACT MONITOR
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Close impact monitor"
            id="sys-monitor-close-btn"
            className="text-orange-200/40 hover:text-orange-200 p-0.5 rounded transition-colors cursor-pointer"
          >
            <X aria-hidden="true" className="w-3.5 h-3.5" />
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
  );
}
