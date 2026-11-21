"use client";
import Link from "next/link";
import type { HeaderConfig } from "../../../services/store-settings";

export interface MegaSection {
  key: string;
  enabled: boolean;
  label: string;
  href: string;
  items: { label: string; href: string }[];
}

export function buildMegaSections(lang: string, dict: any, config: HeaderConfig): MegaSection[] {
  const m = dict.header.mega || {};
  return [
    {
      key: "watches", enabled: config.showWatchesMenu, label: dict.header.watches, href: `/${lang}/watches`,
      items: [
        { label: m.allWatches || "ALL WATCHES", href: `/${lang}/watches` },
        { label: m.inStock || "IN STOCK", href: `/${lang}/watches?category=original` },
        { label: m.men || "MEN", href: `/${lang}/watches?q=men` },
        { label: m.women || "WOMEN", href: `/${lang}/watches?q=women` },
      ],
    },
    {
      key: "original", enabled: config.showOriginalMenu, label: dict.header.original, href: `/${lang}/watches?category=original`,
      items: [
        { label: m.allOriginal || "ALL ORIGINAL WATCHES", href: `/${lang}/watches?category=original` },
        { label: m.originalInStock || "ORIGINAL IN STOCK", href: `/${lang}/watches?category=original` },
        { label: m.originalMen || "ORIGINAL MEN", href: `/${lang}/watches?category=original&q=men` },
        { label: m.originalWomen || "ORIGINAL WOMEN", href: `/${lang}/watches?category=original&q=women` },
        { label: m.originalBrands || "ORIGINAL BRANDS", href: `/${lang}/watches?category=original` },
      ],
    },
    {
      key: "highcopy", enabled: config.showHighCopyMenu, label: dict.header.highCopy, href: `/${lang}/watches?category=highcopy`,
      items: [
        { label: m.allHighCopy || "ALL HIGH COPY WATCHES", href: `/${lang}/watches?category=highcopy` },
        { label: m.highCopyInStock || "HIGH COPY IN STOCK", href: `/${lang}/watches?category=highcopy` },
        { label: m.highCopyMen || "HIGH COPY MEN", href: `/${lang}/watches?category=highcopy&q=men` },
        { label: m.highCopyWomen || "HIGH COPY WOMEN", href: `/${lang}/watches?category=highcopy&q=women` },
        { label: m.highCopyBrands || "HIGH COPY BRANDS", href: `/${lang}/watches?category=highcopy` },
      ],
    },
    {
      key: "custom", enabled: config.showCustomOrderMenu, label: dict.header.customOrder, href: `/${lang}/concierge`,
      items: [
        { label: m.originalOrder || "ORIGINAL ORDER", href: `/${lang}/concierge` },
        { label: m.highCopyOrder || "HIGH COPY ORDER", href: `/${lang}/concierge` },
        { label: m.requestModel || "REQUEST A MODEL", href: `/${lang}/concierge` },
        { label: m.priceAvailability || "PRICE & AVAILABILITY", href: `/${lang}/concierge` },
      ],
    },
    {
      key: "brands", enabled: config.showBrandsMenu, label: dict.header.brands, href: `/${lang}/watches`,
      items: [
        { label: m.originalBrands || "ORIGINAL BRANDS", href: `/${lang}/watches?category=original` },
        { label: m.highCopyBrands || "HIGH COPY BRANDS", href: `/${lang}/watches?category=highcopy` },
      ],
    },
    {
      key: "guide", enabled: config.showBuyingGuideMenu, label: dict.header.buyingGuide, href: `/${lang}/support`,
      items: [
        { label: m.originalVsHighCopy || "ORIGINAL VS HIGH COPY", href: `/${lang}/support` },
        { label: m.purchaseGuide || "PURCHASE GUIDE", href: `/${lang}/support` },
        { label: m.shippingPayment || "SHIPPING & PAYMENT", href: `/${lang}/support` },
        { label: m.faq || "FAQ", href: `/${lang}/support` },
      ],
    },
  ].filter(section => section.enabled);
}

export function DesktopMegaBar({ lang, dict, config }: { lang: string; dict: any; config: HeaderConfig }) {
  if (!config.showMegaMenu) return null;
  const sections = buildMegaSections(lang, dict, config);
  if (!sections.length && !config.showJournalMenu) return null;
  return (
    <nav aria-label="Main categories" className="hidden lg:flex justify-center items-center gap-8 border-t border-gray-100 py-2.5 px-6 bg-white/95">
      {sections.map(sec => (
        <div key={sec.key} className="relative group py-1">
          <Link href={sec.href} className="text-[11px] font-bold tracking-[0.2em] uppercase text-ariwatch-black group-hover:text-ariwatch-red transition-colors">
            {sec.label}
          </Link>
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full start-0 pt-2 z-50 min-w-56">
            <ul className="bg-white border border-gray-200 shadow-xl py-3 px-4 space-y-2.5">
              {sec.items.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="block text-[11px] tracking-widest uppercase text-gray-600 hover:text-ariwatch-red transition-colors whitespace-nowrap">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {config.showJournalMenu && (
        <Link href={`/${lang}/blog`} className="text-[11px] font-bold tracking-[0.2em] uppercase text-ariwatch-black hover:text-ariwatch-red transition-colors">
          {lang === 'fa' ? 'مجله' : 'JOURNAL'}
        </Link>
      )}
    </nav>
  );
}
