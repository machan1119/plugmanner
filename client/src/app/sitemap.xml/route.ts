import { ServiceItem } from "@/libs/types/ServiceItemsMapping";
import { fetchServiceItemMappings } from "@/utils/fetchServiceItemMappings";
import { generate_slug } from "@/utils/functions";
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
  for (const item of serviceItems) {
    if (item.locale == "en") {
      sitemapEntries.push({
        loc: `${BASE_URL}/${item.locale}/services/${generate_slug(item.name)}`,
        alternateLinks: item.localizations.map((lang) => ({
          hreflang: lang.locale,
          href: `${BASE_URL}/${lang.locale}/services/${generate_slug(
            lang.name
          )}`,
        })),
        "x-default": `${BASE_URL}/${item.locale}/services/${generate_slug(
          item.name
        )}`,
      });
    } else if (item.locale == "es-ES") {
      sitemapEntries.push({
        loc: `${BASE_URL}/${item.locale}/servicios/${generate_slug(item.name)}`,
        alternateLinks: item.localizations.map((lang) => ({
          hreflang: lang.locale,
          href: `${BASE_URL}/${lang.locale}/servicios/${generate_slug(
            lang.name
          )}`,
        })),
        "x-default": `${BASE_URL}/${item.locale}/servicios/${generate_slug(
          item.name
        )}`,
      });
    } else if (item.locale == "de") {
      sitemapEntries.push({
        loc: `${BASE_URL}/${item.locale}/dienstleistungen/${generate_slug(
          item.name
        )}`,
        alternateLinks: item.localizations.map((lang) => ({
          hreflang: lang.locale,
          href: `${BASE_URL}/${lang.locale}/dienstleistungen/${generate_slug(
            lang.name
          )}`,
        })),
        "x-default": `${BASE_URL}/${
          item.locale
        }/dienstleistungen/${generate_slug(item.name)}`,
      });
    } else if (item.locale == "pt-BR") {
      sitemapEntries.push({
        loc: `${BASE_URL}/${item.locale}/serviços/${generate_slug(item.name)}`,
        alternateLinks: item.localizations.map((lang) => ({
          hreflang: lang.locale,
          href: `${BASE_URL}/${lang.locale}/serviços/${generate_slug(
            lang.name
          )}`,
        })),
        "x-default": `${BASE_URL}/${item.locale}/serviços/${generate_slug(
          item.name
        )}`,
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
            <loc>
                https://plugmanner.com
            </loc>
            <xhtml:link rel="alternate" hreflang="en" href="https://plugmanner.com/en"/>
            <xhtml:link rel="alternate" hreflang="es-ES" href="https://plugmanner.com/es-ES"/>
            <xhtml:link rel="alternate" hreflang="es-ES" href="https://plugmanner.com/de"/>
            <xhtml:link rel="alternate" hreflang="es-ES" href="https://plugmanner.com/pt-BR"/>
            <xhtml:link rel="alternate" hreflang="x-default" href="https://plugmanner.com/en"/>
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
