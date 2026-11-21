import Link from "next/link";

export function EditorialText({
  activeSlide,
  discoverText,
  currentSlide,
  lang,
}: {
  activeSlide: any;
  isFa: boolean;
  discoverText: string;
  currentSlide: number;
  lang: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center" key={`text-${currentSlide}`}>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#c8102e] mb-3 uppercase tracking-[0.14em]">
        {activeSlide.brand}
      </h3>
      <h4 className="text-xs md:text-sm font-medium tracking-[0.18em] text-[#1a1a1a] mb-6 uppercase">
        {activeSlide.title}
      </h4>
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-7 max-w-md">
        {activeSlide.desc}
      </p>
      {discoverText && (
        <Link
          href={`/${lang}/watches`}
          className="text-xs font-bold text-[#1a1a1a] border-b border-gray-400 pb-1 self-start hover:text-[#c8102e] hover:border-[#c8102e] transition-colors"
        >
          {discoverText}
        </Link>
      )}
    </div>
  );
}
