import Link from "next/link";
import React, { memo } from "react";
import { Reviews } from "@/libs/data/Reviews";
import SectionWhyItems from "./SectionWhyItems";
import Image from "next/image";

interface SectionWhyProps {
  className?: string;
}

interface StatsData {
  value: string;
  label: string;
}

const statsData: StatsData[] = [
  { value: "100k+", label: "Happy Customers" },
  { value: "1.7 Billion+", label: "Population Reached" },
  { value: "4.8", label: "Review Rate" },
];

const SectionWhy = memo(({ className = "" }: SectionWhyProps) => {
  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px] ${className}`}
    >
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-3 items-center">
          <h2 id="section-why-title" className="font-h1 animate-fade-in">
            Why Customers <span className="text-primary">Choose Us</span>
          </h2>
          <p className="text-black text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            Read what our customers think about this service. We take your
            feedback seriously - help us improve by{" "}
            <Link
              href={"#"}
              aria-label="Leave a review"
              className="text-primary underline hover:text-secondary transition-colors duration-300 rounded-sm"
            >
              leaving a review
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-8 items-center w-full ">
          <div className="mt-[70px] lg:mt-0 flex flex-col sm:flex-row bg-white border border-black-dark/50 rounded-[16px] py-6 relative w-full sm:w-[90%] items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute -top-0 right-0 transform -translate-y-[78%] translate-x-[10%] md:translate-x-[20%] z-20 w-[120px] lg:w-[10%] flex flex-col items-end">
              <Image
                width={136}
                height={176}
                loading="lazy"
                alt="Socialplug Character Sitting"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e7b_why-choose-us-character-img.svg"
                className="w-full"
              />
              <Image
                width={82}
                height={38}
                loading="lazy"
                alt="5-star reviews"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e7a_why-choose-us-rating-bubble.svg"
                className="absolute top-[10%] lg:-right-[60%] right-[110%] w-[70%]"
              />
            </div>
            {statsData.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div
                  className="flex flex-col grow gap-2 items-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-h1">{stat.value}</h3>
                  <p className="text-black-dark text-[12px] md:text-[16px] lg:text-[18px] font-satoshi text-center">
                    {stat.label}
                  </p>
                </div>
                {index < statsData.length - 1 && (
                  <div className="hidden sm:block bg-gradient-to-b from-white via-black-dark to-white w-[1px] h-[75px]" />
                )}
                {index < statsData.length - 1 && (
                  <div className="sm:hidden w-full h-[1px] bg-gradient-to-r from-white via-black-dark to-white my-4" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full">
            {Reviews.map((item, index) => (
              <SectionWhyItems
                item={item}
                key={item.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SectionWhy.displayName = "SectionWhy";

export default SectionWhy;
