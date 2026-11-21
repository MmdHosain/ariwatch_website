"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HeroConfig } from "../../../services/store-settings";
import { HeroVideoBackground } from "./HeroVideoBackground";

export function AriWatchHero({
  lang,
  dict,
  isFa,
  config,
}: {
  lang: "en" | "fa";
  dict: any;
  isFa: boolean;
  config: HeroConfig;
}) {
  const ah = dict.home.ariwatchHero || {};
  const customBadge = isFa ? config.customBadgeFa : config.customBadgeEn;
  const customTitle = isFa ? config.customHeadlineFa : config.customHeadlineEn;
  const customSub = isFa ? config.customSubheadlineFa : config.customSubheadlineEn;

  const rawSlides = [
    {
      id: 1,
      enabled: config.showSlide1,
      badge: customBadge || ah.slide1Badge || "TIMEPIECES WITH CLEAR PRODUCT TYPE",
      title: customTitle || ah.slide1Title || "ARIWATCH",
      subtitle: customSub || ah.slide1Subtitle || "ORIGINAL & HIGH COPY WATCHES CLEARLY SEPARATED",
      cta1Label: ah.slide1Cta1 || "VIEW WATCHES",
      cta1Href: `/${lang}/watches`,
      cta2Label: ah.slide1Cta2 || "CUSTOM ORDER",
      cta2Href: `/${lang}/concierge`,
    },
    {
      id: 2,
      enabled: config.showSlide2,
      badge: ah.slide2Badge || "SELECTED WATCHES & CUSTOM REQUESTS",
      title: ah.slide2Title || "CHOOSE WITH CLARITY",
      subtitle: ah.slide2Subtitle || "PRODUCT TYPE, PRICE & AVAILABILITY CONFIRMED BEFORE ORDERING",
      cta1Label: ah.slide2Cta1 || "EXPLORE OPTIONS",
      cta1Href: `/${lang}/watches`,
      cta2Label: ah.slide2Cta2 || "REQUEST A MODEL",
      cta2Href: `/${lang}/concierge`,
    },
  ].filter(s => s.enabled);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || rawSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex(prev => (prev + 1) % rawSlides.length);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [paused, rawSlides.length]);

  if (!rawSlides.length) return null;
  const active = rawSlides[index % rawSlides.length];
  const activeSlideIndex = index % rawSlides.length;

  const togglePlay = () => setPaused(prev => !prev);
  const handleVideoEnded = () => {
    if (!paused && rawSlides.length > 1) {
      setIndex(prev => (prev + 1) % rawSlides.length);
    }
  };

  return (
    <section
      id="featured-watches"
      className="sticky top-0 z-0 h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#09090a] flex flex-col justify-end select-none"
      dir={isFa ? "rtl" : "ltr"}
    >
      <HeroVideoBackground
        activeSlideIndex={activeSlideIndex}
        showVideo={config.showVideo}
        paused={paused}
        onVideoEnded={handleVideoEnded}
        customVideoUrl={config.videoUrl}
      />

      {config.showIndicators && rawSlides.length > 1 && (
        <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2" dir="ltr">
          {rawSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`w-[2px] h-9 transition-all ${
                idx === activeSlideIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-20 md:pb-24 text-center flex flex-col items-center">
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.22em] text-white/95 uppercase mb-3 drop-shadow-xs">
          {active.badge}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.14em] text-[#f4f1ea] uppercase leading-[1.08] mb-5 drop-shadow-sm">
          {active.title}
        </h1>
        <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] text-white uppercase max-w-md leading-relaxed mb-8 drop-shadow-xs">
          {active.subtitle}
        </p>

        {(config.showPrimaryCta || config.showSecondaryCta) && (
          <div className="w-full max-w-md flex flex-col gap-3">
            {config.showPrimaryCta && (
              <Link
                href={active.cta1Href}
                className="w-full bg-[#c8102e] hover:bg-[#a80d26] text-white py-4 px-6 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors text-center shadow-lg"
              >
                {active.cta1Label}
              </Link>
            )}
            {config.showSecondaryCta && (
              <Link
                href={active.cta2Href}
                className="w-full border border-white/85 bg-black/35 hover:bg-white hover:text-black text-white py-4 px-6 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors text-center backdrop-blur-[2px]"
              >
                {active.cta2Label}
              </Link>
            )}
          </div>
        )}
      </div>

      {config.showIndicators && (
        <div className="relative z-20 w-full px-6 pb-6 flex items-center justify-center" dir="ltr">
          {rawSlides.length > 1 && (
            <div className="flex items-center gap-2.5">
              {rawSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={`Select slide ${idx + 1}`}
                  className={`h-[2px] transition-all ${
                    idx === activeSlideIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="absolute right-5 md:right-8 bottom-5 text-white font-serif text-base tracking-tighter hover:opacity-75 transition-opacity"
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      )}
    </section>
  );
}
