import type { Viewport } from "next";
import "../globals.css";
import "../../css/clash-display.css";
import "../../css/satoshi.css";
import "../../css/animation.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
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

export async function generateMetadata(params: Promise<{ locale: Locale }>) {
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
    og: {
      title: t("og.title"),
      description: t("og.description"),
    },
    alternates: {
      canonical: "https://plugmanner.com/",
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
