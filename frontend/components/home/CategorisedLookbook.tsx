"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { getApiBaseUrl } from "../../services/api";
import { DEFAULT_STOREFRONT_CONFIG, type LookbookConfig } from "../../services/store-settings";
import { LookbookRightCol } from "./LookbookRightCol";

const PAIRED_MEDIA = [
  { wrist: "/resourses/photo-1547996160-81dfa63595aa.jpg", product: "/resourses/photo-1522312346375-d1a52e2b99b3.jpg" },
  { wrist: "/resourses/lifestyle-watch-1.jpg", product: "/resourses/hero-lange-1.jpg" },
  { wrist: "/resourses/photo-1523170335258-f5ed11844a49.jpg", product: "/resourses/hero-royal-oak.avif" },
  { wrist: "/resourses/photo-1522312346375-d1a52e2b99b3.jpg", product: "/resourses/hero-nautilus.png" },
  { wrist: "/resourses/photo-1585123334904-845d60e97b29.jpg", product: "/resourses/hero-daytona.webp" },
  { wrist: "/resourses/photo-1614164185128-e4ec99c436d7.jpg", product: "/resourses/hero-santos.png" },
];

export function CategorisedLookbook({
  lang,
  dict,
  isFa,
  config,
}: {
  lang: string;
  dict: any;
  isFa: boolean;
  config?: LookbookConfig;
}) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.lookbook;
  const [activeIdx, setActiveIdx] = useState(0);
  const [useFallbackStream, setUseFallbackStream] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!cfg.enabled) return null;

  const slides: { title: string; desc: string; query: string }[] = dict.lookbook.slides || [
    { title: "OMEGA SEAMASTER", desc: "Wrist image paired with a clean vertical product shot", query: "Omega" },
    { title: "IWC CHRONOGRAPH", desc: "Model image paired with a white-background product shot", query: "IWC" },
    { title: "ROLEX STEEL & GOLD", desc: "Wrist model image plus a clean product shot", query: "Rolex" },
    { title: "IWC SUBSECONDS", desc: "Model and watch paired in the same layout system", query: "IWC" },
    { title: "ROLEX SPORT", desc: "A matched slide with model image and product image", query: "Rolex" },
    { title: "CARTIER", desc: "Cartier uses a model image paired with a clean vertical watch shot", query: "Cartier" },
  ];

  const title = (isFa ? cfg.customTitleFa : cfg.customTitleEn) || dict.lookbook.title;
  const current = slides[activeIdx % slides.length];
  const media = PAIRED_MEDIA[activeIdx % PAIRED_MEDIA.length];
  const primarySrc = cfg.videoUrl && cfg.videoUrl !== '/resourses/ariwatch-lookbook.mp4'
    ? cfg.videoUrl
    : `${getApiBaseUrl()}/api/storefront/video/lookbook`;
  const resolvedVideo = useFallbackStream ? `${getApiBaseUrl()}/api/storefront/video/lookbook` : primarySrc;
  const canPlayVideo = cfg.showVideo && !videoFailed;

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { void el.play(); setPaused(false); }
    else { el.pause(); setPaused(true); }
  };

  return (
    <section className="bg-white py-20 w-full border-t border-gray-100">
      {cfg.showHeader && (
        <div className="text-center px-6 mb-14">
          <h2 className="text-3xl md:text-5xl font-light text-[#c8102e] mb-5 uppercase tracking-[0.14em] max-w-2xl mx-auto leading-tight">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            {dict.lookbook.subtitle}
          </p>
          {cfg.showCta && (
            <Link
              href={`/${lang}/watches`}
              className="inline-block border border-gray-300 px-10 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] hover:border-black transition-colors"
            >
              {dict.lookbook.cta}
            </Link>
          )}
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {cfg.showCategoryTabs && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {slides.map((slide, idx) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                  idx === activeIdx ? "bg-ariwatch-black text-white" : "bg-gray-100 text-gray-600 hover:text-black"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {cfg.showWristImage && (
            <div className="lg:col-span-6 relative aspect-square bg-gray-100 overflow-hidden">
              <img src={media.wrist} alt={current.title} className="w-full h-full object-cover" />
              {cfg.showBagButton && (
                <Link
                  href={`/${lang}/watches?q=${encodeURIComponent(current.query)}`}
                  aria-label={dict.lookbook.cta}
                  className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-ariwatch-black hover:scale-105 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>
              )}
            </div>
          )}

          <LookbookRightCol
            lang={lang}
            dict={dict}
            cfg={cfg}
            current={current}
            media={media}
            activeIdx={activeIdx}
            slidesCount={slides.length}
            canPlayVideo={canPlayVideo}
            resolvedVideo={resolvedVideo}
            videoRef={videoRef}
            paused={paused}
            toggleVideo={toggleVideo}
            onVideoError={() => {
              if (!useFallbackStream && resolvedVideo !== `${getApiBaseUrl()}/api/storefront/video/lookbook`) {
                setUseFallbackStream(true);
              } else {
                setVideoFailed(true);
              }
            }}
            onPrev={() => setActiveIdx(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            onNext={() => setActiveIdx(prev => (prev + 1) % slides.length)}
          />
        </div>
      </div>
    </section>
  );
}
