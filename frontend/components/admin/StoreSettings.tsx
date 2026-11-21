"use client";

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../services/api';
import {
  DEFAULT_STOREFRONT_CONFIG,
  mergeStorefrontConfig,
  type HeroStyle,
  type StorefrontConfig,
} from '../../services/store-settings';
import { HeroSettingsForm } from './HeroSettingsForm';
import { ShippingSettingsForm } from './ShippingSettingsForm';
import { StorefrontCustomizer } from './settings/StorefrontCustomizer';

interface Settings {
  shippingCost: number;
  heroStyle: HeroStyle;
  storefront?: StorefrontConfig;
}

export function StoreSettings({ lang }: { lang: string }) {
  const fa = lang === 'fa';
  const router = useRouter();
  const [settings, setSettings] = useState<{ shippingCost: number; heroStyle: HeroStyle; storefront: StorefrontConfig } | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncingVideos, setSyncingVideos] = useState(false);
  const [error, setError] = useState('');
  const [presetNotice, setPresetNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const value = await apiRequest<Settings>('/api/admin/settings', { authenticated: true });
      const heroStyle: HeroStyle = value.heroStyle === 'classic-clock' || value.heroStyle === 'ariwatch' ? value.heroStyle : 'watch-photos';
      setSettings({ shippingCost: value.shippingCost, heroStyle, storefront: mergeStorefrontConfig(value.storefront) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : fa ? 'بارگذاری تنظیمات انجام نشد.' : 'Could not load settings.');
    } finally { setLoading(false); }
  }, [fa]);

  useEffect(() => { void load(); }, [load]);

  const applyAriWatchReplicaPreset = async () => {
    setPresetNotice(''); setError('');
    try {
      await apiRequest('/api/admin/settings', {
        method: 'PUT',
        authenticated: true,
        body: { heroStyle: 'ariwatch', storefront: DEFAULT_STOREFRONT_CONFIG },
      });
      await load();
      router.refresh();
      setPresetNotice(fa ? 'چیدمان کامل مطابق سایت ariwatch.ir فعال شد.' : 'Full ariwatch.ir layout preset activated.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not apply preset');
    }
  };

  const syncVideosFromAriWatch = async () => {
    setSyncingVideos(true); setPresetNotice(''); setError('');
    try {
      const res = await apiRequest<{ discovered: string[] }>('/api/admin/settings/sync-videos', {
        method: 'POST',
        authenticated: true,
      });
      await load();
      router.refresh();
      setPresetNotice(
        fa
          ? `${res.discovered.length} ویدیو از سایت ariwatch.ir استخراج و روی بخش‌ها تنظیم شد.`
          : `Synced ${res.discovered.length} video(s) directly from ariwatch.ir.`
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sync videos from ariwatch.ir');
    } finally {
      setSyncingVideos(false);
    }
  };

  return <div className="max-w-5xl space-y-6">
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h1 className="text-3xl font-serif">{fa ? 'تنظیمات و شخصی‌سازی فروشگاه' : 'Store & Layout Settings'}</h1>
      {settings && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={syncingVideos}
            onClick={() => void syncVideosFromAriWatch()}
            className="border border-ariwatch-black bg-white text-ariwatch-black px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {syncingVideos
              ? (fa ? 'در حال دریافت ویدیوها…' : 'Syncing videos…')
              : (fa ? 'دریافت خودکار ویدیوهای ariwatch.ir' : 'Sync Videos from ariwatch.ir')}
          </button>
          <button
            type="button"
            onClick={() => void applyAriWatchReplicaPreset()}
            className="bg-ariwatch-red text-white px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-red-800 transition-colors"
          >
            {fa ? 'اعمال چیدمان کامل ariwatch.ir' : 'Apply Full ariwatch.ir Preset'}
          </button>
        </div>
      )}
    </div>
    {presetNotice && <p role="status" className="bg-green-50 border border-green-200 text-green-800 p-4 text-sm">{presetNotice}</p>}
    {loading ? <p role="status">{fa ? 'در حال بارگذاری…' : 'Loading…'}</p> : error ?
      <div className="border bg-white p-6">
        <p role="alert" className="text-red-700">{error}</p>
        <button type="button" onClick={() => void load()} className="mt-4 bg-black text-white px-5 py-3">
          {fa ? 'تلاش دوباره' : 'Try again'}
        </button>
      </div> : settings && <div className="grid gap-6">
        <HeroSettingsForm key={settings.heroStyle} initialStyle={settings.heroStyle} fa={fa} />
        <StorefrontCustomizer key={JSON.stringify(settings.storefront)} initialConfig={settings.storefront} fa={fa} />
        <ShippingSettingsForm initialCost={settings.shippingCost} fa={fa} />
      </div>}
  </div>;
}
