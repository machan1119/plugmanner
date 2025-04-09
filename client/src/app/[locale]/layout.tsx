import type { Metadata, Viewport } from "next";
import HomeLayout from "@/components/HomeLayout";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata(
  params: Promise<{ locale: Locale }>
): Promise<Metadata | null> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  return {
    title: t("title"),
    description: t("description"),
    icons: t("icons"),
    twitter: {
      title: t("twitter.title"),
      description: t("twitter.description"),
    },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
    },
    alternates: {
      canonical: "https://plugmanner.com/",
      languages: {
        en: "https://plugmanner.com/",
        "es-ES": "https://plugmanner.com/es-ES/",
        de: "https://plugmanner.com/de/",
        "pt-BR": "https://plugmanner.com/pt-BR/",
      },
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        "max-video-preview": "large",
        "max-image-preview": "large",
        "max-snippet": 320,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <HomeLayout locale={locale}>{children}</HomeLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
