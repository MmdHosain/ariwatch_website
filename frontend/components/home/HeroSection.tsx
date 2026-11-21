"use client";

import { HERO_SLIDES } from "./hero/hero.data";
import { HeroText, type HeroCopy } from "./hero/HeroText";
import { HeroVisual } from "./hero/HeroVisual";
import { HeroIndicators } from "./hero/HeroIndicators";
import { useHeroCarousel } from "./hero/useHeroCarousel";
import { CLASSIC_HERO_SLIDES } from "./hero/classic.data";
import { ClassicHeroText } from "./hero/ClassicHeroText";
import { ClassicHeroVisual } from "./hero/ClassicHeroVisual";
import { AriWatchHero } from "./hero/AriWatchHero";
import { DEFAULT_STOREFRONT_CONFIG, type HeroConfig, type HeroStyle } from "../../services/store-settings";

interface HeroSectionProps {
  lang: "en" | "fa";
  dict: { home: HeroCopy & Record<string, any> };
  isFa: boolean;
  heroStyle?: HeroStyle;
  config?: HeroConfig;
}

export function HeroSection({ lang, dict, isFa, heroStyle = "watch-photos", config }: HeroSectionProps) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.hero;
  const classic = heroStyle === "classic-clock";
  const slides = classic ? CLASSIC_HERO_SLIDES : HERO_SLIDES;
  const carousel = useHeroCarousel(slides);

  if (!cfg.enabled) return null;
  if (heroStyle === "ariwatch") {
    return <AriWatchHero lang={lang} dict={dict} isFa={isFa} config={cfg} />;
  }

  return (
    <section
      id="featured-watches"
      className={classic
        ? "relative flex h-[100dvh] min-h-[700px] w-full flex-col overflow-hidden bg-ariwatch-luxury pb-16 pt-16 md:flex-row md:pb-0 md:pt-20"
        : "relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-ariwatch-luxury px-6 pb-24 pt-28 md:px-12 md:pb-7 md:pt-32 lg:px-20"}
      aria-label={isFa ? "ساعت‌های منتخب" : "Featured watches"}
      aria-roledescription={isFa ? "اسلایدشو" : "carousel"}
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onFocusCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) carousel.pause();
      }}
    >
      {classic ? <>
        <ClassicHeroText lang={lang} copy={dict.home} isFa={isFa} config={cfg} />
        <ClassicHeroVisual activeSlide={CLASSIC_HERO_SLIDES[carousel.currentSlide]}
          currentSlide={carousel.currentSlide} totalSlides={slides.length} isFa={isFa} paused={carousel.isPaused} />
      </> : <div className="mx-auto grid w-full max-w-[1400px] items-center gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-8 lg:gap-16">
        <HeroText lang={lang} copy={dict.home} isFa={isFa} config={cfg} />
        <HeroVisual
          activeSlide={HERO_SLIDES[carousel.currentSlide]}
          currentSlide={carousel.currentSlide}
          totalSlides={HERO_SLIDES.length}
          isFa={isFa}
          paused={carousel.isPaused}
        />
      </div>}
      {cfg.showIndicators && (
        <HeroIndicators
          slides={slides}
          currentSlide={carousel.currentSlide}
          onSelectSlide={carousel.selectSlide}
          paused={carousel.paused}
          onSetPaused={carousel.setPaused}
          isFa={isFa}
          classic={classic}
        />
      )}
    </section>
  );
}
