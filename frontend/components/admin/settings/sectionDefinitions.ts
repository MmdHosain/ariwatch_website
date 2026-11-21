import type { StorefrontConfig } from '../../../services/store-settings';
import { SECTIONS_5_TO_8 } from './sectionDefinitionsPart2';

export interface ToggleField { key: string; en: string; fa: string; }
export interface TextField { key: string; en: string; fa: string; dir?: 'ltr' | 'rtl'; placeholder?: string; }
export interface SectionDefinition {
  id: keyof StorefrontConfig;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  toggles: ToggleField[];
  texts: TextField[];
}

const SECTIONS_1_TO_4: SectionDefinition[] = [
  {
    id: 'header',
    titleEn: '1. Header & Mega Menu',
    titleFa: '۱. هدر و مگامنو',
    descEn: 'Toggle top navigation bar items, mega-menu categories, and WhatsApp quick contact.',
    descFa: 'فعال یا غیرفعال کردن اجزای هدر، دسته‌بندی‌های مگامنو و لینک مستقیم واتساپ.',
    toggles: [
      { key: 'enabled', en: 'Enable Entire Header', fa: 'نمایش کل هدر سایت' },
      { key: 'showWhatsapp', en: 'Show Contact WhatsApp Link', fa: 'نمایش دکمه تماس واتساپ' },
      { key: 'showSearch', en: 'Show Search Button & Modal', fa: 'نمایش جستجو' },
      { key: 'showAccount', en: 'Show Account / Sign-in Link', fa: 'نمایش ورود / حساب کاربری' },
      { key: 'showCart', en: 'Show Shopping Cart Icon', fa: 'نمایش سبد خرید' },
      { key: 'showLanguageToggle', en: 'Show Language Switcher (FA/EN)', fa: 'نمایش تغییر زبان (FA/EN)' },
      { key: 'showMegaMenu', en: 'Show Desktop Mega Menu Bar', fa: 'نمایش نوار مگامنو در دسکتاپ' },
      { key: 'showWatchesMenu', en: 'Menu Item: WATCHES', fa: 'منوی ساعت‌ها (WATCHES)' },
      { key: 'showOriginalMenu', en: 'Menu Item: ORIGINAL', fa: 'منوی اورجینال (ORIGINAL)' },
      { key: 'showHighCopyMenu', en: 'Menu Item: HIGH COPY', fa: 'منوی های‌کپی (HIGH COPY)' },
      { key: 'showCustomOrderMenu', en: 'Menu Item: CUSTOM ORDER', fa: 'منوی سفارش اختصاصی (CUSTOM ORDER)' },
      { key: 'showBrandsMenu', en: 'Menu Item: BRANDS', fa: 'منوی برندها (BRANDS)' },
      { key: 'showBuyingGuideMenu', en: 'Menu Item: BUYING GUIDE', fa: 'منوی راهنمای خرید (BUYING GUIDE)' },
      { key: 'showJournalMenu', en: 'Menu Item: JOURNAL / BLOG', fa: 'منوی مجله ساعت' },
    ],
    texts: [
      { key: 'whatsappNumber', en: 'WhatsApp Number', fa: 'شماره واتساپ', dir: 'ltr', placeholder: '+989123456789' },
      { key: 'whatsappUrl', en: 'WhatsApp Direct URL', fa: 'لینک مستقیم واتساپ', dir: 'ltr', placeholder: 'https://wa.me/989123456789' },
    ],
  },
  {
    id: 'hero',
    titleEn: '2. Hero & Video',
    titleFa: '۲. بخش هیرو و ویدیوی تمام‌صفحه',
    descEn: 'Switch full-screen hero video playback, slides, CTA buttons, indicators, and headlines.',
    descFa: 'مدیریت ویدیوی تمام‌صفحه هیرو، اسلایدها، دکمه‌ها، نشانگرها و متن‌های سفارشی.',
    toggles: [
      { key: 'enabled', en: 'Enable Hero Section', fa: 'نمایش بخش هیرو' },
      { key: 'showVideo', en: 'Enable Full-Screen Background Video (with Ⅱ control)', fa: 'پخش ویدیوی تمام‌صفحه پس‌زمینه (همراه با دکمه Ⅱ)' },
      { key: 'showSlide1', en: 'Show Slide 1 (AriWatch — Clear Product Type)', fa: 'نمایش اسلاید ۱ (آری‌واچ — تفکیک شفاف)' },
      { key: 'showSlide2', en: 'Show Slide 2 (Choose With Clarity)', fa: 'نمایش اسلاید ۲ (انتخاب با شفافیت کامل)' },
      { key: 'showPrimaryCta', en: 'Show Red Primary Button', fa: 'نمایش دکمه قرمز اول' },
      { key: 'showSecondaryCta', en: 'Show Outlined Secondary Button', fa: 'نمایش دکمه کادردار دوم' },
      { key: 'showIndicators', en: 'Show Vertical/Horizontal Indicators & Ⅱ Button', fa: 'نمایش خطوط نشانگر اسلاید و دکمه Ⅱ' },
    ],
    texts: [
      { key: 'videoUrl', en: 'Hero Video URL (.mp4)', fa: 'لینک ویدیوی هیرو (.mp4)', dir: 'ltr', placeholder: '/resourses/ariwatch-hero.mp4' },
      { key: 'customBadgeEn', en: 'Custom Top Badge (EN)', fa: 'برچسب بالای عنوان (انگلیسی)', dir: 'ltr' },
      { key: 'customBadgeFa', en: 'Custom Top Badge (FA)', fa: 'برچسب بالای عنوان (فارسی)', dir: 'rtl' },
      { key: 'customHeadlineEn', en: 'Custom Main Headline (EN)', fa: 'عنوان اصلی سفارشی (انگلیسی)', dir: 'ltr' },
      { key: 'customHeadlineFa', en: 'Custom Main Headline (FA)', fa: 'عنوان اصلی سفارشی (فارسی)', dir: 'rtl' },
      { key: 'customSubheadlineEn', en: 'Custom Subheadline (EN)', fa: 'زیرعنوان سفارشی (انگلیسی)', dir: 'ltr' },
      { key: 'customSubheadlineFa', en: 'Custom Subheadline (FA)', fa: 'زیرعنوان سفارشی (فارسی)', dir: 'rtl' },
    ],
  },
  {
    id: 'buyingPaths',
    titleEn: '3. Three Buying Paths',
    titleFa: '۳. سه مسیر خرید شفاف',
    descEn: 'Control the 3 full-bleed overlay cards (Original, High Copy, Custom Order) and their images.',
    descFa: 'شخصی‌سازی کارت‌های تمام‌تصویر سه‌گانه (اورجینال، های‌کپی، سفارش اختصاصی) و تصاویر آن‌ها.',
    toggles: [
      { key: 'enabled', en: 'Enable Buying Paths Section', fa: 'نمایش بخش سه مسیر خرید' },
      { key: 'showHeader', en: 'Show Section Header', fa: 'نمایش سرتیتر بالای بخش' },
      { key: 'showBadges', en: 'Show Top-Left Category Badges (ORIGINAL / NON-ORIGINAL / CUSTOM)', fa: 'نمایش بج‌های رنگی گوشه بالای کارت‌ها' },
      { key: 'showOriginalCard', en: 'Show Card 1: Original Watches', fa: 'نمایش کارت ۱: ساعت‌های اورجینال' },
      { key: 'showHighCopyCard', en: 'Show Card 2: High Copy Watches', fa: 'نمایش کارت ۲: ساعت‌های های‌کپی' },
      { key: 'showCustomCard', en: 'Show Card 3: Custom Order', fa: 'نمایش کارت ۳: سفارش اختصاصی' },
    ],
    texts: [
      { key: 'originalImageUrl', en: 'Card 1 Image URL (Original)', fa: 'تصویر کارت ۱ (اورجینال)', dir: 'ltr' },
      { key: 'highCopyImageUrl', en: 'Card 2 Image URL (High Copy)', fa: 'تصویر کارت ۲ (های‌کپی)', dir: 'ltr' },
      { key: 'customImageUrl', en: 'Card 3 Image URL (Custom Order)', fa: 'تصویر کارت ۳ (سفارش اختصاصی)', dir: 'ltr' },
      { key: 'customSubtitleEn', en: 'Custom Red Badge (EN)', fa: 'برچسب قرمز بالا (انگلیسی)', dir: 'ltr' },
      { key: 'customSubtitleFa', en: 'Custom Red Badge (FA)', fa: 'برچسب قرمز بالا (فارسی)', dir: 'rtl' },
      { key: 'customTitleEn', en: 'Custom Section Title (EN)', fa: 'عنوان بخش (انگلیسی)', dir: 'ltr' },
      { key: 'customTitleFa', en: 'Custom Section Title (FA)', fa: 'عنوان بخش (فارسی)', dir: 'rtl' },
    ],
  },
  {
    id: 'editorial',
    titleEn: '4. Editorial Brand Slider & Video',
    titleFa: '۴. اسلایدر داستان برندها و ویدیو',
    descEn: 'Toggle the 5-slide editorial showcase, maroon collage, video frame, and red progress bar.',
    descFa: 'تنظیمات اسلایدر ۵تایی برندها، کلاژ زرشکی، ویدیو و نوار پیشرفت قرمز پایین بخش.',
    toggles: [
      { key: 'enabled', en: 'Enable Editorial Brand Slider', fa: 'نمایش اسلایدر داستان برندها' },
      { key: 'showVideo', en: 'Enable Collage Video Player (with II control)', fa: 'پخش ویدیو در کادر پایین کلاژ (همراه با دکمه II)' },
      { key: 'showHeader', en: 'Show Section Header', fa: 'نمایش سرتیتر بخش' },
      { key: 'showCollage', en: 'Show 5-Photo Layered Collage', fa: 'نمایش کلاژ ۵تایی کنار متن' },
      { key: 'showControls', en: 'Show Prev/Next Square Buttons & Counter', fa: 'نمایش دکمه‌های مربعی قبلی/بعدی و شمارنده' },
      { key: 'showProgressBar', en: 'Show Bottom Red Progress Line', fa: 'نمایش خط پیشرفت قرمز در لبه پایین' },
      { key: 'showDiscoverLink', en: 'Show "Discover the watches" Link', fa: 'نمایش لینک مشاهده ساعت‌ها' },
    ],
    texts: [
      { key: 'videoUrl', en: 'Editorial Collage Video URL (.mp4)', fa: 'لینک ویدیوی کلاژ برندها (.mp4)', dir: 'ltr' },
      { key: 'customTitleEn', en: 'Custom Section Title (EN)', fa: 'عنوان سفارشی بخش (انگلیسی)', dir: 'ltr' },
      { key: 'customTitleFa', en: 'Custom Section Title (FA)', fa: 'عنوان سفارشی بخش (فارسی)', dir: 'rtl' },
    ],
  },
];

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  ...SECTIONS_1_TO_4,
  ...SECTIONS_5_TO_8,
];
