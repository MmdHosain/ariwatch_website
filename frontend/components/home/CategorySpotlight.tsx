import Link from 'next/link';
import type { SpotlightsConfig } from '../../services/store-settings';

export function CategorySpotlight({
  lang,
  dict,
  config,
}: {
  lang: string;
  dict: any;
  isFa: boolean;
  config?: SpotlightsConfig;
}) {
  const imageUrl = config?.originalImageUrl || '/resourses/photo-1612817159949-195b6eb9e31a.jpg';
  const showBag = config?.showOriginalBagButton ?? true;

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Square Packshot Card with Shopping Bag Button matching Screenshot 5 */}
        <div className="relative aspect-square bg-[#f6f6f6] flex items-center justify-center p-10 overflow-hidden">
          <img
            src={imageUrl}
            alt={dict.categorySpotlight.title}
            loading="lazy"
            className="w-full h-full object-contain"
          />
          {showBag && (
            <Link
              href={`/${lang}/watches?category=original`}
              aria-label={dict.categorySpotlight.cta}
              className="absolute bottom-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-10"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          )}
        </div>

        {/* Right Text Block matching Screenshot 5 */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl font-light text-[#c8102e] uppercase tracking-[0.14em] leading-tight mb-6">
            {dict.categorySpotlight.title}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-8 max-w-md">
            {dict.categorySpotlight.desc}
          </p>
          <Link
            href={`/${lang}/watches?category=original`}
            className="inline-block border border-gray-300 px-8 py-3.5 text-[10px] md:text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase hover:border-black transition-colors"
          >
            {dict.categorySpotlight.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
