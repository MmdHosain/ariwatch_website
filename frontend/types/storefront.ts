export type HeroStyle = 'watch-photos' | 'classic-clock' | 'ariwatch';
export type LookbookStyle = 'paired-carousel' | 'classic-grid';
export type EditorialBrandKey = 'cartier' | 'rolex' | 'omega' | 'patek' | 'swatch';

export interface HeaderConfig {
  enabled: boolean;
  showWhatsapp: boolean;
  showSearch: boolean;
  showAccount: boolean;
  showCart: boolean;
  showLanguageToggle: boolean;
  showMegaMenu: boolean;
  showWatchesMenu: boolean;
  showOriginalMenu: boolean;
  showHighCopyMenu: boolean;
  showCustomOrderMenu: boolean;
  showBrandsMenu: boolean;
  showBuyingGuideMenu: boolean;
  showJournalMenu: boolean;
  whatsappNumber: string;
  whatsappUrl: string;
}

export interface HeroConfig {
  enabled: boolean;
  showVideo: boolean;
  videoUrl: string;
  showSlide1: boolean;
  showSlide2: boolean;
  showPrimaryCta: boolean;
  showSecondaryCta: boolean;
  showIndicators: boolean;
  customBadgeEn: string;
  customBadgeFa: string;
  customHeadlineEn: string;
  customHeadlineFa: string;
  customSubheadlineEn: string;
  customSubheadlineFa: string;
}

export interface BuyingPathsConfig {
  enabled: boolean;
  showHeader: boolean;
  showBadges: boolean;
  showOriginalCard: boolean;
  showHighCopyCard: boolean;
  showCustomCard: boolean;
  originalImageUrl: string;
  highCopyImageUrl: string;
  customImageUrl: string;
  customTitleEn: string;
  customTitleFa: string;
  customSubtitleEn: string;
  customSubtitleFa: string;
}

export interface EditorialConfig {
  enabled: boolean;
  showVideo: boolean;
  videoUrl: string;
  showHeader: boolean;
  showCollage: boolean;
  showControls: boolean;
  showProgressBar: boolean;
  showDiscoverLink: boolean;
  enabledBrands: EditorialBrandKey[];
  customTitleEn: string;
  customTitleFa: string;
}

export interface LookbookConfig {
  enabled: boolean;
  style: LookbookStyle;
  showVideo: boolean;
  videoUrl: string;
  showHeader: boolean;
  showCta: boolean;
  showCategoryTabs: boolean;
  showWristImage: boolean;
  showBagButton: boolean;
  showProductImage: boolean;
  showDetailsLink: boolean;
  customTitleEn: string;
  customTitleFa: string;
}

export interface SpotlightsConfig {
  showSaleOffers: boolean;
  showBrandMarquee: boolean;
  showOriginalSpotlight: boolean;
  showOriginalBagButton: boolean;
  originalImageUrl: string;
  showHighCopyShowcase: boolean;
  highCopyLeftImageUrl: string;
  highCopyRightImageUrl: string;
  showCustomOrderBanner: boolean;
  showShopByBrand: boolean;
  showInstagram: boolean;
  showFloatingConcierge: boolean;
}

export interface StoryGridConfig {
  enabled: boolean;
  showShopByBrandHeader: boolean;
  showVideo: boolean;
  videoUrl: string;
  showHeader: boolean;
  showCta: boolean;
  showArashKhandan: boolean;
  showMelina: boolean;
  showCompany: boolean;
  showBehindTheScenes: boolean;
  arashImageUrl: string;
  melinaImageUrl: string;
  behindScenesImageUrl: string;
  companyWebsite: string;
  customTitleEn: string;
  customTitleFa: string;
}

export interface FooterConfig {
  enabled: boolean;
  showNewsletter: boolean;
  showSocials: boolean;
  showInstagram: boolean;
  showWhatsapp: boolean;
  showTelegram: boolean;
  showBale: boolean;
  showRubika: boolean;
  showCollectionCol: boolean;
  showFindCol: boolean;
  showSupportCol: boolean;
  showWorldCol: boolean;
  showMoreCol: boolean;
  showLegalLinks: boolean;
  showCopyright: boolean;
  instagramUrl: string;
  telegramUrl: string;
  baleUrl: string;
  rubikaUrl: string;
  customCopyrightEn: string;
  customCopyrightFa: string;
}

export interface StorefrontConfig {
  header: HeaderConfig;
  hero: HeroConfig;
  buyingPaths: BuyingPathsConfig;
  editorial: EditorialConfig;
  lookbook: LookbookConfig;
  spotlights: SpotlightsConfig;
  storyGrid: StoryGridConfig;
  footer: FooterConfig;
}

export interface StorefrontSettings {
  heroStyle: HeroStyle;
  storefront: StorefrontConfig;
}

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

export function mergeStorefrontConfig(raw?: Partial<StorefrontConfig> | null): StorefrontConfig {
  const s = raw && typeof raw === 'object' ? raw : {};
  return {
    header: { ...DEFAULT_STOREFRONT_CONFIG.header, ...(s.header || {}) },
    hero: { ...DEFAULT_STOREFRONT_CONFIG.hero, ...(s.hero || {}) },
    buyingPaths: { ...DEFAULT_STOREFRONT_CONFIG.buyingPaths, ...(s.buyingPaths || {}) },
    editorial: {
      ...DEFAULT_STOREFRONT_CONFIG.editorial,
      ...(s.editorial || {}),
      enabledBrands: Array.isArray(s.editorial?.enabledBrands) ? s.editorial.enabledBrands : DEFAULT_STOREFRONT_CONFIG.editorial.enabledBrands,
    },
    lookbook: { ...DEFAULT_STOREFRONT_CONFIG.lookbook, ...(s.lookbook || {}) },
    spotlights: { ...DEFAULT_STOREFRONT_CONFIG.spotlights, ...(s.spotlights || {}) },
    storyGrid: { ...DEFAULT_STOREFRONT_CONFIG.storyGrid, ...(s.storyGrid || {}) },
    footer: { ...DEFAULT_STOREFRONT_CONFIG.footer, ...(s.footer || {}) },
  };
}
