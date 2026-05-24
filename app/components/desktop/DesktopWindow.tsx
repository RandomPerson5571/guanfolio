import React, { useRef } from "react";
import { motion } from "motion/react";
import { Minus, Square, X } from "lucide-react";
import { WindowState } from "../../types/types";

interface DesktopWindowProps {
  key?: string;
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function DesktopWindow({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: DesktopWindowProps) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <motion.div
      id={`window-${windowState.id}`}
      drag
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: windowState.isMaximized ? 0 : windowState.x,
        y: windowState.isMaximized ? 0 : windowState.y,
        width: windowState.isMaximized ? "100%" : windowState.width || 680,
        height: windowState.isMaximized
          ? "calc(100vh - 84px)"
          : windowState.height || 420,
        top: windowState.isMaximized ? "40px" : "auto",
        left: windowState.isMaximized ? "0" : "auto",
      }}
      transition={{ type: "spring", duration: 0.3 }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
      }}
      className={`flex flex-col rounded-xl overflow-hidden backdrop-blur-xl border border-orange-200/20 text-orange-50/95 font-sans select-none
        ${windowState.isMaximized ? "rounded-none border-x-0" : "max-w-[95vw] shadow-2xl"}
        glass-panel
      `}
    >
      {/* Title Bar */}
      <div className="window-titlebar flex justify-between items-center px-4 py-2 bg-neutral-950/50 border-b border-orange-200/10 cursor-move">
        <div className="flex items-center gap-2">
          {/* OS-styled status dots */}
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 flex items-center justify-center group pointer-events-auto transition-colors"
              title="Close"
              id={`window-btn-close-${windowState.id}`}
            >
              <X className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black font-extrabold transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 flex items-center justify-center group pointer-events-auto transition-colors"
              title="Minimize"
              id={`window-btn-minimize-${windowState.id}`}
            >
              <Minus className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black font-extrabold transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 flex items-center justify-center group pointer-events-auto transition-colors"
              title="Maximize"
              id={`window-btn-maximize-${windowState.id}`}
            >
              <Square className="w-1 h-1 opacity-0 group-hover:opacity-100 text-black transition-opacity" />
            </button>
          </div>

          <span className="ml-3 font-mono text-xs tracking-wider text-orange-200/70 select-none">
            {windowState.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-orange-200/40 text-[10px] font-mono">
          <span>KALI_LIVE</span>
        </div>
      </div>

      {/* Embedded Window Screen Pages Container */}
      <div className="flex-1 overflow-hidden bg-neutral-950/35 p-0 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
