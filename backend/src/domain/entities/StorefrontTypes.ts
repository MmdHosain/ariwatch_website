export const HERO_STYLES = ['watch-photos', 'classic-clock', 'ariwatch'] as const;
export type HeroStyle = typeof HERO_STYLES[number];
export const LOOKBOOK_STYLES = ['paired-carousel', 'classic-grid'] as const;
export type LookbookStyle = typeof LOOKBOOK_STYLES[number];
export const EDITORIAL_BRANDS = ['cartier', 'rolex', 'omega', 'patek', 'swatch'] as const;
export type EditorialBrandKey = typeof EDITORIAL_BRANDS[number];

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
