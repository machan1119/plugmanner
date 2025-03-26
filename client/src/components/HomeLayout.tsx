import { GoToTop } from "@/components/GoToTop";
import Footer from "@/components/pages/Footer/Footer";
import NavBar from "@/components/pages/NabBar/NavBar";
import HomeProvider from "@/providers/HomeProvider";
import { ListProvider } from "@/providers/ListProvider";

export default function HomeLayout({
  locale,
  children,
}: Readonly<{
  locale: string;
  children: React.ReactNode;
}>) {
  return (
    <HomeProvider>
      <ListProvider locale={locale}>
        <NavBar />
        {children}
        <Footer />
        <GoToTop />
      </ListProvider>
    </HomeProvider>
  );
}
