import Link from "next/link";
import { DEFAULT_STOREFRONT_CONFIG, type FooterConfig } from "../../../services/store-settings";

export function FooterBottom({
  lang,
  dict,
  isFa,
  config,
  whatsappUrl,
}: {
  lang: string;
  dict: any;
  isFa?: boolean;
  config?: FooterConfig;
  whatsappUrl?: string;
}) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.footer;
  const socials = [
    { key: "IG", enabled: cfg.showInstagram, href: cfg.instagramUrl || "https://instagram.com/ariwatch" },
    { key: "WA", enabled: cfg.showWhatsapp, href: whatsappUrl || "https://wa.me/989123456789" },
    { key: "TG", enabled: cfg.showTelegram, href: cfg.telegramUrl || "https://t.me/ariwatch" },
    { key: "BA", enabled: cfg.showBale, href: cfg.baleUrl || "https://ble.ir/ariwatch" },
    { key: "RU", enabled: cfg.showRubika, href: cfg.rubikaUrl || "https://rubika.ir/ariwatch" },
  ].filter(item => item.enabled);

  const copyright = (isFa ? cfg.customCopyrightFa : cfg.customCopyrightEn) || dict.footer.copyright;

  return (
    <div className="border-t border-gray-200 pt-8 space-y-6 text-[10px] tracking-widest text-ariwatch-gray">
      {cfg.showSocials && (
        <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-gray-200/70">
          <Link href={`/${lang}/concierge`} className="font-bold text-ariwatch-black hover:text-ariwatch-red">
            {dict.footer.contactUs}
          </Link>
          {socials.length > 0 && (
            <div className="flex items-center gap-4" dir="ltr">
              <span className="text-gray-400">{dict.footer.followUs}</span>
              {socials.map(social => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-ariwatch-black hover:text-ariwatch-red transition-colors"
                >
                  {social.key}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        {cfg.showLegalLinks ? (
          <div className="flex gap-6">
            <Link href={`/${lang}/terms`} className="hover:text-ariwatch-black transition">{dict.footer.terms}</Link>
            <Link href={`/${lang}/privacy`} className="hover:text-ariwatch-black transition">{dict.footer.privacy}</Link>
          </div>
        ) : <div />}
        {cfg.showCopyright && <p>{copyright}</p>}
      </div>
    </div>
  );
}
