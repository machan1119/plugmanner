import { ServicesProvider } from "@/providers/ServicesProvider";
// import { Metadata } from "next";

export default async function ItemLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ item: string }>;
}>) {
  const item = (await params).item;

  return <ServicesProvider item={item}>{children}</ServicesProvider>;
}

// export async function generateMetadata(
//   params: Promise<{ item: string }>
// ): Promise<Metadata> {
//   const item = (await params).item;

//   return {
//     title: "Buy Followers, Like, Subscribers & Views - Socialplug",
//     description:
//       "Buy Followers, Likes, Views, Subscribers & more from Socialplug - the next generation social media shop. Boost your social media presence & build social proof.",
//     icons:
//       "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/629626671773b82cec88fdc4_socialplug-favicon-small.png",
//     twitter: {
//       title: "Buy Followers, Likes, Subscribers & Views - Socialplug",
//       description:
//         "Buy Followers, Likes, Views, Subscribers & more from Socialplug - the next generation social media shop. Boost your social media presence & build social proof.",
//     },
//     robots: {
//       index: false,
//       follow: false,
//       nocache: true,
//       googleBot: {
//         index: false,
//         follow: false,
//         noimageindex: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }
