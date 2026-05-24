"use client";

import { useWindowStore } from "@/deprecated/stores/windowStore";
import WindowContainer from "./WindowContainer";

export default function WindowHandler() {
  const windows = useWindowStore((s) => s.windows);

  console.log(windows);

  return (
    <>
      {windows.map((window) => (
        <WindowContainer key={window.id} id={window.id}>
          {window.body}
        </WindowContainer>
      ))}
    </>
  );
}
