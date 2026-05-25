"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { STATS } from "@/app/data/stats";

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
              ⚛ SYS_MONITOR
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

        {/* Channels Stats List */}
        <div className="space-y-4">
          {STATS.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="space-y-1.5 group">
                <div className="flex justify-between items-center text-[10px] tracking-wide text-orange-200/70 select-none">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <IconComponent className="w-3.5 h-3.5 text-orange-300/60" />
                    {stat.label}
                  </span>
                  <span className="font-bold text-orange-300">
                    {stat.value}%
                  </span>
                </div>

                {/* Custom glowing channel loader bar */}
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-orange-200/5 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full bg-linear-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry diagnostics footer */}
        <div className="mt-4 pt-3 border-t border-orange-200/10 text-[9px] text-orange-200/30 flex justify-between">
          <span>PORT: 3000 // UP</span>
          <span>MEM: 27B/52B</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
