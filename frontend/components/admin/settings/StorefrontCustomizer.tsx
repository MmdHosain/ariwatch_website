"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../../services/api';
import {
  DEFAULT_STOREFRONT_CONFIG,
  type EditorialBrandKey,
  type StorefrontConfig,
} from '../../../services/store-settings';
import { SECTION_DEFINITIONS } from './sectionDefinitions';
import { SectionFieldEditor } from './SectionFieldEditor';

export function StorefrontCustomizer({
  initialConfig,
  fa,
}: {
  initialConfig: StorefrontConfig;
  fa: boolean;
}) {
  const router = useRouter();
  const [config, setConfig] = useState<StorefrontConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<keyof StorefrontConfig>('header');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const sectionDef = SECTION_DEFINITIONS.find(s => s.id === activeTab) || SECTION_DEFINITIONS[0];
  const sectionData = config[sectionDef.id] as unknown as Record<string, any>;

  const updateField = (key: string, value: unknown) => {
    setConfig(prev => ({
      ...prev,
      [sectionDef.id]: { ...prev[sectionDef.id], [key]: value },
    }));
    setError('');
    setNotice('');
  };

  const toggleEditorialBrand = (brand: EditorialBrandKey) => {
    const current = config.editorial.enabledBrands;
    const next = current.includes(brand)
      ? current.filter(item => item !== brand)
      : [...current, brand];
    updateField('enabledBrands', next);
  };

  const saveSection = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true); setError(''); setNotice('');
    try {
      await apiRequest('/api/admin/settings', {
        method: 'PUT',
        authenticated: true,
        body: { storefront: { [sectionDef.id]: config[sectionDef.id] } },
      });
      router.refresh();
      setNotice(fa ? 'تنظیمات این بخش با موفقیت ذخیره شد.' : 'Section settings saved.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : fa ? 'ذخیره انجام نشد.' : 'Could not save settings.');
    } finally {
      setSaving(false);
    }
  };

  const resetSection = () => {
    setConfig(prev => ({
      ...prev,
      [sectionDef.id]: { ...DEFAULT_STOREFRONT_CONFIG[sectionDef.id] },
    }));
    setNotice(fa ? 'مقادیر پیش‌فرض بازنشانی شد. برای اعمال، دکمه ذخیره را بزنید.' : 'Defaults restored. Click Save to apply.');
  };

  return (
    <section className="bg-white border p-6 space-y-6">
      <div>
        <h2 className="font-serif text-xl mb-2">
          {fa ? 'شخصی‌سازی و کلیدهای روشن/خاموش بخش‌های سایت (طرح ariwatch.ir)' : 'Granular Section Toggles & Customization (ariwatch.ir)'}
        </h2>
        <p className="text-sm text-gray-600 leading-7">
          {fa
            ? 'هر بخش و زیرمجموعه‌های آن را به‌صورت مستقل روشن یا خاموش کنید یا متن‌ها و لینک‌های آن را تغییر دهید.'
            : 'Switch individual sections, cards, and menu items on or off, or customize their titles and links.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4" role="tablist">
        {SECTION_DEFINITIONS.map(sec => (
          <button
            key={sec.id}
            type="button"
            role="tab"
            aria-selected={activeTab === sec.id}
            onClick={() => { setActiveTab(sec.id); setError(''); setNotice(''); }}
            className={`px-3.5 py-2 text-xs font-bold border transition-colors ${
              activeTab === sec.id
                ? 'bg-ariwatch-black text-white border-ariwatch-black'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            {fa ? sec.titleFa : sec.titleEn}
          </button>
        ))}
      </div>

      <form onSubmit={saveSection} aria-busy={saving} className="space-y-6">
        <div>
          <h3 className="font-bold text-base mb-1">{fa ? sectionDef.titleFa : sectionDef.titleEn}</h3>
          <p className="text-xs text-gray-500">{fa ? sectionDef.descFa : sectionDef.descEn}</p>
        </div>

        <SectionFieldEditor
          sectionDef={sectionDef}
          sectionData={sectionData}
          config={config}
          saving={saving}
          fa={fa}
          updateField={updateField}
          toggleEditorialBrand={toggleEditorialBrand}
        />

        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-6 py-3 text-sm disabled:opacity-50"
          >
            {saving ? (fa ? 'در حال ذخیره…' : 'Saving…') : fa ? 'ذخیره تنظیمات این بخش' : 'Save section settings'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={resetSection}
            className="border border-gray-300 px-5 py-3 text-sm hover:border-black"
          >
            {fa ? 'بازنشانی این بخش به پیش‌فرض' : 'Reset section to default'}
          </button>
        </div>
      </form>
    </section>
  );
}
