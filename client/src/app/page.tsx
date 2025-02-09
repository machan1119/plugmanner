"use client";
import Blogs from "@/components/pages/Home/Blogs/Blogs";
import Footer from "@/components/pages/Home/Footer/Footer";
import HowToOrder from "@/components/pages/Home/HowToOrder/HowToOrder";
import NavBar from "@/components/pages/Home/NabBar/NavBar";
import OurPartners from "@/components/pages/Home/OurPartners/OurPartners";
import Question from "@/components/pages/Home/Question/Question";
import SectionHero from "@/components/pages/Home/SectionHero/SectionHero";
import SectionLogos from "@/components/pages/Home/SectionLogos/SectionLogos";
import SectionServices from "@/components/pages/Home/SectionServices.tsx/SectionServices";
import SectionWhy from "@/components/pages/Home/SectionWhy/SectionWhy";
import SectionWhyChoose from "@/components/pages/Home/SectionWhyChoose/SectionWhyChoose";

export default function Home() {
  return (
    <>
      <NavBar />
      <SectionHero />
      <SectionLogos />
      <SectionServices />
      <SectionWhy />
      <SectionWhyChoose />
      <HowToOrder />
      <Question />
      <OurPartners />
      <Blogs />
      <Footer />
    </>
  );
}
