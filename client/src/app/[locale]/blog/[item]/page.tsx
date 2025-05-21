import BlogsDetailHero from "@/components/pages/Blogs/BlogsDetail/BlogsDetailHero";
import BlogsDetailMain from "@/components/pages/Blogs/BlogsDetail/BlogsDetailMain";
import BlogsDetailRelated from "@/components/pages/Blogs/BlogsDetail/BlogsDetailRelated";
import { getOriginalBlogsItem } from "@/i18n/freeBlogsItemMappings";
import { BlogsProvider } from "@/providers/BlogsProvider";
import { notFound, redirect } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; item: string }>;
}) {
  const { locale, item } = await params;
  const originalItem = await getOriginalBlogsItem(item, locale);
  if (!originalItem) {
    notFound();
  }
  if (item != originalItem) {
    let basePath = "/free-tools";
    if (locale === "es-ES") basePath = "/herramientas-gratis";
    else if (locale === "de") basePath = "/kostenlose-tools";
    else if (locale === "pt-BR") basePath = "/ferramentas-gratuitas";
    redirect(`${basePath}/${originalItem}`);
  }
  return (
    <BlogsProvider item={originalItem} locale={locale}>
      <BlogsDetailHero />
      <BlogsDetailMain />
      <BlogsDetailRelated />
    </BlogsProvider>
  );
}
