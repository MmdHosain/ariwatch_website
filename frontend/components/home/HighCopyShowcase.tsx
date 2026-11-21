import Link from 'next/link';
import type { SpotlightsConfig } from '../../services/store-settings';

export function HighCopyShowcase({
  lang,
  dict,
  config,
}: {
  lang: string;
  dict: any;
  isFa: boolean;
  config?: SpotlightsConfig;
}) {
  const leftImage = config?.highCopyLeftImageUrl || '/resourses/lifestyle-watch-2.jpg';
  const rightImage = config?.highCopyRightImageUrl || '/resourses/hero-santos.png';

  return (
    <section className="bg-white w-full py-16">
      {/* Top Centered Header matching Screenshot 4 */}
      <div className="pb-12 text-center px-6 flex flex-col items-center">
        <span className="text-[10px] md:text-xs font-medium tracking-[0.22em] text-gray-500 uppercase mb-3 block">
          {dict.highCopyShowcase.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-light text-[#c8102e] uppercase tracking-[0.14em] leading-tight mb-5 max-w-3xl mx-auto">
          {dict.highCopyShowcase.title}
        </h2>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-8">
          {dict.highCopyShowcase.desc}
        </p>
        <Link
          href={`/${lang}/watches?category=highcopy`}
          className="inline-block border border-gray-300 px-8 py-3.5 text-[10px] md:text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase hover:border-black transition-colors"
        >
          {dict.highCopyShowcase.cta}
        </Link>
      </div>

      {/* Bottom Asymmetric 2-Column Packshot Grid matching Screenshot 4 */}
      <div className="flex flex-col md:flex-row gap-6 max-w-[1280px] mx-auto px-6 items-stretch">
        <div className="w-full md:w-[64%] bg-[#f6f6f6] min-h-[380px] md:min-h-[440px] flex items-center justify-center p-8 overflow-hidden">
          <img
            src={leftImage}
            alt={dict.highCopyShowcase.title}
            loading="lazy"
            className="w-full h-full max-h-[360px] object-contain"
          />
        </div>
        <div className="w-full md:w-[36%] bg-[#fafafa] min-h-[380px] md:min-h-[440px] flex items-center justify-center p-8 overflow-hidden">
          <img
            src={rightImage}
            alt={dict.highCopyShowcase.badge}
            loading="lazy"
            className="w-full h-full max-h-[360px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
