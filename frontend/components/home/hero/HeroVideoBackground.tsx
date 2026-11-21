"use client";

import { useEffect, useRef, useState } from "react";
import { HeroTourbillonBg } from "./HeroTourbillonBg";

const HERO_VIDEOS = [
  {
    local: "/resourses/ariwatch-hero-1.mp4",
    remote: "https://ariwatch.ir/wp-content/uploads/2026/07/64693d694cca7670b963a0c70ea7cdc5.mp4",
  },
  {
    local: "/resourses/ariwatch-hero-2.mp4",
    remote: "https://ariwatch.ir/wp-content/uploads/2026/07/ariwatch-5.mp4",
  },
];

export function HeroVideoBackground({
  activeSlideIndex,
  showVideo,
  paused,
  onVideoEnded,
  customVideoUrl,
}: {
  activeSlideIndex: number;
  showVideo: boolean;
  paused: boolean;
  onVideoEnded: () => void;
  customVideoUrl?: string;
}) {
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const [src1, setSrc1] = useState(
    customVideoUrl && customVideoUrl !== "/resourses/ariwatch-hero.mp4"
      ? customVideoUrl
      : HERO_VIDEOS[0].local
  );
  const [src2, setSrc2] = useState(HERO_VIDEOS[1].local);
  const [video1Failed, setVideo1Failed] = useState(false);
  const [video2Failed, setVideo2Failed] = useState(false);

  useEffect(() => {
    if (!showVideo) return;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (activeSlideIndex === 0) {
      if (v1) {
        if (paused) v1.pause();
        else void v1.play().catch(() => {});
      }
      if (v2) v2.pause();
    } else {
      if (v2) {
        if (paused) v2.pause();
        else void v2.play().catch(() => {});
      }
      if (v1) v1.pause();
    }
  }, [activeSlideIndex, paused, showVideo]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#a8a7a5] via-[#cac9c7] to-[#2b2a29]">
      <HeroTourbillonBg paused={paused} />

      {showVideo && !video1Failed && (
        <video
          ref={video1Ref}
          src={src1}
          autoPlay
          muted
          playsInline
          onEnded={onVideoEnded}
          onError={() => {
            if (src1 === HERO_VIDEOS[0].local) setSrc1(HERO_VIDEOS[0].remote);
            else setVideo1Failed(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            activeSlideIndex === 0 ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {showVideo && !video2Failed && (
        <video
          ref={video2Ref}
          src={src2}
          muted
          playsInline
          onEnded={onVideoEnded}
          onError={() => {
            if (src2 === HERO_VIDEOS[1].local) setSrc2(HERO_VIDEOS[1].remote);
            else setVideo2Failed(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            activeSlideIndex === 1 ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      <div className="absolute inset-0 z-2 bg-gradient-to-b from-black/25 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
}
