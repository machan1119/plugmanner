"use client";
import ServicesContent from "@/components/pages/Services/ServiceContent";
import { useServices } from "@/providers/ServicesProvider";

export default function ServicesPage() {
  const { serviceItems } = useServices();

  console.log(serviceItems);
  return <ServicesContent />;
}

// export async function generateMetadata() {
//   return {
//     title: "123123123213",
//   };
// }
