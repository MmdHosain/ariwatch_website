import { getDictionary } from "../dictionaries";
import { HeroSection } from "../../components/home/HeroSection";
import { BuyingPathsSection } from "../../components/home/BuyingPathsSection";
import { BrandMarquee } from "../../components/home/BrandMarquee";
import { CategorySpotlight } from "../../components/home/CategorySpotlight";
import { HighCopyShowcase } from "../../components/home/HighCopyShowcase";
import { CustomOrderBanner } from "../../components/home/CustomOrderBanner";
import { CategorisedLookbook } from "../../components/home/CategorisedLookbook";
import { EditorialSlider } from "../../components/home/EditorialSlider";
import { ShopByBrandBanner } from "../../components/home/ShopByBrandBanner";
import { BrandStoryTeaser } from "../../components/home/BrandStoryTeaser";
import { SaleOffers } from "../../components/home/SaleOffers";
import { InstagramPosts } from "../../components/home/InstagramPosts";
import { watchService } from "../../services/watch.service";
import { getStorefrontSettings } from "../../services/store-settings";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: requestedLang } = await params;
  const lang = requestedLang === "en" ? "en" : "fa";
  const dict = await getDictionary(lang);
  const [watches, settings] = await Promise.all([watchService.getAll(), getStorefrontSettings()]);
  const isFa = lang === 'fa';
  const sf = settings.storefront;

  return (
    <div className="flex flex-col w-full">
      <HeroSection lang={lang} dict={dict} isFa={isFa} heroStyle={settings.heroStyle} config={sf.hero} />
      <div className="relative z-10 bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.3)]">
        <BuyingPathsSection lang={lang} dict={dict} isFa={isFa} config={sf.buyingPaths} />
        {sf.spotlights.showSaleOffers && <SaleOffers watches={watches} lang={lang} dict={dict} />}
        <EditorialSlider lang={lang} dict={dict} isFa={isFa} config={sf.editorial} />
        <CategorisedLookbook lang={lang} dict={dict} isFa={isFa} config={sf.lookbook} />
        {sf.spotlights.showOriginalSpotlight && <CategorySpotlight lang={lang} dict={dict} isFa={isFa} config={sf.spotlights} />}
        {sf.spotlights.showHighCopyShowcase && <HighCopyShowcase lang={lang} dict={dict} isFa={isFa} config={sf.spotlights} />}
        {sf.spotlights.showCustomOrderBanner && <CustomOrderBanner lang={lang} dict={dict} isFa={isFa} />}
        {sf.spotlights.showShopByBrand && <ShopByBrandBanner lang={lang} dict={dict} />}
        {sf.spotlights.showBrandMarquee && <BrandMarquee lang={lang} dict={dict} isFa={isFa} />}
        <BrandStoryTeaser lang={lang} dict={dict} isFa={isFa} config={sf.storyGrid} />
        {sf.spotlights.showInstagram && <InstagramPosts lang={lang} />}
      </div>
    </div>
  );
}
