import type { HeroStyle, StorefrontConfig } from './StorefrontConfig';

export * from './StorefrontConfig';

export interface StoreSettings {
  shippingCost: number;
  heroStyle: HeroStyle;
  storefront: StorefrontConfig;
}
