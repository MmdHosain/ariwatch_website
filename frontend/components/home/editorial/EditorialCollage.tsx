"use client";

import { useRef, useState } from "react";
import { getApiBaseUrl } from "../../../services/api";

export function EditorialCollage({
  activeImages,
  brand,
  currentSlide,
  showVideo = true,
  videoUrl = "",
}: {
  activeImages: string[];
  brand: string;
  currentSlide: number;
  showVideo?: boolean;
  videoUrl?: string;
}) {
  const [useFallbackStream, setUseFallbackStream] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const primarySrc = videoUrl && videoUrl !== '/resourses/ariwatch-editorial.mp4'
    ? videoUrl
    : `${getApiBaseUrl()}/api/storefront/video/editorial`;
  const resolvedVideo = useFallbackStream ? `${getApiBaseUrl()}/api/storefront/video/editorial` : primarySrc;
  const canPlayVideo = showVideo && !videoFailed;

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { void el.play(); setPaused(false); }
    else { el.pause(); setPaused(true); }
  };

  return (
    <div className="w-full relative aspect-[16/11] max-w-2xl mx-auto lg:mx-0" key={`collage-${currentSlide}`}>
      {/* Deep Burgundy/Maroon Horizontal Backdrop matching Screenshot 7 */}
      <div className="absolute top-[16%] left-[12%] w-[64%] h-[68%] bg-[#6e0e1e] z-0 shadow-lg" />

      {/* Top Left Sketch/Detail Frame */}
      <div className="absolute top-[2%] left-[2%] w-[36%] aspect-[16/10] bg-white p-2 shadow-md z-10">
        <img src={activeImages[2]} alt="Detail" className="w-full h-full object-cover" />
      </div>

      {/* Top Center Small Overlapping Watch Frame */}
      <div className="absolute top-[1%] left-[31%] w-[18%] aspect-[4/3] bg-white p-1.5 shadow-md z-30 -rotate-2">
        <img src={activeImages[3]} alt="Detail" className="w-full h-full object-contain" />
      </div>

      {/* Main Center Watch Image */}
      <div className="absolute top-[8%] left-[26%] w-[45%] aspect-[16/11] bg-white p-2 shadow-xl z-20">
        <img src={activeImages[0]} alt={brand} className="w-full h-full object-cover" />
      </div>

      {/* Top Right Small Frame */}
      <div className="absolute top-[8%] right-[4%] w-[21%] aspect-[4/3] bg-white p-2 shadow-md z-30 rotate-3">
        <img src={activeImages[4]} alt="Detail" className="w-full h-full object-contain" />
      </div>

      {/* Bottom Left Horizontal Strap Watch Frame */}
      <div className="absolute bottom-[4%] left-[2%] w-[24%] aspect-[16/9] bg-white p-2 shadow-md z-30 -rotate-3">
        <img src={activeImages[3]} alt="Detail" className="w-full h-full object-cover" />
      </div>

      {/* Bottom Right Wide Video Frame with II button matching Screenshot 7 */}
      <div className="absolute bottom-[4%] right-[3%] w-[42%] aspect-[16/9] bg-white p-1.5 shadow-xl z-40">
        <div className="w-full h-full overflow-hidden relative bg-black">
          {canPlayVideo ? (
            <>
              <video
                ref={videoRef}
                src={resolvedVideo}
                poster={activeImages[1]}
                autoPlay
                muted
                loop
                playsInline
                onError={() => {
                  if (!useFallbackStream && resolvedVideo !== `${getApiBaseUrl()}/api/storefront/video/editorial`) {
                    setUseFallbackStream(true);
                  } else {
                    setVideoFailed(true);
                  }
                }}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={toggleVideo}
                aria-label={paused ? "Play video" : "Pause video"}
                className="absolute bottom-2 right-2.5 z-20 text-white text-xs font-serif drop-shadow-md hover:opacity-75"
              >
                {paused ? "▶" : "II"}
              </button>
            </>
          ) : (
            <img src={activeImages[1]} alt={brand} className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
}
