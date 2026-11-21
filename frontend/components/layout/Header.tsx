"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AuthModal } from "../auth/AuthModal";
import { authService } from "../../services/auth.service";
import { useCart } from "../../context/CartContext";
import { DEFAULT_STOREFRONT_CONFIG, type HeaderConfig, type HeroStyle } from "../../services/store-settings";
import { buildMegaSections, DesktopMegaBar } from "./header/MegaMenu";
import { SearchDrawer } from "./header/SearchDrawer";
import { FullMenuDrawer } from "./header/FullMenuDrawer";

interface HeaderProps {
  lang: 'en' | 'fa';
  dict: any;
  isFa: boolean;
  config?: HeaderConfig;
  heroStyle?: HeroStyle;
}

export function Header({ lang, dict, isFa, config, heroStyle = 'ariwatch' }: HeaderProps) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.header;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartItems } = useCart();

  const isHome = /^\/(en|fa)\/?$/.test(pathname || '');
  const isOverlay = isHome && heroStyle === 'ariwatch' && !scrolled;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const targetLanguage = lang === 'fa' ? 'en' : 'fa';
  const languagePath = /^\/(en|fa)\/blog\/.+/.test(pathname || '') ? `/${targetLanguage}/blog` :
    (pathname || `/${lang}`).replace(/^\/(en|fa)(?=\/|$)/, `/${targetLanguage}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setIsAdmin(false);
      if (authService.getToken()) authService.me().then(user => {
        setIsAuthenticated(true); setIsAdmin(user.role !== 'user');
      }).catch(() => { setIsAuthenticated(authService.isAuthenticated()); });
    };
    sync();
    window.addEventListener('ariwatch:auth', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('ariwatch:auth', sync); window.removeEventListener('storage', sync); };
  }, []);

  if (!cfg.enabled) return null;

  const headerBg = isOverlay
    ? 'bg-transparent border-transparent'
    : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]';
  const textColor = isOverlay ? 'text-white' : 'text-ariwatch-black hover:text-ariwatch-red';
  const logoColor = '#d91424';
  const megaSections = buildMegaSections(lang, dict, cfg);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${headerBg}`}
        dir="ltr"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${textColor}`}
              aria-label={dict.header.menu}
            >
              <span className="flex flex-col gap-1 w-4" aria-hidden="true">
                <span className={`block h-[1.5px] w-4 ${isOverlay ? 'bg-white' : 'bg-ariwatch-black'}`} />
                <span className={`block h-[1.5px] w-4 ${isOverlay ? 'bg-white' : 'bg-ariwatch-black'}`} />
                <span className={`block h-[1.5px] w-3 ${isOverlay ? 'bg-white' : 'bg-ariwatch-black'}`} />
              </span>
              <span className="hidden sm:inline">{dict.header.menu}</span>
            </button>
            {cfg.showWhatsapp && (
              <a
                href={cfg.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:inline text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${textColor}`}
              >
                {dict.header.contactWhatsapp || 'WHATSAPP'}
              </a>
            )}
          </div>

          <div className="flex-1 text-center">
            <Link
              href={`/${lang}`}
              className="inline-block text-xl md:text-2xl font-bold tracking-[0.24em] font-serif transition-transform hover:scale-[1.01]"
              style={{ color: logoColor }}
            >
              ARIWATCH
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            {cfg.showLanguageToggle && (
              <Link
                href={languagePath + (searchParams.toString() ? `?${searchParams.toString()}` : '')}
                hrefLang={targetLanguage}
                className={`hidden sm:inline text-[11px] font-bold tracking-widest uppercase ${textColor}`}
                aria-label={isFa ? 'English' : 'فارسی'}
              >
                {isFa ? 'EN' : 'فا'}
              </Link>
            )}
            {cfg.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={`text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${textColor}`}
                aria-label="Search"
              >
                {dict.header.search}
              </button>
            )}
            {cfg.showAccount && (
              isAuthenticated ? (
                <Link href={`/${lang}/orders`} className={`hidden md:inline text-[11px] font-bold tracking-[0.18em] uppercase ${textColor}`}>
                  {dict.header.account}
                </Link>
              ) : (
                <button type="button" onClick={() => setIsAuthModalOpen(true)} className={`hidden md:inline text-[11px] font-bold tracking-[0.18em] uppercase ${textColor}`}>
                  {dict.header.account}
                </button>
              )
            )}
            {cfg.showCart && (
              <Link href={`/${lang}/cart`} className={`flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase ${textColor}`} aria-label="Cart">
                <span>{dict.header.cart}</span>
                {cartCount > 0 && (
                  <span className="w-4 h-4 bg-ariwatch-red text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
        {!isOverlay && <DesktopMegaBar lang={lang} dict={dict} config={cfg} />}
      </header>

      <FullMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isFa={isFa}
        lang={lang}
        dict={dict}
        cfg={cfg}
        megaSections={megaSections}
        languagePath={languagePath}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => setIsAuthenticated(false)}
      />

      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} lang={lang} dict={dict} isFa={isFa} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} dict={dict} isFa={isFa} onSuccess={() => setIsAuthenticated(true)} />
    </>
  );
}
