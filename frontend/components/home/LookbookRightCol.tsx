import Link from "next/link";
import { type RefObject } from "react";
import type { LookbookConfig } from "../../services/store-settings";

export function LookbookRightCol({
  lang,
  dict,
  cfg,
  current,
  media,
  activeIdx,
  slidesCount,
  canPlayVideo,
  resolvedVideo,
  videoRef,
  paused,
  toggleVideo,
  onVideoError,
  onPrev,
  onNext,
}: {
  lang: string;
  dict: any;
  cfg: LookbookConfig;
  current: { title: string; desc: string; query: string };
  media: { wrist: string; product: string };
  activeIdx: number;
  slidesCount: number;
  canPlayVideo: boolean;
  resolvedVideo: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  paused: boolean;
  toggleVideo: () => void;
  onVideoError: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={cfg.showWristImage ? "lg:col-span-6 flex flex-col" : "lg:col-span-12 flex flex-col"}>
      <div className="relative w-full aspect-[16/8.2] bg-[#f2f2f2] overflow-hidden">
        {canPlayVideo ? (
          <>
            <video
              ref={videoRef}
              src={resolvedVideo}
              poster="/resourses/lifestyle-watch-1.jpg"
              autoPlay
              muted
              loop
              playsInline
              onError={onVideoError}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={paused ? "Play video" : "Pause video"}
              className="absolute bottom-3 right-4 z-10 text-white text-sm font-serif drop-shadow-md hover:opacity-75"
            >
              {paused ? "▶" : "II"}
            </button>
          </>
        ) : (
          <img src="/resourses/lifestyle-watch-1.jpg" alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex items-center justify-end gap-1.5 py-2.5" dir="ltr">
        <span className="text-[11px] text-gray-500 me-3">{activeIdx + 1} / {slidesCount}</span>
        <button
          type="button"
          onClick={onPrev}
          className="w-8 h-8 bg-[#f4f4f4] hover:bg-gray-200 flex items-center justify-center text-xs"
          aria-label="Previous watch"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-8 h-8 bg-[#f4f4f4] hover:bg-gray-200 flex items-center justify-center text-xs"
          aria-label="Next watch"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
        {cfg.showProductImage && (
          <div className="sm:col-span-5 aspect-[4/3.6] bg-[#f7f7f7] overflow-hidden flex items-center justify-center">
            <img src={media.product} alt={current.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className={cfg.showProductImage ? "sm:col-span-7 space-y-3" : "sm:col-span-12 space-y-3"}>
          <h3 className="text-xs md:text-sm font-bold tracking-[0.14em] text-[#1a1a1a] uppercase">
            {current.title}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
            {current.desc}
          </p>
          {cfg.showDetailsLink && (
            <Link
              href={`/${lang}/watches?q=${encodeURIComponent(current.query)}`}
              className="inline-block pt-2 text-xs text-[#1a1a1a] border-b border-gray-300 pb-0.5 hover:text-[#c8102e] hover:border-[#c8102e] transition-colors"
            >
              {dict.lookbook.details}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
