import Link from "next/link";
import { authService } from "../../../services/auth.service";
import type { HeaderConfig } from "../../../services/store-settings";
import type { MegaSection } from "./MegaMenu";

export function FullMenuDrawer({
  isOpen,
  onClose,
  isFa,
  lang,
  dict,
  cfg,
  megaSections,
  languagePath,
  isAdmin,
  isAuthenticated,
  onOpenAuth,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  isFa: boolean;
  lang: string;
  dict: any;
  cfg: HeaderConfig;
  megaSections: MegaSection[];
  languagePath: string;
  isAdmin: boolean;
  isAuthenticated: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div id="store-menu" className="fixed inset-0 bg-white z-[60] flex flex-col overflow-y-auto" dir={isFa ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-gray-100" dir="ltr">
        <span className="text-base font-bold text-[#d91424] tracking-[0.22em]">ARIWATCH</span>
        <button onClick={onClose} aria-label={isFa ? 'بستن منو' : 'Close menu'} className="p-2 text-2xl leading-none hover:text-ariwatch-red">×</button>
      </div>
      <div className="max-w-6xl w-full mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        {megaSections.map(sec => (
          <div key={sec.key} className="border-b sm:border-b-0 border-gray-100 pb-4">
            <Link href={sec.href} onClick={onClose} className="font-serif text-lg uppercase tracking-widest text-ariwatch-black hover:text-ariwatch-red block mb-3">
              {sec.label}
            </Link>
            <ul className="space-y-2">
              {sec.items.map(item => (
                <li key={item.label}>
                  <Link href={item.href} onClick={onClose} className="text-xs tracking-widest uppercase text-gray-500 hover:text-ariwatch-black">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 px-6 py-6 flex flex-wrap justify-center gap-6 text-xs font-bold tracking-widest uppercase">
        <Link href={languagePath} onClick={onClose}>{isFa ? 'English' : 'فارسی'}</Link>
        <Link href={`/${lang}`} onClick={onClose}>{dict.header.home}</Link>
        <Link href={`/${lang}/wishlist`} onClick={onClose}>{isFa ? 'علاقه‌مندی‌ها' : 'Wishlist'}</Link>
        <Link href={`/${lang}/compare`} onClick={onClose}>{isFa ? 'مقایسه' : 'Compare'}</Link>
        {cfg.showJournalMenu && <Link href={`/${lang}/blog`} onClick={onClose}>{isFa ? 'مجله' : 'Journal'}</Link>}
        <Link href={`/${lang}/story`} onClick={onClose}>{dict.header.story}</Link>
        <Link href={`/${lang}/orders`} onClick={onClose}>{isFa ? 'سفارش‌های من' : 'My Orders'}</Link>
        {isAdmin && <Link href={`/${lang}/admin`} onClick={onClose} className="text-ariwatch-red">{isFa ? 'مدیریت فروشگاه' : 'Admin'}</Link>}
        {cfg.showWhatsapp && <a href={cfg.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-700">{dict.header.contactWhatsapp || 'WHATSAPP'}</a>}
        {isAuthenticated ? (
          <button onClick={() => { void authService.logout(); onLogout(); onClose(); }} className="text-ariwatch-red">{dict.header.logout}</button>
        ) : (
          <button onClick={() => { onClose(); onOpenAuth(); }}>{dict.header.account}</button>
        )}
      </div>
    </div>
  );
}
