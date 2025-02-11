import ServicesContent from "@/components/pages/Services/ServiceContent";
import { slugify_reverse } from "@/libs/functions";
import { ServicesProvider } from "@/providers/ServicesProvider";

interface Post {
  id: string;
  title: string;
  content: string;
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts: Post[] = await fetch("https://api.vercel.app/blog").then((res) =>
    res.json()
  );
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ item: string[] }>;
}) {
  const item = slugify_reverse((await params).item);

  return (
    <ServicesProvider item={item}>
      <ServicesContent />
    </ServicesProvider>
  );
}
