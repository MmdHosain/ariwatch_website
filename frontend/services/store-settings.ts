import { apiRequest } from './api';
import {
  DEFAULT_STOREFRONT_CONFIG,
  mergeStorefrontConfig,
  type HeroStyle,
  type StorefrontConfig,
  type StorefrontSettings,
} from '../types/storefront';

export * from '../types/storefront';

export async function getStorefrontSettings(): Promise<StorefrontSettings> {
  try {
    const settings = await apiRequest<{ heroStyle?: HeroStyle; storefront?: Partial<StorefrontConfig> }>('/api/storefront/settings');
    const heroStyle: HeroStyle = settings.heroStyle === 'classic-clock' || settings.heroStyle === 'watch-photos' ? settings.heroStyle : 'ariwatch';
    return { heroStyle, storefront: mergeStorefrontConfig(settings.storefront) };
  } catch {
    return { heroStyle: 'ariwatch', storefront: DEFAULT_STOREFRONT_CONFIG };
  }
}
