import { Suspense } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { getDictionary } from "../dictionaries";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { ConciergeFAB } from "../../components/layout/ConciergeFAB";
import { TopProgressBar } from "../../components/layout/TopProgressBar";
import { CartProvider } from "../../context/CartContext";
import { CollectionProvider } from "../../context/CollectionContext";
import { getStorefrontSettings } from "../../services/store-settings";

export const metadata: Metadata = {
  title: "ARIWATCH | Luxury Watches",
  description: "Original, High Copy and Custom Order Watches",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: requestedLang } = await params;
  const lang = requestedLang === "en" ? "en" : "fa";
  const [dict, settings] = await Promise.all([getDictionary(lang), getStorefrontSettings()]);
  const isFa = lang === 'fa';

  return (
    <html lang={lang} dir={isFa ? 'rtl' : 'ltr'}>
      <body className={`${isFa ? 'font-vazir' : 'font-inter'} bg-white text-ariwatch-black`}>
        <CartProvider>
          <CollectionProvider>
            <Suspense fallback={null}>
              <TopProgressBar />
            </Suspense>
            <Suspense fallback={<div className="h-16 md:h-20" />}>
              <Header
                lang={lang}
                dict={dict}
                isFa={isFa}
                config={settings.storefront.header}
                heroStyle={settings.heroStyle}
              />
            </Suspense>
            <main className="min-h-screen bg-white">
              {children}
            </main>
            <Footer
              lang={lang}
              dict={dict}
              isFa={isFa}
              config={settings.storefront.footer}
              whatsappUrl={settings.storefront.header.whatsappUrl}
            />
            {settings.storefront.spotlights.showFloatingConcierge && (
              <ConciergeFAB lang={lang} dict={dict} isFa={isFa} />
            )}
          </CollectionProvider>
        </CartProvider>
      </body>
    </html>
  );
}
