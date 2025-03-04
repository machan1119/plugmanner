import Link from "next/link";
import React, { memo } from "react";
import { Reviews } from "@/libs/data/Reviews";
import SectionWhyItems from "./SectionWhyItems";

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
      className={`flex flex-col py-8 sm:py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px] ${className}`}
      aria-labelledby="section-why-title"
    >
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-3 items-center">
          <h2
            id="section-why-title"
            className="font-h1-md lg:font-h1-lg animate-fade-in"
          >
            Why Customers <span className="text-green-light">Choose Us</span>
          </h2>
          <p className="text-black text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            Read what our customers think about this service. We take your
            feedback seriously - help us improve by{" "}
            <Link
              className="text-green-light underline hover:text-green-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-light rounded-sm"
              href={"#"}
              aria-label="Leave a review"
            >
              leaving a review
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-8 items-center w-full">
          <div
            className="flex flex-col sm:flex-row bg-white border-black-dark rounded-[16px] py-6 relative w-full sm:w-[90%] items-center shadow-sm hover:shadow-md transition-all duration-300"
            role="list"
            aria-label="Statistics"
          >
            {statsData.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div
                  className="flex flex-col grow gap-2 items-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  role="listitem"
                >
                  <h3 className="font-h1-main md:font-h1-md lg:font-h1-lg">
                    {stat.value}
                  </h3>
                  <p className="text-black-dark text-[12px] md:text-[16px] lg:text-[18px] font-satoshi text-center">
                    {stat.label}
                  </p>
                </div>
                {index < statsData.length - 1 && (
                  <div
                    className="hidden sm:block bg-gradient-to-b from-white via-black-dark to-white w-[1px] h-[75px]"
                    aria-hidden="true"
                  />
                )}
                {index < statsData.length - 1 && (
                  <div
                    className="sm:hidden w-full h-[1px] bg-gradient-to-r from-white via-black-dark to-white my-4"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full"
            role="list"
            aria-label="Customer Reviews"
          >
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
