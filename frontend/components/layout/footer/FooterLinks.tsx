import Link from "next/link";
import { DEFAULT_STOREFRONT_CONFIG, type FooterConfig } from "../../../services/store-settings";

export function FooterLinks({ lang, dict, config }: { lang: string; dict: any; config?: FooterConfig }) {
  const cfg = config || DEFAULT_STOREFRONT_CONFIG.footer;
  const groups = [
    {
      key: "collection",
      enabled: cfg.showCollectionCol,
      title: `${dict.footer.theCollection} +`,
      links: [
        [`/${lang}/watches?q=women`, dict.footer.womenWatches],
        [`/${lang}/watches?q=men`, dict.footer.menWatches],
        [`/${lang}/watches?q=classic`, dict.footer.classic],
        [`/${lang}/watches?q=sport`, dict.footer.sport],
      ],
    },
    {
      key: "find",
      enabled: cfg.showFindCol,
      title: `${dict.footer.findAriwatch} +`,
      links: [
        [`/${lang}/watches`, dict.footer.shopByStyle],
        [`/${lang}/watches`, dict.footer.shopByColour],
        [`/${lang}/watches`, dict.footer.shopByStrap],
        [`/${lang}/support`, dict.footer.sizeGuide],
      ],
    },
    {
      key: "support",
      enabled: cfg.showSupportCol,
      title: `${dict.footer.purchaseSupport} +`,
      links: [
        [`/${lang}/concierge`, dict.footer.requestVideo],
        [`/${lang}/support`, dict.footer.deliveryInfo],
        [`/${lang}/support`, dict.footer.reviewPeriod],
        [`/${lang}/support`, dict.footer.faq],
      ],
    },
    {
      key: "world",
      enabled: cfg.showWorldCol,
      title: `${dict.footer.worldOfAriwatch} +`,
      links: [
        [`/${lang}/story`, dict.footer.brandStory],
        [`/${lang}/story/arash-khandan`, dict.footer.arashKhandan],
        [`/${lang}/story/melina`, dict.footer.melina],
        [`/${lang}/story/company`, dict.footer.arashCompany],
      ],
    },
    {
      key: "more",
      enabled: cfg.showMoreCol,
      title: `${dict.footer.more} +`,
      links: [
        [`/${lang}/blog`, dict.footer.newsStories],
        [`/${lang}/concierge`, dict.footer.workWithUs],
        [`/${lang}/concierge`, dict.footer.contactUs],
      ],
    },
  ].filter(group => group.enabled);

  if (!groups.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 text-xs tracking-widest">
      {groups.map(group => (
        <div key={group.key}>
          <h4 className="font-bold mb-5 text-ariwatch-black">{group.title}</h4>
          <ul className="space-y-3.5 text-gray-500">
            {group.links.map(([href, label]) => (
              <li key={label}>
                <Link href={href} className="hover:text-black transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
