import type { SectionDefinition } from './sectionDefinitions';
import type { EditorialBrandKey, StorefrontConfig } from '../../../services/store-settings';

const ALL_BRANDS: { key: EditorialBrandKey; label: string }[] = [
  { key: 'cartier', label: 'Cartier' },
  { key: 'rolex', label: 'Rolex' },
  { key: 'omega', label: 'Omega' },
  { key: 'patek', label: 'Patek Philippe' },
  { key: 'swatch', label: 'Omega Swatch' },
];

export function SectionFieldEditor({
  sectionDef,
  sectionData,
  config,
  saving,
  fa,
  updateField,
  toggleEditorialBrand,
}: {
  sectionDef: SectionDefinition;
  sectionData: Record<string, any>;
  config: StorefrontConfig;
  saving: boolean;
  fa: boolean;
  updateField: (key: string, value: unknown) => void;
  toggleEditorialBrand: (brand: EditorialBrandKey) => void;
}) {
  return (
    <>
      <fieldset disabled={saving} className="grid sm:grid-cols-2 gap-3">
        {sectionDef.toggles.map(toggle => (
          <label
            key={toggle.key}
            className="flex items-center justify-between gap-3 border border-gray-200 p-3.5 cursor-pointer hover:bg-gray-50"
          >
            <span className="text-xs font-medium text-ariwatch-black">{fa ? toggle.fa : toggle.en}</span>
            <input
              type="checkbox"
              checked={Boolean(sectionData[toggle.key])}
              onChange={event => updateField(toggle.key, event.target.checked)}
              className="w-4 h-4 accent-ariwatch-red"
            />
          </label>
        ))}
      </fieldset>

      {sectionDef.id === 'lookbook' && (
        <div className="border border-gray-200 p-4 space-y-2">
          <label className="block text-xs font-bold">
            {fa ? 'حالت نمایش بخش دسته‌بندی ساعت‌ها' : 'Lookbook Display Mode'}
          </label>
          <select
            value={config.lookbook.style}
            onChange={event => updateField('style', event.target.value)}
            className="border p-2.5 text-sm bg-white w-full max-w-md"
          >
            <option value="paired-carousel">
              {fa ? 'اسلایدر ۶تایی جفتی (عکس مچ + عکس محصول - مطابق ariwatch.ir)' : '6-Slide Paired Wrist & Product Carousel (ariwatch.ir)'}
            </option>
            <option value="classic-grid">
              {fa ? 'چیدمان دو ستونی کلاسیک' : 'Classic Two-Column Grid'}
            </option>
          </select>
        </div>
      )}

      {sectionDef.id === 'editorial' && (
        <div className="border border-gray-200 p-4 space-y-3">
          <span className="block text-xs font-bold">
            {fa ? 'برندهای فعال در اسلایدر داستان برندها' : 'Active Brands in Editorial Slider'}
          </span>
          <div className="flex flex-wrap gap-4">
            {ALL_BRANDS.map(item => (
              <label key={item.key} className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.editorial.enabledBrands.includes(item.key)}
                  onChange={() => toggleEditorialBrand(item.key)}
                  className="accent-ariwatch-red"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {sectionDef.texts.length > 0 && (
        <fieldset disabled={saving} className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          {sectionDef.texts.map(field => (
            <label key={field.key} className="block text-xs font-medium">
              <span className="block mb-1.5 text-gray-700">{fa ? field.fa : field.en}</span>
              <input
                type="text"
                maxLength={300}
                dir={field.dir || 'auto'}
                placeholder={field.placeholder || (fa ? 'پیش‌فرض سیستم' : 'System default')}
                value={String(sectionData[field.key] ?? '')}
                onChange={event => updateField(field.key, event.target.value)}
                className="w-full border border-gray-300 p-2.5 text-sm focus:border-black outline-none"
              />
            </label>
          ))}
        </fieldset>
      )}
    </>
  );
}
