import type { QueryExecutor } from '../../domain/ports/Database';
import { mergeStorefrontConfig, type StoreSettings } from '../../domain/entities/StoreSettings';
import { HttpError } from '../errors';
import { storeSettingsInput } from './input';

export class StoreSettingsService {
  constructor(private db: QueryExecutor) {}
  private map(row: any): StoreSettings {
    if (!row) throw new HttpError(503, 'Store settings are unavailable');
    return {
      shippingCost: Number(row.shipping_cost),
      heroStyle: row.hero_style,
      storefront: mergeStorefrontConfig(row.storefront_config),
    };
  }
  async get(): Promise<StoreSettings> {
    const result = await this.db.query('SELECT shipping_cost,hero_style,storefront_config FROM store_settings WHERE id=TRUE');
    return this.map(result.rows[0]);
  }
  async update(body: unknown): Promise<StoreSettings> {
    const input = storeSettingsInput(body);
    const patch = input.storefront ? JSON.stringify(input.storefront) : null;
    const result = await this.db.query(
      `UPDATE store_settings SET
        shipping_cost = COALESCE($1::numeric, shipping_cost),
        hero_style = COALESCE($2::varchar, hero_style),
        storefront_config = CASE
          WHEN $3::jsonb IS NULL THEN storefront_config
          ELSE (
            SELECT COALESCE(jsonb_object_agg(
              key,
              COALESCE(storefront_config->key, '{}'::jsonb) || COALESCE($3::jsonb->key, '{}'::jsonb)
            ), '{}'::jsonb)
            FROM jsonb_object_keys(storefront_config || $3::jsonb) AS key
          )
        END
      WHERE id=TRUE RETURNING shipping_cost,hero_style,storefront_config`,
      [input.shippingCost ?? null, input.heroStyle ?? null, patch]
    );
    return this.map(result.rows[0]);
  }
}
