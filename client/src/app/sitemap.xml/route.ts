import { ServiceItem } from "@/libs/types/ServiceItemsMapping";
import { fetchServiceItemMappings } from "@/utils/fetch-service-data";
import { generate_item_url } from "@/utils/functions";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

interface SitemapEntry {
  loc: string;
  alternateLinks: { hreflang: string; href: string }[];
  "x-default": string;
}

export async function GET(request: Request) {
  const sitemapEntries: SitemapEntry[] = [];
  const serviceItems: ServiceItem[] = await fetchServiceItemMappings("en");
  const Locale_URL = {
    en: `${BASE_URL}/services`,
    "es-ES": `${BASE_URL}/es-ES/servicios`,
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
        <loc>${BASE_URL}</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}"/>
        <xhtml:link rel="alternate" hreflang="es-ES" href="${BASE_URL}/es-ES"/>
        <xhtml:link rel="alternate" hreflang="pt-BR" href="${BASE_URL}/pt-BR"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}"/>
    </url>${sitemapEntries
      .map(
        (entry) => `
    <url>
        <loc>
          ${entry.loc}
        </loc>
        ${entry.alternateLinks
          .map(
            (alt) =>
              `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${
          entry["x-default"]
        }"/>
    </url>`
      )
      .join("")}
</urlset>`;
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta name="color-scheme" content="light dark">
    <title>Sitemap</title>
    <style>
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <pre>${sitemap.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`;

  const userAgent = request.headers.get("user-agent") || "";
  const isSearchEngine =
    /bot|crawl|spider|slurp|baidu|bing|yandex|google/i.test(userAgent);

  return new NextResponse(isSearchEngine ? sitemap : html, {
    headers: {
      "Content-Type": isSearchEngine ? "application/xml" : "text/html",
    },
  });
}
