import Link from "next/link";

export function ShopByBrandBanner({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="bg-[#fcfbf9] py-14 px-6 border-t border-gray-200 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl md:text-4xl text-ariwatch-black uppercase tracking-widest mb-3">
          {dict.home.shopByBrand}
        </h2>
        <p className="text-xs font-bold tracking-[0.25em] text-ariwatch-gray uppercase mb-8">
          {dict.home.brandSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${lang}/watches?category=original`}
            className="border border-ariwatch-black bg-white px-7 py-3 text-xs font-bold tracking-widest uppercase hover:bg-ariwatch-black hover:text-white transition-colors"
          >
            {dict.header?.mega?.originalBrands || "ORIGINAL BRANDS"}
          </Link>
          <Link
            href={`/${lang}/watches?category=highcopy`}
            className="border border-ariwatch-black bg-white px-7 py-3 text-xs font-bold tracking-widest uppercase hover:bg-ariwatch-black hover:text-white transition-colors"
          >
            {dict.header?.mega?.highCopyBrands || "HIGH COPY BRANDS"}
          </Link>
        </div>
      </div>
    </section>
  );
}
