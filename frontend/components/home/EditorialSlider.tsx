"use client";

import { useState } from "react";
import { EDITORIAL_IMAGES } from "./editorial/editorial.data";
import { EditorialCollage } from "./editorial/EditorialCollage";
import { EditorialText } from "./editorial/EditorialText";
import { EditorialControls } from "./editorial/EditorialControls";
import { DEFAULT_STOREFRONT_CONFIG, type EditorialBrandKey, type EditorialConfig } from "../../services/store-settings";

interface EditorialSliderProps {
  lang: 'en' | 'fa';
  dict: any;
  isFa: boolean;
  config?: EditorialConfig;
}

const BRAND_KEYS: EditorialBrandKey[] = ['cartier', 'rolex', 'omega', 'patek', 'swatch'];

export function EditorialSlider({ lang, dict, isFa, config }: EditorialSliderProps) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.editorial;
  const [currentSlide, setCurrentSlide] = useState(0);
  if (!cfg.enabled) return null;

  const allSlides = (dict.editorial.slides as any[]).map((slide, idx) => ({
    ...slide,
    key: slide.key || BRAND_KEYS[idx] || 'cartier',
    images: EDITORIAL_IMAGES[idx] || EDITORIAL_IMAGES[0],
  }));

  const filtered = allSlides.filter(s => cfg.enabledBrands.includes(s.key));
  if (!filtered.length) return null;

  const totalSlides = filtered.length;
  const safeIndex = currentSlide % totalSlides;
  const activeSlide = filtered[safeIndex];
  const title = (isFa ? cfg.customTitleFa : cfg.customTitleEn) || dict.editorial.title;

  const handlePrev = () => setCurrentSlide(prev => (prev % totalSlides === 0 ? totalSlides - 1 : (prev % totalSlides) - 1));
  const handleNext = () => setCurrentSlide(prev => ((prev % totalSlides) + 1) % totalSlides);

  return (
    <section className="relative py-20 md:py-24 bg-dotted overflow-hidden border-t border-gray-200">
      {cfg.showHeader && (
        <div className="text-center mb-14 md:mb-16 px-6 relative z-10">
          <span className="inline-block text-[10px] md:text-xs font-medium tracking-[0.25em] text-[#c8102e] uppercase mb-3">
            {dict.editorial.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.14em] text-[#1a1a1a] uppercase">
            {title}
          </h2>
        </div>
      )}

      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 ${cfg.showCollage ? 'lg:grid-cols-12' : ''} gap-12 items-center relative z-10`}>
        {cfg.showCollage && (
          <div className="lg:col-span-7">
            <EditorialCollage
              activeImages={activeSlide.images}
              brand={activeSlide.brand}
              currentSlide={safeIndex}
              showVideo={cfg.showVideo}
              videoUrl={cfg.videoUrl}
            />
          </div>
        )}
        <div className={cfg.showCollage ? "lg:col-span-5" : ""}>
          <EditorialText
            activeSlide={activeSlide}
            isFa={isFa}
            discoverText={cfg.showDiscoverLink ? dict.editorial.discover : ''}
            currentSlide={safeIndex}
            lang={lang}
          />
        </div>
      </div>

      {cfg.showControls && totalSlides > 1 && (
        <EditorialControls
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentSlide={safeIndex}
          totalSlides={totalSlides}
          isFa={isFa}
          showProgressBar={cfg.showProgressBar}
        />
      )}
    </section>
  );
}
