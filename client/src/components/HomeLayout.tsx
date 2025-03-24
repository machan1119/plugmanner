"use client";
import { GoToTop } from "@/components/GoToTop";
import Footer from "@/components/pages/Footer/Footer";
import NavBar from "@/components/pages/NabBar/NavBar";
import HomeProvider from "@/providers/HomeProvider";
import { ListProvider } from "@/providers/ListProvider";
import { setUserLocale } from "@/utils/locale";
import { useEffect } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    setUserLocale("en");
  }, []);
  return (
    <HomeProvider>
      <ListProvider>
        <NavBar />
        {children}
        <Footer />
        <GoToTop />
      </ListProvider>
    </HomeProvider>
  );
}
