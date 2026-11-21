import Link from "next/link";
import { DEFAULT_STOREFRONT_CONFIG, type BuyingPathsConfig } from "../../services/store-settings";

export function BuyingPathsSection({
  lang,
  dict,
  isFa,
  config,
}: {
  lang: string;
  dict: any;
  isFa: boolean;
  config?: BuyingPathsConfig;
}) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.buyingPaths;
  if (!cfg.enabled) return null;

  const cards = [
    {
      key: "original",
      enabled: cfg.showOriginalCard,
      tag: dict.home.pathOriginal,
      badgeStyle: "bg-[#c8102e] text-white",
      sub: dict.home.pathOriginalSub,
      title: dict.home.pathOriginalTitle || dict.home.originalWatches,
      desc: dict.home.pathOriginalDesc,
      cta: dict.home.viewOriginal,
      href: `/${lang}/watches?category=original`,
      image: cfg.originalImageUrl || "/resourses/photo-1522312346375-d1a52e2b99b3.jpg",
    },
    {
      key: "highcopy",
      enabled: cfg.showHighCopyCard,
      tag: dict.home.pathHighCopy,
      badgeStyle: "bg-[#f4f1ea] text-[#1a1a1a]",
      sub: dict.home.pathHighCopySub,
      title: dict.home.pathHighCopyTitle,
      desc: dict.home.pathHighCopyDesc,
      cta: dict.home.viewHighCopy,
      href: `/${lang}/watches?category=highcopy`,
      image: cfg.highCopyImageUrl || "/resourses/photo-1614164185128-e4ec99c436d7.jpg",
    },
    {
      key: "custom",
      enabled: cfg.showCustomCard,
      tag: dict.home.pathCustom,
      badgeStyle: "bg-[#c8102e] text-white",
      sub: dict.home.pathCustomSub,
      title: dict.home.pathCustomTitle,
      desc: dict.home.pathCustomDesc,
      cta: dict.home.requestModel,
      href: `/${lang}/concierge`,
      image: cfg.customImageUrl || "/resourses/lifestyle-watch-2.jpg",
    },
  ].filter(card => card.enabled);

  if (!cards.length && !cfg.showHeader) return null;

  const title = (isFa ? cfg.customTitleFa : cfg.customTitleEn) || dict.home.chooseType;
  const subtitle = (isFa ? cfg.customSubtitleFa : cfg.customSubtitleEn) || dict.home.threePaths;
  const gridCols = cards.length === 1 ? "md:grid-cols-1" : cards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="bg-[#f8f6f2] py-20 px-6 md:px-12 border-b border-gray-200/70">
      <div className="max-w-[1440px] mx-auto">
        {cfg.showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.22em] text-[#c8102e] uppercase block mb-3">
              {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] uppercase tracking-[0.12em] leading-tight mb-4">
              {title}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {dict.home.chooseTypeDesc}
            </p>
          </div>
        )}

        {cards.length > 0 && (
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {cards.map(card => (
              <article
                key={card.key}
                className="relative aspect-[4/3.6] min-h-[380px] overflow-hidden bg-neutral-900 flex flex-col justify-between p-6 md:p-8 group"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="relative z-10 flex justify-start">
                  {cfg.showBadges && (
                    <span className={`px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase ${card.badgeStyle}`}>
                      {card.tag}
                    </span>
                  )}
                </div>

                <div className="relative z-10 text-white space-y-2.5">
                  <span className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/90">
                    {card.sub}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light tracking-[0.12em] uppercase text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/85 leading-relaxed pb-2">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-block border border-white/80 bg-black/25 hover:bg-white hover:text-black text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                  >
                    {card.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
