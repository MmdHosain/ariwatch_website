import { FooterLinks } from "./footer/FooterLinks";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterBottom } from "./footer/FooterBottom";
import { DEFAULT_STOREFRONT_CONFIG, type FooterConfig } from "../../services/store-settings";

interface FooterProps {
  lang: 'en' | 'fa';
  dict: any;
  isFa: boolean;
  config?: FooterConfig;
  whatsappUrl?: string;
}

export function Footer({ lang, dict, isFa, config, whatsappUrl }: FooterProps) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.footer;
  if (!cfg.enabled) return null;

  return (
    <footer className="bg-ariwatch-cream pt-16 pb-10 border-t border-gray-200 uppercase">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {cfg.showNewsletter && (
          <div className="mb-14 pb-12 border-b border-gray-200 max-w-xl">
            <FooterNewsletter dict={dict} isFa={isFa} />
          </div>
        )}
        <div className="mb-14">
          <FooterLinks lang={lang} dict={dict} config={cfg} />
        </div>
        <FooterBottom lang={lang} dict={dict} isFa={isFa} config={cfg} whatsappUrl={whatsappUrl} />
      </div>
    </footer>
  );
}
