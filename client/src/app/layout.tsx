import type { Metadata } from "next";
import "./globals.css";
import "../css/clash-display.css";
import "../css/satoshi.css";
import "../css/animation.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import HomeLayout from "@/components/HomeLayout";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Buy Followers, Like, Subscribers & Views - Socialplug",
  description:
    "Buy Followers, Likes, Views, Subscribers & more from Socialplug - the next generation social media shop. Boost your social media presence & build social proof.",
  icons:
    "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/629626671773b82cec88fdc4_socialplug-favicon-small.png",
  twitter: {
    title: "Buy Followers, Likes, Subscribers & Views - Socialplug",
    description:
      "Buy Followers, Likes, Views, Subscribers & more from Socialplug - the next generation social media shop. Boost your social media presence & build social proof.",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <HomeLayout>{children}</HomeLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
