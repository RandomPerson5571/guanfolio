import React, { useEffect, useState } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
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
  const dragControls = useDragControls();
  const prefersReducedMotion = useReducedMotion();
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const windowWidth = Math.min(windowState.width || 680, viewport.width - 16);
  const windowHeight = Math.min(windowState.height || 420, viewport.height - 112);
  const safeX = Math.max(8, Math.min(windowState.x, viewport.width - windowWidth - 8));
  const safeY = Math.max(48, Math.min(windowState.y, viewport.height - windowHeight - 64));

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <motion.div
      id={`window-${windowState.id}`}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={prefersReducedMotion ? false : { scale: 0.97, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: windowState.isMaximized ? 0 : safeX,
        y: windowState.isMaximized ? 0 : safeY,
        width: windowState.isMaximized ? "100%" : windowWidth,
        height: windowState.isMaximized
          ? "calc(100vh - 84px)"
          : windowHeight,
        top: windowState.isMaximized ? "40px" : "auto",
        left: windowState.isMaximized ? "0" : "auto",
      }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", duration: 0.28 }}
      style={{
        zIndex: windowState.zIndex,
        position: "absolute",
      }}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`window-title-${windowState.id}`}
      className={`desktop-window flex flex-col rounded-xl overflow-hidden backdrop-blur-xl border border-white/15 text-stone-100 font-sans select-none
        ${windowState.isMaximized ? "rounded-none border-x-0" : "max-w-[95vw] shadow-2xl"}
        glass-panel
      `}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar flex justify-between items-center px-2 py-1.5 bg-neutral-950/70 border-b border-white/10 cursor-move touch-none"
        onPointerDown={(event) => dragControls.start(event)}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          {/* OS-styled status dots */}
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center pointer-events-auto transition-colors text-rose-300"
              title="Close"
              aria-label={`Close ${windowState.title}`}
              id={`window-btn-close-${windowState.id}`}
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center pointer-events-auto transition-colors text-amber-300"
              title="Minimize"
              aria-label={`Minimize ${windowState.title}`}
              id={`window-btn-minimize-${windowState.id}`}
            >
              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center pointer-events-auto transition-colors text-emerald-300"
              title="Maximize"
              aria-label={`${windowState.isMaximized ? "Restore" : "Maximize"} ${windowState.title}`}
              aria-pressed={windowState.isMaximized}
              id={`window-btn-maximize-${windowState.id}`}
            >
              <Square className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>

          <span id={`window-title-${windowState.id}`} className="ml-2 font-mono text-[11px] tracking-wide text-stone-200/75 select-none truncate">
            {windowState.title}
          </span>
        </div>

        <div className="pr-2 flex items-center gap-1.5 text-stone-300/45 text-[9px] font-mono uppercase tracking-widest">
          <span>Live workspace</span>
        </div>
      </div>

      {/* Embedded Window Screen Pages Container */}
      <div className="flex-1 overflow-hidden bg-neutral-950/35 p-0 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
