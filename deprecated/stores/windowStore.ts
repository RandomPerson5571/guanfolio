// store/useWindowStore.ts
import { create } from "zustand";
import React, { ReactNode } from "react";

export type AppWindow = {
  id: string;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  body: ReactNode;
};

interface OpenWindowProp {
  id: string;
  title: string;
  body: ReactNode;
}

export interface WindowState {
  windows: AppWindow[];
  maxZIndex: number;
  openWindow: ({ id, title, body }: OpenWindowProp) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  maxZIndex: 0,

  openWindow: ({ id, title, body }) =>
    set((state) => {
      if (state.windows.some((w) => w.id === id)) {
        const newZ = state.maxZIndex + 1 + 20;
        return {
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w,
          ),
          maxZIndex: newZ,
        };
      }

      const newZ = state.maxZIndex + 1;
      return {
        windows: [
          ...state.windows,
          { id, title, body, isMinimized: false, zIndex: newZ },
        ],
        maxZIndex: newZ,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
    })),

  focusWindow: (id) =>
    set((state) => {
      const newZ = state.maxZIndex + 1;
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w,
        ),
        maxZIndex: newZ,
      };
    }),
}));
