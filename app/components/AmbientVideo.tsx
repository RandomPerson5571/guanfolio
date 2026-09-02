"use client";

import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AmbientVideoProps {
  className?: string;
  controlLabel: string;
  preload?: "auto" | "metadata" | "none";
  src: string;
}

export default function AmbientVideo({
  className,
  controlLabel,
  preload = "metadata",
  src,
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
    }
  }, [prefersReducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload={preload}
        aria-hidden="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        className="ambient-video-control"
        type="button"
        onClick={togglePlayback}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${controlLabel}`}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{isPlaying ? "Pause motion" : "Play motion"}</span>
      </button>
    </>
  );
}
