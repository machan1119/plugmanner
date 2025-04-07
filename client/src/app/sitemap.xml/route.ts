import { ServiceItem } from "@/libs/types/ServiceItemsMapping";
import { fetchServiceItemMappings } from "@/utils/fetchServiceItemMappings";
import { generate_item_url } from "@/utils/functions";
import { NextResponse } from "next/server";

const BASE_URL = "https://plugmanner.com";

interface SitemapEntry {
  loc: string;
  alternateLinks: { hreflang: string; href: string }[];
  "x-default": string;
}

export async function GET() {
  const sitemapEntries: SitemapEntry[] = [];
  const serviceItems: ServiceItem[] = await fetchServiceItemMappings("en");
  const Locale_URL = {
    en: `${BASE_URL}/services`,
    "es-ES": `${BASE_URL}/es-ES/servicios`,
    de: `${BASE_URL}/de/dienstleistungen`,
    "pt-BR": `${BASE_URL}/pt-BR/serviços`,
  };
  for (const item of serviceItems) {
    sitemapEntries.push({
      loc: `${BASE_URL}/services/${generate_item_url(item.header.text)}`,
      alternateLinks: item.localizations.map((lang) => ({
        hreflang: lang.locale,
        href: `${Locale_URL[lang.locale]}/${generate_item_url(
          lang.header.text
        )}`,
      })),
      "x-default": `${BASE_URL}/services/${generate_item_url(
        item.header.text
      )}`,
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
            <loc>
                https://plugmanner.com
            </loc>
            <xhtml:link rel="alternate" hreflang="en" href="https://plugmanner.com"/>
            <xhtml:link rel="alternate" hreflang="es-ES" href="https://plugmanner.com/es-ES"/>
            <xhtml:link rel="alternate" hreflang="de" href="https://plugmanner.com/de"/>
            <xhtml:link rel="alternate" hreflang="pt-BR" href="https://plugmanner.com/pt-BR"/>
            <xhtml:link rel="alternate" hreflang="x-default" href="https://plugmanner.com"/>
        </url>  
    ${sitemapEntries
      .map(
        (entry) => `
          <url>
            <loc>${entry.loc}</loc>
            ${entry.alternateLinks
              .map(
                (alt) =>
                  `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
              )
              .join("")}
            <xhtml:link rel="alternate" hreflang="x-default" href="${
              entry["x-default"]
            }"/>
          </url>
        `
      )
      .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
