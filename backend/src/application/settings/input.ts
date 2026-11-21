import {
  DEFAULT_STOREFRONT_CONFIG, EDITORIAL_BRANDS, HERO_STYLES, LOOKBOOK_STYLES, StorefrontConfig, StoreSettings,
} from '../../domain/entities/StoreSettings';
import { HttpError } from '../errors';
import { object } from '../validation';
import { money } from '../commerce/discounts';

export type PartialStorefrontConfig = { [K in keyof StorefrontConfig]?: Partial<StorefrontConfig[K]> };
export interface StoreSettingsUpdate {
  shippingCost?: number;
  heroStyle?: StoreSettings['heroStyle'];
  storefront?: PartialStorefrontConfig;
}

function validateSection(sectionKey: keyof StorefrontConfig, rawSection: unknown): Record<string, unknown> {
  const section = object(rawSection);
  const template = DEFAULT_STOREFRONT_CONFIG[sectionKey] as unknown as Record<string, unknown>;
  const keys = Object.keys(section);
  if (!keys.length) throw new HttpError(400, `Section ${sectionKey} cannot be empty`);
  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (!Object.hasOwn(template, key)) throw new HttpError(400, `Unknown setting ${sectionKey}.${key}`);
    const value = section[key];
    const sample = template[key];
    if (typeof sample === 'boolean') {
      if (typeof value !== 'boolean') throw new HttpError(400, `${sectionKey}.${key} must be a boolean`);
      result[key] = value;
    } else if (key === 'style' && sectionKey === 'lookbook') {
      if (!LOOKBOOK_STYLES.includes(value as typeof LOOKBOOK_STYLES[number])) {
        throw new HttpError(400, 'Lookbook style must be paired-carousel or classic-grid');
      }
      result[key] = value;
    } else if (key === 'enabledBrands' && sectionKey === 'editorial') {
      if (!Array.isArray(value) || value.length > 5 || value.some(item => !EDITORIAL_BRANDS.includes(item as any))) {
        throw new HttpError(400, 'enabledBrands must be a list of valid editorial brand keys');
      }
      result[key] = Array.from(new Set(value));
    } else if (typeof sample === 'string') {
      if (typeof value !== 'string' || value.length > 300) {
        throw new HttpError(400, `${sectionKey}.${key} must be a string up to 300 characters`);
      }
      if (key.endsWith('Url')) {
        const trimmed = value.trim();
        if (trimmed && !/^https?:\/\/[^\s\\]+$/i.test(trimmed) && !trimmed.startsWith('/')) {
          throw new HttpError(400, `${sectionKey}.${key} must be a valid HTTP(S) or relative URL`);
        }
        result[key] = trimmed;
      } else {
        result[key] = value.trim();
      }
    }
  }
  return result;
}

export function storeSettingsInput(value: unknown): StoreSettingsUpdate {
  const body = object(value);
  const keys = Object.keys(body);
  if (!keys.length || keys.some(key => !['shippingCost', 'heroStyle', 'storefront'].includes(key))) {
    throw new HttpError(400, 'Provide shippingCost, heroStyle, or storefront; other settings are not supported');
  }
  const input: StoreSettingsUpdate = {};
  if (Object.hasOwn(body, 'shippingCost')) input.shippingCost = money(body.shippingCost, 'Shipping cost')!;
  if (Object.hasOwn(body, 'heroStyle')) {
    if (!HERO_STYLES.includes(body.heroStyle as typeof HERO_STYLES[number])) {
      throw new HttpError(400, 'Hero style must be watch-photos, classic-clock, or ariwatch');
    }
    input.heroStyle = body.heroStyle as typeof HERO_STYLES[number];
  }
  if (Object.hasOwn(body, 'storefront')) {
    const rawStorefront = object(body.storefront);
    const sectionKeys = Object.keys(rawStorefront);
    if (!sectionKeys.length) throw new HttpError(400, 'storefront object cannot be empty');
    const storefront: PartialStorefrontConfig = {};
    for (const sectionKey of sectionKeys) {
      if (!Object.hasOwn(DEFAULT_STOREFRONT_CONFIG, sectionKey)) {
        throw new HttpError(400, `Unsupported storefront section: ${sectionKey}`);
      }
      const typedKey = sectionKey as keyof StorefrontConfig;
      (storefront as unknown as Record<string, unknown>)[typedKey] = validateSection(typedKey, rawStorefront[sectionKey]);
    }
    input.storefront = storefront;
  }
  return input;
}
