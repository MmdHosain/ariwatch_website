ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS storefront_config JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE store_settings ALTER COLUMN hero_style SET DEFAULT 'ariwatch';
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname='store_settings_hero_style_check' AND conrelid='store_settings'::regclass) THEN
    ALTER TABLE store_settings DROP CONSTRAINT store_settings_hero_style_check;
  END IF;
  ALTER TABLE store_settings ADD CONSTRAINT store_settings_hero_style_check CHECK(hero_style IN ('watch-photos','classic-clock','ariwatch'));
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE name='default_ariwatch_hero_v1') THEN
    UPDATE store_settings SET hero_style='ariwatch' WHERE id=TRUE;
    INSERT INTO schema_migrations(name) VALUES('default_ariwatch_hero_v1');
  END IF;
END
$$;
