import { routing } from "@/i18n/routing";
import { BlogsListProvider } from "@/providers/BlogsListProvider";
import { hasLocale, Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
  return <BlogsListProvider locale={locale}>{children}</BlogsListProvider>;
}
