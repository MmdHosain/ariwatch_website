"use client";

import { useState } from 'react';
import Link from 'next/link';
import { DEFAULT_STOREFRONT_CONFIG, type StoryGridConfig } from '../../services/store-settings';

export function BrandStoryTeaser({
  lang,
  dict,
  isFa,
  config,
}: {
  lang: string;
  dict: any;
  isFa: boolean;
  config?: StoryGridConfig;
}) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.storyGrid;
  const [videoFailed, setVideoFailed] = useState(false);
  if (!cfg.enabled) return null;

  const cards = [
    {
      num: 1,
      enabled: cfg.showArashKhandan,
      href: `/${lang}/story/arash-khandan`,
      image: cfg.arashImageUrl || '/resourses/photo-1524592094714-0f0654e20314.jpg',
      kind: 'photo' as const,
    },
    {
      num: 2,
      enabled: cfg.showMelina,
      href: `/${lang}/story/melina`,
      image: cfg.melinaImageUrl || '/resourses/lifestyle-watch-3.jpg',
      kind: 'melina' as const,
    },
    {
      num: 3,
      enabled: cfg.showCompany,
      href: `/${lang}/story/company`,
      image: '/resourses/photo-1547996160-81dfa63595aa.jpg',
      kind: 'company-logo' as const,
    },
    {
      num: 4,
      enabled: cfg.showBehindTheScenes,
      href: `/${lang}/story/behind-the-scenes`,
      image: cfg.behindScenesImageUrl || '/resourses/photo-1522312346375-d1a52e2b99b3.jpg',
      kind: 'video-or-photo' as const,
    },
  ].filter(c => c.enabled);

  if (!cards.length && !cfg.showHeader) return null;
  const title = (isFa ? cfg.customTitleFa : cfg.customTitleEn) || (
    cfg.showShopByBrandHeader ? dict.home.shopByBrand : dict.storyTeaser.title
  );
  const canPlayVideo = cfg.showVideo && Boolean(cfg.videoUrl) && !videoFailed;

  return (
    <section className="bg-white py-20 w-full border-t border-gray-100">
      {cfg.showHeader && (
        <div className="text-center px-6 mb-14">
          <h2 className="text-3xl md:text-5xl font-light text-[#c8102e] uppercase tracking-[0.14em] mb-4">
            {title}
          </h2>
          <div className="inline-block border-b border-gray-300 pb-2">
            <Link href={`/${lang}/watches?category=original`} className="text-[10px] md:text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase hover:text-[#c8102e]">
              {dict.header?.mega?.originalBrands || 'ORIGINAL BRANDS'}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/${lang}/watches?category=highcopy`} className="text-[10px] md:text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase hover:text-[#c8102e]">
              {dict.header?.mega?.highCopyBrands || 'HIGH COPY BRANDS'}
            </Link>
          </div>
        </div>
      )}

      {cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1280px] mx-auto px-6 mb-12">
          {cards.map(({ num, href, image, kind }) => (
            <Link key={num} href={href} className="flex flex-col group">
              <div className="w-full aspect-square bg-[#fafafa] mb-5 overflow-hidden flex items-center justify-center relative border border-gray-100">
                {kind === 'company-logo' ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center select-none" dir="ltr">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#1e2952] flex items-center justify-center mb-3">
                      <span className="font-serif text-5xl text-[#e5b822]">A</span>
                    </div>
                    <span className="font-serif text-lg tracking-wider text-[#1a1a1a] lowercase">arash ariya rad</span>
                    <span className="text-[10px] text-[#c8102e] tracking-widest mt-1">{cfg.companyWebsite || 'www.arichem.ir'}</span>
                  </div>
                ) : kind === 'video-or-photo' && canPlayVideo ? (
                  <video
                    src={cfg.videoUrl}
                    poster={image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img src={image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {kind === 'melina' && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-serif tracking-[0.25em] text-white/90 uppercase drop-shadow-sm">
                        ARI WATCH
                      </span>
                    )}
                  </>
                )}
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#c8102e] uppercase mb-2.5">
                {dict.storyTeaser[`card${num}Tag`]}
              </span>
              <h3 className="text-xs md:text-sm font-normal tracking-[0.08em] text-[#c8102e] uppercase mb-2.5 leading-snug group-hover:underline">
                {dict.storyTeaser[`card${num}Title`]}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {dict.storyTeaser[`card${num}Desc`]}
              </p>
            </Link>
          ))}
        </div>
      )}

      {cfg.showCta && (
        <div className="text-center">
          <Link href={`/${lang}/story`} className="inline-block border border-ariwatch-black px-10 py-4 text-[10px] md:text-xs font-bold tracking-widest text-ariwatch-black uppercase hover:bg-black hover:text-white transition-all">
            {dict.storyTeaser.cta}
          </Link>
        </div>
      )}
    </section>
  );
}
