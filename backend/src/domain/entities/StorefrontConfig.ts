import {
  EDITORIAL_BRANDS,
  type EditorialBrandKey,
  type StorefrontConfig,
} from './StorefrontTypes';

export * from './StorefrontTypes';

export const DEFAULT_STOREFRONT_CONFIG: StorefrontConfig = {
  header: {
    enabled: true, showWhatsapp: true, showSearch: true, showAccount: true, showCart: true,
    showLanguageToggle: true, showMegaMenu: true, showWatchesMenu: true, showOriginalMenu: true,
    showHighCopyMenu: true, showCustomOrderMenu: true, showBrandsMenu: true, showBuyingGuideMenu: true,
    showJournalMenu: true, whatsappNumber: '+989123456789', whatsappUrl: 'https://wa.me/989123456789',
  },
  hero: {
    enabled: true, showVideo: true, videoUrl: '/resourses/ariwatch-hero.mp4',
    showSlide1: true, showSlide2: true, showPrimaryCta: true, showSecondaryCta: true,
    showIndicators: true, customBadgeEn: '', customBadgeFa: '', customHeadlineEn: '',
    customHeadlineFa: '', customSubheadlineEn: '', customSubheadlineFa: '',
  },
  buyingPaths: {
    enabled: true, showHeader: true, showBadges: true, showOriginalCard: true, showHighCopyCard: true, showCustomCard: true,
    originalImageUrl: '/resourses/photo-1522312346375-d1a52e2b99b3.jpg',
    highCopyImageUrl: '/resourses/photo-1614164185128-e4ec99c436d7.jpg',
    customImageUrl: '/resourses/lifestyle-watch-2.jpg',
    customTitleEn: '', customTitleFa: '', customSubtitleEn: '', customSubtitleFa: '',
  },
  editorial: {
    enabled: true, showVideo: true, videoUrl: '/resourses/ariwatch-editorial.mp4',
    showHeader: true, showCollage: true, showControls: true, showProgressBar: true, showDiscoverLink: true,
    enabledBrands: ['cartier', 'rolex', 'omega', 'patek', 'swatch'], customTitleEn: '', customTitleFa: '',
  },
  lookbook: {
    enabled: true, style: 'paired-carousel', showVideo: true, videoUrl: '/resourses/ariwatch-lookbook.mp4',
    showHeader: true, showCta: true, showCategoryTabs: false,
    showWristImage: true, showBagButton: true, showProductImage: true, showDetailsLink: true, customTitleEn: '', customTitleFa: '',
  },
  spotlights: {
    showSaleOffers: true, showBrandMarquee: false, showOriginalSpotlight: true, showOriginalBagButton: true,
    originalImageUrl: '/resourses/photo-1612817159949-195b6eb9e31a.jpg',
    showHighCopyShowcase: true,
    highCopyLeftImageUrl: '/resourses/lifestyle-watch-2.jpg',
    highCopyRightImageUrl: '/resourses/hero-santos.png',
    showCustomOrderBanner: false, showShopByBrand: false, showInstagram: true, showFloatingConcierge: true,
  },
  storyGrid: {
    enabled: true, showShopByBrandHeader: true, showVideo: false, videoUrl: '/resourses/ariwatch-story.mp4',
    showHeader: true, showCta: false, showArashKhandan: true, showMelina: true,
    showCompany: true, showBehindTheScenes: true,
    arashImageUrl: '/resourses/photo-1524592094714-0f0654e20314.jpg',
    melinaImageUrl: '/resourses/lifestyle-watch-3.jpg',
    behindScenesImageUrl: '/resourses/photo-1522312346375-d1a52e2b99b3.jpg',
    companyWebsite: 'www.arichem.ir',
    customTitleEn: '', customTitleFa: '',
  },
  footer: {
    enabled: true, showNewsletter: true, showSocials: true, showInstagram: true, showWhatsapp: true,
    showTelegram: true, showBale: true, showRubika: true, showCollectionCol: true, showFindCol: true,
    showSupportCol: true, showWorldCol: true, showMoreCol: true, showLegalLinks: true, showCopyright: true,
    instagramUrl: 'https://instagram.com/ariwatch', telegramUrl: 'https://t.me/ariwatch',
    baleUrl: 'https://ble.ir/ariwatch', rubikaUrl: 'https://rubika.ir/ariwatch',
    customCopyrightEn: '', customCopyrightFa: '',
  },
};

export function mergeStorefrontConfig(raw: unknown): StorefrontConfig {
  const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, any>) : {};
  return {
    header: { ...DEFAULT_STOREFRONT_CONFIG.header, ...(source.header || {}) },
    hero: { ...DEFAULT_STOREFRONT_CONFIG.hero, ...(source.hero || {}) },
    buyingPaths: { ...DEFAULT_STOREFRONT_CONFIG.buyingPaths, ...(source.buyingPaths || {}) },
    editorial: {
      ...DEFAULT_STOREFRONT_CONFIG.editorial,
      ...(source.editorial || {}),
      enabledBrands: Array.isArray(source.editorial?.enabledBrands)
        ? source.editorial.enabledBrands.filter((b: unknown): b is EditorialBrandKey => EDITORIAL_BRANDS.includes(b as EditorialBrandKey))
        : DEFAULT_STOREFRONT_CONFIG.editorial.enabledBrands,
    },
    lookbook: { ...DEFAULT_STOREFRONT_CONFIG.lookbook, ...(source.lookbook || {}) },
    spotlights: { ...DEFAULT_STOREFRONT_CONFIG.spotlights, ...(source.spotlights || {}) },
    storyGrid: { ...DEFAULT_STOREFRONT_CONFIG.storyGrid, ...(source.storyGrid || {}) },
    footer: { ...DEFAULT_STOREFRONT_CONFIG.footer, ...(source.footer || {}) },
  };
}
