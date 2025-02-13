import type { Metadata } from "next";
import "./globals.css";
import "./css/clash-display.css";
import "./css/satoshi.css";
import "./css/animation.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { DataProvider } from "@/providers/DataProvider";
import HomeProvider from "@/providers/HomeProvider";
import NavBar from "@/components/pages/NabBar/NavBar";
import Footer from "@/components/pages/Footer/Footer";
import MainLayout from "@/components/MainLayout";
// import { SessionProvider } from "next-auth/react";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {/* <SessionProvider>{children}</SessionProvider> */}
        <HomeProvider>
          <DataProvider>
            <NavBar />
            <MainLayout>{children}</MainLayout>
            <Footer />
          </DataProvider>
        </HomeProvider>
      </body>
    </html>
  );
}
