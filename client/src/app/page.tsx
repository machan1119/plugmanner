"use client";
import Blogs from "@/components/pages/Home/Blogs/Blogs";
import HowToOrder from "@/components/pages/Home/HowToOrder/HowToOrder";
import OurPartners from "@/components/pages/Home/OurPartners/OurPartners";
import Question from "@/components/pages/Home/Question/Question";
import SectionHero from "@/components/pages/Home/SectionHero/SectionHero";
import SectionLogos from "@/components/pages/Home/SectionLogos/SectionLogos";
import SectionServices from "@/components/pages/Home/SectionServices.tsx/SectionServices";
import SectionWhy from "@/components/pages/Home/SectionWhy/SectionWhy";
import SectionWhyChoose from "@/components/pages/Home/SectionWhyChoose/SectionWhyChoose";
import ScrollToTop from "react-scroll-up";

export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionLogos />
      <SectionServices />
      <SectionWhy />
      <SectionWhyChoose />
      <HowToOrder />
      <Question />
      <OurPartners />
      <Blogs />
      <ScrollToTop showUnder={160}>
        <span>Up</span>
      </ScrollToTop>
    </>
  );
}
