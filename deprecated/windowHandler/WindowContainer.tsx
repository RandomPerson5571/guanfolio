"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import DraggableTopBar from "./DraggableTopBar";

let topZ = 1000;

interface Prop {
  id: string;
  children: ReactNode;
}

export default function WindowContainer({ id, children }: Prop) {
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const resizingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 540, height: 360 });
  const posRef = useRef({ x: 200, y: 120 });
  const [pos, setPos] = useState({ x: 200, y: 120 });
  const [dimensions, setDimensions] = useState({ width: 540, height: 360 });
  const [zIndex, setZIndex] = useState<number>(topZ);

  useEffect(() => {
    return () => {
      draggingRef.current = false;
      resizingRef.current = false;
    };
  }, []);

  const bringToFront = useCallback(() => {
    topZ += 1;
    setZIndex(topZ);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      bringToFront();
      draggingRef.current = true;

      const rect = el.getBoundingClientRect();
      offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      const onMove = (ev: PointerEvent) => {
        if (!draggingRef.current) return;
        const nextPos = {
          x: ev.clientX - offsetRef.current.x,
          y: ev.clientY - offsetRef.current.y,
        };
        setPos(nextPos);
        posRef.current = nextPos;
      };

      const onUp = () => {
        draggingRef.current = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [bringToFront],
  );

  const onResizePointerDown = useCallback(
    (e: React.PointerEvent, isTopLeft = false) => {
      e.stopPropagation();
      bringToFront();
      resizingRef.current = true;
      offsetRef.current = { x: e.clientX, y: e.clientY };
      sizeRef.current = dimensions;
      const startPos = posRef.current;

      const onMove = (ev: PointerEvent) => {
        if (!resizingRef.current) return;

        if (isTopLeft) {
          const deltaX = ev.clientX - offsetRef.current.x;
          const deltaY = ev.clientY - offsetRef.current.y;
          const rawWidth = sizeRef.current.width - deltaX;
          const rawHeight = sizeRef.current.height - deltaY;
          const nextWidth = Math.min(
            Math.max(rawWidth, 360),
            Math.max(360, window.innerWidth * 0.96),
          );
          const nextHeight = Math.min(
            Math.max(rawHeight, 280),
            Math.max(280, window.innerHeight * 0.8),
          );

          setDimensions({ width: nextWidth, height: nextHeight });

          const nextPos = {
            x: startPos.x + (sizeRef.current.width - nextWidth),
            y: startPos.y + (sizeRef.current.height - nextHeight),
          };
          setPos(nextPos);
          posRef.current = nextPos;
        } else {
          const nextWidth = Math.max(
            360,
            sizeRef.current.width + (ev.clientX - offsetRef.current.x),
          );
          const nextHeight = Math.max(
            280,
            sizeRef.current.height + (ev.clientY - offsetRef.current.y),
          );

          setDimensions({
            width: Math.min(nextWidth, Math.max(360, window.innerWidth * 0.96)),
            height: Math.min(
              nextHeight,
              Math.max(280, window.innerHeight * 0.8),
            ),
          });
        }
      };

      const onUp = () => {
        resizingRef.current = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [bringToFront, dimensions],
  );

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        zIndex,
        width: dimensions.width,
        height: dimensions.height,
        minWidth: 360,
        minHeight: 280,
        maxWidth: "90vw",
        maxHeight: "80vh",
      }}
      className="window-glass rounded-xl shadow-2xl flex flex-col border border-white/10 overflow-hidden"
    >
      <DraggableTopBar id={id} onPointerDown={onPointerDown} />
      <div
        className="flex-1 overflow-auto h-full hide-scrollbar"
        onClick={bringToFront}
      >
        {children}
      </div>
      <div
        onPointerDown={(e) => onResizePointerDown(e)}
        style={{ touchAction: "none" }}
        className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize "
      />
      <div
        onPointerDown={(e) => onResizePointerDown(e, true)}
        style={{ touchAction: "none" }}
        className="absolute top-0 left-0 w-4 h-4 cursor-se-resize "
      />
    </div>
  );
}
