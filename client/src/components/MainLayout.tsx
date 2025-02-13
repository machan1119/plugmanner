"use client";
import { useHome } from "@/providers/HomeProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { serviceShow } = useHome();
  return <>{serviceShow && children}</>;
}
