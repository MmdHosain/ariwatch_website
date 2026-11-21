"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../services/api';
import { HERO_SLIDES } from '../home/hero/hero.data';
import type { HeroStyle } from '../../services/store-settings';

export type { HeroStyle } from '../../services/store-settings';

export function HeroSettingsForm({ initialStyle, fa }: { initialStyle: HeroStyle; fa: boolean }) {
  const router = useRouter();
  const [style, setStyle] = useState<HeroStyle>(initialStyle);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const choices: { value: HeroStyle; title: string; detail: string }[] = [
    { value: 'ariwatch', title: fa ? 'طرح اصلی آری‌واچ (ariwatch.ir)' : 'AriWatch.ir Dual Hero', detail: fa ? 'اسلایدر دوحالته تفکیک اصالت و سفارش اختصاصی مطابق سایت ariwatch.ir' : 'Two-slide split showcase with product type clarity and custom order CTAs' },
    { value: 'watch-photos', title: fa ? 'عکس ساعت‌ها' : 'Watch photos', detail: fa ? 'نمایش عکس واقعی پنج ساعت با انیمیشن شناور' : 'Real photos of five watches with floating animation' },
    { value: 'classic-clock', title: fa ? 'ساعت کلاسیک' : 'Classic clock', detail: fa ? 'نمای ساعت گرد با سایه‌های ملایم' : 'Abstract round clock with soft shadows' },
  ];
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true); setError(''); setNotice('');
    try {
      await apiRequest('/api/admin/settings', { method: 'PUT', authenticated: true, body: { heroStyle: style } });
      router.refresh();
      setNotice(fa ? 'طرح بخش هیرو ذخیره شد.' : 'Homepage hero style saved.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : fa ? 'ذخیره انجام نشد.' : 'Could not save.');
    } finally { setSaving(false); }
  };
  return <form onSubmit={save} aria-busy={saving} className="bg-white border p-6">
    <fieldset disabled={saving}>
      <legend className="font-serif text-xl mb-3">{fa ? 'سبک نمایش هیرو (بالای صفحه اصلی)' : 'Homepage hero style'}</legend>
      <p className="text-sm text-gray-600 leading-7 mb-5">{fa ? 'طرح بالای صفحه اصلی را انتخاب کنید. گزینه اول دقیقاً مطابق چیدمان سایت ariwatch.ir است.' : 'Choose the design at the top of the homepage. The first option matches the exact ariwatch.ir layout.'}</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {choices.map(choice => <label key={choice.value} className={`cursor-pointer border p-4 flex flex-col gap-3 ${style === choice.value ? 'border-ariwatch-red ring-1 ring-ariwatch-red' : 'border-gray-200'} ${saving ? 'opacity-60 cursor-wait' : ''}`}>
          <div aria-hidden="true" className="h-28 bg-[#f6f5f0] flex justify-center items-center overflow-hidden p-2">
            {choice.value === 'ariwatch' ? (
              <div className="grid grid-cols-2 gap-1.5 w-full h-full items-center">
                <div className="bg-white border h-20 flex items-center justify-center p-1"><img src="/resourses/lifestyle-watch-3.jpg" alt="" className="h-full w-full object-cover" /></div>
                <div className="bg-white border h-20 flex items-center justify-center p-1"><img src={HERO_SLIDES[3].imageUrl} alt="" className="h-full w-full object-contain" /></div>
              </div>
            ) : choice.value === 'watch-photos' ? <img src={HERO_SLIDES[0].imageUrl} alt="" className="h-24 w-20 object-contain" /> :
              <div className="relative w-20 h-20 rounded-full border border-[#d6d1c7] bg-[#f6f5f0] shadow-[4px_4px_10px_#ddd9d0,-4px_-4px_10px_#fff]">
                <span className="absolute left-1/2 top-1/2 w-1 h-6 bg-gray-700 origin-top rotate-[135deg]" />
                <span className="absolute left-1/2 top-1/2 w-0.5 h-7 bg-ariwatch-red origin-top -rotate-45" />
              </div>}
          </div>
          <span className="flex items-center gap-2 text-sm font-medium">
            <input type="radio" name="hero-style" value={choice.value} checked={style === choice.value}
              onChange={() => { setStyle(choice.value); setError(''); setNotice(''); }} className="accent-ariwatch-red" />
            {choice.title}
          </span>
          <span className="text-xs text-gray-600 leading-5">{choice.detail}</span>
        </label>)}
      </div>
    </fieldset>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {notice && <p role="status" className="mt-4 text-sm text-green-700">{notice}</p>}
    <button disabled={saving} className="mt-5 bg-black text-white px-6 py-3 text-sm disabled:opacity-50">
      {saving ? (fa ? 'در حال ذخیره…' : 'Saving…') : fa ? 'ذخیره سبک هیرو' : 'Save hero style'}
    </button>
  </form>;
}
