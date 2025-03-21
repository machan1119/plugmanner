import React, { memo } from "react";
import HowToOrderItems from "./HowToOrderItems";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface HowToOrderProps {
  className?: string;
}

const HowToOrder = memo(({ className = "" }: HowToOrderProps) => {
  const t = useTranslations("Home");
  const HowTo = [
    {
      icon: "http://localhost:3000/image/how-to-order-3-p-500.png",
      title: t("HowToOrder.OrderSteps.0.title"),
      description: t("HowToOrder.OrderSteps.0.description"),
    },
    {
      icon: "http://localhost:3000/image/how-to-order-2-p-500.png",
      title: t("HowToOrder.OrderSteps.1.title"),
      description: t("HowToOrder.OrderSteps.1.description"),
    },
    {
      icon: "http://localhost:3000/image/how-to-order-1-p-500.png",
      title: t("HowToOrder.OrderSteps.2.title"),
      description: t("HowToOrder.OrderSteps.2.description"),
    },
  ];

  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden ${className}`}
    >
      <div className="mb-12 flex flex-col gap-3 items-center">
        <h2 id="section-how-to-order-title" className="font-h1 animate-fade-in">
          {t("HowToOrder.title_1")}
          <span className="text-primary">{t("HowToOrder.title_2")}</span>
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
          {t("HowToOrder.description")}
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto relative">
        <Image
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e65_how-to-order_desktop-line-bg.svg"
          alt="Order steps"
          width={100}
          height={100}
          className="absolute top-[10%] left-[20%] w-[60%] hidden xl:block"
        />
        <div className="grid md:[&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[5%] items-center w-full">
          {HowTo.map((item) => (
            <HowToOrderItems item={item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
});

HowToOrder.displayName = "HowToOrder";

export default HowToOrder;
